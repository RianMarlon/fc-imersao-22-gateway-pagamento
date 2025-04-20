"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createInvoiceAction(formData: FormData) {
  const cookieStore = await cookies();
  const apiKey = cookieStore.get("apiKey");
  const amount = formData.get("amount")?.toString().replace(",", ".");
  const description = formData.get("description");
  const cardNumber = formData.get("cardNumber");
  const [expiryMonth, expiryYear] = formData
    .get("expiryDate")!
    .toString()
    .split("/");
  const cvv = formData.get("cvv");
  const cardholderName = formData.get("cardholderName");

  const response = await fetch("http://go-gateway-api:8080/invoices", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": apiKey?.value || "",
    },
    body: JSON.stringify({
      amount: parseFloat(amount as string),
      description,
      card_number: cardNumber,
      expiry_month: parseInt(expiryMonth as string),
      expiry_year: parseInt(expiryYear as string),
      cvv,
      cardholder_name: cardholderName,
      payment_type: "credit_card",
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create invoice");
  }

  const invoice = await response.json();
  revalidateTag(`accounts/${apiKey}/invoices`);
  revalidateTag(`accounts/${apiKey}/invoices/${invoice.id}`);

  redirect("/invoices");
}

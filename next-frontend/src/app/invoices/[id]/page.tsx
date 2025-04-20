import Link from "next/link"
import { PageContainer } from "@/components/page-container"
import { Card } from "@/components/card"
import { Button } from "@/components/button"
import { StatusBadge } from "@/components/status-badge"
import { ArrowLeft, Download } from "lucide-react"
import { cookies } from "next/headers";

export async function getInvoice(id: string) {
  const cookieStore = await cookies();
  const apiKey = cookieStore.get("apiKey")?.value;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invoices/${id}`, {
    headers: {
      "X-API-KEY": apiKey as string,
    },
    cache: 'force-cache',
    next: {
      tags: [`accounts/${apiKey}/invoices/${id}`]
    }
  });
  return response.json();
}

export default async function InvoiceDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const invoice = await getInvoice(id);

  return (
    <PageContainer>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/invoices">
            <Button variant="outline" className="p-2">
              <ArrowLeft size={18} />
              <span className="ml-1">Voltar</span>
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Fatura {invoice.id}</h1>
          <StatusBadge status={invoice.status} />
        </div>
        <Button icon={<Download size={16} />}>Download PDF</Button>
      </div>

      <p className="text-slate-400 mb-6">Criada em {new Date(invoice.created_at).toLocaleDateString("pt-BR")}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Informações da Fatura */}
        <Card>
          <h2 className="text-xl font-semibold mb-4">Informações da Fatura</h2>

          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b border-slate-700">
              <span className="text-slate-400">ID da Fatura</span>
              <span>{invoice.id}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-700">
              <span className="text-slate-400">Valor</span>
              <span>{Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(invoice.amount)}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-700">
              <span className="text-slate-400">Data de Criação</span>
              <span>{new Date(invoice.created_at).toLocaleDateString("pt-BR")}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-700">
              <span className="text-slate-400">Descrição</span>
              <span>{invoice.description}</span>
            </div>
          </div>
        </Card>


        {/* Método de Pagamento */}
        <Card>
          <h2 className="text-xl font-semibold mb-4">Método de Pagamento</h2>

          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b border-slate-700">
              <span className="text-slate-400">Tipo</span>
              <span>{invoice.payment_type === 'credit_card' ? 'Cartão de Crédito' : 'Pix'}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-700">
              <span className="text-slate-400">Últimos Dígitos</span>
              <span>{invoice.card_last_digits}</span>
            </div>
          </div>
        </Card>
      </div>
    </PageContainer>
  )
}

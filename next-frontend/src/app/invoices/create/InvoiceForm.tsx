'use client'

import { LockIcon } from "lucide-react";
import { Input } from "@/components/input";
import { Textarea } from "@/components/textarea";
import { Button } from "@/components/button";
import { CreditCard } from "lucide-react";
import { createInvoiceAction } from "./create-invoice-action";

export function InvoiceForm() {
  return (
    <form action={createInvoiceAction}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Dados do Pagamento - Lado Esquerdo */}
        <div className="space-y-6">
          <div>
            <Input
              type="number"
              label="Valor"
              name="amount"
              step={0.01}
              min={0}
              defaultValue={0.01}
              placeholder="0,00"
            />
          </div>

          <Textarea
            label="Descrição"
            name="description"
            placeholder="Descreva o motivo do pagamento"
            rows={5}
            defaultValue="Compra no site"
          />
        </div>

        {/* Dados do Cartão - Lado Direito */}
        <div className="bg-slate-700/50 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Dados do Cartão</h2>

          <div className="space-y-4">
            <div className="relative">
              <Input
                type="text"
                label="Número do Cartão"
                name="cardNumber"
                placeholder="0000000000000000"
                defaultValue="1234567890123456"
                maxLength={16}
                className="pr-10"
              />
              <span className="absolute right-3 top-[38px] text-slate-400">
                <CreditCard size={20} />
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                type="text"
                label="Data de Expiração"
                name="expiryDate"
                placeholder="MM/AA"
                defaultValue="12/25"
              />

              <Input
                type="text"
                label="CVV"
                name="cvv"
                placeholder="123"
                defaultValue="123"
              />
            </div>

            <Input
              type="text"
              label="Nome no Cartão"
              name="cardholderName"
              placeholder="Como aparece no cartão"
              defaultValue="Nome Sobrenome"
            />
          </div>
        </div>
      </div>

      {/* Resumo do Pagamento */}
      {/* <div className="mt-8 bg-slate-700/30 rounded-lg p-6">
        <div className="space-y-2">
          <div className="flex justify-between py-2 border-b border-slate-700">
            <span className="text-slate-400">Subtotal</span>
            <span>R$ 0,00</span>
          </div>

          <div className="flex justify-between py-2 border-b border-slate-700">
            <span className="text-slate-400">Taxa de Processamento (2%)</span>
            <span>R$ 0,00</span>
          </div>

          <div className="flex justify-between font-bold text-lg pt-2">
            <span>Total</span>
            <span>R$ 0,00</span>
          </div>
        </div>
      </div> */}

      {/* Botões de Ação */}
      <div className="mt-8 flex justify-end gap-4">
        <Button variant="secondary">
          Cancelar
        </Button>
        <Button
          type="submit"
          icon={<LockIcon size={16} />}
        >
          Processar Pagamento
        </Button>
      </div>
    </form>
  )
}
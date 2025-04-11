import { PageContainer } from "@/components/page-container"
import { LockIcon, CreditCard } from "lucide-react"

export default function InvoiceCreatePage() {
  return (
    <PageContainer>
      <div className="bg-slate-800 rounded-lg p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Criar Nova Fatura</h1>
          <p className="text-slate-400">Preencha os dados abaixo para processar um novo pagamento</p>
        </div>

        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Dados do Pagamento - Lado Esquerdo */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Valor</label>
                <div className="relative">
                  <input
                    type="text"
                    defaultValue="0,00"
                    className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white pl-10"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">R$</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Descrição</label>
                <textarea
                  placeholder="Descreva o motivo do pagamento"
                  rows={5}
                  className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white placeholder:text-slate-400 focus:outline-none"
                ></textarea>
              </div>
            </div>

            {/* Dados do Cartão - Lado Direito */}
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Dados do Cartão</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-300">Número do Cartão</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white pr-10"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <CreditCard size={20} />
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-300">Data de Expiração</label>
                    <input
                      type="text"
                      placeholder="MM/AA"
                      className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-300">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-300">Nome no Cartão</label>
                  <input
                    type="text"
                    placeholder="Como aparece no cartão"
                    className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Resumo do Pagamento */}
          <div className="mt-8 bg-slate-700/30 rounded-lg p-6">
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
          </div>

          {/* Botões de Ação */}
          <div className="mt-8 flex justify-end gap-4">
            <button type="button" className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded">
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded flex items-center gap-2"
            >
              <LockIcon size={16} />
              Processar Pagamento
            </button>
          </div>
        </form>
      </div>
    </PageContainer>
  )
}

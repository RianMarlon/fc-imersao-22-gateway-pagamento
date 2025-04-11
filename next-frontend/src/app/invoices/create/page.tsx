import { PageContainer } from "@/components/page-container"
import { InvoiceForm } from "./InvoiceForm"

export default function InvoiceCreatePage() {
  return (
    <PageContainer>
      <div className="bg-slate-800 rounded-lg p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Criar Nova Fatura</h1>
          <p className="text-slate-400">Preencha os dados abaixo para processar um novo pagamento</p>
        </div>

        <InvoiceForm />
      </div>
    </PageContainer>
  )
}

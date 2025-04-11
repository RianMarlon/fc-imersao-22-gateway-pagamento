import Link from "next/link"
import { PageContainer } from "@/components/page-container"
import { Card } from "@/components/card"
import { Button } from "@/components/button"
import { StatusBadge } from "@/components/status-badge"
import { ArrowLeft, Download, CheckCircle } from "lucide-react"

export default function InvoiceDetailsPage({ params }: { params: { id: string } }) {
  // Dados mockados para exemplo
  const invoice = {
    id: "#INV-001",
    status: "approved" as const,
    createdAt: "30/03/2025 às 14:30",
    value: "R$ 1.500,00",
    creationDate: "30/03/2025 14:30",
    lastUpdate: "30/03/2025 14:35",
    description: "Compra Online #123",
    paymentMethod: {
      type: "Cartão de Crédito",
      lastDigits: "**** **** **** 1234",
      holder: "João da Silva",
    },
    additionalData: {
      accountId: "ACC-12345",
      clientIp: "192.168.1.1",
      device: "Desktop - Chrome",
    },
    transactionStatus: [
      {
        status: "Fatura Criada",
        date: "30/03/2025 14:30",
      },
      {
        status: "Pagamento Processado",
        date: "30/03/2025 14:32",
      },
      {
        status: "Transação Aprovada",
        date: "30/03/2025 14:35",
      },
    ],
  }

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

      <p className="text-slate-400 mb-6">Criada em {invoice.createdAt}</p>

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
              <span>{invoice.value}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-700">
              <span className="text-slate-400">Data de Criação</span>
              <span>{invoice.creationDate}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-700">
              <span className="text-slate-400">Última Atualização</span>
              <span>{invoice.lastUpdate}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-700">
              <span className="text-slate-400">Descrição</span>
              <span>{invoice.description}</span>
            </div>
          </div>
        </Card>

        {/* Status da Transação */}
        <Card>
          <h2 className="text-xl font-semibold mb-4">Status da Transação</h2>

          <div className="space-y-6">
            {invoice.transactionStatus.map((status, index) => (
              <div key={index} className="flex gap-3">
                <div className="text-green-400 mt-1">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <h3 className="font-medium">{status.status}</h3>
                  <p className="text-sm text-slate-400">{status.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Método de Pagamento */}
        <Card>
          <h2 className="text-xl font-semibold mb-4">Método de Pagamento</h2>

          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b border-slate-700">
              <span className="text-slate-400">Tipo</span>
              <span>{invoice.paymentMethod.type}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-700">
              <span className="text-slate-400">Últimos Dígitos</span>
              <span>{invoice.paymentMethod.lastDigits}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-700">
              <span className="text-slate-400">Titular</span>
              <span>{invoice.paymentMethod.holder}</span>
            </div>
          </div>
        </Card>

        {/* Dados Adicionais */}
        <Card>
          <h2 className="text-xl font-semibold mb-4">Dados Adicionais</h2>

          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b border-slate-700">
              <span className="text-slate-400">ID da Conta</span>
              <span>{invoice.additionalData.accountId}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-700">
              <span className="text-slate-400">IP do Cliente</span>
              <span>{invoice.additionalData.clientIp}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-700">
              <span className="text-slate-400">Dispositivo</span>
              <span>{invoice.additionalData.device}</span>
            </div>
          </div>
        </Card>
      </div>
    </PageContainer>
  )
}

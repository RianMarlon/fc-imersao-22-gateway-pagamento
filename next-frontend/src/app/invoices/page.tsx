import Link from "next/link"
import { PageContainer } from "@/components/page-container"
import { Card } from "@/components/card"
import { Input } from "@/components/input"
import { Select } from "@/components/select"
import { Button } from "@/components/button"
import { StatusBadge } from "@/components/status-badge"
import { Eye, Download, Plus } from "lucide-react"

// Dados mockados para exemplo
const invoices = [
  {
    id: "#INV-001",
    date: "30/03/2025",
    description: "Compra Online #123",
    value: "R$ 1.500,00",
    status: "approved" as const,
  },
  {
    id: "#INV-002",
    date: "29/03/2025",
    description: "Serviço Premium",
    value: "R$ 15.000,00",
    status: "pending" as const,
  },
  {
    id: "#INV-003",
    date: "28/03/2025",
    description: "Assinatura Mensal",
    value: "R$ 99,90",
    status: "rejected" as const,
  },
]

export default function InvoiceListPage() {
  return (
    <PageContainer>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold">Faturas</h1>
            <p className="text-slate-400">Gerencie suas faturas e acompanhe os pagamentos</p>
          </div>
          <Link href="/invoices/create">
            <Button icon={<Plus size={16} />}>Nova Fatura</Button>
          </Link>
        </div>

        {/* Filtros */}
        <div className="bg-slate-700 rounded-lg p-4 mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Select
            label="Status"
            options={[
              { value: "all", label: "Todos" },
              { value: "approved", label: "Aprovado" },
              { value: "pending", label: "Pendente" },
              { value: "rejected", label: "Rejeitado" },
            ]}
          />

          <Input type="text" label="Data Inicial" placeholder="dd/mm/aaaa" maxLength={10} />

          <Input type="text" label="Data Final" placeholder="dd/mm/aaaa" maxLength={10} />

          <Input type="text" label="Buscar" placeholder="ID ou descrição" />
        </div>

        {/* Tabela de Faturas */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">ID</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">DATA</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">DESCRIÇÃO</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">VALOR</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">STATUS</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-slate-400">AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-slate-700">
                  <td className="py-3 px-4">{invoice.id}</td>
                  <td className="py-3 px-4">{invoice.date}</td>
                  <td className="py-3 px-4">{invoice.description}</td>
                  <td className="py-3 px-4">{invoice.value}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={invoice.status} />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex gap-2 justify-center">
                      <Link href={`/invoices/${invoice.id.replace("#", "")}`}>
                        <button className="text-blue-400 hover:text-blue-300">
                          <Eye size={18} />
                        </button>
                      </Link>
                      <button className="text-slate-400 hover:text-slate-300">
                        <Download size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-slate-400">Mostrando 1 - 3 de 50 resultados</p>
          <div className="flex gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded bg-slate-700 text-white">&lt;</button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-indigo-600 text-white">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-slate-700 text-white">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-slate-700 text-white">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-slate-700 text-white">&gt;</button>
          </div>
        </div>
      </Card>
    </PageContainer>
  )
}

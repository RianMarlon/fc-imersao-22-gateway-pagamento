import Link from "next/link"
import { LogOut } from "lucide-react"

interface HeaderProps {
  username?: string
}

export function Header({ username = "usuário" }: HeaderProps) {
  return (
    <header className="bg-slate-800 py-4 px-6 flex justify-between items-center border-b border-slate-700">
      <Link href="/invoices" className="text-xl font-bold">
        Full Cycle Gateway
      </Link>
      <div className="flex items-center gap-4">
        <span className="text-slate-300">Olá, {username}</span>
        <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded flex items-center gap-1 text-sm">
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  )
}

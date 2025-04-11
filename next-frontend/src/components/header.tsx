import Link from "next/link"
import { LogOut } from "lucide-react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

interface HeaderProps {
  username?: string
}

export async function logoutAction() {
  'use server'
  const cookiesStore = await cookies()
  cookiesStore.delete('apiKey')
  redirect('/login')
}

export async function Header({ username = "usuário" }: HeaderProps) {
  const cookiesStore = await cookies()
  const isAuthPage = cookiesStore.get('apiKey')?.value !== undefined

  return (
    <header className="bg-slate-800 py-4 px-6 flex justify-between items-center border-b border-slate-700">
      <Link href="/invoices" className="text-xl font-bold">
        Full Cycle Gateway
      </Link>
      {isAuthPage && (
        <div className="flex items-center gap-4">
          <span className="text-slate-300">Olá, {username}</span>
          <form action={logoutAction}>
            <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded flex items-center gap-1 text-sm">
              <LogOut size={16} />
              Logout
            </button>
          </form>
        </div>
      )}
    </header>
  )
}

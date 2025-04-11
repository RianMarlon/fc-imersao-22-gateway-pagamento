import { Header } from "@/components/header"
import { ArrowRight } from "lucide-react"

export default function AuthPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <Header />
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-xl bg-slate-800 rounded-lg p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">Autenticação Gateway</h1>
            <p className="text-slate-400">Insira sua API Key para acessar o sistema</p>
          </div>

          <form action="/invoices">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">API Key</label>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Digite sua API Key"
                    className="flex-1 bg-slate-700 border border-slate-600 rounded-l px-3 py-2 text-white placeholder:text-slate-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-r flex items-center justify-center"
                  >
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </form>

          <div className="mt-6 bg-slate-700/50 rounded-lg p-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 text-blue-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-circle-info"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-sm mb-1">Como obter uma API Key?</h3>
                <p className="text-sm text-slate-400">
                  Para obter sua API Key, você precisa criar uma conta de comerciante. Entre em contato com nosso
                  suporte para mais informações.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

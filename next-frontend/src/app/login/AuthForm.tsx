import { ArrowRight } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  'use server'
  const apiKey = formData.get("apiKey")

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts`, {
    headers: {
      'X-API-KEY': apiKey as string
    }
  })

  if (!response.ok) {
    throw new Error('Invalid API Key')
  }

  const cookiesStore = await cookies()
  cookiesStore.set('apiKey', apiKey as string)

  redirect('/invoices')
}

export function AuthForm() {
  return (
    <form action={loginAction}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-slate-300">API Key</label>
          <div className="flex">
            <input
              type="text"
              name="apiKey"
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
  )
}

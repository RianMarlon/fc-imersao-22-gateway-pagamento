import type { ReactNode } from "react"

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className = "" }: CardProps) {
  return <div className={`bg-slate-800 rounded-lg p-6 ${className}`}>{children}</div>
}

"use client"

import type { ReactNode } from "react"

interface ButtonProps {
  children: ReactNode
  variant?: "primary" | "secondary" | "outline" | "destructive"
  className?: string
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  icon?: ReactNode
  disabled?: boolean
}

export function Button({
  children,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
  icon,
  disabled = false,
}: ButtonProps) {
  const baseClasses = "px-4 py-2 rounded font-medium flex items-center justify-center gap-2"

  const variantClasses = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white",
    secondary: "bg-slate-700 hover:bg-slate-600 text-white",
    outline: "bg-transparent border border-slate-600 hover:bg-slate-700 text-white",
    destructive: "bg-red-600 hover:bg-red-700 text-white",
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {icon}
      {children}
    </button>
  )
}

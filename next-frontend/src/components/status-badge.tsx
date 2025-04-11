interface StatusBadgeProps {
  status: "approved" | "pending" | "rejected"
}

const statusMap = {
  approved: {
    label: "Aprovado",
    className: "status-approved",
  },
  pending: {
    label: "Pendente",
    className: "status-pending",
  },
  rejected: {
    label: "Rejeitado",
    className: "status-rejected",
  },
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { label, className } = statusMap[status]

  return <span className={className}>{label}</span>
}

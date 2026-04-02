interface CardProps {
  children: React.ReactNode
  className?: string
}

function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-bg-card rounded-xl border border-border p-6 ${className}`}
    >
      {children}
    </div>
  )
}

export { Card }
export type { CardProps }

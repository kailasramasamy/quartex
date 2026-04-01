interface GradientTextProps {
  children: React.ReactNode
  className?: string
}

function GradientText({ children, className = "" }: GradientTextProps) {
  return (
    <span
      className={`bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  )
}

export { GradientText }
export type { GradientTextProps }

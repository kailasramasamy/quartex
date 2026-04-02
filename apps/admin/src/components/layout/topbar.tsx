import { useAuth } from "~/lib/auth"

interface TopbarProps {
  title: string
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

function Topbar({ title }: TopbarProps) {
  const { admin } = useAuth()

  return (
    <header className="h-16 bg-bg-secondary border-b border-border flex items-center justify-between px-8">
      <h1 className="font-heading text-lg font-semibold text-text-primary">
        {title}
      </h1>

      {admin && (
        <div className="flex items-center gap-3">
          <span className="text-sm text-text-secondary">{admin.name}</span>
          <div
            className="w-8 h-8 rounded-full bg-accent/20 text-accent text-xs font-semibold flex items-center justify-center flex-shrink-0"
            aria-label={admin.name}
          >
            {getInitials(admin.name)}
          </div>
        </div>
      )}
    </header>
  )
}

export { Topbar }
export type { TopbarProps }

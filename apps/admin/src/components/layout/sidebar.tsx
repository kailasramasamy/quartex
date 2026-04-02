import { Link } from "@tanstack/react-router"
import {
  LayoutDashboard,
  FlaskConical,
  Users,
  MessageSquare,
  Rocket,
  LogOut,
} from "lucide-react"
import { useAuth } from "~/lib/auth"

interface NavItem {
  label: string
  to: string
  icon: React.ComponentType<{ size?: number; className?: string }>
}

const navItems: NavItem[] = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Programs", to: "/programs", icon: FlaskConical },
  { label: "Testers", to: "/testers", icon: Users },
  { label: "Feedback", to: "/feedback", icon: MessageSquare },
  { label: "Releases", to: "/releases", icon: Rocket },
]

function NavLink({ item }: { item: NavItem }) {
  return (
    <Link
      to={item.to}
      activeOptions={{ exact: item.to === "/dashboard" }}
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-bg-card transition-colors duration-150"
      activeProps={{ className: "!bg-accent/10 !text-accent" }}
    >
      <item.icon size={18} />
      {item.label}
    </Link>
  )
}

function Sidebar() {
  const { admin, logout } = useAuth()

  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-bg-secondary border-r border-border flex flex-col z-20">
      <div className="px-5 py-6 border-b border-border flex items-center gap-3">
        <img src="/quartex-logo.png" alt="Quartex" className="h-6" />
        <span className="text-[10px] font-semibold uppercase tracking-widest text-accent bg-accent/10 px-2 py-0.5 rounded">
          Admin
        </span>
      </div>

      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {navItems.map((item) => (
          <NavLink key={item.to} item={item} />
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-border flex items-center justify-between">
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-medium text-text-primary truncate">
            {admin?.name ?? "Admin"}
          </span>
          <span className="text-xs text-text-secondary truncate">
            {admin?.email ?? ""}
          </span>
        </div>
        <button
          onClick={logout}
          className="p-2 rounded-lg text-text-secondary hover:text-red-400 hover:bg-bg-card transition-colors duration-150 flex-shrink-0"
          aria-label="Logout"
        >
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  )
}

export { Sidebar }

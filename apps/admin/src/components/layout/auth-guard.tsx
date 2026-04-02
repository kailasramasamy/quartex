import { type ReactNode } from "react"
import { Navigate } from "@tanstack/react-router"
import { Loader2 } from "lucide-react"
import { useAuth } from "~/lib/auth"

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center">
      <Loader2 size={32} className="text-accent animate-spin" />
    </div>
  )
}

function AuthGuard({ children }: { children: ReactNode }) {
  const { admin, isLoading } = useAuth()

  if (isLoading) return <LoadingScreen />
  if (!admin) return <Navigate to="/login" />
  return <>{children}</>
}

export { AuthGuard, LoadingScreen }

import { Outlet, createFileRoute } from "@tanstack/react-router"
import { AuthGuard } from "~/components/layout/auth-guard"
import { Sidebar } from "~/components/layout/sidebar"

export const Route = createFileRoute("/_authenticated")({
  component: () => (
    <AuthGuard>
      <div className="flex min-h-screen bg-bg-primary">
        <Sidebar />
        <main className="flex-1 ml-64">
          <Outlet />
        </main>
      </div>
    </AuthGuard>
  ),
})

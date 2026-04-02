import { Outlet, createRootRoute } from "@tanstack/react-router"
import { AuthProvider } from "~/lib/auth"

export const Route = createRootRoute({
  component: () => (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  ),
})

import { createFileRoute, redirect } from "@tanstack/react-router"

// Redirects the root path to the authenticated dashboard.
export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/dashboard" })
  },
  component: () => null,
})

import { Badge } from "~/components/ui/badge"
import { TESTER_STATUS } from "@quartex/shared"
import type { TesterStatus } from "@quartex/shared"

interface TesterStatusBadgeProps {
  status: TesterStatus
}

function TesterStatusBadge({ status }: TesterStatusBadgeProps) {
  const config = TESTER_STATUS[status]
  return <Badge label={config.label} color={config.color} size="sm" />
}

export { TesterStatusBadge }
export type { TesterStatusBadgeProps }

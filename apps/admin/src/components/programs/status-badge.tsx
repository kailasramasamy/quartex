import { Badge } from "~/components/ui/badge"
import { PROGRAM_STATUS } from "@quartex/shared"
import type { ProgramStatus } from "@quartex/shared"

interface StatusBadgeProps {
  status: ProgramStatus
}

function StatusBadge({ status }: StatusBadgeProps) {
  const config = PROGRAM_STATUS[status]
  return <Badge label={config.label} color={config.color} />
}

export { StatusBadge }
export type { StatusBadgeProps }

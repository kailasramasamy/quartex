import { Select } from "~/components/ui/select"
import {
  FEEDBACK_CATEGORY,
  FEEDBACK_PRIORITY,
  FEEDBACK_STATUS,
} from "@quartex/shared"
import type {
  FeedbackCategory,
  FeedbackPriority,
  FeedbackStatus,
} from "@quartex/shared"

interface FeedbackFilterValues {
  category?: FeedbackCategory | ""
  priority?: FeedbackPriority | ""
  status?: FeedbackStatus | ""
}

interface FeedbackFiltersProps {
  onFilterChange: (filters: FeedbackFilterValues) => void
  current?: FeedbackFilterValues
}

const categoryOptions = [
  { value: "", label: "All Categories" },
  ...Object.entries(FEEDBACK_CATEGORY).map(([k, v]) => ({ value: k, label: v.label })),
]

const priorityOptions = [
  { value: "", label: "All Priorities" },
  ...Object.entries(FEEDBACK_PRIORITY).map(([k, v]) => ({ value: k, label: v.label })),
]

const statusOptions = [
  { value: "", label: "All Statuses" },
  ...Object.entries(FEEDBACK_STATUS).map(([k, v]) => ({ value: k, label: v.label })),
]

function FeedbackFilters({ onFilterChange, current = {} }: FeedbackFiltersProps) {
  const handleChange = (key: keyof FeedbackFilterValues) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...current, [key]: e.target.value })
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Select
        options={categoryOptions}
        value={current.category ?? ""}
        onChange={handleChange("category")}
        className="w-44"
      />
      <Select
        options={priorityOptions}
        value={current.priority ?? ""}
        onChange={handleChange("priority")}
        className="w-44"
      />
      <Select
        options={statusOptions}
        value={current.status ?? ""}
        onChange={handleChange("status")}
        className="w-44"
      />
    </div>
  )
}

export { FeedbackFilters }
export type { FeedbackFilterValues, FeedbackFiltersProps }

import { forwardRef, useId } from "react"

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: SelectOption[]
  error?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, className = "", ...props }, ref) => {
    const id = useId()
    const selectId = props.id ?? id

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-medium text-text-secondary"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={[
            "w-full rounded-lg border px-3 py-2.5 text-sm text-text-primary",
            "bg-bg-primary border-border",
            "focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "transition-colors duration-150 cursor-pointer",
            error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    )
  },
)

Select.displayName = "Select"

export { Select }
export type { SelectProps, SelectOption }

import { forwardRef, useId } from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    const id = useId()
    const inputId = props.id ?? id

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-text-secondary"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={[
            "w-full rounded-lg border px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted",
            "bg-bg-primary border-border",
            "focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "transition-colors duration-150",
            error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-400">{error}</p>
        )}
      </div>
    )
  },
)

Input.displayName = "Input"

export { Input }
export type { InputProps }

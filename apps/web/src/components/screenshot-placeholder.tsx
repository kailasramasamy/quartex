interface ScreenshotPlaceholderProps {
  productName: string
  color: string
}

function ScreenshotPlaceholder({ productName, color }: ScreenshotPlaceholderProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div
        className="flex aspect-video w-full items-center justify-center rounded-2xl border border-border"
        style={{
          background: `linear-gradient(135deg, ${color}20 0%, ${color}08 100%)`,
        }}
      >
        <div className="text-center">
          <p className="font-heading text-2xl font-semibold text-text-primary">
            {productName}
          </p>
          <p className="mt-2 text-sm text-text-muted">
            Screenshots coming soon
          </p>
        </div>
      </div>
    </div>
  )
}

export { ScreenshotPlaceholder }
export type { ScreenshotPlaceholderProps }

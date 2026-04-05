import { useState, useEffect, useRef, useCallback } from "react"
import { SectionWrapper } from "~/components/section-wrapper"
import { GradientText } from "~/components/gradient-text"
import { ChevronLeft, ChevronRight } from "lucide-react"

export interface Screenshot {
  src: string
  label: string
  headline: string
  description: string
  highlights?: string[]
}

interface AppScreenshotsProps {
  screenshots: Screenshot[]
  color: string
}

function ScreenNav({
  total,
  current,
  onSelect,
  color,
}: {
  total: number
  current: number
  onSelect: (i: number) => void
  color: string
}) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className="h-2 rounded-full transition-all duration-500"
          style={{
            width: i === current ? 24 : 8,
            backgroundColor: i === current ? color : "#374151",
          }}
        />
      ))}
    </div>
  )
}

type Phase = "idle" | "exit" | "entering" | "entered"

function AppScreenshots({ screenshots, color }: AppScreenshotsProps) {
  const [active, setActive] = useState(0)
  const [visible, setVisible] = useState(0)
  const [phase, setPhase] = useState<Phase>("idle")
  const [dir, setDir] = useState<1 | -1>(1)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  const go = useCallback((index: number) => {
    if (index === active || phase !== "idle") return
    setDir(index > active ? 1 : -1)
    setActive(index)
    setPhase("exit")
  }, [active, phase])

  useEffect(() => {
    if (phase === "exit") {
      timerRef.current = setTimeout(() => {
        setVisible(active)
        setPhase("entering")
      }, 350)
    } else if (phase === "entering") {
      // Force a frame so the entering position renders before transition
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setPhase("entered")
        })
      })
    } else if (phase === "entered") {
      timerRef.current = setTimeout(() => {
        setPhase("idle")
      }, 350)
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [phase, active])

  function prev() {
    go(active > 0 ? active - 1 : screenshots.length - 1)
  }
  function next() {
    go(active < screenshots.length - 1 ? active + 1 : 0)
  }

  const screen = screenshots[visible]

  // exit: slide out in direction, fade out
  // entering: jump to opposite side (no transition)
  // entered: slide to center, fade in
  let transform = "translateX(0)"
  let opacity = 1
  let transition = "transform 0.35s ease, opacity 0.35s ease"

  if (phase === "exit") {
    transform = `translateX(${dir * -100}px)`
    opacity = 0
  } else if (phase === "entering") {
    transform = `translateX(${dir * 100}px)`
    opacity = 0
    transition = "none"
  } else if (phase === "entered") {
    transform = "translateX(0)"
    opacity = 1
  }

  return (
    <SectionWrapper className="bg-bg-secondary overflow-hidden">
      <div className="text-center mb-14">
        <p
          className="mb-3 text-sm font-medium uppercase tracking-widest"
          style={{ color }}
        >
          App Preview
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">
          See It in <GradientText>Action</GradientText>
        </h2>
      </div>

      {/* Screen labels as tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-10 scrollbar-hide justify-center flex-wrap">
        {screenshots.map((s, i) => (
          <button
            key={s.src}
            onClick={() => go(i)}
            className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300"
            style={{
              backgroundColor: i === active ? `${color}20` : "transparent",
              color: i === active ? color : "#9CA3AF",
              border: `1px solid ${i === active ? `${color}40` : "#374151"}`,
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Main showcase */}
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto"
        style={{ transform, opacity, transition }}
      >
        {/* Screenshot */}
        <div className="flex justify-center">
          <div className="relative">
            <div
              className="absolute -inset-4 rounded-[2rem] opacity-15 blur-2xl"
              style={{ backgroundColor: color }}
            />
            <img
              src={screen.src}
              alt={screen.label}
              className="relative w-[280px] h-auto drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Feature description */}
        <div className="space-y-5">
          <div>
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color }}
            >
              {screen.label}
            </span>
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-text-primary">
              {screen.headline}
            </h3>
          </div>

          <p className="text-text-secondary text-lg leading-relaxed">
            {screen.description}
          </p>

          {screen.highlights && screen.highlights.length > 0 && (
            <ul className="space-y-3 pt-2">
              {screen.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <span
                    className="mt-1.5 h-2 w-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-text-secondary text-base">{h}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Navigation below */}
      <div className="flex items-center justify-center gap-6 mt-10">
        <button
          onClick={prev}
          className="w-11 h-11 rounded-full bg-bg-card border border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-accent/50 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>

        <ScreenNav
          total={screenshots.length}
          current={active}
          onSelect={go}
          color={color}
        />

        <button
          onClick={next}
          className="w-11 h-11 rounded-full bg-bg-card border border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-accent/50 transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </SectionWrapper>
  )
}

export { AppScreenshots }

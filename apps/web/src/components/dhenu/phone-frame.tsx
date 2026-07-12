import { DH } from "./dhenu-data"

/** A real app screenshot in a clean dark device frame that pops off the page. */
function PhoneFrame({ src, alt, className = "", glow = true }: { src: string; alt: string; className?: string; glow?: boolean }) {
  return (
    <div className={`relative ${className}`}>
      {glow && (
        <div
          className="pointer-events-none absolute -inset-8 rounded-[3rem] opacity-60 blur-3xl"
          style={{ background: `radial-gradient(circle at 50% 35%, ${DH.green}44, transparent 70%)` }}
          aria-hidden
        />
      )}
      <div className="relative mx-auto w-full max-w-[280px] rounded-[2.4rem] border border-white/12 bg-[#0b0f16] p-2 shadow-2xl">
        <img src={src} alt={alt} loading="lazy" className="w-full rounded-[1.9rem]" />
      </div>
    </div>
  )
}

export { PhoneFrame }

import { MT } from "./martly-data"

/** Teal-and-amber gradient mesh with a faint grid, behind the Martly hero and CTA bands. */
function MartlyMesh({ grid = true }: { grid?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute -top-40 left-1/4 h-[36rem] w-[36rem] rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${MT.teal}55 0%, transparent 65%)`, animation: "runq-drift 11s ease-in-out infinite alternate" }}
      />
      <div
        className="absolute -right-24 top-32 h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${MT.amber}1c 0%, transparent 65%)`, animation: "runq-drift 14s ease-in-out infinite alternate" }}
      />
      <div
        className="absolute -left-24 top-64 h-[22rem] w-[22rem] rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${MT.tealLight}1a 0%, transparent 65%)`, animation: "runq-drift 12s ease-in-out infinite alternate" }}
      />
      {grid && (
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff0a 1px, transparent 1px), linear-gradient(to bottom, #ffffff0a 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse at 50% 0%, #000 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at 50% 0%, #000 30%, transparent 75%)",
          }}
        />
      )}
    </div>
  )
}

export { MartlyMesh }

import { RUNQ } from "./runq-data"

/** Layered gradient-mesh + grid backdrop shared by the hero and CTA bands. */
function RunqMesh({ grid = true }: { grid?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute -top-32 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${RUNQ.indigo}33 0%, transparent 65%)`, animation: "runq-drift 9s ease-in-out infinite alternate" }}
      />
      <div
        className="absolute -left-24 top-40 h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${RUNQ.violet}26 0%, transparent 65%)`, animation: "runq-drift 11s ease-in-out infinite alternate" }}
      />
      <div
        className="absolute -right-24 top-24 h-[26rem] w-[26rem] rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${RUNQ.cyan}1f 0%, transparent 65%)`, animation: "runq-drift 13s ease-in-out infinite alternate" }}
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

export { RunqMesh }

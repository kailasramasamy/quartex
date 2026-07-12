import { DH } from "./dhenu-data"

/** Green gradient-mesh + grid backdrop for the Dhenu hero and CTA bands. */
function DhenuMesh({ grid = true }: { grid?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute -top-32 left-1/3 h-[34rem] w-[34rem] rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${DH.green}33 0%, transparent 65%)`, animation: "runq-drift 10s ease-in-out infinite alternate" }}
      />
      <div
        className="absolute -right-24 top-24 h-[26rem] w-[26rem] rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${DH.greenLight}1f 0%, transparent 65%)`, animation: "runq-drift 13s ease-in-out infinite alternate" }}
      />
      <div
        className="absolute -left-20 top-52 h-[24rem] w-[24rem] rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${DH.gold}14 0%, transparent 65%)`, animation: "runq-drift 12s ease-in-out infinite alternate" }}
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

export { DhenuMesh }

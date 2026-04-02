import { Link } from "@tanstack/react-router"
import { GradientText } from "~/components/gradient-text"
import { Button } from "~/components/button"
import { ArrowRight } from "lucide-react"

const animationStyles = `
  @keyframes gradientDrift {
    0%   { transform: translate(0%, 0%) scale(1); }
    33%  { transform: translate(4%, -6%) scale(1.05); }
    66%  { transform: translate(-4%, 4%) scale(0.97); }
    100% { transform: translate(0%, 0%) scale(1); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(3deg); }
  }
  @keyframes floatReverse {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(15px) rotate(-2deg); }
  }
  @keyframes pulse-ring {
    0% { transform: scale(0.8); opacity: 0.5; }
    50% { transform: scale(1.2); opacity: 0; }
    100% { transform: scale(0.8); opacity: 0.5; }
  }
  @keyframes dash {
    to { stroke-dashoffset: -100; }
  }
  .hero-gradient { animation: gradientDrift 18s ease-in-out infinite; }
  .float-1 { animation: float 6s ease-in-out infinite; }
  .float-2 { animation: floatReverse 8s ease-in-out infinite; }
  .float-3 { animation: float 10s ease-in-out infinite 2s; }
  .pulse-ring { animation: pulse-ring 3s ease-in-out infinite; }
  .dash-flow { animation: dash 8s linear infinite; }
`

function GridPattern() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-[0.03]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  )
}

function FloatingShapes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Gradient blobs */}
      <div
        className="hero-gradient absolute -top-32 -left-32 h-[600px] w-[600px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle at center, #3B82F6 0%, #7C3AED 50%, transparent 80%)",
        }}
      />
      <div
        className="hero-gradient absolute -bottom-16 -right-16 h-[400px] w-[400px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle at center, #7C3AED 0%, #3B82F6 60%, transparent 80%)",
          animationDelay: "-9s",
        }}
      />

      {/* Geometric shapes */}
      <div className="float-1 absolute top-[15%] right-[10%] opacity-20">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <rect x="10" y="10" width="60" height="60" rx="12" stroke="#3B82F6" strokeWidth="1.5" />
          <rect x="20" y="20" width="40" height="40" rx="8" stroke="#7C3AED" strokeWidth="1" opacity="0.5" />
        </svg>
      </div>
      <div className="float-2 absolute top-[25%] left-[8%] opacity-15">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="40" stroke="#3B82F6" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="25" stroke="#7C3AED" strokeWidth="1" opacity="0.5" />
          <circle cx="50" cy="50" r="4" fill="#3B82F6" opacity="0.8" />
        </svg>
      </div>
      <div className="float-3 absolute bottom-[20%] left-[15%] opacity-15">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <polygon points="30,5 55,50 5,50" stroke="#3B82F6" strokeWidth="1.5" fill="none" />
        </svg>
      </div>
      <div className="float-2 absolute bottom-[25%] right-[12%] opacity-10">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <path
            d="M60 10 L110 60 L60 110 L10 60 Z"
            stroke="#7C3AED"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>

      {/* Pulsing dots */}
      <div className="absolute top-[40%] right-[25%]">
        <div className="h-2 w-2 rounded-full bg-accent opacity-60" />
        <div className="pulse-ring absolute inset-0 h-2 w-2 rounded-full bg-accent" />
      </div>
      <div className="absolute top-[60%] left-[20%]">
        <div className="h-1.5 w-1.5 rounded-full bg-purple-500 opacity-50" />
        <div className="pulse-ring absolute inset-0 h-1.5 w-1.5 rounded-full bg-purple-500" style={{ animationDelay: "-1.5s" }} />
      </div>

      {/* Dashed orbit line */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.04]" viewBox="0 0 1000 600" fill="none">
        <ellipse
          cx="500" cy="300" rx="400" ry="200"
          stroke="white"
          strokeWidth="1"
          strokeDasharray="8 6"
          className="dash-flow"
        />
      </svg>
    </div>
  )
}

function HeroCTAs() {
  return (
    <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
      <a href="#products">
        <Button variant="primary" size="lg">
          Explore Products
          <ArrowRight size={18} className="ml-2 inline" />
        </Button>
      </a>
      <Link to="/contact">
        <Button variant="secondary" size="lg">
          Get in Touch
        </Button>
      </Link>
    </div>
  )
}

function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-bg-primary">
      <style>{animationStyles}</style>
      <GridPattern />
      <FloatingShapes />
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-bg-card/50 px-4 py-1.5 text-sm text-text-secondary backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          AI-powered software for modern commerce
        </div>
        <h1 className="font-heading text-5xl font-bold leading-tight tracking-tight text-text-primary sm:text-6xl lg:text-7xl">
          We Build Software
          <br />
          That <GradientText>Moves Fast</GradientText>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
          Quartex Technologies builds AI-driven products for quick
          commerce, logistics, and business automation.
        </p>
        <HeroCTAs />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-primary to-transparent" />
    </section>
  )
}

export { HeroSection }

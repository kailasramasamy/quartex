import { Link } from "@tanstack/react-router"
import { GradientText } from "~/components/gradient-text"
import { Button } from "~/components/button"

const animationStyles = `
  @keyframes gradientDrift {
    0%   { transform: translate(0%, 0%) scale(1); }
    33%  { transform: translate(4%, -6%) scale(1.05); }
    66%  { transform: translate(-4%, 4%) scale(0.97); }
    100% { transform: translate(0%, 0%) scale(1); }
  }
  .hero-gradient {
    animation: gradientDrift 18s ease-in-out infinite;
  }
`

function HeroBackground() {
  return (
    <>
      <style>{animationStyles}</style>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="hero-gradient absolute -top-32 -left-32 h-[600px] w-[600px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle at center, #3B82F6 0%, #7C3AED 50%, transparent 80%)",
          }}
        />
        <div
          className="hero-gradient absolute -bottom-16 -right-16 h-[400px] w-[400px] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle at center, #7C3AED 0%, #3B82F6 60%, transparent 80%)",
            animationDelay: "-9s",
          }}
        />
      </div>
    </>
  )
}

function HeroCTAs() {
  return (
    <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
      <a href="#products">
        <Button variant="primary" size="lg">
          Explore Products
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
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center bg-bg-primary">
      <HeroBackground />
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="font-heading text-5xl font-bold leading-tight tracking-tight text-text-primary sm:text-6xl lg:text-7xl">
          We Build Software
          <br />
          <GradientText>Moves Fast</GradientText>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
          Quartex Technologies builds high-performance products for quick
          commerce, logistics, and business automation.
        </p>
        <HeroCTAs />
      </div>
    </section>
  )
}

export { HeroSection }

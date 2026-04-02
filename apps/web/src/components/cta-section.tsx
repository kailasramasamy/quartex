import { Link } from "@tanstack/react-router"
import { Button } from "~/components/button"
import { GradientText } from "~/components/gradient-text"
import { ArrowRight } from "lucide-react"

function CTASection() {
  return (
    <section className="relative overflow-hidden bg-bg-primary py-24">
      {/* Background graphic */}
      <div className="pointer-events-none absolute inset-0">
        <svg className="absolute inset-0 h-full w-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cta-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-grid)" />
        </svg>
        <div
          className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading text-4xl font-bold text-text-primary lg:text-5xl">
          Ready to <GradientText>Move Fast</GradientText>?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-text-secondary">
          Whether you need an AI-powered solution or want to join our beta programs,
          we'd love to hear from you.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link to="/contact">
            <Button variant="primary" size="lg">
              Start a Conversation
              <ArrowRight size={18} className="ml-2 inline" />
            </Button>
          </Link>
          <a href="#products">
            <Button variant="secondary" size="lg">
              View Products
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}

export { CTASection }

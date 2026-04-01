import { X } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { mainNavLinks, productNavLinks } from "@quartex/shared"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <div
      className={`fixed inset-0 z-50 bg-bg-primary/95 backdrop-blur-xl transition-opacity duration-200 lg:hidden ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex flex-col h-full px-6 py-5">
        <div className="flex justify-end mb-8">
          <button
            onClick={onClose}
            className="p-2 text-text-secondary hover:text-text-primary transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          {mainNavLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={onClose}
              className="font-body text-lg text-text-primary py-3 border-b border-border hover:text-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <div className="mt-4">
            <p className="font-body text-xs uppercase tracking-widest text-text-muted mb-2">
              Products
            </p>
            {productNavLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={onClose}
                className="block font-body text-base text-text-secondary py-2.5 hover:text-text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  )
}

export { MobileMenu }
export type { MobileMenuProps }

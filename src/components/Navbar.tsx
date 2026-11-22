import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BUSINESS_INFO } from '../data/studioData';

interface NavbarProps {
  onOpenConsultation: () => void;
}

const NAV_LINKS = [
  { label: 'Material Studio', href: '#material-studio' },
  { label: 'INR Estimator', href: '#cost-estimator' },
  { label: 'Before & After', href: '#before-after' },
  { label: 'Reviews', href: '#reviews' },
];

export function Navbar({ onOpenConsultation }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#0A0A0B]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-8 px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#top"
          className="font-display text-sm font-semibold tracking-[0.06em] text-[#F4F1EA] transition-colors hover:text-[#E5B84B] whitespace-nowrap truncate max-w-[230px] sm:max-w-none shrink-0 sm:text-lg"
        >
          {BUSINESS_INFO.name}
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden items-center gap-7 lg:flex"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-1 text-sm font-medium text-[#B8B2A6] transition-colors duration-150 hover:text-[#F4F1EA] whitespace-nowrap shrink-0 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-[#D4AF37] after:transition-transform after:duration-200 hover:after:scale-x-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/70"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenConsultation}
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-[#D4AF37] px-4 py-2 text-xs font-semibold tracking-wide text-[#0A0A0B] shadow-[0_0_24px_rgba(212,175,55,0.28)] transition-all duration-150 hover:bg-[#E5C158] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5C158] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0B] whitespace-nowrap shrink-0 cursor-pointer"
          >
            Book Free Consultation
          </button>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-[#F4F1EA] transition-colors hover:border-[#D4AF37]/50 lg:hidden cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-white/[0.08] bg-[#0E0E11] px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-sm font-medium text-[#D5CFC4] hover:text-[#E5B84B]"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="mt-2 w-full rounded-lg bg-[#D4AF37] px-4 py-2.5 text-sm font-semibold text-[#0A0A0B] cursor-pointer"
            >
              Book Free Consultation
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

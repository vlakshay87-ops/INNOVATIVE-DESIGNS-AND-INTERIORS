import { Phone, MessageCircle, ArrowRight, Star } from 'lucide-react';
import { BUSINESS_INFO, buildWhatsAppUrl } from '../data/studioData';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  onOpenConsultation: () => void;
}

export function HeroSection({ onOpenConsultation }: HeroSectionProps) {
  const heroWhatsAppUrl = buildWhatsAppUrl(
    `Hello ${BUSINESS_INFO.name}, I would like to book a free interior design consultation in New Delhi.`
  );

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-white/[0.08] bg-[#0A0A0B]"
    >
      {/* Subtle architectural warm gold aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.14)_0%,rgba(212,175,55,0.03)_45%,transparent_75%)] blur-2xl"
      />

      <div className="relative mx-auto max-w-[1320px] px-4 pt-10 pb-12 sm:px-6 sm:pt-14 sm:pb-16 lg:px-8 lg:pt-16 lg:pb-20">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Narrative Column */}
          <div className="flex flex-col justify-center lg:col-span-6">
            {/* Unboxed Metadata Line (Zero-Pill Discipline) */}
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-medium tracking-wide text-[#C9A648]">
              <span>{BUSINESS_INFO.address}</span>
              <span aria-hidden="true" className="text-white/25">
                ·
              </span>
              <span className="inline-flex items-center gap-1 text-[#F4F1EA]">
                <Star className="h-3.5 w-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                <span className="tabular-nums">{BUSINESS_INFO.rating}</span>
                <span className="text-[#9C968B]">
                  ({BUSINESS_INFO.reviewCount} Google Reviews)
                </span>
              </span>
            </div>

            <h1
              className="mt-5 font-display font-semibold tracking-[-0.015em] text-[#F7F4EC] leading-[1.06]"
              style={{
                fontSize: 'clamp(2.35rem, 4vw, 3.85rem)',
                textWrap: 'balance',
              }}
            >
              Bespoke Luxury Interiors Built on Genuine Materials
            </h1>

            <p className="mt-5 max-w-xl text-[15px] leading-[1.68] text-[#B8B2A6] sm:text-base">
              Turnkey residential and commercial interior architecture across New Delhi.
              From bookmatched Italian marble and Burma teak joinery to precision modular
              kitchens, every surface is verified for authenticity and finished on schedule.
            </p>

            {/* Primary CTA + Quick Call & WhatsApp Booking Controls */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={onOpenConsultation}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#D4AF37] px-6 py-3.5 text-sm font-semibold text-[#0A0A0B] shadow-[0_0_32px_rgba(212,175,55,0.32)] transition-all duration-150 hover:bg-[#E5C158] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5C158] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0B] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Book Free Design Consultation</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <a
                href={heroWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#D4AF37]/45 bg-[#131316] px-5 py-3.5 text-sm font-medium text-[#F4F1EA] transition-all duration-150 hover:border-[#D4AF37] hover:bg-[#1B1812] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] whitespace-nowrap shrink-0"
              >
                <MessageCircle className="h-4 w-4 text-[#D4AF37]" />
                <span>WhatsApp Studio</span>
              </a>

              <a
                href={BUSINESS_INFO.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/12 bg-transparent px-5 py-3.5 text-sm font-medium text-[#E4DFD5] transition-colors duration-150 hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 whitespace-nowrap shrink-0"
              >
                <Phone className="h-4 w-4 text-[#D4AF37]" />
                <span className="font-mono tabular-nums">{BUSINESS_INFO.phoneDisplay}</span>
              </a>
            </div>

            {/* Client Highlight Proof Line Adjacent to Hero Claim */}
            <div className="mt-8 border-t border-white/[0.08] pt-5">
              <p className="text-sm italic text-[#E7E1D6]">
                &ldquo;{BUSINESS_INFO.highlightQuote}&rdquo;
              </p>
              <p className="mt-1 text-xs text-[#9C968B]">
                Verified Google Client Review · Uttam Nagar, New Delhi
              </p>
            </div>
          </div>

          {/* Right Focal 16:9 Architectural Render */}
          <div className="lg:col-span-6">
            <div className="group relative h-full min-h-[280px] overflow-hidden rounded-xl border border-white/12 bg-[#131316] shadow-[0_24px_80px_rgba(0,0,0,0.65)]">
              <ResilientImage
                src="/src/assets/images/hero_luxury_living_1795364072217.jpg"
                alt="Luxury dark obsidian living room with bookmatched Italian marble and warm gold cove lighting by INNOVATIVE DESIGNS AND INTERIORS"
                fallbackTitle="Signature Living Suite · Italian Marble & Walnut Veneer"
                className="aspect-[16/10] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] lg:h-full lg:aspect-auto"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0A0B]/90 via-[#0A0A0B]/20 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-5 sm:p-6">
                <div>
                  <p className="text-xs font-medium tracking-wider text-[#E5B84B]">
                    Signature Turnkey Execution
                  </p>
                  <p className="mt-1 font-display text-xl font-semibold text-[#F7F4EC]">
                    Bookmatched Marble & Fluted Walnut Suite
                  </p>
                </div>
                <a
                  href="#material-studio"
                  className="text-xs font-medium text-[#E5B84B] underline underline-offset-4 transition-colors hover:text-[#F7E7B4] whitespace-nowrap shrink-0"
                >
                  Explore Material Studio →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Architectural Benchmark Strip Below Hero Split */}
        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.08] lg:grid-cols-4">
          <div className="bg-[#111114] px-5 py-4 sm:px-6">
            <p className="font-mono text-xl font-medium text-[#F4F1EA] tabular-nums sm:text-2xl">
              4.7★ / 5.0
            </p>
            <p className="mt-1 text-xs text-[#9C968B]">
              22 Verified Google Reviews
            </p>
          </div>
          <div className="bg-[#111114] px-5 py-4 sm:px-6">
            <p className="font-mono text-xl font-medium text-[#F4F1EA] tabular-nums sm:text-2xl">
              6–14 Weeks
            </p>
            <p className="mt-1 text-xs text-[#9C968B]">
              Guaranteed Turnkey Handover
            </p>
          </div>
          <div className="bg-[#111114] px-5 py-4 sm:px-6">
            <p className="font-mono text-xl font-medium text-[#F4F1EA] tabular-nums sm:text-2xl">
              100% Genuine
            </p>
            <p className="mt-1 text-xs text-[#9C968B]">
              IS:710 BWP & Imported Stone
            </p>
          </div>
          <div className="bg-[#111114] px-5 py-4 sm:px-6">
            <p className="font-mono text-xl font-medium text-[#E5B84B] tabular-nums sm:text-2xl">
              ₹ 1,450+ / sq ft
            </p>
            <p className="mt-1 text-xs text-[#9C968B]">
              Transparent Turnkey Estimates
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

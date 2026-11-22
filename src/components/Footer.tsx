import { Phone, MessageCircle, MapPin } from 'lucide-react';
import { BUSINESS_INFO, buildWhatsAppUrl } from '../data/studioData';

interface FooterProps {
  onOpenConsultation: () => void;
}

export function Footer({ onOpenConsultation }: FooterProps) {
  const whatsappUrl = buildWhatsAppUrl(
    `Hello ${BUSINESS_INFO.name}, I would like to connect regarding an interior project.`
  );

  return (
    <footer className="bg-[#080809] py-12 text-[#9C968B]">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 border-b border-white/[0.08] pb-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-xl font-semibold tracking-wide text-[#F4F1EA]">
              {BUSINESS_INFO.name}
            </p>
            <p className="mt-3 max-w-md text-xs leading-relaxed text-[#9C968B]">
              Turnkey residential &amp; commercial interior architecture, modular kitchens,
              bespoke wardrobes, and genuine Italian marble craftsmanship in New Delhi.
            </p>
            <p className="mt-4 text-xs text-[#E5B84B]">
              {BUSINESS_INFO.rating}★ Rated · {BUSINESS_INFO.reviewCount} Verified Google Reviews
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs font-semibold text-[#F4F1EA]">Studio Navigation</p>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <a href="#material-studio" className="hover:text-[#E5B84B] transition-colors">
                  Room &amp; Material Studio
                </a>
              </li>
              <li>
                <a href="#cost-estimator" className="hover:text-[#E5B84B] transition-colors">
                  INR Cost &amp; Timeline Estimator
                </a>
              </li>
              <li>
                <a href="#before-after" className="hover:text-[#E5B84B] transition-colors">
                  Before &amp; After Transformations
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#E5B84B] transition-colors">
                  Client Testimonials
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-xs font-semibold text-[#F4F1EA]">Studio &amp; Direct Contact</p>
            <ul className="mt-3 space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D4AF37]" />
                <span>{BUSINESS_INFO.address}</span>
              </li>
              <li>
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="inline-flex items-center gap-2 font-mono text-[#E4DFD5] hover:text-[#E5B84B] tabular-nums"
                >
                  <Phone className="h-3.5 w-3.5 text-[#D4AF37]" />
                  <span>{BUSINESS_INFO.phoneDisplay}</span>
                </a>
              </li>
              <li className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-xs font-medium text-[#F4F1EA] hover:border-[#D4AF37]/60 hover:text-[#E5B84B]"
                >
                  <MessageCircle className="h-3.5 w-3.5 text-[#D4AF37]" />
                  <span>WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={onOpenConsultation}
                  className="rounded-lg bg-[#D4AF37] px-3 py-1.5 text-xs font-semibold text-[#0A0A0B] hover:bg-[#E5C158] cursor-pointer"
                >
                  Book Site Visit
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-3 text-[11px] text-[#7A756C] sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved.
          </p>
          <p>Serving Uttam Nagar, Janakpuri, Dwarka &amp; Greater Delhi NCR</p>
        </div>
      </div>
    </footer>
  );
}

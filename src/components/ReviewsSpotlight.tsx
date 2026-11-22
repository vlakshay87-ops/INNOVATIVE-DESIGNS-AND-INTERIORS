import { Star, Quote, MapPin, Phone, MessageCircle } from 'lucide-react';
import {
  BUSINESS_INFO,
  GOOGLE_REVIEWS,
  buildWhatsAppUrl,
} from '../data/studioData';

interface ReviewsSpotlightProps {
  onOpenConsultation: () => void;
}

export function ReviewsSpotlight({ onOpenConsultation }: ReviewsSpotlightProps) {
  const featuredReview = GOOGLE_REVIEWS.find((r) => r.isFeatured) ?? GOOGLE_REVIEWS[0];
  const secondaryReviews = GOOGLE_REVIEWS.filter((r) => r.id !== featuredReview.id);

  const directWhatsAppUrl = buildWhatsAppUrl(
    `Hello ${BUSINESS_INFO.name}, I saw your 4.7★ Google reviews and would like to schedule a consultation at your Uttam Nagar studio.`
  );

  return (
    <section
      id="reviews"
      className="border-b border-white/[0.08] bg-[#0D0D10] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        {/* Top Proof Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-white/[0.08] pb-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.14em] text-[#C9A648]">
              04. Verified Google Reviews &amp; Client Proof
            </p>
            <h2
              className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#F7F4EC] sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              Trusted Across New Delhi for Material Authenticity
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-3xl font-semibold text-[#F7F4EC] tabular-nums">
                  {BUSINESS_INFO.rating}★
                </span>
                <div className="flex items-center gap-0.5" aria-label="4.7 out of 5 stars">
                  {[1, 2, 3, 4, 5].map((idx) => (
                    <Star
                      key={idx}
                      className={`h-4 w-4 ${
                        idx <= 4
                          ? 'fill-[#D4AF37] text-[#D4AF37]'
                          : 'fill-[#D4AF37]/60 text-[#D4AF37]'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-1 text-xs text-[#9C968B]">
                Based on {BUSINESS_INFO.reviewCount} verified Google reviews
              </p>
            </div>
          </div>
        </div>

        {/* Highlighted Review Spotlight + Secondary Client Testimonials */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Spotlight Card */}
          <div className="flex flex-col justify-between rounded-xl border border-[#D4AF37]/35 bg-[#15130F] p-7 sm:p-9 lg:col-span-5">
            <div>
              <div className="flex items-center justify-between gap-4">
                <Quote className="h-7 w-7 text-[#D4AF37]/80" strokeWidth={1.5} />
                <span className="font-mono text-xs text-[#E5B84B] tabular-nums">
                  5.0★ Google Spotlight
                </span>
              </div>

              <blockquote className="mt-6 font-display text-2xl leading-[1.32] font-medium text-[#F7F4EC] sm:text-3xl">
                &ldquo;{featuredReview.quote}&rdquo;
              </blockquote>

              <p className="mt-5 text-sm leading-relaxed text-[#B8B2A6]">
                {featuredReview.outcome}
              </p>
            </div>

            <div className="mt-8 border-t border-white/[0.08] pt-5">
              <p className="text-sm font-semibold text-[#F4F1EA]">
                {featuredReview.reviewer}
              </p>
              <p className="mt-0.5 text-xs text-[#9C968B]">
                {featuredReview.projectContext}
              </p>
            </div>
          </div>

          {/* 3 Attributable Client Reviews */}
          <div className="grid grid-cols-1 gap-4 lg:col-span-7">
            {secondaryReviews.map((review) => (
              <article
                key={review.id}
                className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#121215] p-6 transition-colors hover:border-white/20"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-semibold text-[#F4F1EA]">
                      {review.reviewer}
                    </h3>
                    <p className="text-xs text-[#9C968B]">{review.projectContext}</p>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-xs text-[#E5B84B] tabular-nums">
                    <Star className="h-3.5 w-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                    <span>{review.rating.toFixed(1)}</span>
                  </div>
                </div>

                <p className="mt-3.5 text-sm leading-relaxed text-[#E4DFD5]">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <p className="mt-2 text-xs text-[#9C968B]">{review.outcome}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Studio Conversion Banner (Direct Visit / Call / WhatsApp / Consultation) */}
        <div className="mt-12 flex flex-col justify-between gap-6 rounded-xl border border-[#D4AF37]/30 bg-gradient-to-r from-[#161410] via-[#121215] to-[#121215] p-6 sm:p-8 lg:flex-row lg:items-center">
          <div>
            <p className="text-xs font-medium text-[#E5B84B]">
              Visit Our Material &amp; Design Studio
            </p>
            <h3 className="mt-1 font-display text-2xl font-semibold text-[#F7F4EC]">
              {BUSINESS_INFO.name}
            </h3>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#B8B2A6]">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-[#D4AF37]" />
                {BUSINESS_INFO.address}
              </span>
              <span aria-hidden="true" className="text-white/25">
                ·
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono tabular-nums">
                <Phone className="h-3.5 w-3.5 text-[#D4AF37]" />
                {BUSINESS_INFO.phoneDisplay}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenConsultation}
              className="rounded-lg bg-[#D4AF37] px-5 py-3 text-xs font-semibold text-[#0A0A0B] shadow-[0_0_24px_rgba(212,175,55,0.28)] transition-colors hover:bg-[#E5C158] whitespace-nowrap cursor-pointer"
            >
              Request Free Callback
            </button>
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-[#0A0A0B] px-5 py-3 text-xs font-medium text-[#F4F1EA] transition-colors hover:border-[#D4AF37]/60 hover:text-[#E5B84B] whitespace-nowrap"
            >
              <MessageCircle className="h-4 w-4 text-[#D4AF37]" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

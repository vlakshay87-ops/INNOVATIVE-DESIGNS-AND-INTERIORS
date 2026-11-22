import { useRef, useState } from 'react';
import { MoveHorizontal, Check } from 'lucide-react';
import { TRANSFORMATION_SPECS } from '../data/studioData';
import { ResilientImage } from './ResilientImage';

interface BeforeAfterShowcaseProps {
  onOpenConsultation: () => void;
}

export function BeforeAfterShowcase({ onOpenConsultation }: BeforeAfterShowcaseProps) {
  const [sliderPosition, setSliderPosition] = useState<number>(52);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePositionFromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const percent = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.min(100, Math.max(0, Math.round(percent))));
  };

  return (
    <section
      id="before-after"
      className="border-b border-white/[0.08] bg-[#0A0A0B] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.14em] text-[#C9A648]">
              03. Architectural Transformation
            </p>
            <h2
              className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#F7F4EC] sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              From Bare Concrete Shell to Turnkey Luxury
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#A8A296]">
              Drag the interactive comparison handle across the viewport to inspect how
              raw plaster and exposed conduits are engineered into finished residences.
            </p>
          </div>

          {/* Preset View Buttons */}
          <div className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-[#121215] p-1.5 self-start">
            <button
              type="button"
              onClick={() => setSliderPosition(100)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                sliderPosition >= 90
                  ? 'bg-[#D4AF37] text-[#0A0A0B] font-semibold'
                  : 'text-[#B8B2A6] hover:text-[#F4F1EA]'
              }`}
            >
              Before (Raw)
            </button>
            <button
              type="button"
              onClick={() => setSliderPosition(50)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                sliderPosition > 10 && sliderPosition < 90
                  ? 'bg-[#D4AF37] text-[#0A0A0B] font-semibold'
                  : 'text-[#B8B2A6] hover:text-[#F4F1EA]'
              }`}
            >
              50 / 50 Split
            </button>
            <button
              type="button"
              onClick={() => setSliderPosition(0)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                sliderPosition <= 10
                  ? 'bg-[#D4AF37] text-[#0A0A0B] font-semibold'
                  : 'text-[#B8B2A6] hover:text-[#F4F1EA]'
              }`}
            >
              After (Turnkey)
            </button>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          {/* Interactive Comparison Slider */}
          <div className="lg:col-span-8">
            <div
              ref={containerRef}
              onPointerDown={(e) => {
                setIsDragging(true);
                e.currentTarget.setPointerCapture(e.pointerId);
                updatePositionFromClientX(e.clientX);
              }}
              onPointerMove={(e) => {
                if (!isDragging) return;
                updatePositionFromClientX(e.clientX);
              }}
              onPointerUp={() => setIsDragging(false)}
              onPointerCancel={() => setIsDragging(false)}
              className="relative aspect-[16/10] w-full select-none overflow-hidden rounded-xl border border-white/15 bg-[#121215] touch-none cursor-ew-resize"
            >
              {/* After Image (Full Underlying Layer) */}
              <ResilientImage
                src={TRANSFORMATION_SPECS.afterImage}
                alt="Finished ultra-luxury living room with Italian marble flooring and warm gold cove ceiling"
                fallbackTitle="After · Finished Luxury Residence"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover"
              />

              {/* Before Image (Clipped Left Layer via clip-path for zero layout reflow) */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                }}
              >
                <ResilientImage
                  src={TRANSFORMATION_SPECS.beforeImage}
                  alt="Raw unfinished concrete apartment shell prior to interior execution"
                  fallbackTitle="Before · Bare Concrete Shell"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Clean Labels */}
              <span className="pointer-events-none absolute top-4 left-4 rounded-md bg-[#0A0A0B]/80 px-2.5 py-1 text-[11px] font-medium text-[#E4DFD5] backdrop-blur-sm">
                Before · Raw Concrete
              </span>
              <span className="pointer-events-none absolute top-4 right-4 rounded-md bg-[#0A0A0B]/80 px-2.5 py-1 text-[11px] font-medium text-[#E5B84B] backdrop-blur-sm">
                After · Luxury Turnkey
              </span>

              {/* Vertical Divider Line & Accessible Handle */}
              <div
                className="pointer-events-none absolute inset-y-0 w-0.5 bg-[#E5B84B] shadow-[0_0_16px_rgba(229,184,75,0.8)]"
                style={{ left: `${sliderPosition}%` }}
              >
                <div
                  role="slider"
                  tabIndex={0}
                  aria-label="Before and after transformation comparison slider"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={sliderPosition}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowLeft') {
                      e.preventDefault();
                      setSliderPosition((p) => Math.max(0, p - 5));
                    } else if (e.key === 'ArrowRight') {
                      e.preventDefault();
                      setSliderPosition((p) => Math.min(100, p + 5));
                    } else if (e.key === 'Home') {
                      e.preventDefault();
                      setSliderPosition(0);
                    } else if (e.key === 'End') {
                      e.preventDefault();
                      setSliderPosition(100);
                    }
                  }}
                  className="pointer-events-auto absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#0A0A0B] bg-[#E5B84B] text-[#0A0A0B] shadow-[0_0_24px_rgba(229,184,75,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <MoveHorizontal className="h-5 w-5" />
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-[#9C968B]">
              <span>Drag horizontally or use presets above</span>
              <span className="font-mono tabular-nums">
                Raw View {sliderPosition}% · Luxury View {100 - sliderPosition}%
              </span>
            </div>
          </div>

          {/* Right Execution Scope Card */}
          <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#121215] p-6 sm:p-7 lg:col-span-4">
            <div>
              <p className="text-xs font-medium text-[#E5B84B]">Case Study Scope</p>
              <h3 className="mt-1.5 font-display text-2xl font-semibold text-[#F7F4EC]">
                {TRANSFORMATION_SPECS.projectTitle}
              </h3>

              <div className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[#9C968B]">
                <span>{TRANSFORMATION_SPECS.location}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-[#D5CFC4] tabular-nums">
                  {TRANSFORMATION_SPECS.duration}
                </span>
              </div>

              <div className="mt-5 border-t border-white/[0.08] pt-5">
                <p className="text-xs font-semibold text-[#F4F1EA]">
                  Executed Deliverables ({TRANSFORMATION_SPECS.area})
                </p>
                <ul className="mt-3.5 space-y-3">
                  {TRANSFORMATION_SPECS.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-xs text-[#B8B2A6]">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D4AF37]" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 border-t border-white/[0.08] pt-5">
              <button
                type="button"
                onClick={onOpenConsultation}
                className="w-full rounded-lg border border-[#D4AF37]/50 bg-[#1A160E] px-4 py-3 text-xs font-semibold text-[#E5B84B] transition-colors hover:bg-[#D4AF37] hover:text-[#0A0A0B] cursor-pointer"
              >
                Transform Your Space With Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

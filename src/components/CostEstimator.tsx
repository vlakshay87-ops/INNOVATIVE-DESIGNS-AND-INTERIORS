import { useState } from 'react';
import { Calculator, Clock, MessageCircle, Check, ArrowRight } from 'lucide-react';
import {
  PROPERTY_TYPES,
  QUALITY_GRADES,
  PropertyTypeId,
  QualityGradeId,
  calculateInteriorEstimate,
  formatInr,
  formatInrLakhs,
  buildWhatsAppUrl,
  BUSINESS_INFO,
} from '../data/studioData';

interface CostEstimatorProps {
  onBookWithEstimate: (estimateSummary: string) => void;
}

export function CostEstimator({ onBookWithEstimate }: CostEstimatorProps) {
  const [propertyId, setPropertyId] = useState<PropertyTypeId>('3bhk');
  const [areaSqFt, setAreaSqFt] = useState<number>(1550);
  const [gradeId, setGradeId] = useState<QualityGradeId>('premium');

  const selectedProperty =
    PROPERTY_TYPES.find((p) => p.id === propertyId) ?? PROPERTY_TYPES[1];
  const selectedGrade =
    QUALITY_GRADES.find((g) => g.id === gradeId) ?? QUALITY_GRADES[1];

  const handlePropertySelect = (nextId: PropertyTypeId) => {
    setPropertyId(nextId);
    const nextConfig = PROPERTY_TYPES.find((p) => p.id === nextId);
    if (nextConfig) {
      setAreaSqFt(nextConfig.defaultSqFt);
    }
  };

  const handleAreaInputChange = (raw: string) => {
    const parsed = parseInt(raw.replace(/[^\d]/g, ''), 10);
    if (Number.isNaN(parsed)) {
      setAreaSqFt(selectedProperty.minSqFt);
      return;
    }
    const clamped = Math.min(selectedProperty.maxSqFt, Math.max(400, parsed));
    setAreaSqFt(clamped);
  };

  const handleAreaBlur = () => {
    const clamped = Math.min(
      selectedProperty.maxSqFt,
      Math.max(selectedProperty.minSqFt, areaSqFt)
    );
    if (clamped !== areaSqFt) {
      setAreaSqFt(clamped);
    }
  };

  const clampedSliderValue = Math.min(
    selectedProperty.maxSqFt,
    Math.max(selectedProperty.minSqFt, areaSqFt)
  );
  const sliderPercent =
    ((clampedSliderValue - selectedProperty.minSqFt) /
      Math.max(1, selectedProperty.maxSqFt - selectedProperty.minSqFt)) *
    100;

  const estimate = calculateInteriorEstimate(propertyId, areaSqFt, gradeId);
  const estimateSummary = `${selectedProperty.label} · ${areaSqFt.toLocaleString('en-IN')} sq ft · ${selectedGrade.label} Grade · Est. ${formatInrLakhs(estimate.totalInr)} (${estimate.minWeeks}–${estimate.maxWeeks} Weeks)`;

  const whatsappEstimateUrl = buildWhatsAppUrl(
    `Hello ${BUSINESS_INFO.name}, I calculated a turnkey estimate on your website:\n• Property: ${selectedProperty.label}\n• Area: ${areaSqFt.toLocaleString('en-IN')} sq ft\n• Grade: ${selectedGrade.label} (${selectedGrade.tagline})\n• Estimated Budget: ${formatInr(estimate.totalInr)} (${formatInrLakhs(estimate.totalInr)})\n• Timeline: ${estimate.minWeeks}–${estimate.maxWeeks} Weeks\nPlease share a detailed BOQ and schedule a site visit.`
  );

  return (
    <section
      id="cost-estimator"
      className="border-b border-white/[0.08] bg-[#0D0D10] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-[0.14em] text-[#C9A648]">
            02. Instant INR Cost &amp; Timeline Estimator
          </p>
          <h2
            className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#F7F4EC] sm:text-4xl"
            style={{ textWrap: 'balance' }}
          >
            Calculate Your Turnkey Budget &amp; Handover Schedule
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#A8A296]">
            Select your property layout, carpet area, and material specification grade
            for an immediate Delhi NCR turnkey estimate in Indian Rupees.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          {/* Left Controls Panel */}
          <div className="flex flex-col justify-between space-y-8 rounded-xl border border-white/10 bg-[#121215] p-6 sm:p-8 lg:col-span-7">
            {/* Step 1: Property Type */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                <label className="text-xs font-semibold tracking-wide text-[#F4F1EA]">
                  1. Property Configuration
                </label>
                <span className="text-xs text-[#9C968B]">
                  {selectedProperty.scopeSummary}
                </span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {PROPERTY_TYPES.map((prop) => {
                  const active = prop.id === propertyId;
                  return (
                    <button
                      key={prop.id}
                      type="button"
                      onClick={() => handlePropertySelect(prop.id)}
                      className={`rounded-lg border px-3.5 py-3 text-sm font-medium transition-all duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                        active
                          ? 'border-[#D4AF37] bg-[#1E1A12] text-[#E5B84B] shadow-[0_0_20px_rgba(212,175,55,0.16)]'
                          : 'border-white/10 bg-[#0D0D10] text-[#B8B2A6] hover:border-white/25 hover:text-[#F4F1EA]'
                      }`}
                    >
                      {prop.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Area Size in Sq Ft */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <label
                  htmlFor="estimator-sqft-range"
                  className="text-xs font-semibold tracking-wide text-[#F4F1EA]"
                >
                  2. Carpet / Design Area (sq ft)
                </label>
                <div className="flex items-center gap-2 rounded-lg border border-white/15 bg-[#0A0A0B] px-3 py-1.5 focus-within:border-[#D4AF37]">
                  <input
                    aria-label="Area size in square feet"
                    type="number"
                    min={selectedProperty.minSqFt}
                    max={selectedProperty.maxSqFt}
                    step={25}
                    value={areaSqFt}
                    onChange={(e) => handleAreaInputChange(e.target.value)}
                    onBlur={handleAreaBlur}
                    className="w-20 bg-transparent text-right font-mono text-sm font-medium text-[#E5B84B] tabular-nums focus:outline-none"
                  />
                  <span className="text-xs text-[#9C968B]">sq ft</span>
                </div>
              </div>

              <div className="mt-4">
                <input
                  id="estimator-sqft-range"
                  type="range"
                  min={selectedProperty.minSqFt}
                  max={selectedProperty.maxSqFt}
                  step={25}
                  value={clampedSliderValue}
                  onChange={(e) => setAreaSqFt(Number(e.target.value))}
                  style={{
                    background: `linear-gradient(90deg, #E5B84B 0%, #E5B84B ${sliderPercent}%, rgba(255,255,255,0.14) ${sliderPercent}%)`,
                    height: '4px',
                    borderRadius: '9999px',
                  }}
                  className="luxury-slider w-full"
                />
                <div className="mt-2 flex justify-between font-mono text-[11px] text-[#9C968B] tabular-nums">
                  <span>{selectedProperty.minSqFt.toLocaleString('en-IN')} sq ft</span>
                  <span>{selectedProperty.defaultSqFt.toLocaleString('en-IN')} sq ft typical</span>
                  <span>{selectedProperty.maxSqFt.toLocaleString('en-IN')} sq ft</span>
                </div>
              </div>
            </div>

            {/* Step 3: Material & Finish Grade */}
            <div>
              <label className="text-xs font-semibold tracking-wide text-[#F4F1EA]">
                3. Material &amp; Execution Grade
              </label>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {QUALITY_GRADES.map((grade) => {
                  const active = grade.id === gradeId;
                  return (
                    <button
                      key={grade.id}
                      type="button"
                      onClick={() => setGradeId(grade.id)}
                      className={`flex flex-col items-start rounded-xl border p-4 text-left transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                        active
                          ? 'border-[#D4AF37] bg-[#1A160E] shadow-[0_0_24px_rgba(212,175,55,0.18)]'
                          : 'border-white/10 bg-[#0D0D10] hover:border-white/25'
                      }`}
                    >
                      <div className="flex w-full items-center justify-between gap-2">
                        <span
                          className={`text-sm font-semibold ${
                            active ? 'text-[#E5B84B]' : 'text-[#F4F1EA]'
                          }`}
                        >
                          {grade.label}
                        </span>
                        <span className="font-mono text-xs text-[#9C968B] tabular-nums">
                          ₹{grade.ratePerSqFt}/sf
                        </span>
                      </div>
                      <span className="mt-1 text-xs text-[#A8A296]">{grade.tagline}</span>
                    </button>
                  );
                })}
              </div>

              {/* Included Grade Specs */}
              <ul className="mt-4 space-y-2 border-t border-white/[0.06] pt-4">
                {selectedGrade.specHighlights.map((spec) => (
                  <li key={spec} className="flex items-start gap-2.5 text-xs text-[#C4BEB2]">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D4AF37]" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Live Output & Cost Breakdown Card */}
          <div className="flex flex-col justify-between rounded-xl border border-[#D4AF37]/35 bg-[#141310] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.55)] sm:p-8 lg:col-span-5">
            <div>
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div className="flex items-center gap-2 text-xs font-medium text-[#E5B84B]">
                  <Calculator className="h-4 w-4" />
                  <span>Turnkey Estimate Summary</span>
                </div>
                <span className="font-mono text-xs text-[#9C968B] tabular-nums">
                  {formatInr(estimate.ratePerSqFt)} / sq ft
                </span>
              </div>

              {/* Main INR Output */}
              <div className="mt-6">
                <p className="text-xs text-[#A8A296]">
                  Estimated Project Investment (INR)
                </p>
                <div className="mt-1.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <p className="font-mono text-3xl font-semibold tracking-tight text-[#F7F4EC] tabular-nums sm:text-4xl">
                    {formatInr(estimate.totalInr)}
                  </p>
                  <span className="font-mono text-sm font-medium text-[#E5B84B] tabular-nums">
                    ({formatInrLakhs(estimate.totalInr)})
                  </span>
                </div>
              </div>

              {/* Timeline Estimate */}
              <div className="mt-5 flex items-center justify-between rounded-lg border border-white/10 bg-[#0B0B0D] px-4 py-3.5">
                <div className="flex items-center gap-2.5">
                  <Clock className="h-4 w-4 text-[#D4AF37]" />
                  <span className="text-xs font-medium text-[#D5CFC4]">
                    Estimated Completion Timeline
                  </span>
                </div>
                <span className="font-mono text-sm font-semibold text-[#E5B84B] tabular-nums">
                  {estimate.minWeeks}–{estimate.maxWeeks} Weeks
                </span>
              </div>

              {/* Stage Breakdown */}
              <div className="mt-6 space-y-3.5">
                <p className="text-xs font-medium text-[#A8A296]">
                  Indicative Scope Allocation
                </p>
                {estimate.breakdown.map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between gap-3 text-xs">
                      <span className="text-[#D5CFC4]">{item.label}</span>
                      <span className="font-mono text-[#F4F1EA] tabular-nums">
                        {formatInr(item.amountInr)}
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#B88928] to-[#E5B84B] transition-all duration-200"
                        style={{ width: `${item.sharePercent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 space-y-3 border-t border-white/[0.08] pt-6">
              <button
                type="button"
                onClick={() => onBookWithEstimate(estimateSummary)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-[#0A0A0B] shadow-[0_0_24px_rgba(212,175,55,0.28)] transition-colors hover:bg-[#E5C158] cursor-pointer"
              >
                <span>Lock This Estimate &amp; Book Site Visit</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <a
                href={whatsappEstimateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/15 bg-transparent px-5 py-3 text-xs font-medium text-[#F4F1EA] transition-colors hover:border-[#D4AF37]/60 hover:text-[#E5B84B]"
              >
                <MessageCircle className="h-4 w-4 text-[#D4AF37]" />
                <span>Send Detailed BOQ Request on WhatsApp</span>
              </a>

              <p className="text-[11px] leading-relaxed text-[#8E887E]">
                Final turnkey quote is confirmed after complimentary laser site measurement
                by our Uttam Nagar engineering team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { Check, Layers, ShieldCheck, Sparkles, MessageCircle } from 'lucide-react';
import {
  ROOMS,
  MATERIALS,
  RoomId,
  MaterialId,
  BUSINESS_INFO,
  buildWhatsAppUrl,
  formatInr,
} from '../data/studioData';
import { ResilientImage } from './ResilientImage';

interface RoomMaterialStudioProps {
  onSelectForConsultation: (summary: string) => void;
}

export function RoomMaterialStudio({ onSelectForConsultation }: RoomMaterialStudioProps) {
  const [activeRoomId, setActiveRoomId] = useState<RoomId>('living');
  const [activeMaterialId, setActiveMaterialId] = useState<MaterialId>('italian-marble');

  const activeRoom = ROOMS.find((r) => r.id === activeRoomId) ?? ROOMS[0];
  const activeMaterial = MATERIALS.find((m) => m.id === activeMaterialId) ?? MATERIALS[0];
  const isRecommended = activeRoom.recommendedMaterials.includes(activeMaterial.id);

  const handleRoomChange = (roomId: RoomId) => {
    setActiveRoomId(roomId);
    const nextRoom = ROOMS.find((r) => r.id === roomId);
    if (nextRoom && !nextRoom.recommendedMaterials.includes(activeMaterialId)) {
      setActiveMaterialId(nextRoom.recommendedMaterials[0]);
    }
  };

  const studioWhatsAppUrl = buildWhatsAppUrl(
    `Hello ${BUSINESS_INFO.name}, I explored your Material Studio for a ${activeRoom.name} featuring ${activeMaterial.name} (${activeMaterial.origin}). Could you share sample availability and pricing?`
  );

  return (
    <section
      id="material-studio"
      className="border-b border-white/[0.08] bg-[#0A0A0B] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col justify-between gap-6 border-b border-white/[0.08] pb-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.14em] text-[#C9A648]">
              01. Interactive Room &amp; Material Studio
            </p>
            <h2
              className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#F7F4EC] sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              Inspect Genuine Finishes Across Every Room
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#A8A296]">
              Switch between architectural spaces and tactile material grades to inspect
              authentic specifications, thickness standards, and recommended applications.
            </p>
          </div>

          {/* Room Switcher Segmented Controls */}
          <div
            role="tablist"
            aria-label="Room Type Selector"
            className="flex flex-wrap gap-1.5 rounded-xl border border-white/10 bg-[#121215] p-1.5"
          >
            {ROOMS.map((room) => {
              const selected = room.id === activeRoom.id;
              return (
                <button
                  key={room.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => handleRoomChange(room.id)}
                  className={`rounded-lg px-3.5 py-2 text-xs font-medium transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                    selected
                      ? 'bg-[#D4AF37] text-[#0A0A0B] shadow-[0_0_20px_rgba(212,175,55,0.28)] font-semibold'
                      : 'text-[#B8B2A6] hover:bg-white/[0.05] hover:text-[#F4F1EA]'
                  }`}
                >
                  {room.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Studio Grid */}
        <div className="mt-10 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          {/* Left: Live Room Visual Preview + Tactile Material Overlay */}
          <div className="flex flex-col justify-between lg:col-span-7">
            <div className="relative overflow-hidden rounded-xl border border-white/12 bg-[#131316]">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <ResilientImage
                  key={activeRoom.image}
                  src={activeRoom.image}
                  alt={`${activeRoom.name} rendered with ${activeMaterial.name} finish`}
                  fallbackTitle={`${activeRoom.name} · ${activeMaterial.name}`}
                  className={`h-full w-full object-cover transition-all duration-300 ${
                    activeMaterial.id === 'italian-marble'
                      ? 'contrast-[1.04] brightness-[1.02]'
                      : activeMaterial.id === 'teak'
                      ? 'sepia-[0.14] contrast-[1.03]'
                      : activeMaterial.id === 'veneer'
                      ? 'sepia-[0.08] saturate-[1.06]'
                      : activeMaterial.id === 'acrylic'
                      ? 'contrast-[1.07] saturate-[0.92]'
                      : 'brightness-[1.05] contrast-[1.02]'
                  }`}
                />

                {/* Subtle Material Lighting Tint */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 transition-colors duration-300"
                  style={{ backgroundColor: activeMaterial.overlayTint }}
                />

                {/* Contrast Scrim */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0A0B]/95 via-[#0A0A0B]/25 to-transparent"
                />

                {/* Live Material Swatch Card Inset */}
                <div className="absolute top-4 right-4 flex items-center gap-3 rounded-lg border border-white/15 bg-[#0A0A0B]/85 px-3.5 py-2.5 backdrop-blur-md">
                  <span
                    aria-hidden="true"
                    className="h-8 w-8 shrink-0 rounded-md border border-white/25 shadow-inner"
                    style={{ background: activeMaterial.swatchGradient }}
                  />
                  <div>
                    <p className="text-xs font-semibold text-[#F4F1EA]">
                      {activeMaterial.name}
                    </p>
                    <p className="font-mono text-[11px] text-[#E5B84B] tabular-nums">
                      {formatInr(activeMaterial.priceRatePerSqFt)} / sq ft base
                    </p>
                  </div>
                </div>

                {/* Bottom Room Spec Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#D5CFC4]">
                    <span className="text-[#E5B84B] font-medium">{activeRoom.name}</span>
                    <span aria-hidden="true" className="text-white/25">
                      ·
                    </span>
                    <span className="font-mono tabular-nums">{activeRoom.typicalArea}</span>
                    <span aria-hidden="true" className="text-white/25">
                      ·
                    </span>
                    <span>{activeRoom.lightingTemp}</span>
                  </div>
                  <h3 className="mt-1.5 font-display text-2xl font-semibold text-[#F7F4EC]">
                    {activeRoom.subtitle}
                  </h3>
                  <p className="mt-1.5 max-w-2xl text-xs leading-relaxed text-[#C4BEB2] sm:text-sm">
                    {activeRoom.architecturalNotes}
                  </p>
                </div>
              </div>
            </div>

            {/* Material Finish Selector Strip */}
            <div className="mt-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium text-[#B8B2A6]">
                  Select Material Finish to Inspect Specifications
                </span>
                <span className="text-xs text-[#9C968B]">
                  {isRecommended
                    ? `Architect Recommended for ${activeRoom.name}`
                    : `Custom Application for ${activeRoom.name}`}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-5">
                {MATERIALS.map((material) => {
                  const isActive = material.id === activeMaterial.id;
                  const recommendedForRoom = activeRoom.recommendedMaterials.includes(
                    material.id
                  );
                  return (
                    <button
                      key={material.id}
                      type="button"
                      onClick={() => setActiveMaterialId(material.id)}
                      className={`group flex flex-col items-start rounded-xl border p-3 text-left transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                        isActive
                          ? 'border-[#D4AF37] bg-[#181510] shadow-[0_0_24px_rgba(212,175,55,0.18)]'
                          : 'border-white/10 bg-[#121215] hover:border-white/25 hover:bg-[#17171B]'
                      }`}
                    >
                      <div className="flex w-full items-center justify-between gap-2">
                        <span
                          aria-hidden="true"
                          className="h-6 w-6 rounded-md border border-white/20"
                          style={{ background: material.swatchGradient }}
                        />
                        {recommendedForRoom && (
                          <span
                            title={`Recommended for ${activeRoom.name}`}
                            className="text-[10px] font-medium text-[#E5B84B]"
                          >
                            Ideal
                          </span>
                        )}
                      </div>
                      <span className="mt-2.5 text-xs font-semibold text-[#F4F1EA] whitespace-nowrap truncate w-full">
                        {material.name}
                      </span>
                      <span className="mt-0.5 font-mono text-[11px] text-[#9C968B] tabular-nums">
                        ₹{material.priceRatePerSqFt}/sf
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Live Material Specification & Application Sheet */}
          <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#121215] p-6 sm:p-7 lg:col-span-5">
            <div>
              <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-5">
                <div>
                  <p className="text-xs font-medium text-[#E5B84B]">
                    {activeMaterial.category}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-semibold text-[#F7F4EC] sm:text-3xl">
                    {activeMaterial.name}
                  </h3>
                </div>
                <div
                  aria-hidden="true"
                  className="h-12 w-12 shrink-0 rounded-lg border border-white/20 shadow-inner"
                  style={{ background: activeMaterial.swatchGradient }}
                />
              </div>

              {/* Technical Spec Table */}
              <dl className="mt-5 divide-y divide-white/[0.06] text-sm">
                <div className="flex items-center justify-between gap-4 py-2.5">
                  <dt className="text-xs text-[#9C968B]">Origin / Grade</dt>
                  <dd className="text-right text-xs font-medium text-[#F4F1EA]">
                    {activeMaterial.origin}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4 py-2.5">
                  <dt className="text-xs text-[#9C968B]">Thickness</dt>
                  <dd className="text-right font-mono text-xs text-[#F4F1EA] tabular-nums">
                    {activeMaterial.thickness}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4 py-2.5">
                  <dt className="text-xs text-[#9C968B]">Surface Finish</dt>
                  <dd className="text-right text-xs font-medium text-[#F4F1EA]">
                    {activeMaterial.surfaceFinish}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4 py-2.5">
                  <dt className="text-xs text-[#9C968B]">Structural Core</dt>
                  <dd className="text-right text-xs font-medium text-[#F4F1EA]">
                    {activeMaterial.coreGrade}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4 py-2.5">
                  <dt className="text-xs text-[#9C968B]">Assurance</dt>
                  <dd className="inline-flex items-center gap-1.5 text-right text-xs font-medium text-[#E5B84B]">
                    <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                    <span>{activeMaterial.warranty}</span>
                  </dd>
                </div>
              </dl>

              {/* Active Room Specific Application */}
              <div className="mt-5 rounded-lg border border-[#D4AF37]/25 bg-[#181510] p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#E5B84B]">
                  <Layers className="h-3.5 w-3.5" />
                  <span>Application in {activeRoom.name}</span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-[#E4DFD5]">
                  {activeMaterial.roomApplications[activeRoom.id]}
                </p>
              </div>

              {/* Authenticity Checklist */}
              <ul className="mt-5 space-y-2.5">
                {activeMaterial.highlights.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-xs text-[#B8B2A6]">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D4AF37]" />
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Studio Actions */}
            <div className="mt-7 flex flex-col gap-2.5 border-t border-white/[0.08] pt-5 sm:flex-row">
              <button
                type="button"
                onClick={() =>
                  onSelectForConsultation(
                    `${activeRoom.name} featuring ${activeMaterial.name}`
                  )
                }
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#D4AF37] px-4 py-2.5 text-xs font-semibold text-[#0A0A0B] transition-colors hover:bg-[#E5C158] whitespace-nowrap cursor-pointer"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Request Sample Visit</span>
              </button>
              <a
                href={studioWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/15 bg-transparent px-4 py-2.5 text-xs font-medium text-[#F4F1EA] transition-colors hover:border-[#D4AF37]/60 hover:text-[#E5B84B] whitespace-nowrap"
              >
                <MessageCircle className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span>Inquire on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

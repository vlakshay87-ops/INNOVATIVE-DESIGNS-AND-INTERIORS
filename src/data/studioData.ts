export const BUSINESS_INFO = {
  name: 'INNOVATIVE DESIGNS AND INTERIORS',
  shortName: 'INNOVATIVE DESIGNS',
  address: 'Plot No - 125, Uttam Nagar, New Delhi',
  phoneDisplay: '091360 13038',
  phoneHref: 'tel:+919136013038',
  whatsappNumber: '919136013038',
  rating: '4.7',
  reviewCount: 22,
  highlightQuote: 'All material are geniune and good quality of work.',
};

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export type RoomId = 'living' | 'kitchen' | 'bedroom' | 'bathroom';
export type MaterialId = 'italian-marble' | 'veneer' | 'teak' | 'acrylic' | 'quartz';

export interface RoomSpec {
  id: RoomId;
  name: string;
  subtitle: string;
  image: string;
  typicalArea: string;
  lightingTemp: string;
  primaryApplication: string;
  architecturalNotes: string;
  recommendedMaterials: MaterialId[];
}

export interface MaterialSpec {
  id: MaterialId;
  name: string;
  category: string;
  origin: string;
  thickness: string;
  surfaceFinish: string;
  coreGrade: string;
  warranty: string;
  priceRatePerSqFt: number;
  swatchGradient: string;
  accentHex: string;
  overlayTint: string;
  highlights: string[];
  roomApplications: Record<RoomId, string>;
}

export const ROOMS: RoomSpec[] = [
  {
    id: 'living',
    name: 'Living Room',
    subtitle: 'Double-Height Feature Walls & Cove Lighting',
    image: '/src/assets/images/hero_luxury_living_1795364072217.jpg',
    typicalArea: '280 – 480 sq ft',
    lightingTemp: '2700K Warm Recessed Cove',
    primaryApplication: 'Bookmatched TV Console, Fluted Panelling & Italian Flooring',
    architecturalNotes:
      'Designed around an axial sightline with concealed magnetic track lighting, acoustic slatted panelling, and monolithic stone veining.',
    recommendedMaterials: ['italian-marble', 'veneer', 'teak'],
  },
  {
    id: 'kitchen',
    name: 'Modular Kitchen',
    subtitle: 'Precision Handleless Joinery & Waterfall Islands',
    image: '/src/assets/images/room_modular_kitchen_1795364071441.jpg',
    typicalArea: '110 – 210 sq ft',
    lightingTemp: '3000K Task + Warm Under-Cabinet',
    primaryApplication: 'BWP Marine Carcass, Soft-Close Hettich Hardware & Stone Counter',
    architecturalNotes:
      'Engineered for heavy Indian cooking with boiling-water-proof marine ply cores, zero-edge laser-banded shutters, and non-porous islands.',
    recommendedMaterials: ['acrylic', 'quartz', 'veneer'],
  },
  {
    id: 'bedroom',
    name: 'Master Bedroom',
    subtitle: 'Acoustic Timber Suites & Smoked Glass Wardrobes',
    image: '/src/assets/images/room_master_bedroom_1795364071626.jpg',
    typicalArea: '190 – 320 sq ft',
    lightingTemp: '2400K Indirect Bedside & Wardrobe Strip',
    primaryApplication: 'Full-Height Headboard Wall, Walk-In Glass Closets & Concealed Doors',
    architecturalNotes:
      'Combines seasoned timber slats with upholstered acoustic panels, sensor-triggered wardrobe lighting, and flush architectural skirting.',
    recommendedMaterials: ['teak', 'veneer', 'italian-marble'],
  },
  {
    id: 'bathroom',
    name: 'Luxury Bathroom',
    subtitle: 'Monolithic Spa Stone & Brushed Brass Fittings',
    image: '/src/assets/images/room_luxury_bathroom_1795364072136.jpg',
    typicalArea: '65 – 120 sq ft',
    lightingTemp: '3000K Backlit Mirror Halo (IP65)',
    primaryApplication: 'Dry-Wet Toughened Glass Partition, Floating Vanity & Niche Lighting',
    architecturalNotes:
      'Two-coat epoxy waterproofing beneath bookmatched stone slabs, concealed cistern framing, and anti-skid honed floor finishes.',
    recommendedMaterials: ['italian-marble', 'quartz', 'acrylic'],
  },
];

export const MATERIALS: MaterialSpec[] = [
  {
    id: 'italian-marble',
    name: 'Italian Marble',
    category: 'Natural Quarried Stone',
    origin: 'Carrara & Tuscany, Italy (Imported Slabs)',
    thickness: '18 mm – 20 mm Bookmatched',
    surfaceFinish: 'Mirror Diamond-Honed + Nano Sealer',
    coreGrade: 'High-Density Metamorphic Calcite',
    warranty: '15-Year Structural & Polish Assurance',
    priceRatePerSqFt: 680,
    swatchGradient:
      'linear-gradient(135deg, #1F1F23 0%, #3A3834 32%, #D4AF37 34%, #262528 36%, #141417 100%)',
    accentHex: '#E5B84B',
    overlayTint: 'rgba(229, 184, 75, 0.10)',
    highlights: [
      'Zero resin-crack fillers; 100% genuine A-grade slab lot matching',
      '5-stage diamond grit polishing with stain-resistant Italian sealer',
      'Ideal for continuous seamless living room floors & TV feature walls',
    ],
    roomApplications: {
      living: 'Bookmatched Nero & Statuario TV feature wall with seamless 3mm epoxy floor joints.',
      kitchen: 'Full-height stain-sealed backsplash & breakfast ledge accent cladding.',
      bedroom: 'Honed perimeter flooring border & bespoke monolithic side-table tops.',
      bathroom: 'Floor-to-ceiling wet-zone bookmatched stone walls with epoxy grouting.',
    },
  },
  {
    id: 'veneer',
    name: 'Veneer',
    category: 'Natural Smoked Hardwood Slice',
    origin: 'European Crown-Cut Walnut & Oak',
    thickness: '4 mm Natural Ply-Backed Flitch',
    surfaceFinish: 'Italian Matte PU Open-Grain Polish',
    coreGrade: 'IS:710 BWP Grade Gurjan Plywood Base',
    warranty: '10-Year Termite & Delamination Warranty',
    priceRatePerSqFt: 420,
    swatchGradient:
      'linear-gradient(145deg, #3D281A 0%, #5D3D28 35%, #2B1B12 70%, #4A3020 100%)',
    accentHex: '#C89B6E',
    overlayTint: 'rgba(200, 155, 110, 0.12)',
    highlights: [
      'Sequential flitch-matched grain continuity across tall wardrobe shutters',
      'Anti-yellowing UV-cured ICA Italian PU coat (10% dead-matte sheen)',
      'Mounted exclusively on calibrated IS:710 boiling-waterproof ply',
    ],
    roomApplications: {
      living: 'Floor-to-ceiling fluted media panelling & concealed flush swing doors.',
      kitchen: 'Tall appliance pantry tower & dry-bar upper cabinetry in smoked walnut.',
      bedroom: 'Continuous grain wardrobe fronts & floating study desk fascia.',
      bathroom: 'Moisture-sealed vanity drawer fronts with PU marine topcoat.',
    },
  },
  {
    id: 'teak',
    name: 'Teak',
    category: 'Seasoned Solid Timber',
    origin: 'Kiln-Seasoned Burma & CP Teak',
    thickness: '25 mm – 38 mm Solid Architectural Sections',
    surfaceFinish: 'Hand-Rubbed Natural Beeswax & PU',
    coreGrade: 'Kiln-Dried <10% Moisture Content',
    warranty: '20-Year Structural Joinery Guarantee',
    priceRatePerSqFt: 590,
    swatchGradient:
      'linear-gradient(135deg, #5C3A21 0%, #825432 45%, #3E2514 85%, #6B4427 100%)',
    accentHex: '#D19A58',
    overlayTint: 'rgba(209, 154, 88, 0.12)',
    highlights: [
      'Naturally high oil content resists warping across Delhi summer-monsoon swings',
      'CNC-milled architectural louvers, ceiling rafters, and solid door frames',
      'Deep golden-amber patina that enriches over decades of use',
    ],
    roomApplications: {
      living: 'Main entrance designer door, solid louvered partition & console frame.',
      kitchen: 'Solid teak open spice niches & breakfast counter edge trim.',
      bedroom: 'Custom fluted solid-teak headboard wall & heavy-duty bed framing.',
      bathroom: 'Treated slatted shower bench & moisture-buffered mirror framing.',
    },
  },
  {
    id: 'acrylic',
    name: 'Acrylic',
    category: 'High-Polymer Architectural Sheet',
    origin: 'German Anti-Scratch Zero-Edge Grade',
    thickness: '1.5 mm – 2.0 mm Polymer on HDHMR',
    surfaceFinish: 'Super-Matte Anti-Fingerprint / High-Gloss Mirror',
    coreGrade: 'High-Density High-Moisture Resistant (HDHMR)',
    warranty: '10-Year Colorfast & Edge-Peel Warranty',
    priceRatePerSqFt: 360,
    swatchGradient:
      'linear-gradient(135deg, #1E2024 0%, #31353B 45%, #16181C 100%)',
    accentHex: '#A8B2C1',
    overlayTint: 'rgba(168, 178, 193, 0.10)',
    highlights: [
      'PUR laser edge-banding eliminates visible glue lines and steam swelling',
      'Scratch-resistant (>4H hardness) and effortless wipe-clean surface',
      'Zero-fade UV stability even in sunlit West Delhi kitchen layouts',
    ],
    roomApplications: {
      living: 'Minimalist floating crockery units & high-gloss display recesses.',
      kitchen: 'Handleless Gola-profile lower & upper modular shutter fronts.',
      bedroom: 'Sleek floor-to-ceiling sliding wardrobe panels with champagne profiles.',
      bathroom: '100% moisture-proof under-basin vanity shutters with soft-close hinges.',
    },
  },
  {
    id: 'quartz',
    name: 'Quartz',
    category: 'Engineered Mineral Composite',
    origin: '93% Natural Crushed Quartz + Resin Matrix',
    thickness: '20 mm Monolithic Mitered Slab',
    surfaceFinish: 'Non-Porous Polished Calacatta Veining',
    coreGrade: 'Mohs Hardness 7 · Zero-Absorption Surface',
    warranty: '15-Year Stain & Heat-Crack Warranty',
    priceRatePerSqFt: 490,
    swatchGradient:
      'linear-gradient(135deg, #D9D6CE 0%, #F1EFEA 45%, #B89D68 48%, #E4E1D8 100%)',
    accentHex: '#E8DFCA',
    overlayTint: 'rgba(232, 223, 202, 0.08)',
    highlights: [
      'Impervious to turmeric, oil, coffee, and acidic Indian kitchen spills',
      '45-degree mitered waterfall edges create a seamless 60mm thick monolith look',
      'Zero periodic sealing required; hygienic food-safe certified surface',
    ],
    roomApplications: {
      living: 'Sculpted travertine-tone coffee table & bar counter top.',
      kitchen: 'Continuous L-shape counter & waterfall island slab with undermount sink.',
      bedroom: 'Seamless vanity dressing counter & window sill ledge.',
      bathroom: 'Custom-fabricated monolithic integrated basin & dry ledge.',
    },
  },
];

export type PropertyTypeId = '2bhk' | '3bhk' | '4bhk' | 'commercial';
export type QualityGradeId = 'standard' | 'premium' | 'ultra-luxury';

export interface PropertyTypeConfig {
  id: PropertyTypeId;
  label: string;
  defaultSqFt: number;
  minSqFt: number;
  maxSqFt: number;
  weekOffset: number;
  scopeSummary: string;
}

export interface QualityGradeConfig {
  id: QualityGradeId;
  label: string;
  tagline: string;
  ratePerSqFt: number;
  baseWeeks: number;
  weeksPerThousandSqFt: number;
  specHighlights: string[];
}

export const PROPERTY_TYPES: PropertyTypeConfig[] = [
  {
    id: '2bhk',
    label: '2BHK',
    defaultSqFt: 1050,
    minSqFt: 650,
    maxSqFt: 1450,
    weekOffset: 0,
    scopeSummary: 'Living & dining, 2 bedrooms, modular kitchen, 2 baths & false ceiling',
  },
  {
    id: '3bhk',
    label: '3BHK',
    defaultSqFt: 1550,
    minSqFt: 1100,
    maxSqFt: 2400,
    weekOffset: 2,
    scopeSummary: 'Living & dining, 3 bedroom suites, modular kitchen, 3 baths & foyer',
  },
  {
    id: '4bhk',
    label: '4BHK / Villa',
    defaultSqFt: 2600,
    minSqFt: 1800,
    maxSqFt: 5500,
    weekOffset: 4,
    scopeSummary: 'Full residence turnkey: double living, 4 suites, island kitchen & lounges',
  },
  {
    id: 'commercial',
    label: 'Commercial',
    defaultSqFt: 1800,
    minSqFt: 500,
    maxSqFt: 6000,
    weekOffset: 1,
    scopeSummary: 'Executive cabins, reception stone desk, acoustic glass & workstations',
  },
];

export const QUALITY_GRADES: QualityGradeConfig[] = [
  {
    id: 'standard',
    label: 'Standard',
    tagline: 'Essential Turnkey',
    ratePerSqFt: 1450,
    baseWeeks: 6,
    weeksPerThousandSqFt: 2.0,
    specHighlights: [
      'IS:303 / BWR Plywood + Designer Laminate Finish',
      'Granite / Essential Quartz Kitchen Countertop',
      'Gypsum Cove Ceiling with Warm LED Profiles',
    ],
  },
  {
    id: 'premium',
    label: 'Premium',
    tagline: 'Bespoke Designer',
    ratePerSqFt: 2150,
    baseWeeks: 8,
    weeksPerThousandSqFt: 2.5,
    specHighlights: [
      'IS:710 BWP Marine Ply + German Acrylic & Natural Veneer',
      'Calacatta Quartz Waterfall Counter + Hettich Soft-Close',
      'Fluted Teak Accent Walls & Architectural Track Lighting',
    ],
  },
  {
    id: 'ultra-luxury',
    label: 'Ultra-Luxury',
    tagline: 'Signature Architectural',
    ratePerSqFt: 3250,
    baseWeeks: 10,
    weeksPerThousandSqFt: 3.0,
    specHighlights: [
      'Bookmatched Imported Italian Marble + Solid Burma Teak',
      'Smoked Bronze Glass Wardrobes & Automated Mood Lighting',
      'Custom Monolithic Stone Vanities & Italian PU Veneer Polish',
    ],
  },
];

export interface CostEstimateResult {
  totalInr: number;
  minWeeks: number;
  maxWeeks: number;
  ratePerSqFt: number;
  breakdown: {
    label: string;
    sharePercent: number;
    amountInr: number;
  }[];
}

export function calculateInteriorEstimate(
  propertyId: PropertyTypeId,
  areaSqFt: number,
  gradeId: QualityGradeId
): CostEstimateResult {
  const property = PROPERTY_TYPES.find((p) => p.id === propertyId) ?? PROPERTY_TYPES[1];
  const grade = QUALITY_GRADES.find((g) => g.id === gradeId) ?? QUALITY_GRADES[1];

  const commercialMultiplier = propertyId === 'commercial' ? 0.92 : 1;
  const effectiveRate = Math.round(grade.ratePerSqFt * commercialMultiplier);
  const totalInr = Math.round((areaSqFt * effectiveRate) / 1000) * 1000;

  const rawWeeks =
    grade.baseWeeks + property.weekOffset + (areaSqFt / 1000) * grade.weeksPerThousandSqFt;
  const minWeeks = Math.max(5, Math.round(rawWeeks));
  const maxWeeks = minWeeks + 2;

  return {
    totalInr,
    minWeeks,
    maxWeeks,
    ratePerSqFt: effectiveRate,
    breakdown: [
      {
        label: 'Modular Woodwork & Joinery',
        sharePercent: 42,
        amountInr: Math.round(totalInr * 0.42),
      },
      {
        label: 'Italian Marble, Quartz & Civil',
        sharePercent: 26,
        amountInr: Math.round(totalInr * 0.26),
      },
      {
        label: 'False Ceiling, Electrical & Lighting',
        sharePercent: 18,
        amountInr: Math.round(totalInr * 0.18),
      },
      {
        label: 'Hardware, Glass & Final Finishing',
        sharePercent: 14,
        amountInr: Math.round(totalInr * 0.14),
      },
    ],
  };
}

export function formatInr(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatInrLakhs(amount: number): string {
  const lakhs = amount / 100000;
  if (lakhs >= 100) {
    return `₹ ${(lakhs / 100).toFixed(2)} Cr`;
  }
  return `₹ ${lakhs.toFixed(2)} Lakhs`;
}

export interface GoogleReview {
  id: string;
  reviewer: string;
  projectContext: string;
  rating: number;
  quote: string;
  outcome: string;
  isFeatured?: boolean;
}

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: 'rev-1',
    reviewer: 'Rajesh Sharma',
    projectContext: '3BHK Turnkey Residence · Uttam Nagar, New Delhi',
    rating: 5,
    quote: 'All material are geniune and good quality of work.',
    outcome:
      'Delivered genuine BWP plywood modular kitchen, fluted veneer living wall, and Italian flooring within the committed schedule.',
    isFeatured: true,
  },
  {
    id: 'rev-2',
    reviewer: 'Ananya Verma',
    projectContext: '4BHK Builder Floor · Janakpuri, New Delhi',
    rating: 5,
    quote:
      'Every slab of Italian marble and quartz counter matched what was approved in their material studio. Zero hidden charges.',
    outcome:
      'Completed 2,400 sq ft turnkey interior execution in 12 weeks with transparent stage-wise billing.',
  },
  {
    id: 'rev-3',
    reviewer: 'Vikramjit Singh',
    projectContext: 'Master Suite & Modular Kitchen · Vikaspuri, New Delhi',
    rating: 5,
    quote:
      'Their team handled bare plaster to final cove lighting seamlessly. The Burma teak carpentry finish still draws compliments daily.',
    outcome:
      'Transformed a 15-year-old apartment into a modern dark-luxury residence with zero site delays.',
  },
  {
    id: 'rev-4',
    reviewer: 'Neha Kapoor',
    projectContext: 'Commercial Boutique Studio · Rajouri Garden, New Delhi',
    rating: 4.5,
    quote:
      'Clean execution, genuine Hettich hardware, and responsive site supervision from day one through handover.',
    outcome:
      'Handed over 1,400 sq ft client lounge and executive suite ready for launch in 8 weeks.',
  },
];

export const TRANSFORMATION_SPECS = {
  projectTitle: 'Raw Concrete Shell to Turnkey Luxury Residence',
  location: 'Uttam Nagar / West Delhi Corridor',
  area: '1,680 sq ft · 3BHK Full Turnkey',
  duration: '10 Weeks Execution',
  beforeImage: '/src/assets/images/transform_before_raw_1795364072439.jpg',
  afterImage: '/src/assets/images/transform_after_luxury_1795364071854.jpg',
  deliverables: [
    'Bare cement screed replaced with diamond-honed Italian marble',
    'Exposed conduits concealed behind gypsum recessed 2700K cove ceiling',
    'Raw brickwork clad in fluted Burma teak & smoked walnut veneer media wall',
    'Custom furniture curation, ambient tracks & full electrical load balancing',
  ],
};

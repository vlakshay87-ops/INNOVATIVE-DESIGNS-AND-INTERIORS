import { useEffect, useState, FormEvent } from 'react';
import { X, CheckCircle2, MessageCircle, Phone } from 'lucide-react';
import { BUSINESS_INFO, buildWhatsAppUrl } from '../data/studioData';

interface ConsultationModalProps {
  isOpen: boolean;
  initialContext?: string;
  onClose: () => void;
}

interface FormState {
  fullName: string;
  phone: string;
  propertyType: string;
  locality: string;
  notes: string;
}

export function ConsultationModal({
  isOpen,
  initialContext = '',
  onClose,
}: ConsultationModalProps) {
  const [form, setForm] = useState<FormState>({
    fullName: '',
    phone: '',
    propertyType: '3BHK Residence',
    locality: 'Uttam Nagar / West Delhi',
    notes: initialContext,
  });

  const [errors, setErrors] = useState<{ fullName?: string; phone?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setErrors({});
      setForm((prev) => ({
        ...prev,
        notes: initialContext || prev.notes,
      }));
    }
  }, [isOpen, initialContext]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const nextErrors: { fullName?: string; phone?: string } = {};
    if (form.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name.';
    }
    const digitsOnly = form.phone.replace(/\D/g, '');
    if (digitsOnly.length < 10 || digitsOnly.length > 12) {
      nextErrors.phone = 'Enter a valid 10-digit Indian mobile number.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  const whatsappBriefUrl = buildWhatsAppUrl(
    `Hello ${BUSINESS_INFO.name},\nI just requested a free design consultation:\n• Name: ${form.fullName || 'Client'}\n• Phone: ${form.phone || 'Provided'}\n• Property: ${form.propertyType}\n• Location: ${form.locality}${
      form.notes ? `\n• Scope / Notes: ${form.notes}` : ''
    }`
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="consultation-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-[#D4AF37]/35 bg-[#121215] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.85)] sm:p-8">
        <button
          type="button"
          aria-label="Close consultation modal"
          onClick={onClose}
          className="absolute top-4 right-4 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-[#B8B2A6] transition-colors hover:border-white/30 hover:text-white cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {submitted ? (
          <div className="py-4 text-center">
            <CheckCircle2 className="mx-auto h-11 w-11 text-[#E5B84B]" strokeWidth={1.5} />
            <h3
              id="consultation-modal-title"
              className="mt-4 font-display text-2xl font-semibold text-[#F7F4EC] sm:text-3xl"
            >
              Consultation Request Confirmed
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#B8B2A6]">
              Thank you, <span className="font-medium text-[#F4F1EA]">{form.fullName}</span>.
              Our lead architect will call{' '}
              <span className="font-mono text-[#E5B84B] tabular-nums">{form.phone}</span>{' '}
              within 2 business hours to confirm your complimentary site measurement.
            </p>

            <div className="mt-6 rounded-lg border border-white/10 bg-[#0B0B0D] p-4 text-left text-xs text-[#C4BEB2]">
              <p className="font-medium text-[#F4F1EA]">Submitted Brief</p>
              <p className="mt-1">
                {form.propertyType} · {form.locality}
              </p>
              {form.notes && <p className="mt-1 text-[#9C968B]">{form.notes}</p>}
            </div>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <a
                href={whatsappBriefUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#D4AF37] px-4 py-3 text-xs font-semibold text-[#0A0A0B] transition-colors hover:bg-[#E5C158]"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Send Brief on WhatsApp Now</span>
              </a>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-lg border border-white/15 px-5 py-3 text-xs font-medium text-[#F4F1EA] transition-colors hover:border-white/30 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-xs font-medium tracking-wider text-[#E5B84B]">
              Complimentary Site Visit &amp; 3D Concept
            </p>
            <h3
              id="consultation-modal-title"
              className="mt-1.5 font-display text-2xl font-semibold text-[#F7F4EC] sm:text-3xl"
            >
              Book a Free Design Consultation
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-[#9C968B]">
              {BUSINESS_INFO.name} · {BUSINESS_INFO.address}
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="consult-name"
                  className="block text-xs font-medium text-[#D5CFC4]"
                >
                  Full Name *
                </label>
                <input
                  id="consult-name"
                  type="text"
                  required
                  placeholder="e.g. Rohan Malhotra"
                  value={form.fullName}
                  onChange={(e) => {
                    setForm({ ...form, fullName: e.target.value });
                    if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                  }}
                  className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#0A0A0B] px-3.5 py-2.5 text-sm text-[#F4F1EA] placeholder:text-[#6B665E] focus:border-[#D4AF37] focus:outline-none"
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-amber-400">{errors.fullName}</p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="consult-phone"
                    className="block text-xs font-medium text-[#D5CFC4]"
                  >
                    Mobile Number (WhatsApp) *
                  </label>
                  <input
                    id="consult-phone"
                    type="tel"
                    required
                    placeholder="e.g. 98110 45678"
                    value={form.phone}
                    onChange={(e) => {
                      setForm({ ...form, phone: e.target.value });
                      if (errors.phone) setErrors({ ...errors, phone: undefined });
                    }}
                    className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#0A0A0B] px-3.5 py-2.5 font-mono text-sm text-[#F4F1EA] placeholder:font-sans placeholder:text-[#6B665E] focus:border-[#D4AF37] focus:outline-none tabular-nums"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-amber-400">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="consult-property"
                    className="block text-xs font-medium text-[#D5CFC4]"
                  >
                    Property Type
                  </label>
                  <select
                    id="consult-property"
                    value={form.propertyType}
                    onChange={(e) => setForm({ ...form, propertyType: e.target.value })}
                    className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#0A0A0B] px-3.5 py-2.5 text-sm text-[#F4F1EA] focus:border-[#D4AF37] focus:outline-none"
                  >
                    <option value="2BHK Residence">2BHK Residence</option>
                    <option value="3BHK Residence">3BHK Residence</option>
                    <option value="4BHK / Builder Floor / Villa">
                      4BHK / Builder Floor / Villa
                    </option>
                    <option value="Modular Kitchen & Wardrobes">
                      Modular Kitchen &amp; Wardrobes
                    </option>
                    <option value="Commercial / Office Space">
                      Commercial / Office Space
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="consult-locality"
                  className="block text-xs font-medium text-[#D5CFC4]"
                >
                  Site Locality (Delhi NCR)
                </label>
                <input
                  id="consult-locality"
                  type="text"
                  placeholder="e.g. Uttam Nagar, Janakpuri, Dwarka"
                  value={form.locality}
                  onChange={(e) => setForm({ ...form, locality: e.target.value })}
                  className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#0A0A0B] px-3.5 py-2.5 text-sm text-[#F4F1EA] placeholder:text-[#6B665E] focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="consult-notes"
                  className="block text-xs font-medium text-[#D5CFC4]"
                >
                  Project Scope or Material Preferences
                </label>
                <textarea
                  id="consult-notes"
                  rows={2}
                  placeholder="Optional: preferred finishes, target possession date, or estimate details"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#0A0A0B] px-3.5 py-2 text-sm text-[#F4F1EA] placeholder:text-[#6B665E] focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-2.5 pt-2 sm:flex-row">
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-[#0A0A0B] transition-colors hover:bg-[#E5C158] cursor-pointer"
                >
                  Schedule Free Callback
                </button>
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-4 py-3 text-xs font-medium text-[#F4F1EA] transition-colors hover:border-[#D4AF37]/60"
                >
                  <Phone className="h-3.5 w-3.5 text-[#D4AF37]" />
                  <span className="font-mono tabular-nums">{BUSINESS_INFO.phoneDisplay}</span>
                </a>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

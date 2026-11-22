import { useState } from 'react';
import { Building2 } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#16161A] via-[#101013] to-[#1D1810] text-center p-6 ${className}`}
      >
        <Building2 className="w-8 h-8 text-[#D4AF37]/70 mb-3" strokeWidth={1.5} />
        <p className="font-display text-lg text-[#F4F1EA]/90">
          {fallbackTitle || alt}
        </p>
        <p className="text-xs text-[#9C968B] mt-1">
          Architectural Render · INNOVATIVE DESIGNS AND INTERIORS
        </p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}

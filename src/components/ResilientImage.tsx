import { useState } from 'react';
import { BookOpen } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  aspectClass?: string;
}

export function ResilientImage({
  src,
  alt,
  caption,
  className = '',
  aspectClass = 'aspect-4/3',
}: ResilientImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className={`overflow-hidden border border-slate-200 bg-white rounded-xl ${className}`}>
      <div className={`relative w-full ${aspectClass} bg-slate-100 overflow-hidden`}>
        {!failed ? (
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-slate-100 p-6 text-center text-slate-500">
            <BookOpen className="h-7 w-7 text-slate-400" aria-hidden="true" />
            <span className="text-xs font-medium max-w-xs">{alt}</span>
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="border-t border-slate-200 px-4 py-2.5 text-xs text-slate-600 leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

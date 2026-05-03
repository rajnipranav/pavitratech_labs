'use client';

import { useState } from 'react';

export function PortraitImage({ src, alt }: { src: string; alt: string }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #6366F1 0%, #0ea5e9 100%)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '48px',
          color: '#fff',
        }}
        aria-label={alt}
      >
        👤
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setErrored(true)}
      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}
    />
  );
}

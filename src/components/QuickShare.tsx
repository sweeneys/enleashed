// components/QuickShare.tsx
'use client';

import React from 'react';

export default function QuickShare({
  url = 'https://enleashed.tech',
  title = 'Enleashed',
  className = '',
}: {
  url?: string;
  title?: string;
  className?: string;
}) {
  const onWebShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard');
      }
    } catch {
      // ignore
    }
  };

  const onCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard');
      }
    } catch {
      // ignore
    }
  };

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-3">
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('Check out the Enleashed mission')}&url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-xl border px-3 py-2 text-sm hover:bg-gray-100"
        >
          Share on X
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-xl border px-3 py-2 text-sm hover:bg-gray-100"
        >
          Share on LinkedIn
        </a>
        <button
          type="button"
          onClick={onWebShare}
          className="inline-flex items-center rounded-xl border px-3 py-2 text-sm hover:bg-gray-100"
        >
          Share…
        </button>
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex items-center rounded-xl border px-3 py-2 text-sm hover:bg-gray-100"
        >
          Copy link
        </button>
      </div>
    </div>
  );
}

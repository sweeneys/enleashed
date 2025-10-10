"use client";

export default function ShareButtons() {
  const url = typeof window !== "undefined" ? window.location.href : "https://enleashed.tech";
  const text = "Energy Unleashed — help us build a fair, flexible energy future.";

  function nativeShare() {
    if (navigator.share) {
      navigator.share({ title: "Energy Unleashed", text, url }).catch(() => {});
    } else {
      copy();
    }
  }
  function copy() {
    navigator.clipboard?.writeText(url).then(() => alert("Link copied"));
  }

  return (
    <div className="flex flex-wrap gap-2">
      <a
        className="px-3 py-1.5 rounded border text-sm hover:bg-zinc-50"
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`}
        target="_blank" rel="noreferrer"
      >
        Share on X
      </a>
      <a
        className="px-3 py-1.5 rounded border text-sm hover:bg-zinc-50"
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank" rel="noreferrer"
      >
        Share on LinkedIn
      </a>
      <button onClick={nativeShare} className="px-3 py-1.5 rounded border text-sm hover:bg-zinc-50">
        Share…
      </button>
      <button onClick={copy} className="px-3 py-1.5 rounded border text-sm hover:bg-zinc-50">
        Copy link
      </button>
    </div>
  );
}

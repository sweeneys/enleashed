"use client";

import { useMemo } from "react";

/**
 * Simple live/offline embed.
 * If you have a specific live video id, set NEXT_PUBLIC_YT_LIVE_ID in env and it will embed that.
 * Otherwise we show a channel placeholder "offline" box.
 */
export default function YouTubeLive({ channelName }: { channelName: string }) {
  const liveId = process.env.NEXT_PUBLIC_YT_LIVE_ID; // optional
  const src = liveId ? `https://www.youtube.com/embed/${liveId}` : "";

  const offline = useMemo(
    () => (
      <div className="aspect-video w-full rounded-xl border bg-black text-white grid place-items-center">
        <div className="text-center p-4">
          <div className="text-sm uppercase tracking-wide opacity-70">Offline</div>
          <div className="text-lg font-semibold mt-2">YouTube — {channelName}</div>
        </div>
      </div>
    ),
    [channelName]
  );

  if (!liveId) return offline;

  return (
    <div className="aspect-video w-full overflow-hidden rounded-xl border">
      <iframe
        className="w-full h-full"
        src={src}
        title="YouTube live"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}

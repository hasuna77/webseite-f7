"use client";

import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { Eyebrow } from "@/components/ui/Container";

/**
 * Video, dessen Wiedergabeposition an den Scrollfortschritt gekoppelt ist
 * ("Scroll-Scrubbing"): Statt automatisch abzuspielen, bewegt sich das
 * Video exakt synchron mit, während die Section durchscrollt wird.
 *
 * Ohne hinterlegte Videodatei (public/videos/showreel.mp4) wird ein
 * gebrandeter Platzhalter angezeigt statt eines kaputten Players.
 */
export function ScrollScrubVideo({
  src = "/videos/showreel.mp4",
  poster = "/videos/showreel-poster.jpg",
  eyebrow = "Showreel",
  title = "In Bewegung.",
}: {
  src?: string;
  poster?: string;
  eyebrow?: string;
  title?: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [errored, setErrored] = useState(false);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // Kein "ready"-Flag über einen Event-Handler: video.duration direkt am
  // Element abzufragen ist robuster, da onLoadedMetadata je nach
  // Hydration-Timing verpasst werden kann.
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;
    const target = Math.min(video.duration, Math.max(0, progress * video.duration));
    if (Math.abs(video.currentTime - target) > 0.05) {
      video.currentTime = target;
    }
  });

  return (
    <section ref={wrapperRef} className="relative h-[250vh] bg-paper">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center gap-6 px-4">
        <div className="text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">{title}</h2>
        </div>

        <div className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-[2.5rem] border border-beige-dark/30 bg-ink shadow-soft">
          {!errored ? (
            <video
              ref={videoRef}
              poster={poster}
              muted
              playsInline
              preload="auto"
              onError={() => setErrored(true)}
              className="h-full w-full object-cover"
            >
              <source src={src.replace(/\.mp4$/, ".webm")} type="video/webm" />
              <source src={src} type="video/mp4" />
            </video>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-beige via-paper-soft to-white px-10 text-center">
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-green">
                Showreel folgt
              </span>
              <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
                Lege dein Video unter <code className="rounded bg-beige px-1.5 py-0.5">public/videos/showreel.mp4</code> ab –
                diese Fläche spielt es dann synchron zum Scrollen ab.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

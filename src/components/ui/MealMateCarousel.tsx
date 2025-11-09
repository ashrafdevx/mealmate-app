"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Button from "@/components/ui/Button";

type Slide = {
  type: "image" | "video";
  src: string;
  alt?: string;
  headline: string;
  caption: string;
};

type MealMateCarouselProps = {
  slides?: Slide[];
  autoIntervalMs?: number;
  className?: string;
};

const defaultSlides: Slide[] = [
  {
    type: "video",
    src: "https://cdn.coverr.co/videos/coverr-slicing-vegetables-1614/1080p.mp4",
    alt: "Food prep video",
    headline: "Smart Meal Planning",
    caption: "Plan a week in minutes with AI suggestions.",
  },
  {
    type: "video",
    src: "https://cdn.coverr.co/videos/coverr-busy-chef-3186/1080p.mp4",
    alt: "MealMate planner demo",
    headline: "Visual Weekly Planner",
    caption: "Drag, drop, and swap meals effortlessly.",
  },
  {
    type: "video",
    src: "https://cdn.coverr.co/videos/coverr-flipping-vegetables-in-a-pan-6862/1080p.mp4",
    alt: "Cooking veggies video",
    headline: "Cook Along Clips",
    caption: "Quick step videos to guide your cooking.",
  },
  {
    type: "video",
    src: "https://cdn.coverr.co/videos/coverr-pouring-sauce-on-pasta-4051/1080p.mp4",
    alt: "Pouring sauce video",
    headline: "Tasty Inspiration",
    caption: "See and feel recipes come to life.",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1600&auto=format&fit=crop",
    alt: "Chickpea bowl",
    headline: "Discover Delicious Recipes",
    caption: "Browse chef-curated ideas for every diet.",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1600&auto=format&fit=crop",
    alt: "Veggie stir fry",
    headline: "Cook Faster, Eat Better",
    caption: "Quick weeknight wins and slow-weekend stars.",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600&auto=format&fit=crop",
    alt: "Chicken wrap",
    headline: "High-Protein Picks",
    caption: "Hit your macros without sacrificing flavor.",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600&auto=format&fit=crop",
    alt: "Yogurt parfait",
    headline: "Breakfast to Go",
    caption: "Make mornings effortless with overnight ideas.",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1600&auto=format&fit=crop",
    alt: "Salmon bowl",
    headline: "Fresh & Balanced",
    caption: "Nutritious meals for busy schedules.",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1600&auto=format&fit=crop",
    alt: "Veggie power bowl",
    headline: "Create Auto Shopping Lists",
    caption: "One click. Organized by aisle. Ready to shop.",
  },
];

export default function MealMateCarousel({ slides = defaultSlides, autoIntervalMs = 5500, className = "" }: MealMateCarouselProps) {
  const N = slides.length;
  const extendedSlides = useMemo(() => [slides[N - 1], ...slides, slides[0]], [slides, N]);

  const [current, setCurrent] = useState(1); // 1..N in extended track
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isHovering, setHovering] = useState(false);
  const [dragOffset, setDragOffset] = useState(0); // px
  const startXRef = useRef<number | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0); // 0..N-1 real index

  const normalizedIndex = (current - 1 + N) % N; // 0..N-1

  const goTo = useCallback(
    (nextIndex: number) => {
      setIsTransitioning(true);
      setCurrent(nextIndex);
    },
    []
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Auto-slide
  useEffect(() => {
    if (isHovering || modalOpen) return;
    timerRef.current = window.setTimeout(() => {
      next();
    }, autoIntervalMs) as unknown as number;
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [current, isHovering, modalOpen, autoIntervalMs, next]);

  // Handle seamless loop at edges
  const onTransitionEnd = () => {
    if (current === 0) {
      setIsTransitioning(false);
      setCurrent(N);
    } else if (current === N + 1) {
      setIsTransitioning(false);
      setCurrent(1);
    }
  };

  useEffect(() => {
    if (!isTransitioning) {
      // re-enable transition after jump
      const id = window.setTimeout(() => setIsTransitioning(true), 20);
      return () => window.clearTimeout(id);
    }
  }, [isTransitioning]);

  // Drag/Swipe
  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    startXRef.current = e.clientX;
    setDragOffset(0);
    setIsTransitioning(false);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (startXRef.current == null) return;
    const dx = e.clientX - startXRef.current;
    setDragOffset(dx);
  };
  const onPointerUp = () => {
    if (startXRef.current == null) return;
    const threshold = 60; // px
    const dx = dragOffset;
    setDragOffset(0);
    setIsTransitioning(true);
    startXRef.current = null;
    if (dx > threshold) {
      prev();
    } else if (dx < -threshold) {
      next();
    }
  };

  // Keyboard navigation (carousel & modal)
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (modalOpen) {
      if (e.key === "Escape") setModalOpen(false);
      if (e.key === "ArrowRight") setModalIndex((i) => (i + 1) % N);
      if (e.key === "ArrowLeft") setModalIndex((i) => (i - 1 + N) % N);
      return;
    }
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  const openModalAt = (i: number) => {
    setModalIndex(i);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const trackStyle: React.CSSProperties = {
    transform: `translateX(calc(${-(current * 100)}% + ${dragOffset}px))`,
  };

  // Ensure current visible video plays, others pause (helps Safari/iOS autoplay)
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      try {
        if (i === current) {
          v.muted = true;
          const p = v.play();
          if (p && typeof p.then === "function") {
            p.catch(() => {
              // Ignore autoplay block; poster will be visible
            });
          }
        } else {
          v.pause();
        }
      } catch {}
    });
  }, [current]);

  // Pause videos when modal opens
  useEffect(() => {
    if (modalOpen) {
      videoRefs.current.forEach((v) => v?.pause());
    }
  }, [modalOpen]);

  return (
    <section
      className={`w-full bg-[#0E0F11] text-[#F9FAFB] select-none ${className}`}
      onKeyDown={onKeyDown}
      aria-roledescription="carousel"
    >
      <div
        className="mx-auto w-full max-w-[1920px] relative overflow-hidden"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {/* Track */}
        <div
          ref={trackRef}
          className={`flex w-full ${isTransitioning ? "transition-transform duration-500 ease-in-out" : "transition-none"}`}
          style={trackStyle}
          onTransitionEnd={onTransitionEnd}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          role="group"
        >
          {extendedSlides.map((s, idx) => (
            <div key={idx} className="relative shrink-0 w-full aspect-[16/9] sm:aspect-[21/9] bg-[#0E0F11]">
              {s.type === "image" ? (
                <img
                  src={s.src}
                  alt={s.alt || s.headline}
                  className="h-full w-full object-cover"
                  onClick={() => openModalAt((idx - 1 + N) % N)}
                />
              ) : (
                <video
                  src={s.src}
                  className="h-full w-full object-cover bg-black"
                  muted
                  loop
                  autoPlay
                  playsInline
                  preload="auto"
                  // Still image to avoid black frame on some browsers before playback starts
                  poster={
                    idx % 2 === 0
                      ? "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1600&auto=format&fit=crop"
                      : "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1600&auto=format&fit=crop"
                  }
                  ref={(el) => {
                    videoRefs.current[idx] = el;
                  }}
                  onLoadedMetadata={(e) => {
                    if (idx === current) {
                      try {
                        e.currentTarget.muted = true;
                        e.currentTarget.play().catch(() => {});
                      } catch {}
                    }
                  }}
                  onClick={() => openModalAt((idx - 1 + N) % N)}
                />
              )}

              {/* Overlay gradient for readability */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.45),transparent_45%),radial-gradient(circle_at_top_right,rgba(0,0,0,0.35),transparent_40%)]" />

              {/* Text overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-8">
                <div className="max-w-xl">
                  <h3
                    className="text-2xl sm:text-4xl font-semibold text-[#FACC15]"
                    style={{ textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}
                  >
                    {s.headline}
                  </h3>
                  <p
                    className="mt-2 text-sm sm:text-base text-white/95"
                    style={{ textShadow: "0 1px 8px rgba(0,0,0,0.55)" }}
                  >
                    {s.caption}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-xs sm:text-sm text-[#FACC15]">{((idx - 1 + N) % N) + 1} of {N}</span>
                  <Button as="a" href="/recipes" size="sm" className="hover:scale-105">
                    Explore More Recipes
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Prev/Next controls */}
        <button
          aria-label="Previous slide"
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#1F2937] bg-[#0E0F11]/80 text-[#FACC15] hover:text-[#EAB308] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FACC15]/40"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>
        <button
          aria-label="Next slide"
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#1F2937] bg-[#0E0F11]/80 text-[#FACC15] hover:text-[#EAB308] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FACC15]/40"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
          </svg>
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i + 1)}
              className={`h-2.5 w-2.5 rounded-full border border-[#FACC15] transition-transform ${
                i === normalizedIndex ? "bg-[#FACC15] scale-110" : "bg-transparent hover:scale-105"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Modal / Lightbox */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={closeModal}
          onKeyDown={onKeyDown}
          tabIndex={-1}
        >
          <div className="relative mx-auto w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            {/* Media */}
            <div className="relative w-full aspect-[16/9] bg-black rounded-xl overflow-hidden">
              {slides[modalIndex].type === "image" ? (
                <img src={slides[modalIndex].src} alt={slides[modalIndex].alt || slides[modalIndex].headline} className="h-full w-full object-contain" />
              ) : (
                <video
                  src={slides[modalIndex].src}
                  className="h-full w-full object-contain"
                  muted
                  loop
                  autoPlay
                  playsInline
                  controls
                />
              )}
              {/* Overlay header text */}
              <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-start justify-between">
                <div>
                  <h3 className="text-[#FACC15] text-lg sm:text-xl font-semibold" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}>
                    {slides[modalIndex].headline}
                  </h3>
                  <p className="text-white/95 text-xs sm:text-sm" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.55)" }}>
                    {slides[modalIndex].caption}
                  </p>
                </div>
                <button
                  aria-label="Close"
                  onClick={closeModal}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#1F2937] bg-[#0E0F11]/80 text-[#FACC15] hover:text-[#EAB308] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FACC15]/40"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                  </svg>
                </button>
              </div>

              {/* Prev/Next in modal */}
              <button
                aria-label="Previous"
                onClick={() => setModalIndex((i) => (i - 1 + N) % N)}
                className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#1F2937] bg-[#0E0F11]/80 text-[#FACC15] hover:text-[#EAB308] hover:scale-105"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                </svg>
              </button>
              <button
                aria-label="Next"
                onClick={() => setModalIndex((i) => (i + 1) % N)}
                className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#1F2937] bg-[#0E0F11]/80 text-[#FACC15] hover:text-[#EAB308] hover:scale-105"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
                </svg>
              </button>

              {/* Bottom-left slide number + CTA */}
              <div className="absolute bottom-0 left-0 p-4 sm:p-6 flex items-center gap-3">
                <span className="text-[#FACC15] text-xs sm:text-sm">{modalIndex + 1} of {N}</span>
                <Button as="a" href="/recipes" size="sm" className="hover:scale-105">Explore More Recipes</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

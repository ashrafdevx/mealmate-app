import React from "react";

export function LogoMark() {
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-[#FACC15] text-[#0E0F11] font-black">
      M
    </span>
  );
}

export function MenuIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function PlusIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M11 5h2v14h-2zM5 11h14v2H5z" />
    </svg>
  );
}

export function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={`h-4 w-4 ${className}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-7.364 7.364a1 1 0 01-1.414 0L3.293 9.743a1 1 0 111.414-1.414l3.04 3.04 6.657-6.657a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function SparklesIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M5 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5zm13 6l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" />
    </svg>
  );
}

export function DragIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <circle cx="9" cy="6" r="1.5" />
      <circle cx="9" cy="12" r="1.5" />
      <circle cx="9" cy="18" r="1.5" />
      <circle cx="15" cy="6" r="1.5" />
      <circle cx="15" cy="12" r="1.5" />
      <circle cx="15" cy="18" r="1.5" />
    </svg>
  );
}

export function CartIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M7 4h-2l-1 2h2l3.6 7.59-1.35 2.44A2 2 0 009 18h10v-2H9.42a.25.25 0 01-.22-.13l.03-.06.9-1.61h6.45a2 2 0 001.79-1.11L21 7H6.21l-.94-2zM7 20a2 2 0 104 0 2 2 0 10-4 0zm8 0a2 2 0 104 0 2 2 0 10-4 0z" />
    </svg>
  );
}

export function HeartBeatIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path
        d="M20.8 7.6c-1.1-2.1-3.3-3.6-5.8-3.6-2.1 0-3.9 1-5 2.6C8 5 6.2 4 4.1 4 1.6 4-.6 5.5-1.7 7.6c-1.4 2.6-.6 5.9 1.9 7.8l7.4 5.7c.5.4 1.2.4 1.7 0l7.4-5.7c2.5-1.9 3.3-5.2 1.9-7.8z"
        transform="translate(2 0) scale(.8)"
      />
      <path d="M2 13h3l2-4 3 8 2-4h3" stroke="#FACC15" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function ArrowRightIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13 5l7 7-7 7v-4H4v-6h9V5z" />
    </svg>
  );
}

export function TwitterIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden fill="currentColor">
      <path d="M22 5.8c-.7.3-1.4.6-2.2.7.8-.5 1.4-1.2 1.7-2.1-.7.4-1.6.8-2.4 1-1.4-1.5-3.7-1.6-5.2-.2-1.1 1-1.5 2.6-1 4C9.1 9 6.4 7.6 4.6 5.3c-.9 1.5-.5 3.4.9 4.4-.6 0-1.1-.2-1.6-.4 0 1.5 1 2.9 2.5 3.2-.5.1-1.1.2-1.6.1.4 1.3 1.7 2.2 3.1 2.3-1.2.9-2.6 1.4-4.1 1.4H3c1.5 1 3.2 1.5 4.9 1.5 6 0 9.4-5 9.4-9.4v-.4c.7-.5 1.3-1.1 1.7-1.8z" />
    </svg>
  );
}

export function InstagramIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden fill="currentColor">
      <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3.5A5.5 5.5 0 1111.999 20.5 5.5 5.5 0 0112 7.5zm0 2A3.5 3.5 0 1015.5 13 3.5 3.5 0 0012 9.5zM18 6.2a1 1 0 110 2 1 1 0 010-2z" />
    </svg>
  );
}

export function YouTubeIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden fill="currentColor">
      <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8zM9.8 15.5v-7l6.3 3.5-6.3 3.5z" />
    </svg>
  );
}

export function SocialIcon({ type, href, label }: { type: "twitter" | "instagram" | "youtube"; href: string; label: string }) {
  const Icon = type === "twitter" ? TwitterIcon : type === "instagram" ? InstagramIcon : YouTubeIcon;
  return (
    <a
      href={href}
      aria-label={label}
      className="inline-flex items-center justify-center rounded-lg border border-[#1F2937] p-2 text-[#F9FAFB] hover:border-[#FACC15] focus:outline-none focus:ring-2 focus:ring-[#FACC15]/40"
    >
      <Icon />
    </a>
  );
}


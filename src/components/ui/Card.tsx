import React from "react";

export default function Card({ children, className = "" }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`rounded-2xl border border-[#111827] bg-[#0E0F11] shadow-lg shadow-black/10 ${className}`}>
      {children}
    </div>
  );
}


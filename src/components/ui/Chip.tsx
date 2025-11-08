import React from "react";

export default function Chip({ children }: React.PropsWithChildren) {
  return (
    <span className="inline-flex items-center rounded-full border border-[#1F2937] bg-[#0E0F11] px-3 py-1 text-xs text-[#F9FAFB] hover:border-[#FACC15] transition">
      {children}
    </span>
  );
}


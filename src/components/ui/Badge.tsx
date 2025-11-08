import React from "react";

export default function Badge({ children }: React.PropsWithChildren) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#1F2937] bg-[#0E0F11] px-3 py-1 text-xs">
      <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
      {children}
    </span>
  );
}


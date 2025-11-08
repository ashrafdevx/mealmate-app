import React from "react";

export default function SectionTitle({ eyebrow, children }: React.PropsWithChildren<{ eyebrow?: string }>) {
  return (
    <div>
      {eyebrow && (
        <span className="text-xs font-medium tracking-wide text-[#FACC15]">{eyebrow}</span>
      )}
      <h2 className="mt-2 text-2xl sm:text-3xl font-semibold leading-tight">{children}</h2>
    </div>
  );
}


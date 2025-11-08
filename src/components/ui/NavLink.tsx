import Link from "next/link";
import React from "react";

export default function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm text-[#F9FAFB] hover:text-[#FACC15] focus:outline-none focus:ring-2 focus:ring-[#FACC15]/40 rounded-lg px-2 py-1"
    >
      {children}
    </Link>
  );
}


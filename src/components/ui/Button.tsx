import React from "react";

type ButtonProps = React.PropsWithChildren<
  {
    variant?: "primary" | "secondary" | "outline";
    size?: "sm" | "md" | "lg";
    className?: string;
    as?: any;
    href?: string;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
>;

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  as = "button",
  href,
  ...props
}: ButtonProps) {
  const As: any = as;
  const sizes: Record<string, string> = {
    sm: "px-3 py-2 text-sm rounded-xl",
    md: "px-4 py-2.5 rounded-xl",
    lg: "px-5 py-3 text-base rounded-2xl",
  };
  const base =
    "inline-flex items-center justify-center font-medium transition focus:outline-none focus:ring-2";
  const variants: Record<string, string> = {
    primary:
      "bg-[#FACC15] text-[#0E0F11] hover:bg-[#EAB308] shadow-lg shadow-black/10 focus:ring-[#FACC15]/40 border border-transparent",
    secondary:
      "border border-[#1F2937] bg-[#0E0F11] text-[#F9FAFB] hover:border-[#FACC15] focus:ring-[#FACC15]/40",
    outline:
      "border border-[#FACC15]/40 text-[#FACC15] hover:bg-[#111827] focus:ring-[#FACC15]/40",
  };
  return (
    <As href={href} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {children}
    </As>
  );
}


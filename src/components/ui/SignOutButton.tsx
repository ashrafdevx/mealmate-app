"use client";

import React from "react";
import { signOut } from "next-auth/react";
import Button from "@/components/ui/Button";

type Props = {
  className?: string;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
};

export default function SignOutButton({ className = "", size = "md", fullWidth = false }: Props) {
  const onClick = () => {
    void signOut({ callbackUrl: "/" });
  };
  return (
    <Button
      onClick={onClick}
      size={size}
      className={`${className} ${fullWidth ? "w-full" : ""} bg-gray-300 text-[#0E0F11] hover:bg-gray-200 border border-gray-300`}
    >
      Logout
    </Button>
  );
}

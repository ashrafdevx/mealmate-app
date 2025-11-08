import Link from "next/link";
import Button from "@/components/ui/Button";
import NavLink from "@/components/ui/NavLink";
import { LogoMark, MenuIcon } from "@/components/icons";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#111827] bg-[#0E0F11]/85 backdrop-blur">
      <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl h-16 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#FACC15]/40 rounded-lg px-2">
            <LogoMark />
            <span className="text-lg font-semibold tracking-tight text-[#FACC15]">MealMate</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6" aria-label="Main">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/recipes">Recipes</NavLink>
            <NavLink href="/meal-planner">Meal Planner</NavLink>
            <NavLink href="/pricing">Pricing</NavLink>
            <NavLink href="/faq">FAQ</NavLink>
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="text-sm text-[#F9FAFB] hover:text-[#FACC15] focus:outline-none focus:ring-2 focus:ring-[#FACC15]/40 rounded-lg px-2 py-1">
              Login
            </Link>
            <Button as="a" href="/register" size="sm">Start Free</Button>
          </div>
          <details className="md:hidden relative">
            <summary className="list-none inline-flex items-center justify-center rounded-lg border border-[#1F2937] p-2 text-[#F9FAFB] hover:border-[#FACC15] focus:outline-none focus:ring-2 focus:ring-[#FACC15]/40 cursor-pointer">
              <MenuIcon />
            </summary>
            <div className="absolute right-0 mt-3 w-72 max-w-[90vw] rounded-2xl border border-[#111827] bg-[#0E0F11] shadow-2xl shadow-black/40">
              <nav className="p-4 grid gap-2" aria-label="Mobile">
                <Link className="inline-flex items-center px-3 py-2 rounded-xl border border-[#1F2937] hover:border-[#FACC15] transition" href="/">Home</Link>
                <Link className="inline-flex items-center px-3 py-2 rounded-xl border border-[#1F2937] hover:border-[#FACC15] transition" href="/recipes">Recipes</Link>
                <Link className="inline-flex items-center px-3 py-2 rounded-xl border border-[#1F2937] hover:border-[#FACC15] transition" href="/meal-planner">Meal Planner</Link>
                <Link className="inline-flex items-center px-3 py-2 rounded-xl border border-[#1F2937] hover:border-[#FACC15] transition" href="/pricing">Pricing</Link>
                <Link className="inline-flex items-center px-3 py-2 rounded-xl border border-[#1F2937] hover:border-[#FACC15] transition" href="/faq">FAQ</Link>
                <hr className="my-2 border-[#111827]" />
                <Link className="inline-flex items-center px-3 py-2 rounded-xl border border-[#1F2937] hover:border-[#FACC15] transition" href="/login">Login</Link>
                <Button as="a" href="/register" className="mt-2">Start Free</Button>
              </nav>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}


import Link from "next/link";
import Button from "@/components/ui/Button";
import { LogoMark, SocialIcon } from "@/components/icons";

export default function SiteFooter() {
  return (
    <footer className="border-t border-[#111827] bg-[#0E0F11]">
      <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              <LogoMark />
              <span className="text-lg font-semibold text-[#FACC15]">MealMate</span>
            </Link>
            <p className="mt-3 text-sm text-[#D1D5DB]">
              Plan smarter meals with confidence. Friendly, fast, and free to start.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <SocialIcon label="Twitter" href="#" type="twitter" />
              <SocialIcon label="Instagram" href="#" type="instagram" />
              <SocialIcon label="YouTube" href="#" type="youtube" />
            </div>
          </div>
          <div>
            <h4 className="font-semibold">Product</h4>
            <ul className="mt-3 space-y-2 text-sm text-[#D1D5DB]">
              <li><Link className="hover:text-[#FACC15]" href="/recipes">Recipes</Link></li>
              <li><Link className="hover:text-[#FACC15]" href="/meal-planner">Meal Planner</Link></li>
              <li><Link className="hover:text-[#FACC15]" href="/pricing">Pricing</Link></li>
              <li><Link className="hover:text-[#FACC15]" href="/faq">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-[#D1D5DB]">
              <li><a className="hover:text-[#FACC15]" href="#">About</a></li>
              <li><a className="hover:text-[#FACC15]" href="#">Careers</a></li>
              <li><a className="hover:text-[#FACC15]" href="#">Press</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Newsletter</h4>
            <p className="mt-2 text-sm text-[#D1D5DB]">Tips, ideas, and seasonal recipes - monthly.</p>
            <form className="mt-3 flex items-center gap-2">
              <input
                type="email"
                aria-label="Email address"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-[#1F2937] bg-[#0E0F11] px-3 py-2 text-sm placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#FACC15]/40"
              />
              <Button size="sm">Subscribe</Button>
            </form>
            <p className="mt-2 text-xs text-[#9CA3AF]">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
        <div className="mx-auto max-w-7xl border-t border-[#111827] py-6 text-xs text-[#9CA3AF]">
          c 2025 MealMate. All rights reserved.
        </div>
      </div>
    </footer>
  );
}


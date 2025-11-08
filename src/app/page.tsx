import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0E0F11] text-[#F9FAFB] scroll-smooth">
      <Header />

      {/* Hero */}
      <section className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-10 pt-10 pb-16">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <Badge>Smart meal planning</Badge>
            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight">
              Cook smarter. Plan faster. Eat better.
            </h1>
            <p className="mt-4 text-[#D1D5DB] max-w-xl">
              Plan meals in minutes with smart suggestions and auto-generated
              shopping lists.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button as="a" href="/register">
                Plan My Week
              </Button>
              <Button variant="secondary" as="a" href="/recipes">
                Browse Recipes
              </Button>
            </div>
            <div className="mt-6 flex items-center gap-2 text-sm text-[#D1D5DB]">
              <Stars />
              <span>Trusted by 20k+ home cooks</span>
            </div>

            {/* Ingredient chips */}
            <div className="mt-8 rounded-2xl border border-[#111827] bg-[#0E0F11] p-4 shadow-lg shadow-black/10">
              <div className="flex flex-wrap items-center gap-2">
                <Chip>Chicken</Chip>
                <Chip>Garlic</Chip>
                <Chip>Broccoli</Chip>
                <Button size="sm" variant="outline" className="ml-auto">
                  Suggest Meal
                </Button>
              </div>
              <div className="mt-4 text-sm text-[#D1D5DB]">
                <span className="text-[#FACC15] font-medium">Idea:</span>{" "}
                Lemon-Garlic Chicken with Broccoli & Rice
              </div>
            </div>
          </div>

          {/* Collage */}
          <div aria-hidden="true" className="relative">
            <div className="relative aspect-[4/3] rounded-2xl border border-[#111827] bg-[#0E0F11] p-4 shadow-lg shadow-black/20 overflow-hidden">
              <Tile
                className="top-4 left-4"
                title="Spicy Chickpea Bowl"
                time="25 min"
                img="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop"
              />
              <Tile
                className="top-8 right-6"
                title="Lemon Garlic Chicken"
                time="30 min"
                img="https://images.unsplash.com/photo-1604908554007-089805c23870?q=80&w=1200&auto=format&fit=crop"
              />
              <Tile
                className="bottom-6 left-10"
                title="Veggie Stir Fry"
                time="20 min"
                img="https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1200&auto=format&fit=crop"
              />
              <Tile
                className="bottom-8 right-10"
                title="Overnight Oats"
                time="10 min"
                img="https://images.unsplash.com/photo-1541976076758-347942db1970?q=80&w=1200&auto=format&fit=crop"
              />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.08),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(250,204,21,0.06),transparent_35%)]" />
            </div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-10 py-12">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Why MealMate">
            Everything you need to plan fast
          </SectionTitle>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <ValueCard
              icon={<SparklesIcon />}
              title="Smart Suggestions"
              desc="Add ingredients - get ideas that fit your taste and time."
            />
            <ValueCard
              icon={<DragIcon />}
              title="Drag-and-Drop Planner"
              desc="Build your week visually. Swap and move in seconds."
            />
            <ValueCard
              icon={<CartIcon />}
              title="1-Click Shopping List"
              desc="Auto-grouped by aisles, ready for the store."
            />
            <ValueCard
              icon={<HeartBeatIcon />}
              title="Nutrition at a Glance"
              desc="Quick badges for calories and macros."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-10 py-12">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="How MealMate Works">
            Plan dinner in three steps
          </SectionTitle>
          <ol className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <StepCard
              step="1"
              title="Add ingredients"
              desc="Tell MealMate what's in your kitchen."
            />
            <StepCard
              step="2"
              title="Get ideas"
              desc="Tailored recipes that match your goals."
            />
            <StepCard
              step="3"
              title="Shopping list"
              desc="One click builds a grouped grocery list."
            />
          </ol>
        </div>
      </section>

      {/* Recipe Discovery Grid */}
      <section className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-10 py-12">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Discover">
            Find your next favorite
          </SectionTitle>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recipeCards.map((r) => (
              <RecipeCard key={r.title} {...r} />
            ))}
          </div>
          <div className="mt-6">
            <Link
              href="/recipes"
              className="inline-flex items-center gap-2 text-[#FACC15] hover:text-[#EAB308]"
            >
              Explore Recipes <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* Meal Planner Preview */}
      <section className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-10 py-12">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Planner">Your Week at a Glance</SectionTitle>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-[#111827] bg-[#0E0F11] shadow-lg shadow-black/10">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-[#111827] text-[#F9FAFB]">
                  {weekdays.map((d) => (
                    <th key={d} className="px-4 py-3 text-left font-semibold">
                      {d}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {weekPreview.map((day, i) => (
                    <td key={i} className="align-top p-4">
                      <div className="flex flex-col gap-2">
                        {day.map((m) => (
                          <span
                            key={m}
                            className="inline-flex items-center gap-2 rounded-xl border border-[#1F2937] bg-[#0E0F11] px-3 py-2 shadow-md shadow-black/10"
                          >
                            <span className="h-2 w-2 rounded-full bg-[#FACC15]" />
                            {m}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-6">
            <Button as="a" href="/register">
              Try the Planner -&gt;
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-10 py-12 bg-[#111827]/40">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Loved by home cooks">
            Real words from real kitchens
          </SectionTitle>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <Testimonial key={t.name} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-10 py-12">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Pricing">
            Simple plans for better meals
          </SectionTitle>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <PriceCard
              highlight
              title="Free"
              price="$0"
              period="forever"
              bullets={[
                "Browse recipes",
                "Basic planner",
                "Standard shopping list",
                "1 device sync",
              ]}
              cta="Get Started"
              href="/register"
              note="Great for getting started."
            />
            <PriceCard
              title="Pro"
              price="$8"
              period="/mo"
              bullets={[
                "Smart suggestions",
                "Advanced drag-and-drop",
                "Nutrition insights",
                "Multi-device sync",
              ]}
              cta="Upgrade Now"
              href="/pricing"
              note="Unlock serious planning power."
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-10 py-12">
        <div className="mx-auto max-w-3xl">
          <SectionTitle eyebrow="FAQ">Questions, answered</SectionTitle>
          <div className="mt-6 divide-y divide-[#111827] rounded-2xl border border-[#111827] bg-[#0E0F11]">
            {faqs.map((f, idx) => (
              <details key={idx} className="group p-5 open:bg-[#0F1113]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <h3 className="text-base font-medium">{f.q}</h3>
                  <span className="ml-4 rounded-full border border-[#1F2937] p-1 text-[#9CA3AF] group-open:rotate-45 transition-transform">
                    <PlusIcon />
                  </span>
                </summary>
                <p className="mt-3 text-sm text-[#D1D5DB]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-[#111827] bg-[#0E0F11]">
      <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              <LogoMark />
              <span className="text-lg font-semibold text-[#FACC15]">
                MealMate
              </span>
            </Link>
            <p className="mt-3 text-sm text-[#D1D5DB]">
              Plan smarter meals with confidence. Friendly, fast, and free to
              start.
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
              <li>
                <Link className="hover:text-[#FACC15]" href="/recipes">
                  Recipes
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#FACC15]" href="/meal-planner">
                  Meal Planner
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#FACC15]" href="/pricing">
                  Pricing
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#FACC15]" href="/faq">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-[#D1D5DB]">
              <li>
                <a className="hover:text-[#FACC15]" href="#">
                  About
                </a>
              </li>
              <li>
                <a className="hover:text-[#FACC15]" href="#">
                  Careers
                </a>
              </li>
              <li>
                <a className="hover:text-[#FACC15]" href="#">
                  Press
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Newsletter</h4>
            <p className="mt-2 text-sm text-[#D1D5DB]">
              Tips, ideas, and seasonal recipes - monthly.
            </p>
            <form className="mt-3 flex items-center gap-2">
              <input
                type="email"
                aria-label="Email address"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-[#1F2937] bg-[#0E0F11] px-3 py-2 text-sm placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#FACC15]/40"
              />
              <Button size="sm">Subscribe</Button>
            </form>
            <p className="mt-2 text-xs text-[#9CA3AF]">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-7xl border-t border-[#111827] py-6 text-xs text-[#9CA3AF]">
          © 2025 MealMate. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
/* ---------- Header ---------- */
function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#111827] bg-[#0E0F11]/85 backdrop-blur">
      <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl h-16 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#FACC15]/40 rounded-lg px-2"
          >
            <LogoMark />
            <span className="text-lg font-semibold tracking-tight text-[#FACC15]">
              MealMate
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6" aria-label="Main">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/recipes">Recipes</NavLink>
            <NavLink href="/meal-planner">Meal Planner</NavLink>
            <NavLink href="/pricing">Pricing</NavLink>
            <NavLink href="/faq">FAQ</NavLink>
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm text-[#F9FAFB] hover:text-[#FACC15] focus:outline-none focus:ring-2 focus:ring-[#FACC15]/40 rounded-lg px-2 py-1"
            >
              Login
            </Link>
            <Button as="a" href="/register" size="sm">
              Start Free
            </Button>
          </div>
          {/* Mobile menu via details (no JS state) */}
          <details className="md:hidden relative">
            <summary className="list-none inline-flex items-center justify-center rounded-lg border border-[#1F2937] p-2 text-[#F9FAFB] hover:border-[#FACC15] focus:outline-none focus:ring-2 focus:ring-[#FACC15]/40 cursor-pointer">
              <MenuIcon />
            </summary>
            <div className="absolute right-0 mt-3 w-72 max-w-[90vw] rounded-2xl border border-[#111827] bg-[#0E0F11] shadow-2xl shadow-black/40">
              <nav className="p-4 grid gap-2" aria-label="Mobile">
                <Link
                  className="inline-flex items-center px-3 py-2 rounded-xl border border-[#1F2937] hover:border-[#FACC15] transition"
                  href="/"
                >
                  Home
                </Link>
                <Link
                  className="inline-flex items-center px-3 py-2 rounded-xl border border-[#1F2937] hover:border-[#FACC15] transition"
                  href="/recipes"
                >
                  Recipes
                </Link>
                <Link
                  className="inline-flex items-center px-3 py-2 rounded-xl border border-[#1F2937] hover:border-[#FACC15] transition"
                  href="/meal-planner"
                >
                  Meal Planner
                </Link>
                <Link
                  className="inline-flex items-center px-3 py-2 rounded-xl border border-[#1F2937] hover:border-[#FACC15] transition"
                  href="/pricing"
                >
                  Pricing
                </Link>
                <Link
                  className="inline-flex items-center px-3 py-2 rounded-xl border border-[#1F2937] hover:border-[#FACC15] transition"
                  href="/faq"
                >
                  FAQ
                </Link>
                <hr className="my-2 border-[#111827]" />
                <Link
                  className="inline-flex items-center px-3 py-2 rounded-xl border border-[#1F2937] hover:border-[#FACC15] transition"
                  href="/login"
                >
                  Login
                </Link>
                <Button as="a" href="/register" className="mt-2">
                  Start Free
                </Button>
              </nav>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}

/* ---------- Reusable UI ---------- */
function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  as = "button",
  href,
  ...props
}: any) {
  const As: any = as;
  const sizes: any = {
    sm: "px-3 py-2 text-sm rounded-xl",
    md: "px-4 py-2.5 rounded-xl",
    lg: "px-5 py-3 text-base rounded-2xl",
  };
  const base =
    "inline-flex items-center justify-center font-medium transition focus:outline-none focus:ring-2";
  const variants: any = {
    primary:
      "bg-[#FACC15] text-[#0E0F11] hover:bg-[#EAB308] shadow-lg shadow-black/10 focus:ring-[#FACC15]/40 border border-transparent",
    secondary:
      "border border-[#1F2937] bg-[#0E0F11] text-[#F9FAFB] hover:border-[#FACC15] focus:ring-[#FACC15]/40",
    outline:
      "border border-[#FACC15]/40 text-[#FACC15] hover:bg-[#111827] focus:ring-[#FACC15]/40",
  };
  return (
    <As
      href={href}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </As>
  );
}
function Badge({ children }: any) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#1F2937] bg-[#0E0F11] px-3 py-1 text-xs">
      <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
      {children}
    </span>
  );
}
function Chip({ children }: any) {
  return (
    <span className="inline-flex items-center rounded-full border border-[#1F2937] bg-[#0E0F11] px-3 py-1 text-xs text-[#F9FAFB] hover:border-[#FACC15] transition">
      {children}
    </span>
  );
}
function Card({ children, className = "" }: any) {
  return (
    <div
      className={`rounded-2xl border border-[#111827] bg-[#0E0F11] shadow-lg shadow-black/10 ${className}`}
    >
      {children}
    </div>
  );
}
function SectionTitle({ eyebrow, children }: any) {
  return (
    <div>
      <span className="text-xs font-medium tracking-wide text-[#FACC15]">
        {eyebrow}
      </span>
      <h2 className="mt-2 text-2xl sm:text-3xl font-semibold leading-tight">
        {children}
      </h2>
    </div>
  );
}
function NavLink({ href, children }: any) {
  return (
    <Link
      href={href}
      className="text-sm text-[#F9FAFB] hover:text-[#FACC15] focus:outline-none focus:ring-2 focus:ring-[#FACC15]/40 rounded-lg px-2 py-1"
    >
      {children}
    </Link>
  );
}
function Stars() {
  return (
    <span className="inline-flex" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="h-4 w-4 text-[#FACC15]"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 00-1.176 0l-2.802 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}
function Tile({ className = "", title, time, img }: any) {
  return (
    <div
      className={`absolute w-[48%] max-w-[280px] rounded-2xl border border-[#111827] bg-[#0E0F11] shadow-lg shadow-black/30 overflow-hidden ${className}`}
    >
      <img src={img} alt="" className="h-28 w-full object-cover" />
      <div className="p-3">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">{title}</div>
          <div className="text-xs text-[#D1D5DB]">{time}</div>
        </div>
        <div className="mt-2 flex items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1 rounded-full border border-[#1F2937] px-2 py-0.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" /> Easy
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-[#1F2937] px-2 py-0.5">
            Dinner
          </span>
        </div>
      </div>
    </div>
  );
}
function ValueCard({ icon, title, desc }: any) {
  return (
    <Card className="p-5">
      <div className="flex items-start gap-3">
        <div className="mt-1 text-[#FACC15]">{icon}</div>
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="mt-1 text-sm text-[#D1D5DB]">{desc}</p>
        </div>
      </div>
    </Card>
  );
}
function StepCard({ step, title, desc }: any) {
  return (
    <Card className="p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FACC15] text-[#0E0F11] font-semibold">
          {step}
        </div>
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="mt-1 text-sm text-[#D1D5DB]">{desc}</p>
        </div>
      </div>
    </Card>
  );
}
function RecipeCard({ img, title, time, tags }: any) {
  return (
    <Card className="overflow-hidden transition-transform hover:scale-[1.01]">
      <img
        src={img}
        alt={`${title} recipe`}
        className="h-44 w-full object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{title}</h3>
          <span className="text-xs text-[#D1D5DB]">{time}</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((t: string) => (
            <span
              key={t}
              className="text-xs rounded-full border border-[#1F2937] px-2 py-1 text-[#D1D5DB]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}
function Testimonial({ name, role, quote, img }: any) {
  return (
    <Card className="p-5 bg-[#111827]">
      <Stars />
      <p className="mt-3 text-sm text-[#D1D5DB]">"{quote}"</p>
      <div className="mt-4 flex items-center gap-3">
        <img
          src={img}
          alt={`${name} avatar`}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-xs text-[#9CA3AF]">{role}</div>
        </div>
      </div>
    </Card>
  );
}
function PriceCard({
  highlight = false,
  title,
  price,
  period,
  bullets,
  cta,
  href,
  note,
}: any) {
  return (
    <Card className={`p-6 ${highlight ? "ring-1 ring-[#FACC15]/40" : ""}`}>
      <div className="flex items-baseline gap-2">
        <h3 className="text-xl font-semibold">{title}</h3>
        {highlight && (
          <span className="text-xs rounded-full border border-[#1F2937] px-2 py-0.5">
            Popular
          </span>
        )}
      </div>
      <div className="mt-3 flex items-end gap-1">
        <span className="text-3xl font-bold">{price}</span>
        <span className="text-sm text-[#9CA3AF]">{period}</span>
      </div>
      <ul className="mt-4 space-y-2 text-sm text-[#D1D5DB]">
        {bullets.map((b: string) => (
          <li key={b} className="flex items-start gap-2">
            <CheckIcon className="mt-1 text-[#FACC15]" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <Button as="a" href={href} className="mt-5 w-full">
        {cta}
      </Button>
      <p className="mt-2 text-xs text-[#9CA3AF]">{note}</p>
    </Card>
  );
}
function Footer() {
  return (
    <footer className="border-t border-[#111827] bg-[#0E0F11]">
      <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              <LogoMark />
              <span className="text-lg font-semibold text-[#FACC15]">
                MealMate
              </span>
            </Link>
            <p className="mt-3 text-sm text-[#D1D5DB]">
              Plan smarter meals with confidence. Friendly, fast, and free to
              start.
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
              <li>
                <Link className="hover:text-[#FACC15]" href="/recipes">
                  Recipes
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#FACC15]" href="/meal-planner">
                  Meal Planner
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#FACC15]" href="/pricing">
                  Pricing
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#FACC15]" href="/faq">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-[#D1D5DB]">
              <li>
                <a className="hover:text-[#FACC15]" href="#">
                  About
                </a>
              </li>
              <li>
                <a className="hover:text-[#FACC15]" href="#">
                  Careers
                </a>
              </li>
              <li>
                <a className="hover:text-[#FACC15]" href="#">
                  Press
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Newsletter</h4>
            <p className="mt-2 text-sm text-[#D1D5DB]">
              Tips, ideas, and seasonal recipes - monthly.
            </p>
            <form className="mt-3 flex items-center gap-2">
              <input
                type="email"
                aria-label="Email address"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-[#1F2937] bg-[#0E0F11] px-3 py-2 text-sm placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#FACC15]/40"
              />
              <Button size="sm">Subscribe</Button>
            </form>
            <p className="mt-2 text-xs text-[#9CA3AF]">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-7xl border-t border-[#111827] py-6 text-xs text-[#9CA3AF]">
          © 2025 MealMate. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

/* ---------- Icons & helpers ---------- */
function LogoMark() {
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-[#FACC15] text-[#0E0F11] font-black">
      M
    </span>
  );
}
function SocialIcon({ type, href, label }: any) {
  const Icon =
    type === "twitter"
      ? TwitterIcon
      : type === "instagram"
      ? InstagramIcon
      : YouTubeIcon;
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
function TwitterIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      aria-hidden
      fill="currentColor"
    >
      <path d="M22 5.8c-.7.3-1.4.6-2.2.7.8-.5 1.4-1.2 1.7-2.1-.7.4-1.6.8-2.4 1-1.4-1.5-3.7-1.6-5.2-.2-1.1 1-1.5 2.6-1 4C9.1 9 6.4 7.6 4.6 5.3c-.9 1.5-.5 3.4.9 4.4-.6 0-1.1-.2-1.6-.4 0 1.5 1 2.9 2.5 3.2-.5.1-1.1.2-1.6.1.4 1.3 1.7 2.2 3.1 2.3-1.2.9-2.6 1.4-4.1 1.4H3c1.5 1 3.2 1.5 4.9 1.5 6 0 9.4-5 9.4-9.4v-.4c.7-.5 1.3-1.1 1.7-1.8z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      aria-hidden
      fill="currentColor"
    >
      <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3.5A5.5 5.5 0 1111.999 20.5 5.5 5.5 0 0112 7.5zm0 2A3.5 3.5 0 1015.5 13 3.5 3.5 0 0012 9.5zM18 6.2a1 1 0 110 2 1 1 0 010-2z" />
    </svg>
  );
}
function YouTubeIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      aria-hidden
      fill="currentColor"
    >
      <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8zM9.8 15.5v-7l6.3 3.5-6.3 3.5z" />
    </svg>
  );
}
function MenuIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function PlusIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M11 5h2v14h-2zM5 11h14v2H5z" />
    </svg>
  );
}
function CheckIcon({ className = "" }: any) {
  return (
    <svg
      className={`h-4 w-4 ${className}`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-7.364 7.364a1 1 0 01-1.414 0L3.293 9.743a1 1 0 111.414-1.414l3.04 3.04 6.657-6.657a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}
function SparklesIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M5 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5zm13 6l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" />
    </svg>
  );
}
function DragIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <circle cx="9" cy="6" r="1.5" />
      <circle cx="9" cy="12" r="1.5" />
      <circle cx="9" cy="18" r="1.5" />
      <circle cx="15" cy="6" r="1.5" />
      <circle cx="15" cy="12" r="1.5" />
      <circle cx="15" cy="18" r="1.5" />
    </svg>
  );
}
function CartIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M7 4h-2l-1 2h2l3.6 7.59-1.35 2.44A2 2 0 009 18h10v-2H9.42a.25.25 0 01-.22-.13l.03-.06.9-1.61h6.45a2 2 0 001.79-1.11L21 7H6.21l-.94-2zM7 20a2 2 0 104 0 2 2 0 10-4 0zm8 0a2 2 0 104 0 2 2 0 10-4 0z" />
    </svg>
  );
}
function HeartBeatIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path
        d="M20.8 7.6c-1.1-2.1-3.3-3.6-5.8-3.6-2.1 0-3.9 1-5 2.6C8 5 6.2 4 4.1 4 1.6 4-.6 5.5-1.7 7.6c-1.4 2.6-.6 5.9 1.9 7.8l7.4 5.7c.5.4 1.2.4 1.7 0l7.4-5.7c2.5-1.9 3.3-5.2 1.9-7.8z"
        transform="translate(2 0) scale(.8)"
      />
      <path
        d="M2 13h3l2-4 3 8 2-4h3"
        stroke="#FACC15"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
function ArrowRightIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M13 5l7 7-7 7v-4H4v-6h9V5z" />
    </svg>
  );
}

/* ---------- Sample data ---------- */
const recipeCards = [
  {
    img: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop",
    title: "Garlic Butter Salmon",
    time: "20 min",
    tags: ["Pescatarian", "Low Carb"],
  },
  {
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop",
    title: "Avocado Chicken Wrap",
    time: "15 min",
    tags: ["High Protein", "Lunch"],
  },
  {
    img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1200&auto=format&fit=crop",
    title: "Veggie Power Bowl",
    time: "25 min",
    tags: ["Vegetarian", "High Fiber"],
  },
  {
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
    title: "Berry Yogurt Parfait",
    time: "10 min",
    tags: ["Breakfast", "Low Effort"],
  },
];
const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const weekPreview = [
  ["Overnight Oats", "Tuna Salad"],
  ["Veggie Pasta", "Chicken Wrap"],
  ["Chickpea Curry", "Yogurt Parfait"],
  ["Stir Fry", "Leftovers"],
  ["Salmon Bowl", "Veggie Bowl"],
  ["Pancakes", "Pizza Night"],
  ["Smoothie", "Roast Chicken"],
];
const testimonials = [
  {
    name: "Priya S.",
    role: "Busy parent",
    quote:
      "MealMate turned chaos into calm. Planning our week's dinners now takes five minutes tops.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Alex M.",
    role: "Fitness coach",
    quote:
      "The protein targets and quick meal swaps are perfect for my routine. Huge time saver.",
    img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Sandra L.",
    role: "Student",
    quote:
      "I stopped wasting food. Add what I have -> MealMate suggests something tasty.",
    img: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=400&auto=format&fit=crop",
  },
];
const faqs = [
  {
    q: "What is MealMate?",
    a: "MealMate helps you plan meals fast with ingredient-based suggestions, a visual weekly planner, and a 1-click shopping list.",
  },
  {
    q: "How do I save recipes?",
    a: "Save any recipe to your favorites and add it to your weekly plan with a single tap.",
  },
  {
    q: "Can I use it on mobile?",
    a: "Absolutely. MealMate is mobile-first and works great on phones and tablets.",
  },
  {
    q: "Do you support dietary preferences?",
    a: "Yes. Filter by vegetarian, high protein, low carb, and more. Pro adds smarter nutrition insights.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes - our Free plan includes browsing recipes, a basic planner, and a standard shopping list. Upgrade to Pro to unlock advanced features.",
  },
  {
    q: "Can I share my shopping list?",
    a: "Yes - copy, share, or sync your list with family so everyone stays on track.",
  },
];

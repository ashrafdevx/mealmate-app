import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Chip from "@/components/ui/Chip";
import Stars from "@/components/ui/Stars";

function Tile({ className = "", title, time, img }: { className?: string; title: string; time: string; img: string }) {
  return (
    <div className={`absolute w-[48%] max-w-[280px] rounded-2xl border border-[#111827] bg-[#0E0F11] shadow-lg shadow-black/30 overflow-hidden ${className}`}>
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
          <span className="inline-flex items-center gap-1 rounded-full border border-[#1F2937] px-2 py-0.5">Dinner</span>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-10 pt-10 pb-16">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <Badge>Smart meal planning</Badge>
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight">
            Cook smarter. Plan faster. Eat better.
          </h1>
          <p className="mt-4 text-[#D1D5DB] max-w-xl">
            Plan meals in minutes with smart suggestions and auto-generated shopping lists.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button as="a" href="/register">Plan My Week</Button>
            <Button variant="secondary" as="a" href="/recipes">Browse Recipes</Button>
          </div>
          <div className="mt-6 flex items-center gap-2 text-sm text-[#D1D5DB]">
            <Stars />
            <span>Trusted by 20k+ home cooks</span>
          </div>
          <div className="mt-8 rounded-2xl border border-[#111827] bg-[#0E0F11] p-4 shadow-lg shadow-black/10">
            <div className="flex flex-wrap items-center gap-2">
              <Chip>Chicken</Chip>
              <Chip>Garlic</Chip>
              <Chip>Broccoli</Chip>
              <Button size="sm" variant="outline" className="ml-auto">Suggest Meal</Button>
            </div>
            <div className="mt-4 text-sm text-[#D1D5DB]">
              <span className="text-[#FACC15] font-medium">Idea:</span>{" "}
              Lemon-Garlic Chicken with Broccoli & Rice
            </div>
          </div>
        </div>

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
  );
}


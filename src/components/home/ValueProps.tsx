import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import { CartIcon, DragIcon, HeartBeatIcon, SparklesIcon } from "@/components/icons";

function ValueCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
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

export default function ValueProps() {
  return (
    <section className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-10 py-12">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Why MealMate">Everything you need to plan fast</SectionTitle>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <ValueCard icon={<SparklesIcon />} title="Smart Suggestions" desc="Add ingredients - get ideas that fit your taste and time." />
          <ValueCard icon={<DragIcon />} title="Drag-and-Drop Planner" desc="Build your week visually. Swap and move in seconds." />
          <ValueCard icon={<CartIcon />} title="1-Click Shopping List" desc="Auto-grouped by aisles, ready for the store." />
          <ValueCard icon={<HeartBeatIcon />} title="Nutrition at a Glance" desc="Quick macros and goals without the hassle." />
        </div>
      </div>
    </section>
  );
}


import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { CheckIcon } from "@/components/icons";

function PriceCard({
  highlight = false,
  title,
  price,
  period,
  bullets,
  cta,
  href,
  note,
}: {
  highlight?: boolean;
  title: string;
  price: string;
  period: string;
  bullets: string[];
  cta: string;
  href: string;
  note: string;
}) {
  return (
    <Card className={`p-6 ${highlight ? "ring-1 ring-[#FACC15]/40" : ""}`}>
      <div className="flex items-baseline gap-2">
        <h3 className="text-xl font-semibold">{title}</h3>
        {highlight && (
          <span className="text-xs rounded-full border border-[#1F2937] px-2 py-0.5">Popular</span>
        )}
      </div>
      <div className="mt-3 flex items-end gap-1">
        <span className="text-3xl font-bold">{price}</span>
        <span className="text-sm text-[#9CA3AF]">{period}</span>
      </div>
      <ul className="mt-4 space-y-2 text-sm text-[#D1D5DB]">
        {bullets.map((b) => (
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

export default function Pricing() {
  return (
    <section className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-10 py-12">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Simple Pricing">Start free, upgrade anytime</SectionTitle>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <PriceCard
            title="Free"
            price="$0"
            period="/mo"
            bullets={["Browse 1000+ recipes", "Basic meal planner", "Standard shopping list"]}
            cta="Get Started"
            href="/register"
            note="No credit card required."
          />
          <PriceCard
            highlight
            title="Pro"
            price="$6"
            period="/mo"
            bullets={[
              "Smart suggestions",
              "Drag-and-drop planner",
              "1-click smart shopping list",
              "Macros & nutrition targets",
            ]}
            cta="Start Pro"
            href="/register"
            note="Most popular for busy families."
          />
          <PriceCard
            title="Teams"
            price="$12"
            period="/mo"
            bullets={["Everything in Pro", "Shared libraries", "Admin controls"]}
            cta="Upgrade Now"
            href="/pricing"
            note="Unlock serious planning power."
          />
        </div>
      </div>
    </section>
  );
}


import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import { ArrowRightIcon } from "@/components/icons";
import Link from "next/link";
import { weekdays, weekPreview } from "@/constants/home";

export default function PlannerPreview() {
  return (
    <section className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-10 py-12">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Visual Weekly Planner">Build your week in minutes</SectionTitle>
        <div className="mt-6 grid grid-cols-7 gap-2">
          {weekdays.map((d) => (
            <div key={d} className="text-xs text-[#9CA3AF] text-center">{d}</div>
          ))}
        </div>
        <Card className="mt-2 p-4">
          <div className="grid grid-cols-7 gap-3">
            {weekPreview.map((day, i) => (
              <div key={i} className="space-y-2">
                {day.map((item, j) => (
                  <div key={j} className="rounded-xl border border-[#1F2937] p-2 text-xs text-[#D1D5DB]">{item}</div>
                ))}
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <Link href="/meal-planner" className="inline-flex items-center gap-2 text-sm text-[#FACC15] hover:underline">
              Open Planner <ArrowRightIcon />
            </Link>
          </div>
        </Card>
      </div>
    </section>
  );
}


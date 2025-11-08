import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";
import { PlusIcon } from "@/components/icons";
import { faqs } from "@/constants/home";

export default function FAQ() {
  return (
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
  );
}


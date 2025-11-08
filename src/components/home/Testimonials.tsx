import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import Stars from "@/components/ui/Stars";
import { testimonials } from "@/constants/home";

function Testimonial({ name, role, quote, img }: { name: string; role: string; quote: string; img: string }) {
  return (
    <Card className="p-5 bg-[#111827]">
      <Stars />
      <p className="mt-3 text-sm text-[#D1D5DB]">"{quote}"</p>
      <div className="mt-4 flex items-center gap-3">
        <img src={img} alt={`${name} avatar`} className="h-10 w-10 rounded-full object-cover" />
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-xs text-[#9CA3AF]">{role}</div>
        </div>
      </div>
    </Card>
  );
}

export default function Testimonials() {
  return (
    <section className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-10 py-12">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Loved by Home Cooks">Real people, real results</SectionTitle>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <Testimonial key={t.name} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}


import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import { recipeCards } from "@/constants/home";

function RecipeCard({ img, title, time, tags }: { img: string; title: string; time: string; tags: string[] }) {
  return (
    <Card className="overflow-hidden transition-transform hover:scale-[1.01]">
      <img src={img} alt={`${title} recipe`} className="h-44 w-full object-cover" loading="lazy" />
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{title}</h3>
          <span className="text-xs text-[#D1D5DB]">{time}</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span key={t} className="text-xs rounded-full border border-[#1F2937] px-2 py-1 text-[#D1D5DB]">
              {t}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default function RecipeGrid() {
  return (
    <section className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-10 py-12">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Explore Recipes">Tasty picks to try this week</SectionTitle>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recipeCards.map((r) => (
            <RecipeCard key={r.title} {...r} />
          ))}
        </div>
      </div>
    </section>
  );
}


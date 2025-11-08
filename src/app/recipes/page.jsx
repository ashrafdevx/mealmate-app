import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RecipesPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const categories = [
    "Quick",
    "Vegetarian",
    "High Protein",
    "Budget",
    "Kid‑Friendly",
    "Low Carb",
  ];

  const recipes = [
    {
      title: "Garlic Butter Salmon",
      time: "20 min",
      img:
        "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop",
      tags: ["Pescatarian", "Low Carb"],
    },
    {
      title: "Avocado Chicken Wrap",
      time: "15 min",
      img:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop",
      tags: ["High Protein", "Lunch"],
    },
    {
      title: "Veggie Power Bowl",
      time: "25 min",
      img:
        "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1200&auto=format&fit=crop",
      tags: ["Vegetarian", "High Fiber"],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0E0F11] text-[#F9FAFB]">
      <section className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-10 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <h1 className="text-2xl sm:text-3xl font-semibold">Recipes</h1>
            <p className="text-sm text-[#9CA3AF]">Welcome, {session.user.name}</p>
          </div>

          {/* Category chips */}
          <div className="mt-5 flex flex-wrap gap-2">
            {categories.map((c) => (
              <span
                key={c}
                className="inline-flex items-center rounded-full border border-[#1F2937] bg-[#0E0F11] px-3 py-1 text-xs text-[#F9FAFB] hover:border-[#FACC15] transition"
              >
                {c}
              </span>
            ))}
          </div>

          {/* Recipes grid */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((r) => (
              <div
                key={r.title}
                className="rounded-2xl border border-[#111827] bg-[#0E0F11] shadow-lg shadow-black/10 overflow-hidden transition-transform hover:scale-[1.01]"
              >
                <img
                  src={r.img}
                  alt={`${r.title} recipe`}
                  className="h-44 w-full object-cover"
                  loading="lazy"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{r.title}</h3>
                    <span className="text-xs text-[#D1D5DB]">{r.time}</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {r.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs rounded-full border border-[#1F2937] px-2 py-1 text-[#D1D5DB]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <a
                      href="#"
                      className="inline-flex items-center justify-center rounded-xl bg-[#FACC15] text-[#0E0F11] font-medium px-3 py-2 text-sm shadow-lg shadow-black/10 hover:bg-[#EAB308] focus:outline-none focus:ring-2 focus:ring-[#FACC15]/40"
                    >
                      View Recipe
                    </a>
                    <a
                      href="#"
                      className="inline-flex items-center justify-center rounded-xl border border-[#1F2937] bg-[#0E0F11] text-[#F9FAFB] px-3 py-2 text-sm hover:border-[#FACC15] focus:outline-none focus:ring-2 focus:ring-[#FACC15]/40"
                    >
                      Add to Plan
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs text-[#9CA3AF]">
            {/* TODO: Replace with real data from your recipes API */}
            Showing a sample of featured recipes. Filters are visual only.
          </p>
        </div>
      </section>
    </div>
  );
}


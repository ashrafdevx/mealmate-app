import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { headers } from "next/headers";
import Header from "@/components/layout/Header";
import SiteFooter from "@/components/layout/SiteFooter";
import Card from "@/components/ui/Card";
import RecipeActions from "@/components/recipes/RecipeActions";
import { getRecipeById } from "@/constants/recipes";

async function getRating(recipeId: string) {
  try {
    const hdrs = headers();
    const host = hdrs.get("host");
    const proto = process.env.VERCEL ? "https" : "http";
    const base = host ? `${proto}://${host}` : "";
    const res = await fetch(`${base}/api/ratings/${recipeId}`, {
      cache: "no-store",
    });
    if (!res.ok) return { average: 0, count: 0, userRating: null } as const;
    return (await res.json()) as { average: number; count: number; userRating: number | null };
  } catch {
    return { average: 0, count: 0, userRating: null } as const;
  }
}

export default async function ViewRecipePage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) redirect("/login");

  const { id } = await params;
  const recipe = getRecipeById(id);
  if (!recipe) return notFound();

  const rating = await getRating(recipe.id);

  return (
    <div className="min-h-screen bg-[#0E0F11] text-[#F9FAFB]">
      <Header />
      <main className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-10 py-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6">
            <div className="rounded-2xl overflow-hidden border border-[#111827]">
              <img src={recipe.img} alt={`${recipe.title} hero`} className="w-full h-72 object-cover" />
            </div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-semibold">{recipe.title}</h1>
                <div className="mt-1 text-sm text-[#9CA3AF]">
                  {recipe.cuisine} • {recipe.difficulty} • {recipe.time} min • Serves {recipe.servings}
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {recipe.tags.map((t) => (
                    <span key={t} className="text-xs rounded-full border border-[#1F2937] px-2 py-1 text-[#D1D5DB]">{t}</span>
                  ))}
                </div>
              </div>
              <div className="text-right text-sm">
                <div className="text-[#FACC15] font-medium">★ {rating.average.toFixed(1)}</div>
                <div className="text-[#9CA3AF]">{rating.count} ratings</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left: Details */}
              <div className="lg:col-span-2 grid gap-6">
                <Card className="p-5">
                  <h2 className="font-semibold">Description</h2>
                  <p className="mt-2 text-[#D1D5DB]">{recipe.description}</p>
                </Card>

                <Card className="p-5">
                  <h2 className="font-semibold">Ingredients</h2>
                  <ul className="mt-2 list-disc list-inside text-[#D1D5DB]">
                    {recipe.ingredients.map((ing) => (
                      <li key={ing}>{ing}</li>
                    ))}
                  </ul>
                </Card>

                {recipe.instructions?.length ? (
                  <Card className="p-5">
                    <h2 className="font-semibold">Instructions</h2>
                    <ol className="mt-2 list-decimal list-inside text-[#D1D5DB] space-y-1">
                      {recipe.instructions.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  </Card>
                ) : null}

                <Card className="p-5">
                  <h2 className="font-semibold">Nutrition</h2>
                  <div className="mt-2 text-sm text-[#D1D5DB]">
                    {recipe.nutrients.calories} kcal • Protein {recipe.nutrients.protein}g • Carbs {recipe.nutrients.carbs}g • Fat {recipe.nutrients.fat}g
                  </div>
                </Card>
              </div>

              {/* Right: Actions */}
              <Card className="p-5 h-max">
                <RecipeActions
                  recipeId={recipe.id}
                  initialAvg={rating.average}
                  initialCount={rating.count}
                  initialUserRating={rating.userRating}
                />
                <div className="mt-6 text-xs text-[#9CA3AF]">Hi, {session.user.name}</div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

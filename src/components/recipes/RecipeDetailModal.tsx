"use client";

import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import type { Recipe } from "@/types/recipes";
import RecipeActions from "@/components/recipes/RecipeActions";

type Props = {
  recipe: Recipe;
  onClose: () => void;
};

export default function RecipeDetailModal({ recipe, onClose }: Props) {
  const [ratingMeta, setRatingMeta] = React.useState<{ average: number; count: number; userRating: number | null }>({ average: recipe.rating || 0, count: 0, userRating: null });

  React.useEffect(() => {
    let done = false;
    (async () => {
      try {
        const res = await fetch(`/api/ratings/${recipe.id}`, { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (!done) setRatingMeta({ average: data.average || 0, count: data.count || 0, userRating: data.userRating ?? null });
      } catch {}
    })();
    return () => {
      done = true;
    };
  }, [recipe.id]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const subtitle = recipe.ingredients.slice(0, 3).join(" • ");

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="absolute inset-x-0 top-6 mx-auto max-w-5xl w-[95%] overflow-hidden rounded-2xl border border-[#111827] bg-[#0E0F11] shadow-2xl">
        {/* Hero */}
        <div className="relative">
          <img src={recipe.img} alt={`${recipe.title} hero`} className="w-full max-h-[420px] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
            {recipe.premium ? (
              <span className="inline-flex items-center rounded px-2 py-1 text-[10px] font-semibold tracking-wide bg-white/90 text-black">PREMIUM PICKS</span>
            ) : null}
            <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-white drop-shadow">{recipe.title}</h2>
            <p className="text-white/90 text-sm max-w-3xl">{subtitle}</p>
          </div>
        </div>

        {/* Summary row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[#111827] bg-[#0E0F11] p-4">
          <Summary label="Total Time" value={`${recipe.time} min`} />
          <Summary label="Calories" value={`${recipe.nutrients.calories}`} />
          <Summary label="Difficulty" value={recipe.difficulty} />
        </div>

        {/* Body */}
        <div className="max-h-[55vh] overflow-y-auto p-4 sm:p-6 space-y-6">
          <Section title="Description">
            <p className="text-[#D1D5DB] text-sm leading-relaxed">{recipe.description}</p>
          </Section>

          {recipe.allergens?.length ? (
            <Section title="Allergens">
              <div className="text-sm">
                <div className="font-semibold text-[#F9FAFB]">{recipe.allergens.join(" • ")}</div>
                <p className="mt-1 text-[#9CA3AF] text-xs">Produced in a facility that may process common allergens.</p>
              </div>
            </Section>
          ) : null}

          <Section title="Ingredients" extra={` / serving ${recipe.servings} people`}>
            <div className="grid sm:grid-cols-2 gap-2 text-sm">
              {recipe.ingredients.map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[#FACC15]" />
                  <span className="text-[#F9FAFB]">{item}</span>
                </div>
              ))}
            </div>
          </Section>

          {recipe.notIncluded?.length ? (
            <Section title="Not included in your delivery">
              <div className="grid sm:grid-cols-2 gap-2 text-sm text-[#9CA3AF]">
                {recipe.notIncluded.map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#374151]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Section>
          ) : null}

          {recipe.utensils?.length ? (
            <Section title="Utensils">
              <div className="text-sm text-[#F9FAFB] flex flex-wrap gap-x-4 gap-y-2">
                {recipe.utensils.map((u) => (
                  <span key={u}>• {u}</span>
                ))}
              </div>
            </Section>
          ) : null}

          <Section title="Nutrients">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[#9CA3AF]">
                    <th className="py-2">Nutrient</th>
                    <th className="py-2">Per Serving</th>
                  </tr>
                </thead>
                <tbody className="text-[#F9FAFB]">
                  <NRow label="Calories" value={`${recipe.nutrients.calories} kcal`} />
                  <NRow label="Fat" value={`${recipe.nutrients.fat} g`} />
                  <NRow label="Saturated Fat" value={fmt(recipe.nutrientsExtra?.saturatedFat, "g")} />
                  <NRow label="Carbohydrate" value={`${recipe.nutrients.carbs} g`} />
                  <NRow label="Sugar" value={fmt(recipe.nutrientsExtra?.sugar, "g")} />
                  <NRow label="Dietary Fiber" value={fmt(recipe.nutrientsExtra?.fiber, "g")} />
                  <NRow label="Protein" value={`${recipe.nutrients.protein} g`} />
                  <NRow label="Cholesterol" value={fmt(recipe.nutrientsExtra?.cholesterolMg, "mg")} />
                  <NRow label="Sodium" value={fmt(recipe.nutrientsExtra?.sodiumMg, "mg")} />
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <Link href={`/recipes/${recipe.id}`} className="text-[#FACC15] hover:underline">See full recipe →</Link>
            </div>
          </Section>

          <Card className="p-4">
            <RecipeActions
              recipeId={recipe.id}
              initialAvg={ratingMeta.average}
              initialCount={ratingMeta.count}
              initialUserRating={ratingMeta.userRating}
            />
          </Card>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between gap-3 border-t border-[#111827] p-4 bg-[#0E0F11]">
          <div className="text-xs text-[#9CA3AF]">Press Esc to close</div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={onClose}>Close</Button>
            <Link href={`/recipes/${recipe.id}`} className="inline-flex items-center justify-center rounded-xl bg-[#FACC15] text-[#0E0F11] font-medium px-4 py-2 text-sm shadow-lg shadow-black/10 hover:bg-[#EAB308] focus:outline-none focus:ring-2 focus:ring-[#FACC15]/40">See full recipe</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-[#9CA3AF] font-semibold uppercase tracking-wide">{label}:</div>
      <div className="text-sm text-[#F9FAFB]">{value}</div>
    </div>
  );
}

function Section({ title, extra, children }: React.PropsWithChildren<{ title: string; extra?: string }>) {
  return (
    <section>
      <div className="flex items-baseline justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        {extra ? <div className="text-xs text-[#9CA3AF]">{extra}</div> : null}
      </div>
      <hr className="my-3 border-[#111827]" />
      {children}
    </section>
  );
}

function NRow({ label, value }: { label: string; value: string }) {
  return (
    <tr className="border-t border-[#111827]">
      <td className="py-2 text-[#D1D5DB]">{label}</td>
      <td className="py-2">{value}</td>
    </tr>
  );
}

function fmt(v?: number, unit?: string) {
  if (v === undefined || v === null) return "-";
  return `${v} ${unit ?? ""}`.trim();
}


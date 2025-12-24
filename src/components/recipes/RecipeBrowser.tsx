"use client";

import React from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import type { Recipe } from "@/types/recipes";
import RecipeDetailModal from "@/components/recipes/RecipeDetailModal";

type Props = {
  recipes: Recipe[];
  categories: string[]; // quick tag chips
};

export default function RecipeBrowser({ recipes, categories }: Props) {
  const [open, setOpen] = React.useState<Recipe | null>(null);
  const [query, setQuery] = React.useState("");
  const [activeTags, setActiveTags] = React.useState<string[]>([]);
  const [selectedCuisines, setSelectedCuisines] = React.useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = React.useState<string[]>([]);
  const [selectedDietary, setSelectedDietary] = React.useState<string[]>([]);
  const [maxTime, setMaxTime] = React.useState<number>(60);
  const [minRating, setMinRating] = React.useState<number>(0);
  const [calMin, setCalMin] = React.useState<number>(0);
  const [calMax, setCalMax] = React.useState<number>(1200);
  const [sortBy, setSortBy] = React.useState<string>("rating_desc");

  const allCuisines = React.useMemo(
    () => Array.from(new Set(recipes.map((r) => r.cuisine))).sort(),
    [recipes]
  );
  const allDifficulties = ["Easy", "Medium", "Hard"] as const;
  const allDietaryKeys = React.useMemo(() => {
    const keys = new Set<string>();
    recipes.forEach((r) => {
      Object.entries(r.dietary || {}).forEach(([k, v]) => {
        if (v) keys.add(k);
      });
    });
    return Array.from(keys).sort();
  }, [recipes]);

  const toggleFrom = (arr: string[], value: string, set: (v: string[]) => void) => {
    set(arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value]);
  };

  const clearFilters = () => {
    setQuery("");
    setActiveTags([]);
    setSelectedCuisines([]);
    setSelectedDifficulties([]);
    setSelectedDietary([]);
    setMaxTime(60);
    setMinRating(0);
    setCalMin(0);
    setCalMax(1200);
    setSortBy("rating_desc");
  };

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = recipes.filter((r) => {
      // search across title, description, tags, ingredients, cuisine
      const hay = (
        r.title +
        "\n" +
        r.description +
        "\n" +
        r.tags.join(" ") +
        "\n" +
        r.ingredients.join(" ") +
        "\n" +
        r.cuisine
      ).toLowerCase();
      if (q && !hay.includes(q)) return false;

      if (activeTags.length && !activeTags.every((t) => r.tags.includes(t))) return false;

      if (selectedCuisines.length && !selectedCuisines.includes(r.cuisine)) return false;

      if (
        selectedDifficulties.length &&
        !selectedDifficulties.includes(r.difficulty)
      )
        return false;

      if (selectedDietary.length) {
        for (const d of selectedDietary) {
          if (!(r.dietary as any)?.[d]) return false;
        }
      }

      if (r.time > maxTime) return false;
      if (r.rating < minRating) return false;
      if (r.nutrients.calories < calMin || r.nutrients.calories > calMax) return false;

      return true;
    });

    switch (sortBy) {
      case "time_asc":
        list = list.slice().sort((a, b) => a.time - b.time);
        break;
      case "calories_asc":
        list = list.slice().sort((a, b) => a.nutrients.calories - b.nutrients.calories);
        break;
      case "rating_desc":
      default:
        list = list.slice().sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [
    recipes,
    query,
    activeTags,
    selectedCuisines,
    selectedDifficulties,
    selectedDietary,
    maxTime,
    minRating,
    calMin,
    calMax,
    sortBy,
  ]);

  return (
    <>
      {/* Filters */}
      <div className="mt-5 grid gap-4 md:gap-6">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, ingredient, tag..."
            className="w-full md:flex-1 rounded-xl border border-[#1F2937] bg-[#0E0F11] px-3 py-2 text-sm placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#FACC15]/40"
          />
          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border border-[#1F2937] bg-[#0E0F11] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FACC15]/40"
              aria-label="Sort by"
            >
              <option value="rating_desc">Sort: Top Rated</option>
              <option value="time_asc">Sort: Fastest</option>
              <option value="calories_asc">Sort: Lowest Calories</option>
            </select>
            <Button variant="secondary" size="sm" onClick={clearFilters}>Clear</Button>
          </div>
        </div>

        {/* Quick tags */}
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => {
            const active = activeTags.includes(c);
            return (
              <button
                key={c}
                onClick={() => toggleFrom(activeTags, c, setActiveTags)}
                className={`inline-flex items-center rounded-full border px-3 py-1 text-xs transition ${
                  active
                    ? "border-[#FACC15] bg-[#111827] text-[#FACC15]"
                    : "border-[#1F2937] bg-[#0E0F11] text-[#F9FAFB] hover:border-[#FACC15]"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        {/* Advanced filters */}
        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Cuisine */}
            <div>
              <div className="text-xs uppercase tracking-wide text-[#9CA3AF] mb-2">Cuisine</div>
              <div className="flex flex-wrap gap-2">
                {allCuisines.map((c) => {
                  const active = selectedCuisines.includes(c);
                  return (
                    <button
                      key={c}
                      onClick={() => toggleFrom(selectedCuisines, c, setSelectedCuisines)}
                      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs transition ${
                        active
                          ? "border-[#FACC15] bg-[#111827] text-[#FACC15]"
                          : "border-[#1F2937] bg-[#0E0F11] text-[#F9FAFB] hover:border-[#FACC15]"
                      }`}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Difficulty */}
            <div>
              <div className="text-xs uppercase tracking-wide text-[#9CA3AF] mb-2">Difficulty</div>
              <div className="flex flex-wrap gap-2">
                {allDifficulties.map((d) => {
                  const active = selectedDifficulties.includes(d);
                  return (
                    <button
                      key={d}
                      onClick={() => toggleFrom(selectedDifficulties, d, setSelectedDifficulties)}
                      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs transition ${
                        active
                          ? "border-[#FACC15] bg-[#111827] text-[#FACC15]"
                          : "border-[#1F2937] bg-[#0E0F11] text-[#F9FAFB] hover:border-[#FACC15]"
                      }`}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time + Rating */}
            <div>
              <div className="text-xs uppercase tracking-wide text-[#9CA3AF] mb-2">Max Time (min)</div>
              <input
                type="range"
                min={5}
                max={120}
                step={5}
                value={maxTime}
                onChange={(e) => setMaxTime(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-xs text-[#D1D5DB]">Up to {maxTime} min</div>
              <div className="mt-3 text-xs uppercase tracking-wide text-[#9CA3AF] mb-2">Min Rating</div>
              <input
                type="range"
                min={0}
                max={5}
                step={0.5}
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-xs text-[#D1D5DB]">{minRating.toFixed(1)}+</div>
            </div>

            {/* Calories */}
            <div>
              <div className="text-xs uppercase tracking-wide text-[#9CA3AF] mb-2">Calories (kcal)</div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={calMin}
                  min={0}
                  max={calMax}
                  onChange={(e) => setCalMin(Math.max(0, Math.min(Number(e.target.value || 0), calMax)))}
                  className="w-24 rounded-xl border border-[#1F2937] bg-[#0E0F11] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FACC15]/40"
                />
                <span className="text-[#6B7280]">to</span>
                <input
                  type="number"
                  value={calMax}
                  min={calMin}
                  onChange={(e) => setCalMax(Math.max(calMin, Number(e.target.value || 0)))}
                  className="w-24 rounded-xl border border-[#1F2937] bg-[#0E0F11] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FACC15]/40"
                />
              </div>
              {/* Dietary */}
              <div className="mt-4 text-xs uppercase tracking-wide text-[#9CA3AF] mb-2">Dietary</div>
              <div className="flex flex-wrap gap-2">
                {allDietaryKeys.map((d) => {
                  const active = selectedDietary.includes(d);
                  const label = toTitleCase(d);
                  return (
                    <button
                      key={d}
                      onClick={() => toggleFrom(selectedDietary, d, setSelectedDietary)}
                      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs transition ${
                        active
                          ? "border-[#FACC15] bg-[#111827] text-[#FACC15]"
                          : "border-[#1F2937] bg-[#0E0F11] text-[#F9FAFB] hover:border-[#FACC15]"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Results meta */}
      <div className="mt-4 text-sm text-[#9CA3AF]">
        Showing {filtered.length} of {recipes.length} recipes
      </div>

      {/* Recipes grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((r) => (
          <Card
            key={r.id}
            className="overflow-hidden transition-transform hover:scale-[1.01]"
          >
            <img
              src={r.img}
              alt={`${r.title} recipe`}
              className="h-44 w-full object-cover"
              loading="lazy"
            />
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold leading-tight">{r.title}</h3>
                  <div className="mt-1 text-xs text-[#9CA3AF]">
                    {r.cuisine} • {r.difficulty} • {r.time} min
                  </div>
                </div>
                <div className="text-xs text-[#FACC15] font-medium">★ {r.rating.toFixed(1)}</div>
              </div>
              <p className="mt-2 text-sm text-[#D1D5DB] line-clamp-2">{r.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {r.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs rounded-full border border-[#1F2937] px-2 py-1 text-[#D1D5DB]"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-3 text-xs text-[#9CA3AF]">
                {r.nutrients.calories} kcal • P {r.nutrients.protein}g • C {r.nutrients.carbs}g • F {r.nutrients.fat}g
              </div>
              <div className="mt-4 flex items-center gap-3">
                <Button onClick={() => setOpen(r)} size="sm">View Details</Button>
                <Button variant="secondary" size="sm">Add to Plan</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      {open ? <RecipeDetailModal recipe={open} onClose={() => setOpen(null)} /> : null}
    </>
  );
}

function toTitleCase(s: string) {
  return s
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (c) => c.toUpperCase())
    .trim();
}

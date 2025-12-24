"use client";

import React from "react";
import Button from "@/components/ui/Button";

type Props = {
  recipeId: string;
  initialAvg: number;
  initialCount: number;
  initialUserRating: number | null;
};

export default function RecipeActions({ recipeId, initialAvg, initialCount, initialUserRating }: Props) {
  const [avg, setAvg] = React.useState(initialAvg);
  const [count, setCount] = React.useState(initialCount);
  const [userRating, setUserRating] = React.useState<number | null>(initialUserRating);
  const [hoverRating, setHoverRating] = React.useState<number | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [planDate, setPlanDate] = React.useState<string>("");
  const [planMeal, setPlanMeal] = React.useState<string>("dinner");
  const [planServings, setPlanServings] = React.useState<number>(1);
  const [status, setStatus] = React.useState<string>("");

  const displayRating = hoverRating ?? userRating ?? 0;

  async function submitRating(value: number) {
    try {
      setLoading(true);
      const res = await fetch(`/api/ratings/${recipeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating: value }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to rate");
      setAvg(data.average || 0);
      setCount(data.count || 0);
      setUserRating(data.userRating ?? value);
      setStatus("Saved rating");
    } catch (err: any) {
      setStatus(err?.message || "Error saving rating");
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(""), 2000);
    }
  }

  async function addToPlanner() {
    try {
      if (!planDate) return setStatus("Pick a date");
      setLoading(true);
      const res = await fetch(`/api/planner`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipeId, date: planDate, meal: planMeal, servings: planServings }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to plan");
      setStatus("Added to planner");
    } catch (err: any) {
      setStatus(err?.message || "Error adding to planner");
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(""), 2500);
    }
  }

  return (
    <div className="grid gap-4">
      {/* Rating */}
      <div>
        <div className="text-xs uppercase tracking-wide text-[#9CA3AF]">Your Rating</div>
        <div className="mt-1 flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <button
              key={i}
              aria-label={`Rate ${i}`}
              onMouseEnter={() => setHoverRating(i)}
              onMouseLeave={() => setHoverRating(null)}
              onClick={() => submitRating(i)}
              className="p-1"
              disabled={loading}
            >
              <svg className={`h-6 w-6 ${displayRating >= i ? "text-[#FACC15]" : "text-[#4B5563]"}`} viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 00-1.176 0l-2.802 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          ))}
        </div>
        <div className="mt-1 text-xs text-[#9CA3AF]">Avg {avg.toFixed(1)} ({count})</div>
      </div>

      {/* Planner */}
      <div>
        <div className="text-xs uppercase tracking-wide text-[#9CA3AF]">Add to Planner</div>
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
          <input
            type="date"
            value={planDate}
            onChange={(e) => setPlanDate(e.target.value)}
            className="rounded-xl border border-[#1F2937] bg-[#0E0F11] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FACC15]/40"
          />
          <select
            value={planMeal}
            onChange={(e) => setPlanMeal(e.target.value)}
            className="rounded-xl border border-[#1F2937] bg-[#0E0F11] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FACC15]/40"
          >
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
          </select>
          <input
            type="number"
            min={1}
            value={planServings}
            onChange={(e) => setPlanServings(Math.max(1, Number(e.target.value || 1)))}
            className="rounded-xl border border-[#1F2937] bg-[#0E0F11] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FACC15]/40"
          />
        </div>
        <div className="mt-2">
          <Button onClick={addToPlanner} disabled={loading}>Add</Button>
        </div>
      </div>

      {status ? <div className="text-xs text-[#9CA3AF]">{status}</div> : null}
    </div>
  );
}


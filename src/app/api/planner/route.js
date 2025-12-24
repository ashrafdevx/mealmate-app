import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import PlanEntry from "@/models/PlanEntry";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    await connectDB();
    const items = await PlanEntry.find({ user: session.user.id }).sort({ date: 1 }).lean();
    return NextResponse.json({ items });
  } catch (err) {
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { recipeId, date, meal, servings = 1, notes = "" } = await req.json();
    if (!recipeId || !date || !meal) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    await connectDB();
    const entry = await PlanEntry.create({
      user: session.user.id,
      recipeId,
      date: new Date(date),
      meal,
      servings,
      notes,
    });
    return NextResponse.json({ ok: true, id: entry._id.toString() });
  } catch (err) {
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}


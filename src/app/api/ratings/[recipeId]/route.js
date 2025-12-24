import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Rating from "@/models/Rating";

export async function GET(_req, { params }) {
  const session = await auth();
  const userId = session?.user?.id || null;
  const { recipeId } = params;
  try {
    await connectDB();
    const [agg, user] = await Promise.all([
      Rating.aggregate([
        { $match: { recipeId } },
        { $group: { _id: "$recipeId", avg: { $avg: "$rating" }, count: { $sum: 1 } } },
      ]),
      userId ? Rating.findOne({ user: userId, recipeId }) : null,
    ]);
    const avg = agg[0]?.avg || 0;
    const count = agg[0]?.count || 0;
    return NextResponse.json({ average: avg, count, userRating: user?.rating || null });
  } catch (err) {
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}

export async function POST(req, { params }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { recipeId } = params;
  try {
    const body = await req.json();
    const value = Number(body?.rating);
    if (Number.isNaN(value) || value < 0 || value > 5) {
      return NextResponse.json({ error: "Invalid rating" }, { status: 400 });
    }
    await connectDB();
    await Rating.findOneAndUpdate(
      { user: session.user.id, recipeId },
      { $set: { rating: value } },
      { upsert: true, new: true }
    );
    // Return new aggregate
    const agg = await Rating.aggregate([
      { $match: { recipeId } },
      { $group: { _id: "$recipeId", avg: { $avg: "$rating" }, count: { $sum: 1 } } },
    ]);
    return NextResponse.json({ average: agg[0]?.avg || 0, count: agg[0]?.count || 0, userRating: value });
  } catch (err) {
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}


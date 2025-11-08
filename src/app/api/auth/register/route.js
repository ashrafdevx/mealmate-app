import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { hash } from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    if (name.length < 2) {
      return NextResponse.json({ error: "Name must be at least 2 characters" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }
    await connectDB();
    console.info("[API] Register: DB ready");
    const exists = await User.findOne({ email });
    if (exists) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 409 }
      );
    }
    const passwordHash = await hash(password, 10);
    const user = await User.create({ name, email, passwordHash });
    return NextResponse.json(
      { id: user._id, email: user.email },
      { status: 201 }
    );
  } catch (e) {
    console.error("[API] Register error:", e?.message || e);
    if (e?.code === 11000) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }
    if (e?.name === "MongooseServerSelectionError" || e instanceof mongoose.Error) {
      return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

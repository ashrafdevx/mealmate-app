import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error("Missing MONGODB_URI");

let cached = global._mongoose;
if (!cached) cached = global._mongoose = { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "mealmate",
        serverSelectionTimeoutMS: 5000,
      })
      .then((m) => {
        const { host, port, name } = m.connection;
        console.info(`[DB] Connected: db='${name}' host='${host}' port='${port}'`);
        return m;
      })
      .catch((err) => {
        console.error("[DB] Connection error:", err?.message || err);
        throw err;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

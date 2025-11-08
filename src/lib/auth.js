import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { getServerSession } from "next-auth";
import { connectDB } from "./db";
import User from "@/models/User";

export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(creds) {
        try {
          await connectDB();
          const user = await User.findOne({ email: creds.email });
          if (!user) return null;
          const ok = await compare(creds.password, user.passwordHash);
          if (!ok) return null;
          return { id: user._id.toString(), name: user.name, email: user.email };
        } catch (err) {
          console.error("[AUTH] authorize error:", err?.message || err);
          throw new Error("Database connection failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.uid = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token?.uid) session.user.id = token.uid;
      return session;
    },
  },
};
export async function auth() {
  // Wrapper so existing imports keep working in server components
  return getServerSession(authOptions);
}

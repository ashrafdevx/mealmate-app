import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-black">MealMate</h1>
          <nav className="flex items-center gap-4">
            <Link href="/recipes" className="text-black hover:text-yellow-500">Recipes</Link>
            <Link href="/" className="text-black hover:text-yellow-500">Home</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">
        <section className="rounded-xl border border-zinc-200 bg-black p-6 text-white shadow">
          <h2 className="text-2xl font-semibold">Welcome, <span className="text-yellow-400">{session.user.name}</span></h2>
          <p className="mt-2 text-zinc-300">Here’s your dashboard. Explore your recipes, update your profile, and more.</p>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-zinc-900 p-4 border border-zinc-800">
              <h3 className="font-medium text-yellow-400">Quick Actions</h3>
              <ul className="mt-2 text-sm text-zinc-300 list-disc list-inside">
                <li><Link href="/recipes" className="hover:text-yellow-400">Browse recipes</Link></li>
                <li><Link href="/" className="hover:text-yellow-400">Go to home</Link></li>
              </ul>
            </div>
            <div className="rounded-lg bg-zinc-900 p-4 border border-zinc-800">
              <h3 className="font-medium text-yellow-400">Account</h3>
              <p className="mt-2 text-sm text-zinc-300">Email: {session.user.email}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

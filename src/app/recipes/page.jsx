import { auth } from "@/lib/auth";

export default async function RecipesPage() {
  const session = await auth();
  if (!session) return <div className="p-6">Please login</div>;
  return (
    <div className="p-6">
      Hello {session.user.name}! (Recipes list comes here)
    </div>
  );
}

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Header from "@/components/layout/Header";
import SiteFooter from "@/components/layout/SiteFooter";
import RecipeBrowser from "@/components/recipes/RecipeBrowser";

export default async function RecipesPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const categories = [
    "Quick",
    "Vegetarian",
    "Vegan",
    "High Protein",
    "Low Carb",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Gluten Free",
    "Dairy Free",
    "Budget",
    "Kid-Friendly",
    "Pescatarian",
  ];

  const recipes = [
    {
      id: "salmon-garlic-butter",
      title: "Garlic Butter Salmon",
      description:
        "Flaky salmon fillets seared in a garlicky butter sauce with lemon and herbs.",
      time: 20,
      img:
        "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop",
      tags: ["Pescatarian", "Low Carb", "Dinner", "Quick"],
      cuisine: "American",
      difficulty: "Easy",
      servings: 2,
      rating: 4.7,
      nutrients: { calories: 520, protein: 38, carbs: 2, fat: 40 },
      dietary: { pescatarian: true, lowCarb: true, glutenFree: true },
      ingredients: ["salmon", "butter", "garlic", "lemon", "parsley"],
    },
    {
      id: "avocado-chicken-wrap",
      title: "Avocado Chicken Wrap",
      description:
        "Juicy chicken, creamy avocado, crunchy veg—perfect high-protein grab-and-go lunch.",
      time: 15,
      img:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop",
      tags: ["High Protein", "Lunch", "Quick"],
      cuisine: "American",
      difficulty: "Easy",
      servings: 1,
      rating: 4.5,
      nutrients: { calories: 430, protein: 36, carbs: 28, fat: 20 },
      dietary: { highProtein: true },
      ingredients: ["chicken", "avocado", "tortilla", "lettuce", "tomato"],
    },
    {
      id: "veggie-power-bowl",
      title: "Veggie Power Bowl",
      description:
        "Roasted vegetables, quinoa, and tahini dressing for a hearty vegetarian bowl.",
      time: 25,
      img:
        "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1200&auto=format&fit=crop",
      tags: ["Vegetarian", "High Fiber", "Dinner"],
      cuisine: "Mediterranean",
      difficulty: "Easy",
      servings: 2,
      rating: 4.6,
      nutrients: { calories: 540, protein: 18, carbs: 68, fat: 20 },
      dietary: { vegetarian: true },
      ingredients: ["quinoa", "sweet potato", "chickpeas", "spinach", "tahini"],
    },
    {
      id: "berry-yogurt-parfait",
      title: "Berry Yogurt Parfait",
      description:
        "Layers of Greek yogurt, fresh berries, and crunchy granola—breakfast in 10.",
      time: 10,
      img:
        "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
      tags: ["Breakfast", "Quick"],
      cuisine: "American",
      difficulty: "Easy",
      servings: 1,
      rating: 4.3,
      nutrients: { calories: 320, protein: 18, carbs: 42, fat: 9 },
      dietary: { vegetarian: true },
      ingredients: ["yogurt", "berries", "granola", "honey"],
    },
    {
      id: "chickpea-curry",
      title: "Creamy Chickpea Curry",
      description:
        "Comforting coconut tomato curry with tender chickpeas—naturally vegan and filling.",
      time: 35,
      img:
        "https://images.unsplash.com/photo-1625944528520-bd61234f2337?q=80&w=1200&auto=format&fit=crop",
      tags: ["Dinner", "Budget"],
      cuisine: "Indian",
      difficulty: "Medium",
      servings: 4,
      rating: 4.8,
      nutrients: { calories: 460, protein: 16, carbs: 60, fat: 16 },
      dietary: { vegan: true, vegetarian: true, dairyFree: true },
      ingredients: ["chickpeas", "coconut milk", "tomato", "onion", "garam masala"],
    },
    {
      id: "beef-stir-fry",
      title: "Beef Veggie Stir-Fry",
      description:
        "Tender beef and colorful veggies in a savory sauce. Weeknight classic in 20.",
      time: 20,
      img:
        "https://images.unsplash.com/photo-1604908554007-86e8a3b43d71?q=80&w=1200&auto=format&fit=crop",
      tags: ["High Protein", "Dinner", "Quick"],
      cuisine: "Chinese",
      difficulty: "Easy",
      servings: 2,
      rating: 4.4,
      nutrients: { calories: 510, protein: 35, carbs: 34, fat: 26 },
      dietary: { highProtein: true },
      ingredients: ["beef", "broccoli", "bell pepper", "soy sauce", "garlic"],
    },
    {
      id: "margherita-pizza",
      title: "Margherita Pizza",
      description:
        "Crispy crust with fresh mozzarella, basil, and tomatoes—simple Italian classic.",
      time: 30,
      img:
        "https://images.unsplash.com/photo-1541745537413-b804b0c33b29?q=80&w=1200&auto=format&fit=crop",
      tags: ["Vegetarian", "Dinner"],
      cuisine: "Italian",
      difficulty: "Medium",
      servings: 2,
      rating: 4.2,
      nutrients: { calories: 700, protein: 28, carbs: 88, fat: 24 },
      dietary: { vegetarian: true },
      ingredients: ["pizza dough", "mozzarella", "tomato", "basil"],
    },
    {
      id: "sushi-bowl",
      title: "Deconstructed Sushi Bowl",
      description:
        "All the sushi flavors in a quick weeknight bowl with salmon and rice.",
      time: 25,
      img:
        "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1200&auto=format&fit=crop",
      tags: ["Pescatarian", "Lunch"],
      cuisine: "Japanese",
      difficulty: "Easy",
      servings: 2,
      rating: 4.6,
      nutrients: { calories: 520, protein: 30, carbs: 62, fat: 16 },
      dietary: { pescatarian: true },
      ingredients: ["rice", "salmon", "cucumber", "nori", "soy sauce"],
    },
    {
      id: "quinoa-salad",
      title: "Mediterranean Quinoa Salad",
      description:
        "Fresh cucumbers, tomatoes, olives, and herbs tossed with protein-rich quinoa.",
      time: 15,
      img:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1200&auto=format&fit=crop",
      tags: ["Vegetarian", "Lunch", "Quick"],
      cuisine: "Mediterranean",
      difficulty: "Easy",
      servings: 2,
      rating: 4.1,
      nutrients: { calories: 380, protein: 12, carbs: 56, fat: 10 },
      dietary: { vegetarian: true, vegan: true },
      ingredients: ["quinoa", "cucumber", "tomato", "olive", "lemon"],
    },
    {
      id: "tofu-scramble",
      title: "Spicy Tofu Scramble",
      description:
        "Vegan scramble with turmeric, peppers, and spinach—bright, savory breakfast.",
      time: 12,
      img:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop",
      tags: ["Breakfast", "Vegan", "Quick"],
      cuisine: "American",
      difficulty: "Easy",
      servings: 2,
      rating: 4.0,
      nutrients: { calories: 260, protein: 20, carbs: 10, fat: 16 },
      dietary: { vegan: true, vegetarian: true, dairyFree: true, glutenFree: true },
      ingredients: ["tofu", "turmeric", "pepper", "spinach", "onion"],
    },
    {
      id: "shrimp-tacos",
      title: "Cilantro Lime Shrimp Tacos",
      description:
        "Zesty shrimp tucked in warm tortillas with crunchy slaw and lime crema.",
      time: 18,
      img:
        "https://images.unsplash.com/photo-1604908812838-43f7f2dfda7d?q=80&w=1200&auto=format&fit=crop",
      tags: ["Pescatarian", "Dinner", "Quick"],
      cuisine: "Mexican",
      difficulty: "Easy",
      servings: 2,
      rating: 4.5,
      nutrients: { calories: 480, protein: 28, carbs: 54, fat: 18 },
      dietary: { pescatarian: true },
      ingredients: ["shrimp", "tortillas", "cabbage", "cilantro", "lime"],
    },
    {
      id: "chicken-souvlaki",
      title: "Greek Chicken Souvlaki",
      description:
        "Herby marinated chicken skewers with lemony rice and tangy tzatziki.",
      time: 40,
      img:
        "https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=1200&auto=format&fit=crop",
      tags: ["High Protein", "Dinner"],
      cuisine: "Greek",
      difficulty: "Medium",
      servings: 3,
      rating: 4.7,
      nutrients: { calories: 610, protein: 44, carbs: 58, fat: 22 },
      dietary: { highProtein: true },
      ingredients: ["chicken", "yogurt", "garlic", "lemon", "oregano"],
    },
    {
      id: "thai-green-curry",
      title: "Thai Green Curry",
      description:
        "Fragrant green curry with coconut milk, chicken, and vegetables—spicy and cozy.",
      time: 35,
      img:
        "https://images.unsplash.com/photo-1604908177235-5b0d0f0fd5ab?q=80&w=1200&auto=format&fit=crop",
      tags: ["Dinner"],
      cuisine: "Thai",
      difficulty: "Medium",
      servings: 4,
      rating: 4.6,
      nutrients: { calories: 530, protein: 28, carbs: 40, fat: 28 },
      dietary: { dairyFree: true },
      ingredients: ["green curry paste", "coconut milk", "chicken", "bamboo", "basil"],
    },
    {
      id: "gluten-free-pancakes",
      title: "Fluffy Gluten-Free Pancakes",
      description:
        "Light and airy pancakes without gluten—perfect with maple and berries.",
      time: 20,
      img:
        "https://images.unsplash.com/photo-1508737804141-04ad2f277f2b?q=80&w=1200&auto=format&fit=crop",
      tags: ["Breakfast", "Kid-Friendly"],
      cuisine: "American",
      difficulty: "Easy",
      servings: 2,
      rating: 4.1,
      nutrients: { calories: 420, protein: 10, carbs: 68, fat: 12 },
      dietary: { glutenFree: true, kidFriendly: true },
      ingredients: ["gluten-free flour", "milk", "egg", "baking powder", "butter"],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0E0F11] text-[#F9FAFB]">
      <Header />
      <section className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-10 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <h1 className="text-2xl sm:text-3xl font-semibold">Recipes</h1>
            <p className="text-sm text-[#9CA3AF]">Welcome, {session.user.name}</p>
          </div>

          <RecipeBrowser recipes={recipes} categories={categories} />

          <p className="mt-6 text-xs text-[#9CA3AF]">
            Data is sample-only for demo. Client-side filters included.
          </p>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}


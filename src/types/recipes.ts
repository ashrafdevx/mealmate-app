export type Recipe = {
  id: string;
  title: string;
  description: string;
  time: number; // minutes
  img: string;
  tags: string[];
  cuisine: string;
  difficulty: "Easy" | "Medium" | "Hard";
  servings: number;
  rating: number; // 0-5 demo average
  nutrients: { calories: number; protein: number; carbs: number; fat: number };
  dietary: Partial<{
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
    dairyFree: boolean;
    pescatarian: boolean;
    lowCarb: boolean;
    highProtein: boolean;
    kidFriendly: boolean;
  }>;
  ingredients: string[];
  instructions?: string[];
  premium?: boolean;
  allergens?: string[];
  notIncluded?: string[];
  utensils?: string[];
  nutrientsExtra?: {
    saturatedFat?: number; // g
    sugar?: number; // g
    fiber?: number; // g
    cholesterolMg?: number; // mg
    sodiumMg?: number; // mg
  };
};

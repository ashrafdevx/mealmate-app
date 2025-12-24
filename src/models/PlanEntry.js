import mongoose, { Schema } from "mongoose";

const PlanEntrySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    recipeId: { type: String, required: true },
    date: { type: Date, required: true, index: true },
    meal: { type: String, enum: ["breakfast", "lunch", "dinner", "snack"], required: true },
    servings: { type: Number, default: 1 },
    notes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.PlanEntry || mongoose.model("PlanEntry", PlanEntrySchema);


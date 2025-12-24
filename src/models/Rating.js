import mongoose, { Schema } from "mongoose";

const RatingSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    recipeId: { type: String, required: true, index: true },
    rating: { type: Number, min: 0, max: 5, required: true },
    comment: { type: String },
  },
  { timestamps: true }
);

RatingSchema.index({ user: 1, recipeId: 1 }, { unique: true });

export default mongoose.models.Rating || mongoose.model("Rating", RatingSchema);


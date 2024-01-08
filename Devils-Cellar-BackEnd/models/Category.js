const { mongoose, Schema } = require("../db");

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    img: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

categorySchema.set("toJSON", { virtuals: true });
categorySchema.set("toObject", { virtuals: true });
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;

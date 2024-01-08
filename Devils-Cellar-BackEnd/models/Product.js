const { mongoose, Schema } = require("../db");

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    img: { type: String, required: true },
    featuredImg: { type: String, default:"default_featured_image.jpg" },
    unitPrice: { type: Number, required: true },
    stock: { type: Number, required: true },
    featured: Boolean,
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    slogan: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);


productSchema.set("toObject",{virtuals:true})
productSchema.set("toJSON",{virtuals:true})

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

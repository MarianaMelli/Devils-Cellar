const { mongoose, Schema } = require("../db");

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    productList: [],
    status: {
      type: String,
      default:"paid",
      enum: ["paid", "rejected", "in transit", "delivered"],
    },   
    paymentMethod:{
      type: String,  
      required:true,    
      enum: ["Visa", "Mastercard", "Mercado Pago", "PayPal"],
    },
    shippingAddress: String,
    shippingDate: Date,
  },
  {
    timestamps: true,
  },
);

orderSchema.set("toJSON",{virtuals:true})
orderSchema.set("toObject",{virtuals:true})
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;

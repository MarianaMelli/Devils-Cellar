const { mongoose, Schema } = require("../db");
const bcrypt = require("bcryptjs");
var mongoose_delete = require("mongoose-delete");
const userSchema = new Schema(
  {
    firstname: String,
    lastname: String,
    address: String,
    email: { type: String, required: true, unique: true },
    phone: String,
    password: { type: String, required: true, select: false },
    myOrders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    avatar: { type: String, default: `user_avatar.png` },
  },
  {
    timestamps: true,
  },
);
userSchema.plugin(mongoose_delete, { deletedAt: true, overrideMethods: "all" });

userSchema.methods.comparePassword = async function comparePassword(password) {
  const currentUser = await User.findOne({ email: this.email }).select("password");
  return await bcrypt.compare(password, currentUser.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });
const User = mongoose.model("User", userSchema);

module.exports = User;

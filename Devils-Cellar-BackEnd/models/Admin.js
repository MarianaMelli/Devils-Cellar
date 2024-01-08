const { mongoose, Schema } = require("../db");
const bcrypt = require("bcryptjs");
const adminSchema = new Schema(
  {
    firstname: String,
    lastname: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    avatar: { type: String, default: `admin_avatar.png` },
  },
  {
    timestamps: true,
  },
);

adminSchema.methods.comparePassword = async function comparePassword(password) {
  const currentAdmin = await Admin.findOne({ email: this.email }).select("password");
  return await bcrypt.compare(password, currentAdmin.password);
};

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});



adminSchema.set("toObject", { virtuals: true });
adminSchema.set("toJSON", { virtuals: true });
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;

import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    firstname: String,
    lastname: String,
    email: String,
    mobile: String,
    password: String,
    address: String,
    pincode: Number,
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true, versionKey: false }
);

function currentLocalTimePlusOffset() {
  const offset = 5.5 * 60 * 60 * 1000;
  const now = new Date();
  return new Date(now.getTime() + offset);
}

userSchema.pre("save", function (next) {
  const currentTime = currentLocalTimePlusOffset();
  this.createdAt = currentTime;
  this.updatedAt = currentTime;
  next;
});

userSchema.pre("findOneAndUpdate", function (next) {
  const currentTime = currentLocalTimePlusOffset();
  this.set({ updatedAt: currentTime });
  next;
});

const usermodel = model("user", userSchema);
export default usermodel;

import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema(
  {
    googleId: { type: String, required: true },
    gmail: { type: String, required: true },
    displayName: { type: String, required: true },
    image: { type: String, required: true },
    firstName: { type: String, required: true },
    LastName: { type: String, required: true },
  },
  {
    timesstamps: true,
  }
);
const User = mongoose.model("üsers", UserSchema);
export default User;

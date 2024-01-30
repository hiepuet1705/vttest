import mongoose, { Schema, ObjectId } from "mongoose";
const User = mongoose.Schema(
  {
    //id: { type: ObjectId, required: true },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: false,
    },
    username: {
      type: String,
      required: true,
    },

    password: {
      // hashed
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);
export default mongoose.model("User", User);

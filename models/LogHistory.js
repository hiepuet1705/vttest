import { Schema, ObjectId } from "mongoose";
import mongoose from "mongoose";

const LogHistory = mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, required: false },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("LogHistory", LogHistory);

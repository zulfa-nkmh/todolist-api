import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["pending", "in progress", "done"], default: "pending" },
}, { timestamps: true });

export const Todo = mongoose.model("Todo", todoSchema);
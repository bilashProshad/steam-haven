import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Message = mongoose.model("Message", messageSchema);

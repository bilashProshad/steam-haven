import mongoose from "mongoose";
import { v4 as uuid } from "uuid";

const defaultTitle = "New Channel";
const defaultDescription = "This is new channel description";

const channelSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isActive: { type: Boolean, default: false },
    title: { type: String, default: defaultTitle },
    description: { type: String, default: defaultDescription },
    avatar: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    streamKey: { type: String, default: uuid() },
    messages: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const Channel = mongoose.model("Channel", channelSchema);

import mongoose from "mongoose";

const FeedSchema = new mongoose.Schema({
  title: String,
  link: String,
  source: String,
  publishedAt: Date,
  createdAt: { type: Date, default: Date.now },
});

export const Feed = mongoose.model("Feed", FeedSchema);

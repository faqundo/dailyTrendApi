import { Schema, model } from 'mongoose';

const feedSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  source: { type: String, required: true, enum: ['El Pais', 'El Mundo'] },
  url: { type: String, required: true, validate: /https?:\/\/[^\s]+/ },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export const FeedModel = model('Feed', feedSchema);
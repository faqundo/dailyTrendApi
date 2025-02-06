import { Document, model, Schema } from 'mongoose';
import { Feed } from '../../domain/entities/FeedEntity';


export interface IFeed extends Feed, Document {}

// Esquema de Mongoose
const feedSchema = new Schema<Feed & Document>(
    {
      title: { type: String, required: true },
      description: { type: String, required: false },
      source: { type: String, required: true, enum: ['El País', 'El Mundo'] },
      url: { type: String, required: true, validate: /https?:\/\/[^\s]+/ },
      createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
  );
  
  // Modelo Mongoose
  export const FeedModel = model<Feed & Document>('Feed', feedSchema);

// Repositorio para operaciones CRUD
export class FeedRepository {
  async createFeed(data: Partial<Feed>): Promise<IFeed> {
    const feed = new FeedModel(data);
    return await feed.save();
  }

  async getAllFeeds(): Promise<IFeed[]> {
    return await FeedModel.find().sort({ createdAt: -1 });
  }

  async getFeedById(id: string): Promise<IFeed | null> {
    return await FeedModel.findById(id);
  }

  async updateFeed(id: string, data: Partial<Feed>): Promise<IFeed | null> {
    return await FeedModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteFeed(id: string): Promise<void> {
    await FeedModel.findByIdAndDelete(id);
  }
}
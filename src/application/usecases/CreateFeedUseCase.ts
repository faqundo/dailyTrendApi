import { FeedRepository } from '../../infrastructure/persistence/FeedRepository';
import { FeedEntity } from '../../domain/entities/FeedEntity';
import type { Feed } from '../../domain/entities/FeedEntity';

export class CreateFeedUseCase {
  static async execute(data: Partial<Feed>): Promise<any> {
    const feedEntity = new FeedEntity(data);
    /* if (!feedEntity.isValidUrl()) {
      throw new Error('Invalid URL');
    } */
    
    const repository = new FeedRepository();
    const feedData = feedEntity.toJSON(); // Convertir entidad a objeto plano
    return await repository.createFeed(feedData);
  }
}
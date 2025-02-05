// src/application/usecases/UpdateFeedUseCase.ts

import { FeedRepository } from '../../infrastructure/persistence/FeedRepository';

export class UpdateFeedUseCase {
  static async execute(id: string, data: any): Promise<any> {
    const repository = new FeedRepository();
    return await repository.updateFeed(id, data);
  }
}
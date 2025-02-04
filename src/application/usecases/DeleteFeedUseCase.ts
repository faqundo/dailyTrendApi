import { FeedRepository } from '../../infrastructure/persistence/FeedRepository';

export class DeleteFeedUseCase {
  static async execute(id: string) {
    const repository = new FeedRepository();
    await repository.deleteFeed(id);
  }
}
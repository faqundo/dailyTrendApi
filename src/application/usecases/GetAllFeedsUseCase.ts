import { FeedRepository } from '../../infrastructure/persistence/FeedRepository';

export class GetAllFeedsUseCase {
  static async execute() {
    const repository = new FeedRepository();
    return await repository.getAllFeeds();
  }
}
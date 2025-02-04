import { FeedRepository } from '../../infrastructure/persistence/FeedRepository';

export class GetFeedByIdUseCase {
  static async execute(id: string) {
    const repository = new FeedRepository();
    return await repository.getFeedById(id);
  }
}
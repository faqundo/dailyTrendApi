import type { Feed } from '../../domain/entities/FeedEntity';
export declare class CreateFeedUseCase {
    static execute(data: Partial<Feed>): Promise<any>;
}

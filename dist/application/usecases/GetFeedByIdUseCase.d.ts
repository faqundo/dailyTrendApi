export declare class GetFeedByIdUseCase {
    static execute(id: string): Promise<import("../../infrastructure/persistence/FeedRepository").IFeed | null>;
}

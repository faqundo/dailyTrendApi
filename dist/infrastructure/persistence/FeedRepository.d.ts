import { Document } from 'mongoose';
import { Feed } from '../../domain/entities/FeedEntity';
export interface IFeed extends Feed, Document {
}
export declare const FeedModel: import("mongoose").Model<Feed & Document<unknown, any, any>, {}, {}, {}, Document<unknown, {}, Feed & Document<unknown, any, any>> & Feed & Document<unknown, any, any> & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export declare class FeedRepository {
    createFeed(data: Partial<Feed>): Promise<IFeed>;
    getAllFeeds(): Promise<IFeed[]>;
    getFeedById(id: string): Promise<IFeed | null>;
    updateFeed(id: string, data: Partial<Feed>): Promise<IFeed | null>;
    deleteFeed(id: string): Promise<void>;
}

export interface Feed {
    title: string;
    description?: string;
    source: 'El País' | 'El Mundo';
    url: string;
    createdAt?: Date;
}
export declare class FeedEntity implements Feed {
    title: string;
    description?: string;
    source: 'El País' | 'El Mundo';
    url: string;
    createdAt?: Date;
    constructor(data: Partial<Feed>);
    isValidUrl(): boolean;
    toJSON(): Feed;
}

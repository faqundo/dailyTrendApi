import { Request, Response } from "express";
export declare const FeedController: {
    index(req: Request, res: Response): Promise<void>;
    show(req: Request, res: Response): Promise<void>;
    create(req: Request, res: Response): Promise<void>;
    update(req: Request, res: Response): Promise<void>;
    destroy(req: Request, res: Response): Promise<void>;
    readFeeds(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    scrape(req: Request, res: Response): Promise<void>;
};
export default FeedController;

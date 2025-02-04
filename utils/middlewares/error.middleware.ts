import { Request, Response, NextFunction } from 'express';

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.error(err.stack);
    return res.status(500).json({ error: 'Internal Server Error' });
}

export default errorHandler;
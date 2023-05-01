import { Request, Response } from 'express';

interface customError extends Error {
    status?: number;
}

export default (displayType: string) => (err: customError, _req: Request, res: Response) => {
    let status = 500;
    if (err.status) status = err.status;

    let { message } = err;
    if (status === 500) {
        message = 'Internal Server Error, please retry again later...';
    }

    if (displayType === 'json') {
        res.status(status).json({ error: message });
    } else {
        res.status(status).json({ error: message });
    }
};

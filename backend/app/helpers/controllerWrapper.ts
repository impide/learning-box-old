import { Request, Response, NextFunction } from 'express';

interface ControllerFunction {
    (req: Request, res: Response): Promise<Response>;
}

export default (controller: ControllerFunction) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await controller(req, res);
    } catch (error) {
        next(error);
    }
};

import { Request, Response } from 'express';
import CategoryServices from "../../services/category";
import { CategoryModel } from '../../models/category';

export default {
    async getAll(_req: Request, res: Response) {
        const categories: CategoryModel[] = await CategoryServices.findAll();

        return res.status(200).json({
            status: 200,
            result: categories,
        });
    },
};

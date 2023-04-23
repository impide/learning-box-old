import adminDataMapper from '../../models/admin.js';

export default {
    async getAll(req, res) {
        // Retrieves All Categories
        const categories = await adminDataMapper.findAllCategories();

        return res.status(200).json({
            status: 200,
            result: categories,
        });
    },
};

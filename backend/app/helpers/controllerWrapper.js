// Middleware for Manage Try/Catch
export default (controller) => async (req, res, next) => {
    try {
        await controller(req, res);
    } catch (error) {
        next(error);
    }
};

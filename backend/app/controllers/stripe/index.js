const stripeController = {

    home(req, res) {
        const fullUrl = `${req.protocol}://${req.get('host')}`;
        return res.json({
            documentation_url: `${fullUrl}/docs`,
        });
    },
};

export { stripeController };
export { default as paymentController } from './payment.js';

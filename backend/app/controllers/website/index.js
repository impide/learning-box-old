const websiteController = {
    // Home controller which display documentation link.
    home(_, res) {
        res.render('home', { title: 'Formation' });
    },
};

export { websiteController };
export { default as documentationController } from './documentation.js';

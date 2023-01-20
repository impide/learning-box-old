/* eslint-disable no-unused-vars */
export default (displayType) => (err, req, res, next) => {
    let status = 500;

    if (err.status) {
        status = err.status;
    }

    let { message } = err;
    if (status === 500) {
        message = 'Internal Server Error, please retry again later...';
    }

    // If Error occur in Controller
    if (displayType === 'json') {
        res.status(status).json({ error: message });
        // Else if occur in Documentation
    } else {
        // eslint-disable-next-line no-console
        console.log(displayType);
    }
};

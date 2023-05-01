"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (displayType) => (err, _req, res) => {
    let status = 500;
    if (err.status)
        status = err.status;
    let { message } = err;
    if (status === 500) {
        message = 'Internal Server Error, please retry again later...';
    }
    if (displayType === 'json') {
        res.status(status).json({ error: message });
    }
    else {
        res.status(status).json({ error: message });
    }
};
//# sourceMappingURL=errorHandler.js.map
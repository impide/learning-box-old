class FileError extends Error {
    constructor(message) {
        super(message);
        this.name = 'File not found';
        this.status = 500;
    }
}

class Forbidden extends Error {
    constructor(message) {
        super(message);
        this.name = 'Access Forbidden';
        this.status = 403;
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
        this.status = 404;
    }
}
class Unauthorized extends Error {
    constructor(message) {
        super(message);
        this.name = 'Unauthorized';
        this.status = 401;
    }
}

class UnlinkFile extends Error {
    constructor(message) {
        super(message);
        this.name = 'Cannot unlink File';
        this.status = 500;
    }
}

class UserAlreadyExist extends Error {
    constructor(message) {
        super(message);
        this.name = 'Aleady Exists';
        this.status = 403;
    }
}

class UserInputError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UserInputError';
        this.status = 400;
    }
}

export {
    FileError,
    Forbidden,
    NotFoundError,
    Unauthorized,
    UnlinkFile,
    UserAlreadyExist,
    UserInputError,
};

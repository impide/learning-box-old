import multer from 'multer';

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const isValid = MIME_TYPES[file.mimetype];
        let error = new Error('Invalid mime type');
        if (isValid) {
            error = null;
        }
        callback(error, 'public/images');
    },
    filename: (req, file, callback) => {
        const name = file.originalname
            .toLowerCase()
            .split(' ')
            .join('-');
        const ext = MIME_TYPES[file.mimetype];

        let extractUnplash = name;
        if (name.includes('unsplash')) {
            extractUnplash = name.split('unsplash');
        }
        const extractExt = extractUnplash.split(/\.(?=[^\\.]+$)/);
        callback(null, `${extractExt[0]}-${Date.now()}.${ext}`);
    },
});

const upload = multer({ storage });
export default upload.single('image');

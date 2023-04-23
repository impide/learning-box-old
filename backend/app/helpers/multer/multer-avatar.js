import multer from 'multer';

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
};

const storage = multer.diskStorage({
    // Retrieve extension file and see if it Matches our values
    destination: (req, file, callback) => {
        const isValid = MIME_TYPES[file.mimetype];
        let error = new Error('Invalid mime type');
        if (isValid) {
            error = null;
        }
        callback(error, 'public/images');
    },
    // Let's format the name of our file
    filename: (req, file, callback) => {
        const name = file.originalname
            .toLowerCase()
            .split(' ')
            .join('-');
        const ext = MIME_TYPES[file.mimetype];

        // If we have "unsplash", delete it
        let extractUnplash = name;
        if (name.includes('unsplash')) {
            extractUnplash = name.split('unsplash');
        }

        // If our fileName has already an extension, don't take it
        const extractExt = extractUnplash.split(/\.(?=[^\\.]+$)/);
        callback(null, `${extractExt[0]}-${Date.now()}.${ext}`);
    },
});

const upload = multer({ storage });
export default upload.single('image');

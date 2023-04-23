import multer from 'multer';

const MIME_TYPES = {
    'application/pdf': 'pdf',
    'video/mp4': 'mp4',
};

const storage = multer.diskStorage({
    // Retrieve extension file and see if it Matches our values
    destination: (req, file, callback) => {
        const isValid = MIME_TYPES[file.mimetype];
        let error = new Error('Invalid mime type');
        if (isValid) {
            error = null;
        }
        callback(error, 'public/files');
    },
    // Let's format the name of our file
    filename: (req, file, callback) => {
        const name = file.originalname
            .toLowerCase()
            .split(' ')
            .join('-');
        const ext = MIME_TYPES[file.mimetype];
        // If our fileName has already an extension, don't take it
        const extractExt = name.split(/\.(?=[^\\.]+$)/);
        callback(null, `${extractExt[0]}-${Date.now()}.${ext}`);
        console.log(`${ext.toUpperCase()} :`, `${extractExt[0]}-${Date.now()}.${ext}`);
    },
});

// In Insomnia , files must use the same KeyName
// as below ('files')
const upload = multer({ storage });
export default upload.array('files', 2);

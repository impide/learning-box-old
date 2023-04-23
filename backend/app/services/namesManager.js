// eslint-disable-next-line no-unused-vars
export default function addSrcNames(req, res) {
    const url = `${req.protocol}://${req.get('host')}`;
    req.files.forEach((file) => {
        if (file.mimetype === 'video/mp4') {
            req.body.video = `${url}/public/files/${file.filename}`;
        } else {
            req.body.PDF = `${url}/public/files/${file.filename}`;
        }
    });
}

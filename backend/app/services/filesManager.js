import fs from 'fs';
import { UnlinkFile } from '../helpers/errorClasses/errorClasses.js';

export default {
    updateFilesSources(course, url, files) {
        let { video } = course;
        let { PDF } = course;

        if (files) {
            files.forEach((file) => {
                if (file.mimetype === 'video/mp4') {
                    const filename = course.video.split('/files/')[1];
                    fs.unlink(`public/files/${filename}`, (err) => {
                        if (err) {
                            throw new UnlinkFile(err);
                        }
                    });
                    video = `${url}/public/files/${file.filename}`;
                } else {
                    const filename = course.PDF.split('/files/')[1];
                    fs.unlink(`public/files/${filename}`, (err) => {
                        if (err) {
                            throw new UnlinkFile(err);
                        }
                    });
                    PDF = `${url}/public/files/${file.filename}`;
                }
            });
        }

        return { video, PDF };
    },
};

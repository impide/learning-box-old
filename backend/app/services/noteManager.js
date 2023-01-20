/* eslint-disable no-unused-vars */
import { UserInputError } from '../helpers/errorClasses/errorClasses.js';

// Note must be unique
export default {
    updateNotesValues(note, body) {
        let importedNote = null;

        const notes = note.map((object) => object.userId);
        if (notes.indexOf(body.userId) !== -1) {
            throw new UserInputError('Note must be unique');
        } else {
            importedNote = body;
        }

        return importedNote;
    },
};

/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable object-curly-spacing */
// /* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { setNote, getNote } = require("../lib");
const { getUser } = require("../../users/lib");

exports.createNewNote = function (request, response) {
    const title = request.body.data.Title;
    const des = request.body.data.Description;
    const uid = request.body.data.Uid;
    let noteId;
    let status = 200;

    const createNotePromise = getUser(uid).then((note) => {
        const noteCount = note.noteCount + 1;
        noteId = note.NoteId + noteCount.toString();
        setNote(uid, noteId, title, des);
    }).catch((error) => {
        status = 500;
        console.log("Error:", error);
    });
    return Promise.resolve(createNotePromise);
}
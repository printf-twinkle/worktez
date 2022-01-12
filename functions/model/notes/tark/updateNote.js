/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable object-curly-spacing */
// /* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if


const { getNote, updateNote } = require("../lib");

exports.updateNote = function(request, response) {
    const title = request.body.data.Title;
    const description = request.body.data.Description;
    const uid = request.body.data.Uid;
    const noteId = request.body.data.noteId;
    let status = 200;

    const updateNotePromise = getNote(uid, noteId).then((note) => {
        updateNoteJson = {
            Title: title,
            Description: description,
        };
        updateNote(updateNoteJson, uid, noteId);
    }).catch((error) => {
        status = 500;
        console.log("Error:", error);
    });
    return Promise.resolve(updateNotePromise);
}
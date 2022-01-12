/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */

const { db } = require("../application/lib");

exports.setNote = function(Uid, noteId, title, des) {
    const createNote = db.collection("Users").doc(Uid).collection("Notes").doc(noteId).set({
        Id: noteId,
        Title: title,
        Description: des,
    });
    return Promise.resolve(createNote);
};

exports.getNote = function(Uid, noteId) {
    const getNotePromise = db.collection("Users").doc(Uid).collection("Notes").doc(noteId).get().then((doc) => {
        if (doc.exists) return doc.data();
        else return;
    });
    return Promise.resolve(getNotePromise);
};

exports.updateNote = function(inputJson, Uid, NoteId) {
    const updateNotePromise = db.collection("Users").doc(Uid).collection("Notes").doc(NoteId).update(inputJson);
    return Promise.resolve(updateNotePromise);
};

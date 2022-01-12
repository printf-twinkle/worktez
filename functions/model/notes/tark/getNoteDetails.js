/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-unused-vars */
const { getNote } = require("../lib");

exports.getNoteDetails = function(request, response) {
  const uid = request.body.data.Uid;
  const noteId = request.body.data.noteId;
  let result;
  let status = 200;
  
  const p1 = getNote(uid, noteId).then((noteDoc) => {
    if (noteDoc == undefined) {
      result = {data: {status: "ERROR", noteData: undefined}};
    } else {
      result = {data: {status: "OK", noteData: noteDoc}};
    }
  }).catch((error) => {
    status = 500;
    console.log("Error:", error);
  });
  return Promise.resolve(p1).then(() => {
    console.log("Fetched Note Successfully");
    return response.status(status).send(result);
  }).catch((error) => {
    console.error("Error Fetching Note", error);
    return response.status(status).send(result);
  });
};

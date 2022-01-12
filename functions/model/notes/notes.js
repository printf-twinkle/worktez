/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if


const { functions, cors, fastify, requestHandler } = require("../application/lib");

const { createNewNote } = require("./tark/createNewNote");
const { deleteNote } = require("./tark/deleteNote");
const { updateNote } = require("./tark/updateNote");
const { getAllNotes } = require("./tark/getAllNotes");
const { getNoteDetails } = require("./tark/createNewNote");

  
  fastify.post("/createNewNote", (req, res) => {
    createNewNote(req, res);
  });

  fastify.post("/deleteNote", (req, res) => {
    deleteNote(req, res);
  });

  fastify.post("/updateNote", (req, res) => {
    updateNote(req, res);
  });

  fastify.post("/getAllNotes", (req, res) => {
    getAllNotes(req, res);
  });

  fastify.post("/getNoteDetails", (req, res) => {
    getNoteDetails(req, res);
  });

  exports.tasks = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
      fastify.ready((err) => {
        if (err) throw err;
            requestHandler(req, res);
        });
    });
});

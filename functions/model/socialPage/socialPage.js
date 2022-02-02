/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { functions, cors, fastify, requestHandler } = require("../application/lib");
const { addPost } = require("./tark/addPost");
const { addComment } = require("./tark/addComment");


fastify.post("/addPost", (req, res) => {
    console.log("inside controller of addPost");
    addPost(req, res);

});

fastify.post("/addComment", (req, res) => {
    addComment(req, res);
});


exports.socialPage = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        fastify.ready((err) => {
            if (err) throw err;
            requestHandler(req, res);
        });
    });
}); 
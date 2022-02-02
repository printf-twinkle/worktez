/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { addUserComment } = require("../lib");
const { getUser, updateUser } = require("../../users/lib");

exports.addComment = function(request, response) {
    const uid = request.body.data.Uid;
    const content = request.body.data.Content;

    const lastUpdatedDate = request.body.data.LastUpdatedDate;
    const lastUpdatedTime = request.body.data.LastUpdatedTime;

    let result;
    let status = 200;


    const promise1 = getUser(uid, "").then((userData) => {
        let docId = "";
        if (userData) {
            let Commentcounter=userData.CommentCounter;
            Commentcounter = Commentcounter+1;
            docId= "c" + Commentcounter;

            updateUserInputJson = {
                CommentCounter: Commentcounter,
            };
            updateUser(updateUserInputJson, uid);

            addUserComment(uid, content, docId, lastUpdatedDate, lastUpdatedTime).then((commentData) => {
                console.log("Comment added Successfully");
            }).catch((error) => {
                result = { data: error };
                status = 500;
                console.error("Error", error);
            });
        }

});

    const Promises = [promise1];
    return Promise.all(Promises).then(() => {
        result = { data: "Comment Added successfully" };
        return response.status(status).send(result);
    }).catch((error) => {
        result = { data: error };
        console.error("Error adding Note", error);
        return response.status(status).send(result);
    });
}; 
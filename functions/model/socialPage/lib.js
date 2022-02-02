/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */

const { db } = require("../application/lib");

exports.setPost = function(uid, post, postId, lastUpdatedDate, lastUpdatedTime) {
    const addPostPromise = db.collection("Social").doc(postId).set({
        Uid: uid,
        Post: post,
        PostId: postId,
        Reach: 0,
        Reactions: 0,
        CommentCounter: 0,
        LastUpdatedDate: lastUpdatedDate,
        LastUpdatedTime: lastUpdatedTime,
        Status: "OK",
    });
    return Promise.resolve(addPostPromise);
};

exports.addUserComment = function(uid, content, docId, lastUpdatedDate, lastUpdatedTime) {
    const addCommentPromise = db.collection("Social").doc(uid).collection("Comment").doc(postId).set({
        Content: content,
        PostId: postId,
        LastUpdatedDate: lastUpdatedDate,
        LastUpdatedTime: lastUpdatedTime,
        Status: "OK",
    });
    return Promise.resolve(addCommentPromise);
}; 
/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */

const { db } = require("../application/lib");

exports.setNote = function(Uid, noteId, title, des) {
    const createNote = db.collection("Users").doc(Uid).set({
        Id: noteId,
        Title: title,
        Description: des,
    });
    return Promise.resolve(createNote);
};

exports.getNote = function(Uid) {
    const getNotePromise = db.collection("Users").doc(Uid).get().then((doc) => {
        if (doc.exists) return doc.data();
        else return;
    });
    return Promise.resolve(getNotePromise);
};

// exports.updateTask = function(inputJson, orgDomain, taskId) {
//     const updateTaskPromise = db.collection("Organizations").doc(orgDomain).collection("Tasks").doc(taskId).update(inputJson);
//     return Promise.resolve(updateTaskPromise);
// };

// exports.getTask = function(taskId, orgDomain) {
//     const getTaskDetails = db.collection("Organizations").doc(orgDomain).collection("Tasks").doc(taskId).get().then((taskDoc) => {
//         return taskDoc.data();
//     });
//     return Promise.resolve(getTaskDetails);
// };

// exports.getAllTasks = function(orgDomain, teamId = "", sprintNumber = "", filterAssignee = "", filterPriority = "", filterDifficulty = "", filterStatus = "", filterProject = "", sprintRange1 = "", sprintRange2 = "") {
//     let query = db.collection("Organizations").doc(orgDomain).collection("Tasks");
//     if (sprintNumber != "") {
//         query = query.where("SprintNumber", "==", sprintNumber);
//     }
//     if (sprintRange1 != "") {
//         query = query.where("SprintNumber", ">=", sprintRange1);
//     }
//     if (sprintRange2 != "") {
//         query = query.where("SprintNumber", "<=", sprintRange2);
//     }
//     if (filterAssignee != "") {
//         query = query.where("Assignee", "==", filterAssignee);
//     }
//     if (filterPriority != "") {
//         query = query.where("Priority", "==", filterPriority);
//     }
//     if (filterDifficulty != "") {
//         query = query.where("Difficulty", "==", filterDifficulty);
//     }
//     if (filterStatus == "Incomplete") {
//         query = query.where("Status", "!=", "Completed");
//     } else if (filterStatus != "") {
//         query = query.where("Status", "==", filterStatus);
//     }
//     if (filterProject != "") {
//         query = query.where("Project", "==", filterProject);
//     }
//     if (teamId != "") {
//         query = query.where("TeamId", "==", teamId);
//     }

//     const getAllTasksPromise = query.get();

//     return Promise.resolve(getAllTasksPromise);
// };

// exports.getLink = function(orgDomain, taskId) {
//     const getLinkDetails = db.collection("Organizations").doc(orgDomain).collection("Tasks").doc(taskId).collection("Link").get();
//     return Promise.resolve(getLinkDetails);
// };

// exports.setLinkDoc = function(orgDomain, taskId, linkType, linkURL, linkID) {
//     const setLinkDetails = db.collection("Organizations").doc(orgDomain).collection("Tasks").doc(taskId).collection("Link").doc(linkID).set({
//         LinkType: linkType,
//         LinkURL: linkURL,
//         TaskID: taskId,
//         LinkID: linkID,
//         OrgDomain: orgDomain,
//     });
//     return Promise.resolve(setLinkDetails);
// };
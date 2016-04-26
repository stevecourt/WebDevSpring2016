"use strict";

module.exports = function (app, mongoose, assignmentUserModel, projectUserModel) {

    // Define models
    //var assignmentUserModel = require("../../assignment/server/models/user.model.server.js")(mongoose);
    //var projectUserModel = require("./models/user.model.server.js")(mongoose);

    // Define services
    var userService = require("./services/user.service.server.js");

    // Define security
    var security = require("../../security/security.js");

    // Pass models to services
    userService(app, projectUserModel);
    security(app, assignmentUserModel, projectUserModel);
};
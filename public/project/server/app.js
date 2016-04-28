"use strict";

module.exports = function (app, mongoose, assignmentUserModel, projectUserModel) {

    // Define models
    var locationModel = require("./models/location.model.server.js")(mongoose);

    // Define services
    var userService = require("./services/user.service.server.js");
    var locationService = require("./services/location.service.server.js");

    // Define security
    var security = require("../../security/security.js");

    // Pass models to services
    userService(app, projectUserModel);
    security(app, assignmentUserModel, projectUserModel);
    locationService(app, locationModel, projectUserModel);
};
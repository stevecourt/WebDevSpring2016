"use strict";

module.exports = function (app, mongoose, db) {

    // Define models
    var userModel = require("./models/user.model.server.js")(mongoose, db);
    var formModel = require("./models/form.model.server.js")(mongoose, db);
    var fieldModel = require("./models/field.model.server.js")(mongoose, db);

    // Define services
    var userService = require("./services/user.service.server.js");
    var formService = require("./services/form.service.server.js");
    var fieldService = require("./services/field.service.server.js");

    // Pass models to services
    userService(app, userModel);
    formService(app, formModel);
    fieldService(app, fieldModel);
};
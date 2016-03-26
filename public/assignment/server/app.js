"use strict";

module.exports = function (app) {

    var userModel = require("./models/user.model.js")();
    var formModel = require("./models/form.model.js")();

    var userService = require("./services/user.service.server.js");
    var formService = require("./services/form.service.server.js");
    var fieldService = require("./services/field.service.server.js");

    // Pass models to services
    userService(app, userModel);
    formService(app, formModel);
    fieldService(app, formModel);
}
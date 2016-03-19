"use strict";

module.exports = function (app) {

    // TODO: Check if these need to go inside the function as in Jose's example WebDev/app.js below.

    var userModel = require("./models/user.model.js")();
    var formModel = require("./models/form.model.js")(app);

    var userService = require("./services/user.service.server.js");
    var formService = require("./services/form.service.server.js");
    var fieldService = require("./services/field.service.server.js");

    // Pass models to services
    userService(app, userModel);
    formService(app, formModel);
    fieldService(app, formModel);
}


/*
module.exports = function(app, db, mongoose, passport, LocalStrategy) {
    var CourseModel = require("./models/course.server.model.js")(mongoose);
    require("./services/course.server.service.js")(app, CourseModel);
    require("./services/user.server.service.js")(app, db, mongoose, passport, LocalStrategy);
};
*/
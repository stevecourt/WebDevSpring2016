"use strict";

module.exports = function(app, userModel) {

    // User Service Endpoints
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user?username=username", findUserByUsername);
    app.get("/api/assignment/user?username=username&password=password", findUserByCredentials); // Typo in assignment?
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);

    function createUser(req, res) {
        var userObj = req.body;
        userModel
            .createUser(userObj)
            .then(function (users) {
                res.json(users);
            });
    }

    function findAllUsers(req, res) {
        userModel
            .findAllUsers()
            .then(function (users) {
                res.json(users);
            });
    }

    function findUserById(req, res) {
        var userObjId = req.params.id;
        userModel
            .findUserById(userObjId)
            .then(function (user) {
                res.json(user);
            });
    }

    function findUserByUsername(req, res) {
        var userObjUsername = req.params.username;
        userModel
            .findUserByUsername(userObjUsername)
            .then(function (user) {
                res.json(user);
            });
    }

    function findUserByCredentials(req, res) {
        var userCredentials = {"username": req.params.username, "password": req.params.password};
        userModel
            .findUserByUsername(userCredentials)
            .then(function (user) {
                res.json(user);
            });
    }

    function updateUserById(req, res) {
        var userObjId = req.params.id;
        var userObj = req.body;
        userModel
            .updateUser(userObjId, userObj)
            .then(function (users) {
                res.json(users);
            });
    }

    function deleteUserById(req, res) {
        var userObjId = req.params.id;
        userModel
            .deleteUserById(userObjId)
            .then(function (users) {
                res.json(users);
            });
    }
}
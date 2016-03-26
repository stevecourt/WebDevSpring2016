"use strict";

var uuid = require('node-uuid');

module.exports = function (app, userModel) {

    // User Service Endpoints
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user", findUsers);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);

    function createUser(req, res) {
        var userObj = req.body;
        userObj._id = uuid.v1(); // Create random ID
        var updatedUserList = userModel.createUser(userObj);
        if (updatedUserList) {
            res.json(updatedUserList);
        } else {
            res.send(500);
        }
    }

    function findUserById(req, res) {
        var userId = req.params.id;
        var userFound = userModel.findUserById(userId);
        if (userFound) {
            res.json(userFound);
        } else {
            res.send(404);
        }
    }

    function findUsers(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if (username && password) {
            var userCredentials = {"username": username, "password": password};
            var userFound = userModel.findUserByCredentials(userCredentials);
            if (userFound) {
                res.json(userFound);
            } else {
                res.send(404);
            }
        } else if (username) {
            var userFound = userModel.findUserByUsername(username);
            if (userFound) {
                res.json(userFound);
            } else {
                res.send(404);
            }
        } else {
            var usersFound = userModel.findAllUsers();
            if (usersFound) {
                res.json(usersFound);
            } else {
                res.send(500);
            }
        }
    }

    function updateUserById(req, res) {
        var userId = req.params.id;
        var userObj = req.body;
        var updatedUserList = userModel.updateUserById(userId, userObj);
        if (updatedUserList) {
            res.json(updatedUserList);
        } else {
            res.send(404);
        }
    }

    function deleteUserById(req, res) {
        var userId = req.params.id;
        var updatedUserList = userModel.deleteUserById(userId);
        if (updatedUserList) {
            res.json(updatedUserList);
        } else {
            res.send(404);
        }
    }
}
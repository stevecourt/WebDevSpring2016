"use strict";

module.exports = function (app, userModel) {

    // User Service Endpoints
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user", findUsers);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);

    function createUser(req, res) {
        var userObj = req.body;
        userModel.createUser(userObj)
            .then(function (updatedUserList) {
                if (updatedUserList) {
                    res.json(updatedUserList);
                } else {
                    res.send(500);
                }
            });
    }

    function findUserById(req, res) {
        var userId = req.params.id;
        userModel.findUserById(userId)
            .then(function (userFound) {
                if (userFound) {
                    res.json(userFound);
                } else {
                    res.send(404);
                }
            });
    }

    function findUsers(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if (username && password) {
            var userCredentials = {"username": username, "password": password};
            userModel.findUserByCredentials(userCredentials)
                .then(function (userFound) {
                    if (userFound) {
                        res.json(userFound);
                    } else {
                        res.send(404);
                    }
                });
        } else if (username) {
            userModel.findUserByUsername(username)
                .then(function (userFound) {
                    if (userFound) {
                        res.json(userFound);
                    } else {
                        res.send(404);
                    }
                });
        } else {
            userModel.findAllUsers()
                .then(function (usersFound) {
                    if (usersFound) {
                        res.json(usersFound);
                    } else {
                        res.send(500);
                    }
                });
        }
    }

    function updateUserById(req, res) {
        var userId = req.params.id;
        var userObj = req.body;
        userModel.updateUserById(userId, userObj)
            .then (function (updatedUserList) {
                if (updatedUserList) {
                    res.json(updatedUserList);
                } else {
                    res.send(404);
                }
            });
    }

    function deleteUserById(req, res) {
        var userId = req.params.id;
        userModel.deleteUserById(userId)
            .then (function (updatedUserList) {
                if (updatedUserList) {
                    res.json(updatedUserList);
                } else {
                    res.send(404);
                }
            });
    }
};
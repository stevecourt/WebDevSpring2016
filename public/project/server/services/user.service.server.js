"use strict";

var passport = require('passport');
var bcrypt = require("bcrypt-nodejs");

module.exports = function (app, userModel) {

    var auth = authenticated;

    // User authentification endpoints
    app.put("/api/project/user/:userId", auth, updateUser);
    app.put ("/api/project/follow/:userId", auth, addFollowById);

    // Admin user endpoints
    app.post ("/api/project/admin/user", isAdmin, createUser);
    app.get ("/api/project/admin/user", auth, findAllUsers);
    app.get ("/api/project/admin/user/:userId", isAdmin, findUserById);
    app.delete("/api/project/admin/user/:userId", isAdmin, deleteUser);
    app.put ("/api/project/admin/user/:userId", isAdmin, updateUser);


    function authenticated (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function isAdmin(req, res, next) {
        if (req.isAuthenticated()) {
            userModel
                .findUserById(req.user._id)
                .then(function(user) {
                    delete user.password;
                    if(user.roles.indexOf("admin") > -1) {
                        return next();
                    } else {
                        res.redirect('/#/login');
                    }
                });
        } else {
            res.send(403);
        }
    }

    function createUser(req, res) {
        var newUser = req.body;
        if (newUser.roles) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["basic"];
        }
        if (!newUser.follows) {
            newUser.follows = 0;
        }
        newUser.password = bcrypt.hashSync(newUser.password);

        // first check if a user already exists with the username
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    // if the user does not already exist
                    if(user == null) {
                        // create a new user
                        return userModel.createUser(newUser)
                            .then(
                                // fetch all the users
                                function(){
                                    return userModel.findAllUsers();
                                },
                                function(err){
                                    res.status(400).send(err);
                                }
                            );
                        // if the user already exists, then just fetch all the users
                    } else {
                        return userModel.findAllUsers();
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(){
                    res.status(400).send(err);
                }
            )
    }

    function findAllUsers(req, res) {
        userModel
            .findAllUsers()
            .then(
                function (users) {
                    res.json(users);
                },
                function () {
                    res.status(400).send(err);
                }
            );
    }

    function findUserById(req, res) {
        userModel.findUserById(req.params.userId)
            .then(function (userFound) {
                if (userFound) {
                    res.json(userFound);
                } else {
                    res.send(404);
                }
            });
    }


    function deleteUser(req, res) {
        userModel
            .deleteUserById(req.params.userId)
            .then(
                function(user){
                    return userModel.findAllUsers();
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function updateUser(req, res) {
        var newUser = req.body;

        if(typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }
        if(typeof newUser.emails == "string") {
            newUser.emails = newUser.emails.split(",");
        }
        if(typeof newUser.roles == "string") {
            newUser.phones = newUser.phones.split(",");
        }
        userModel
            .findUserById(newUser._id)
            .then(function (user) {
                if (newUser.password != user.password) {
                    newUser.password = bcrypt.hashSync(newUser.password);
                }
                userModel
                    .updateUserById(req.params.userId, newUser)
                    .then(
                        function(user){
                            return userModel.findAllUsers();
                        },
                        function(err){
                            res.status(400).send(err);
                        }
                    )
                    .then(
                        function(users){
                            res.json(users);
                        },
                        function(err){
                            res.status(400).send(err);
                        }
                    );
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function addFollowById(req, res) {
        var userId = req.params.userId;

        userModel
            .findUserById(userId)
            .then(function (user) {
                user.follows = user.follows + 1;
                userModel
                    .updateUserById(userId, user)
                    .then(
                        function(user){
                            return userModel.findAllUsers();
                        },
                        function(err){
                            res.status(400).send(err);
                        }
                    )
                    .then(
                        function(users){
                            res.json(users);
                        },
                        function(err){
                            res.status(400).send(err);
                        }
                    );
            }, function (err) {
                res.status(400).send(err);
            });
    }
};
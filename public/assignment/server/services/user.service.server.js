"use strict";

//var passport = require('passport');

module.exports = function (app, userModel) {

    //var auth = authorized;

    // TODO Check if this is needed given app.js
    //var userModel = require("../../models/user/user.model.server.js")();

    // User Service endpoints
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user", findUsers);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);

    /*
    // User authentification endpoints
    app.post ("/api/login", passport.authenticate("local"), login);
    app.post ("/api/logout", logout);
    app.post ("/api/register", register);
    app.post ("/api/user", auth, createUser);
    app.get ("/api/loggedin", loggedin);
    app.get ("/api/user", auth, findAllUsers);
    app.put ("/api/user/:id", auth, updateUser);
    app.delete("/api/user/:id", auth, deleteUser);

    // TODO: Check if this communicates with the model/db.  Is ".then" format required?
    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };
    */

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

    // Passport strategies ///////////////////////////////////////////////////////////

    /*
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials({username: username, password: password})
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }
    */
};
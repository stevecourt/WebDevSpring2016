"use strict";

var passport = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function (app, userModel) {

    var auth = authorized;

    // TODO Check if this is needed given app.js
    //var userModel = require("../../models/user/user.model.server.js")();

    // User Service endpoints
    //app.post("/api/assignment/user", createUser);
    //app.get("/api/assignment/user/:id", findUserById);
    //app.get("/api/assignment/user", findUsers);
    //app.put("/api/assignment/user/:id", updateUserById);
    //app.delete("/api/assignment/user/:id", deleteUserById);

    // User authentification endpoints
    app.post ("/api/assignment/login", passport.authenticate("local"), login);
    app.get ("/api/assignment/loggedin", loggedin);
    app.post ("/api/assignment/logout", logout);
    app.post ("/api/assignment/register", register);
    app.put("/api/assignment/user/:userId", updateUserProfile);

    // Admin user endpoints
    app.post ("/api/assignment/admin/user", auth, createUser);
    app.get ("/api/assignment/admin/user", auth, findAllUsers);
    app.get ("/api/assignment/admin/user/:userId", auth, findUserById);
    app.delete("/api/assignment/admin/user/:userId", auth, deleteUser);
    app.put ("/api/assignment/admin/user/:userId", auth, updateUser);

    // TODO: Check if this communicates with the model/db.  Is ".then" format required?
    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {

        console.log("entered local strategy");

        userModel
            .findUserByCredentials({username: username, password: password})
            .then(
                function(user) {

                    console.log("still in local strategy");

                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {

        console.log("entered serializeUser");

        done(null, user);
    }

    function deserializeUser(user, done) {

        console.log("entered deserializeUser");

        userModel.findUserById(user._id)
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

        console.log("entered web service - login");
        console.log("req.user = ");
        console.log(req.user);

        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res) {

        console.log("entered web service - logged in");
        console.log(req.user);
        console.log(req.isAuthenticated() ? req.user : '0');

        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register(req, res) {
        var newUser = req.body;
        newUser.emails = newUser.emails.split(",");
        newUser.roles = ["student"];
        newUser.password = bcrypt.hashSync(newUser.password);

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        return userModel.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){

                        console.log("entered web service - register/login");
                        console.log("users found = ");
                        console.log(user);

                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function createUser(req, res) {
        var newUser = req.body;
        if(newUser.roles && newUser.roles.length > 1) { // TODO: Check this conditional.  It seems wrong.
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["student"];
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
        if(isAdmin(req.user)) {
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
        } else {
            res.status(403);
        }
    }

    function findUserById(req, res) {
        if(isAdmin(req.user)) {

        userModel.findUserById(req.params.userId)
            .then(function (userFound) {
                if (userFound) {
                    res.json(userFound);
                } else {
                    res.send(404);
                }
            });

        } else {
            res.status(403);
        }
    }

    function deleteUser(req, res) {
        if(isAdmin(req.user)) {

            console.log("server user service");
            console.log(req.params.userId);

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
        } else {
            res.status(403);
        }
    }

    function updateUser(req, res) {
        var newUser = req.body;
        if(!isAdmin(req.user)) {
            delete newUser.roles;
        }
        if(typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }
        if(typeof newUser.emails == "string") {
            newUser.emails = newUser.emails.split(",");
        }
        if(typeof newUser.roles == "string") {
            newUser.phones = newUser.phones.split(",");
        }
        userModel.findUserById(newUser._id)
            .then(function (user) {

                console.log("bcrypt.compareSync");
                console.log(newUser.password);
                console.log(user.password);
                //console.log(bcrypt.compareSync(newUser.password, user.password));

                if (newUser.password != user.password) {

                    console.log("encrypting password");

                    newUser.password = bcrypt.hashSync(newUser.password);
                }

                console.log(newUser.password);

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

    function updateUserProfile(req, res) {
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
        userModel.findUserById(newUser._id)
            .then(function (user) {

                console.log("bcrypt.compareSync");
                console.log(newUser.password);
                console.log(user.password);
                //console.log(bcrypt.compareSync(newUser.password, user.password));

                if (newUser.password != user.password) {

                    console.log("encrypting password");

                    newUser.password = bcrypt.hashSync(newUser.password);
                }

                console.log(newUser.password);

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

    function isAdmin(req, res, next) {

        console.log("In isAdmin function");
        console.log(req);
        console.log(req.roles.indexOf("admin") > 0);
        //console.log(req.isAuthenticated());

        // Temporary line
        return true;
/*
        if(!req.roles.indexOf("admin") > 0 && !req.isAuthenticated()) { //TODO Check on Admin conditional and loggedIn.
            res.send(403);
        } else {
            next(); // TODO Check on this. How is is passed in?
        }
        */
    }

/*
    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };
    */
};
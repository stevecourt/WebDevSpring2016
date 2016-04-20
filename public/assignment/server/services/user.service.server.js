"use strict";

var passport = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function (app, userModel) {

    var auth = authenticated;

    // User authentification endpoints
    app.post ("/api/assignment/login", passport.authenticate("local"), login);
    app.get ("/api/assignment/loggedin", loggedin);
    app.post ("/api/assignment/logout", logout);
    app.post ("/api/assignment/register", register);
    app.put("/api/assignment/user/:userId", auth, updateUser);

    // Admin user endpoints
    app.post ("/api/assignment/admin/user", isAdmin, createUser);
    app.get ("/api/assignment/admin/user", isAdmin, findAllUsers);
    app.get ("/api/assignment/admin/user/:userId", isAdmin, findUserById);
    app.delete("/api/assignment/admin/user/:userId", isAdmin, deleteUser);
    app.put ("/api/assignment/admin/user/:userId", isAdmin, updateUser);

    function authenticated (req, res, next) {

        console.log("in authenticated");
        console.log("");

        if (!req.isAuthenticated()) {

            console.log("NOT authenticated");
            console.log("");

            res.send(401);
        } else {

            console.log("YES! authenticated");
            console.log("");

            next();
        }
    }

    function isAdmin(req, res, next) {

        console.log("in isAdmin");
        console.log("");

        if (req.isAuthenticated()) {

            console.log("YES! authenticated (isAdmin)");
            console.log("");

            userModel
                .findUserById(req.user._id)
                .then(function(user) {

                    console.log("user found (isAdmin)");
                    console.log(user);

                    delete user.password;
                    if(user.roles.indexOf("admin") > -1) {

                        console.log("user found is Admin");

                        return next();
                    } else {

                        console.log("user found is NOT Admin");

                        res.redirect('/#/login');
                    }
                });
        } else {

            console.log("NOT authenticated (isAdmin)");
            console.log("");

            res.send(403);
        }
    }

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {

        console.log("in localStrategy");
        console.log("username...");
        console.log(username);
        console.log("");
        console.log("password...");
        console.log(password);
        console.log("");
        console.log("done...");
        console.log(done);
        console.log("");

        userModel
            .findUserByCredentials({username: username, password: password})
            .then(
                function(user) {

                    console.log("in localStrategy");
                    console.log("user already exists");
                    console.log("");

                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {

                    console.log("in localStrategy");
                    console.log("user does not exist");
                    console.log("");

                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {

        console.log("serializeUser server service");
        console.log("user...");
        console.log(user);
        console.log("");

        done(null, user);
    }

    function deserializeUser(user, done) {

        console.log("deserializeUser server service");
        console.log("user...");
        console.log(user);
        console.log("");

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

        var user = req.user;

        console.log("login server service");
        console.log(user);
        console.log("");

        res.json(user);
    }

    function loggedin(req, res) {

        console.log("loggedin server service");
        console.log(req.user);
        console.log("");
        if (req.isAuthenticated()) {
            console.log("User is logged in");
        }
        console.log("");

        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {

        console.log("logout server service");
        console.log(req.user);
        console.log("");

        req.logOut();
        res.send(200);
    }

    function register(req, res) {

        console.log("register server service");
        console.log(req.body);
        console.log("");

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

        console.log("createUser server service");
        console.log(req.body);
        console.log("");

        if (newUser.roles) {

            console.log("roles were entered");
            console.log(newUser.roles);

            newUser.roles = newUser.roles.split(",");

            console.log(newUser.roles);

        } else {

            console.log("roles were NOT entered");

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
};
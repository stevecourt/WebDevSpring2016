var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var bcrypt           = require("bcrypt-nodejs");

module.exports = function(app, assignmentUserModel, projectUserModel) {

    passport.use('assignment', new LocalStrategy(assignmentLocalStrategy));
    passport.use('project',   new LocalStrategy(projectLocalStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post  ('/api/assignment/login',    passport.authenticate('assignment'), login);
    app.post  ('/api/assignment/logout',   logout);
    app.get   ('/api/assignment/loggedin', loggedin);
    app.post  ('/api/assignment/register', register);

    app.post  ('/api/project/login',    passport.authenticate('project'), projectLogin);
    app.post  ('/api/project/logout',   projectLogout);
    app.get   ('/api/project/loggedin', projectLoggedin);
    app.post  ('/api/project/register', projectRegister);

    function assignmentLocalStrategy(username, password, done) {
        assignmentUserModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function projectLocalStrategy(username, password, done) {
        projectUserModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
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
        if(user.phones) {
            assignmentUserModel
                .findUserById(user._id)
                .then(
                    function(user){
                        done(null, user);
                    },
                    function(err){
                        done(err, null);
                    }
                );
        } else {
            projectUserModel
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
    }

    function register(req, res) {
        var newUser = req.body;
        newUser.emails = newUser.emails.split(",");
        newUser.roles = ["student"];
        newUser.password = bcrypt.hashSync(newUser.password);
        assignmentUserModel
            .findUserByUsername(newUser.username)
            .then(
                function (user) {
                    if (user) {
                        res.json(null);
                    } else {
                        return assignmentUserModel.createUser(newUser);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    if (user) {
                        req.login(user, function(err) {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function (err) {
                    res.status(400).send(err);
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

    function projectRegister(req, res) {
        var newUser = req.body;
        newUser.roles = ["basic"];
        newUser.password = bcrypt.hashSync(newUser.password);
        projectUserModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        return projectUserModel.createUser(newUser);
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

    function projectLogin(req, res) {
        var user = req.user;
        res.json(user);
    }

    function projectLogout(req,res) {
        req.logOut();
        res.send(200);
    }

    function projectLoggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }
};
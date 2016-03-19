"use strict";

var uuid = require('node-uuid');
var users = require('../models/user.model.js');

module.exports = function (app, userModel) {

    // User Service Endpoints
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user", findUsers);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);

    // TODO: Delete these lines.
/*    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user?username=username", findUserByUsername);
    app.get("/api/assignment/user?username=username&password=password", findUserByCredentials); // Typo in assignment?
*/

    function createUser(req, res) {

        console.log("create user server service");

        var userObj = req.body;
        userObj._id = uuid.v1(); // Create random ID
        var updatedUsersList = userModel.createUser(userObj);

        console.log("create user server service ret");
        console.log(updatedUsersList[5]);

        if (updatedUsersList) {
            res.json(updatedUsersList);
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

        console.log(username);
        console.log(password);

        if (username && password) {
            var userCredentials = {"username": username, "password": password};
            var userFound = userModel.findUserByCredentials(userCredentials);

            //console.log("servlet" + userFound._id + userFound.username + userFound.password + userFound.email);

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

        console.log("server service updateUserById");
        console.log(userId);
        console.log(userObj.lastName);

        var updatedUsersList = userModel.updateUserById(userId, userObj);

        console.log(updatedUsersList[0]);
        console.log(updatedUsersList[1]);
        console.log(updatedUsersList[2]);
        console.log(updatedUsersList[3]);
        console.log(updatedUsersList[4]);

        if (updatedUsersList) {
            res.json(updatedUsersList);
        } else {
            res.send(404);
        }
    }

    function deleteUserById(req, res) {
        var userId = req.params.id;
        var updatedUsersList = userModel.deleteUserById(userId);
        if (updatedUsersList) {
            res.json(updatedUsersList);
        } else {
            res.send(404);
        }
    }

    // TODO: Delete these lines.
    /*    function findAllUsers(req, res) {
     userModel
     .findAllUsers()
     .then(function (users) {
     res.json(users);
     });
     }

     function findUserByUsername(req, res) {
     var userUsername = req.params.username;
     userModel
     .findUserByUsername(userUsername)
     .then(function (user) {
     res.json(user);
     });
     }

     function findUserByCredentials(req, res) {
     var userCredentials = {"username": req.params.username, "password": req.params.password};
     var user = userModel.findUserByUsername(userCredentials);
     res.json(user);
     }*/
}
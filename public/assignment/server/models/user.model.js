"use strict";

var users = require('./user.mock.json');

module.exports = function (app) {

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUserById: updateUserById,
        deleteUserById: deleteUserById
    };
    return api;

    function createUser(user) {

        console.log("create user model");

        users.push(user);

        console.log(users[0]);
        console.log(users[1]);
        console.log(users[2]);
        console.log(users[3]);
        console.log(users[4]);
        console.log(users[5]);

        return users;
    }

    function findAllUsers() {
        return users;
    }

    function findUserById(userId) {
        var userFound = null;
        for (var i = 0; i < users.length; i++) {
            if (users[i]._id == userId) {
                userFound = users[i];
                break;
            }
        }
        return userFound;
    }

    function findUserByUsername(username) {
        var userFound = null;
        for (var i = 0; i < users.length; i++) {
            if (users[i].username == username) {
                userFound = users[i];
                break;
            }
        }
        return userFound;
    }

    function findUserByCredentials(credentials) {
        var userFound = null;
        var username = credentials.username;
        var password = credentials.password;
        for (var i = 0; i < users.length; i++) {
            if (users[i].username == username && users[i].password == password) {
                userFound = users[i];
                break;
            }
        }

        //console.log("model" + userFound.username + userFound.password + userFound.email);

        return userFound;
    }

    function updateUserById(userId, user) {

        console.log("model: search for: " + userId);

        for (var i = 0; i < users.length; i++) {

            console.log("model: next ID: " + users[i]._id);

            if (users[i]._id == userId) {

                console.log("model match found");

                users[i] = user;
                return users;
            }
        }
        return null;
    }

    function deleteUserById(userId) {
        for (var i = 0; i < users.length; i++) {
            if (users[i]._id == userId) {
                users.splice(i, 1);
                return users;
            }
        }
        return null;
    }
}
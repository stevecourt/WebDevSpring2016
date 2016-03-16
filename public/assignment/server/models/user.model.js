"use strict";

var users = require('./user.mock.json');

module.exports = function (app) {

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };
    return api;

    function createUser(user) {
        users.push(user);
        return users;
    }

    function findAllUsers() {
        return users;
    }

    function findUserById(userId) {
        var userFound = null;
        for (var i = 0; users.length; i++) {
            if (users[i]._id === userId) {
                userFound = users[i];
                break;
            }
        }
        return userFound;
    }

    function updateUser(userId, user) {
        for (var i = 0; users.length; i++) {
            if (users[i]._id === userId) {
                users[i] = user;
                break;
            }
        }
        return users;
    }

    function deleteUser(userId) {
        for (var i = 0; users.length; i++) {
            if (users[i]._id === userId) {
                users.splice(i, 1);
                break;
            }
        }
        return users;
    }

    function findUserByUsername(username) {
        var userFound = null;
        for (var i = 0; users.length; i++) {
            if (users[i].username === username) {
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
        for (var i = 0; users.length; i++) {
            if (users[i].username === username && users[i].password === password) {
                userFound = users[i];
                break;
            }
        }
        return userFound;
    }
}
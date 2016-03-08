"use strict";

(function () {
    angular
        .module("BookExchangeApp")
        .factory("UserService", userService);

    function userService() {

        var users = [];
        users = [
            {
                "id": 201,
                "firstName": "Al",
                "lastName": "Einstein",
                "email": "ea@gmail.com",
                "username": "madscientist",
                "password": "emc2",
                "type": "standard"
            },
            {
                "id": 202,
                "firstName": "King",
                "lastName": "Kong",
                "email": "kk@gmail.com",
                "username": "bigdude",
                "password": "aarrgghh",
                "type": "location"
            },
            {
                "id": 203,
                "firstName": "David",
                "lastName": "Beckham",
                "email": "db7@gmail.com",
                "username": "backs",
                "password": "posh",
                "type": "maker"
            },
            {
                "id": 204,
                "firstName": "Liz",
                "lastName": "Windsor",
                "email": "er2@gmail.com",
                "username": "qe2",
                "password": "corgi",
                "type": "admin"
            }
        ];

        // CRUD operations
        var api = {
            createUser: createUser,
            findAllUsers: findAllUsers,
            updateUser: updateUser,
            deleteUser: deleteUser,
        };
        return api;

        function createUser(user, callback) {
            // Creates a new object to be added.
            var newUser = {
                id: (new Date).getTime(),
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                username: user.username,
                password: user.password,
                type: user.type
            };
            users.push(newUser);
            callback(users);
        }

        function findAllUsers(callback) {
            callback(users);
        }

        function updateUser(user, callback) {
            // Creates a new object to be updated.
            var newUser = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                username: user.username,
                password: user.password,
                type: user.type
            };
            callback(newUser);
        }

        function deleteUser(user, callback) {
            var index = users.indexOf(user);
            users.splice(index, 1);
            callback(users);
        }
    }
})();
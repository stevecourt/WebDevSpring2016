"use strict";

(function () {
    angular
        .module("BookExchangeApp")
        .factory("UserService", userService);

    function userService() {

        var users = [];
        users = [
            {"firstName": "Al", "lastName": "Einstein", "email": "ea@gmail.com", "username": "madscientist", "password": "emc2"},
            {"firstName": "King", "lastName": "Kong", "email": "kk@gmail.com", "username": "bigdude", "password": "aarrgghh"},
            {"firstName": "David", "lastName": "Beckham", "email": "db7@gmail.com", "username": "backs", "password": "posh"},
            {"firstName": "Liz", "lastName": "Windsor", "email": "er2@gmail.com", "username": "qe2", "password": "corgi"}
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
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                username: user.username,
                password: user.password
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
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                username: user.username,
                password: user.password
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
"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);

    function userService() {

        var users = [];
        users = [
            {"_id":123, "firstName":"Alice", "lastName":"Wonderland",
                "username":"alice", "password":"alice", "roles": ["student"]},
            {"_id":234, "firstName":"Bob", "lastName":"Hope",
                "username":"bob", "password":"bob", "roles": ["admin"]},
            {"_id":345, "firstName":"Charlie", "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]},
            {"_id":456, "firstName":"Dan", "lastName":"Craig",
                "username":"dan", "password":"dan", "roles": ["faculty", "admin"]},
            {"_id":567, "firstName":"Edward", "lastName":"Norton",
                "username":"ed", "password":"ed", "roles": ["student"]}
        ]

        var api = {
            findUsersByUsernameAndPassword: findUsersByUsernameAndPassword,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return api;

        function findUsersByUsernameAndPassword(username, password, callback) {
            var user = null;
            for (var i = 0; i < users.length; i++) {
                if (users[i].username === username && users[i].password === password) {
                    user = users[i];
                    break;
                }
            }
            callback(user);
        }

        function findAllUsers(callback) {

        }

        function createUser(user, callback) {

        }

        function deleteUserById(userId, callback) {

        }

        function updateUser(userId, user, callback) {
            for (var i = 0; i < users.length; i++) {
                if (users[i]._id === userId) {;
                    users[i] = user;
                    break;
                }
            }
            callback(user);
        }
    }
})();
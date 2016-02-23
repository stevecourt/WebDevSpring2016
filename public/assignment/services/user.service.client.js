"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);

    // LOOK UP WHAT PARAMS SHOULD BE HERE
    // JOSE HAD $http, $q
    function userService() {

        // SHOULD THIS BE INITIALIZED FIRST???
        var users = [
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

        }

        function findAllUsers(callback) {

        }

        function createUser(user, callback) {

        }

        function deleteUserById(userId, callback) {

        }

        function updateUser(userId, user, callback) {

        }
    }
})();
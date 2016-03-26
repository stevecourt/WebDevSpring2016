"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);

    function userService($http, $q) {

        var api = {
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return api;

        function findUserByUsername(username) {
            var deferred = $q.defer();

            $http.get("/api/assignment/user?username=" + username)
                .then(function (user) {
                    deferred.resolve(user);
            }, function(user) {
                deferred.reject(user);
            });

            return deferred.promise;
        }

        function findUserByCredentials(username, password) {
            var deferred = $q.defer();

            $http.get("/api/assignment/user?username=" + username + "&password=" + password)
                .then(function(user){
                    deferred.resolve(user);
                }, function (user) {
                    deferred.reject(user);
                });

            return deferred.promise;
        }

        function findAllUsers() {
            var deferred = $q.defer();

            $http.get("/api/assignment/user")
                .then(function(users){
                    deferred.resolve(users);
                }, function (users) {
                    deferred.reject(users);
                });
            return deferred.promise;
        }

        function createUser(user) {
            var deferred = $q.defer();

            $http.post("/api/assignment/user", user)
                .then(function(users){
                    deferred.resolve(users);
                }, function (users) {
                    deferred.reject(users);
                });

            return deferred.promise;
        }

        function deleteUserById(userId) {
            var deferred = $q.defer();

            $http.delete("/api/assignment/user/" + userId)
                .then(function(users){
                    deferred.resolve(users);
                }, function (users) {
                    deferred.reject(users);
                });

            return deferred.promise;
        }

        function updateUser(userId, user) {
            var deferred = $q.defer();

            $http.put("/api/assignment/user/" + userId, user)
                .then(function(users){
                    deferred.resolve(users);
                }, function (users) {
                    deferred.reject(users);
                });

            return deferred.promise;
        }
    }
})();
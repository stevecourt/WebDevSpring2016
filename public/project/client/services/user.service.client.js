"use strict";

(function () {
    angular
        .module("BookExchangeApp")
        .factory("UserService", userService);

    function userService($http, $q) {

        // CRUD operations
        var api = {
            login: login,
            register: register,
            logout: logout,
            updateUserProfile: updateUserProfile,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUserById: updateUserById,
            addFollowById: addFollowById
        };
        return api;

        function login(user) {
            return $http.post("/api/project/login", user);
        }

        function register(user) {
            return $http.post("/api/project/register", user);
        }

        function logout() {
            return $http.post("/api/project/logout");
        }

        function updateUserProfile(userId, updatedUser) {
            var deferred = $q.defer();

            $http.put("/api/project/user/" + userId, updatedUser)
                .then(function(users){
                    deferred.resolve(users);
                }, function (users) {
                    deferred.reject(users);
                });

            return deferred.promise;
        }

        function findUserByUsername(username) {
            var deferred = $q.defer();

            $http.get("/api/project/user?username=" + username)
                .then(function (user) {
                    deferred.resolve(user);
                }, function(user) {
                    deferred.reject(user);
                });

            return deferred.promise;
        }

        function findUserByCredentials(username, password) {
            var deferred = $q.defer();

            $http.get("/api/project/user?username=" + username + "&password=" + password)
                .then(function(user){
                    deferred.resolve(user);
                }, function (user) {
                    deferred.reject(user);
                });

            return deferred.promise;
        }

        function findUserById(userId) {
            var deferred = $q.defer();

            $http.get("/api/project/admin/user/" + userId)
                .then(function(user){
                    deferred.resolve(user);
                }, function (user) {
                    deferred.reject(user);
                });

            return deferred.promise;
        }

        function findAllUsers() {
            var deferred = $q.defer();

            $http.get("/api/project/admin/user")
                .then(function(users){
                    deferred.resolve(users);
                }, function (users) {
                    deferred.reject(users);
                });

            return deferred.promise;
        }

        function createUser(newUser) {
            var deferred = $q.defer();

            $http.post("/api/project/admin/user", newUser)
                .then(function(users){
                    deferred.resolve(users);
                }, function (users) {
                    deferred.reject(users);
                });

            return deferred.promise;
        }

        function deleteUserById(userId) {
            var deferred = $q.defer();

            $http.delete("/api/project/admin/user/" + userId)
                .then(function(users){
                    deferred.resolve(users);
                }, function (users) {
                    deferred.reject(users);
                });

            return deferred.promise;
        }

        function updateUserById(userId, updatedUser) {
            var deferred = $q.defer();

            $http.put("/api/project/admin/user/" + userId, updatedUser)
                .then(function(users){
                    deferred.resolve(users);
                }, function (users) {
                    deferred.reject(users);
                });

            return deferred.promise;
        }

        function updateUserProfile(userId, updatedUser) {
            var deferred = $q.defer();

            $http.put("/api/project/user/" + userId, updatedUser)
                .then(function(users){
                    deferred.resolve(users);
                }, function (users) {
                    deferred.reject(users);
                });

            return deferred.promise;
        }

        function addFollowById(userId) {
            var deferred = $q.defer();

            $http.put("/api/project/follow/" + userId)
                .then(function(users){
                    deferred.resolve(users);
                }, function (users) {
                    deferred.reject(users);
                });

            return deferred.promise;
        }

        function emailAndPhoneToArray(user) {
            var serverUser = user;
            if (user.emails) {
                var userEmails = csvToArray(user.emails);
                serverUser.emails = userEmails;
            }
            if (user.phones) {
                var userPhones = csvToArray(user.phones);
                serverUser.phones = userPhones;
            }
            return serverUser;
        }

        function csvToArray(commaSeparatedString) {
            var array = commaSeparatedString.split(",");
            return array;
        }
    }
})();
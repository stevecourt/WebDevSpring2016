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

                    console.log("user.service.client - login - username = " + user.data.username);

                    deferred.resolve(user);
                }, function (user) {

                    console.log("user.service.client - login - null");

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

            console.log("user.service.client - user.emails BEFORE conversion");
            console.log(user.emails);
            console.log("user.service.client - user.phones BEFORE conversion");
            console.log(user.phones);

            // Converts emails and phones from comma separated strings to arrays.
            var serverUser = emailAndPhoneToArray(user);

            console.log("user.service.client - user.email AFTER conversion");
            console.log(user.emails);
            console.log("user.service.client - user.phone AFTER conversion");
            console.log(user.phones);

            $http.post("/api/assignment/user", serverUser)
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

            console.log("user.service.client - user.email BEFORE conversion");
            console.log(user.emails);
            console.log("user.service.client - user.phone BEFORE conversion");
            console.log(user.phones);

            // Converts emails and phones from comma separated strings to arrays.
            var serverUser = emailAndPhoneToArray(user);

            console.log("user.service.client - user.email AFTER conversion");
            console.log(user.emails);
            console.log("user.service.client - user.phone AFTER conversion");
            console.log(user.phones);

            $http.put("/api/assignment/user/" + userId, serverUser)
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

            console.log("user.service.client serverUser");
            console.log(serverUser);

            return serverUser;
        }

        function csvToArray(commaSeparatedString) {
            var array = commaSeparatedString.split(",");
            return array;
        }
    }
})();
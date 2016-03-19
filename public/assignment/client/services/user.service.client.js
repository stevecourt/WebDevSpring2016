"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);

    function userService($http, $q) {

        // TODO: Delete array
/*        var users = [];
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
        ];*/

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
                .success(function(user){
                    deferred.resolve(user);
                });

            return deferred.promise;
        }

        function findUserByCredentials(username, password) {
            console.log("credentials");
            var deferred = $q.defer();

            console.log("client service fubc");

            $http.get("/api/assignment/user?username=" + username + "&password=" + password)
                .then(function(user){

                    console.log("clientServ" + user._id + user.username + user.password + user.email);
                    console.log("Client Service Path 1");

                    deferred.resolve(user);
                }, function (user) {

                    console.log("OMG it worked!!!");
                    console.log("Client Service Path 2");

                    deferred.reject(user);
                });

            return deferred.promise;
        }

        function findAllUsers() {
            console.log("findAll");
            var deferred = $q.defer();

            $http.get("/api/assignment/user")
                .success(function(users){
                    deferred.resolve(users);
                });

            return deferred.promise;
        }

        function createUser(user) {

            console.log("create user client service");

            var deferred = $q.defer();

            $http.post("/api/assignment/user", user)
                .success(function(users){

                    console.log("client service..." + users);

                    deferred.resolve(users);
                });

            console.log("create user client service ret");

            return deferred.promise;
        }

        function deleteUserById(userId) {
            var deferred = $q.defer();

            $http.delete("/api/assignment/user/" + userId)
                .success(function(users){
                    deferred.resolve(users);
                });

            return deferred.promise;
        }

        function updateUser(userId, user) {
            var deferred = $q.defer();

            console.log("client service updateUser");
            console.log(user);

            $http.put("/api/assignment/user/" + userId, user)
                .success(function(users){
                    deferred.resolve(users);
                });

            return deferred.promise;
        }
    }
})();
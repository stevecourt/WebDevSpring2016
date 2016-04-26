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

            createUser: createUser,
            findAllUsers: findAllUsers,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;

        function login(user) {
            return $http.post("/api/project/login", user);
        }

        function register(user) {

            console.log("client service");
            console.log(user);

            return $http.post("/api/project/register", user);
        }

        function logout() {
            return $http.post("/api/project/logout");
        }

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

/*
"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);

    function userService($http, $q) {

        var api = {
            login: login,
            logout: logout,
            register: register,
            updateUserProfile: updateUserProfile,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUserById: updateUserById
        };
        return api;

        function login(user) {
            return $http.post("/api/assignment/login", user);
        }

        function logout() {
            return $http.post("/api/assignment/logout");
        }

        function register(user) {
            return $http.post("/api/assignment/register", user);
        }

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

        function findUserById(userId) {
            var deferred = $q.defer();

            $http.get("/api/assignment/admin/user/" + userId)
                .then(function(user){
                    deferred.resolve(user);
                }, function (user) {
                    deferred.reject(user);
                });

            return deferred.promise;
        }

        function findAllUsers() {
            var deferred = $q.defer();

            $http.get("/api/assignment/admin/user")
                .then(function(users){
                    deferred.resolve(users);
                }, function (users) {
                    deferred.reject(users);
                });

            return deferred.promise;
        }

        function createUser(newUser) {
            var deferred = $q.defer();

            $http.post("/api/assignment/admin/user", newUser)
                .then(function(users){
                    deferred.resolve(users);
                }, function (users) {
                    deferred.reject(users);
                });

            return deferred.promise;
        }

        function deleteUserById(userId) {
            var deferred = $q.defer();

            $http.delete("/api/assignment/admin/user/" + userId)
                .then(function(users){
                    deferred.resolve(users);
                }, function (users) {
                    deferred.reject(users);
                });

            return deferred.promise;
        }

        function updateUserById(userId, updatedUser) {
            var deferred = $q.defer();

            $http.put("/api/assignment/admin/user/" + userId, updatedUser)
                .then(function(users){
                    deferred.resolve(users);
                }, function (users) {
                    deferred.reject(users);
                });

            return deferred.promise;
        }

        function updateUserProfile(userId, updatedUser) {
            var deferred = $q.defer();

            $http.put("/api/assignment/user/" + userId, updatedUser)
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

/*
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
    */
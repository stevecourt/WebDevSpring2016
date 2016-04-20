"use strict";

var q = require("q");
var bcrypt = require("bcrypt-nodejs");

module.exports = function (mongoose) {

    var userSchema = require('./user.schema.server.js')(mongoose);
    var userModel = mongoose.model("user", userSchema);

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUserById: updateUserById,
        deleteUserById: deleteUserById
    };
    return api;

    function createUser(newUser) {
        var deferred = q.defer();
        userModel.create(newUser, function (err, user){
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();
        userModel.find(function (err, users){
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });
        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();
        userModel.findById(userId, function (err, userFound){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(userFound);}
        });
        return deferred.promise;
    }

    function findUserByUsername(usernameGiven) {
        var deferred = q.defer();
        userModel.findOne({username: usernameGiven}, function (err, user){
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findUserByCredentials(credentials) {
        var deferred = q.defer();
        var usernameGiven = credentials.username;
        var passwordGiven = credentials.password;

        userModel.findOne({username: usernameGiven},
            function (err, user){
                if (err) {
                    deferred.reject(err);
                } else {
                    if (bcrypt.compareSync(passwordGiven, user.password)) {
                        deferred.resolve(user);
                    } else {
                        deferred.reject(err);
                    }
                }
            });
        return deferred.promise;
    }

    function updateUserById(userId, userGiven) {
        var deferred = q.defer();

        console.log("user model update.  userGiven");
        console.log(userGiven);

        delete userGiven._id; //TODO: This line added for testing.  Keep or delete

        console.log("user model update.  modified userGiven");
        console.log(userGiven);

        userModel.update({_id: userId}, {$set: userGiven}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function deleteUserById(userId) {
        var deferred = q.defer();
        userModel.remove({_id: userId},function (err, users) {
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });
        return deferred.promise;
    }
};
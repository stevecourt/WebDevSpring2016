"use strict";

var q = require("q");
//var users = require('./user.mock.json');

module.exports = function (mongoose, db) {

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
                userModel.find(function (err, users) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(users);
                    }
                });
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
        userModel.findOne(
            {
                $and: [
                    {username: usernameGiven},
                    {password: passwordGiven}
                ]
            },
            function (err, user){
                if (err) {

                    console.log("");
                    console.log("user.model - login - user not found");

                    deferred.reject(err);
                } else {



                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function updateUserById(userId, userGiven) {
        var deferred = q.defer();
        userModel.update({_id: userId}, {$set: userGiven}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                userModel.find(function(err, users){
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(users);
                    }
                });
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
                userModel.find(function (err, users) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(users);
                    }
                });
            }
        });
        return deferred.promise;
    }
};

//function createUserOld(user) {
//    users.push(user);
//    return users;
//}

//function findAllUsersOld() {
//    return users;
//}

//function findUserByIdOld(userId) {
//    var userFound = null;
//    for (var i = 0; i < users.length; i++) {
//        if (users[i]._id == userId) {
//            userFound = users[i];
//            break;
//        }
//    }
//    return userFound;
//}

//function findUserByUsernameOld(username) {
//    var userFound = null;
//    for (var i = 0; i < users.length; i++) {
//        if (users[i].username == username) {
//            userFound = users[i];
//            break;
//        }
//    }
//    return userFound;
//}

/*
function findUserByCredentialsOld(credentials) {
    var userFound = null;
    var username = credentials.username;
    var password = credentials.password;
    for (var i = 0; i < users.length; i++) {
        if (users[i].username == username && users[i].password == password) {
            userFound = users[i];
            break;
        }
    }
    return userFound;
}
*/
/*
function updateUserByIdOld(userId, user) {
    for (var i = 0; i < users.length; i++) {
        if (users[i]._id == userId) {
            users[i] = user;
            return users;
        }
    }
    return null;
}
*/
/*
function deleteUserByIdOld(userId) {
    for (var i = 0; i < users.length; i++) {
        if (users[i]._id == userId) {
            users.splice(i, 1);
            return users;
        }
    }
    return null;
}
*/
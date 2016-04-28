"use strict";

var q = require("q");
var bcrypt = require("bcrypt-nodejs");

module.exports = function (mongoose) {

    var locationSchema = require('./location.schema.server.js')(mongoose);
    var locationModel = mongoose.model("location", locationSchema);

    var api = {
        createLocation: createLocation,
        findLocationByName: findLocationByName,
        findAllLocations: findAllLocations,
        updateLocationById: updateLocationById,
        findLocationById: findLocationById,

        findUserByCredentials: findUserByCredentials,
        updateUserById: updateUserById,
        deleteUserById: deleteUserById
    };
    return api;

    function createLocation(newLocation) {
        var deferred = q.defer();
        locationModel.create(newLocation, function (err, user){
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findLocationByName(nameGiven) {

        console.log("location.model - findLocationByName");

        var deferred = q.defer();
        locationModel.findOne({name: nameGiven}, function (err, user){
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findAllLocations() {
        var deferred = q.defer();
        locationModel.find(function (err, locations){
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(locations);
            }
        });
        return deferred.promise;
    }

    function updateLocationById(locationId, locationGiven) {
        var deferred = q.defer();

        delete locationGiven._id; // ID must be deleted for MongoDB 2.4 in OpenShift

        locationModel.update({_id: locationId}, {$set: locationGiven}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findLocationById(locationId) {
        var deferred = q.defer();

        console.log("in findLocationById - model");

        locationModel.findById(locationId, function (err, locationFound){

            console.log("locationId");
            console.log(locationId);

            if(err){

                console.log("location NOT found");

                deferred.reject(err);
            }else{

                console.log("location found");

                deferred.resolve(locationFound);}
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

        delete userGiven._id; // ID must be deleted for MongoDB 2.4 in OpenShift

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
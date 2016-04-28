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
        locationModel.findById(locationId, function (err, locationFound){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(locationFound);}
        });
        return deferred.promise;
    }
};
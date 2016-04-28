"use strict";

(function () {
    angular
        .module("BookExchangeApp")
        .factory("LocationService", locationService);

    function locationService($http, $q) {

        // CRUD operations
        var api = {
            regLocation: regLocation,
            findAllLocations: findAllLocations,
            findLocationById: findLocationById,
            addLikeById: addLikeById,
            addBookByLocationId: addBookByLocationId,
            deleteBookByLocationId: deleteBookByLocationId
        };
        return api;

        function regLocation(location) {
            return $http.post("/api/project/reglocation", location);
        }

        function findAllLocations() {
            var deferred = $q.defer();

            $http.get("/api/project/location")
                .then(function(locations){
                    deferred.resolve(locations);
                }, function (locations) {
                    deferred.reject(locations);
                });

            return deferred.promise;
        }

        function findLocationById(locationId) {
            var deferred = $q.defer();

            $http.get("/api/project/location/" + locationId)
                .then(function(location){
                    deferred.resolve(location);
                }, function (location) {
                    deferred.reject(location);
                });

            return deferred.promise;
        }

        function addLikeById(locationId) {
            var deferred = $q.defer();

            $http.put("/api/project/like/" + locationId)
                .then(function(locations){
                    deferred.resolve(locations);
                }, function (locations) {
                    deferred.reject(locations);
                });

            return deferred.promise;
        }

        function addBookByLocationId(isbn, locationId) {
            var deferred = $q.defer();

            $http.put("/api/project/location/" + locationId + "/" + isbn)
                .then(function(locations){
                    deferred.resolve(locations);
                }, function (locations) {
                    deferred.reject(locations);
                });

            return deferred.promise;
        }

        function deleteBookByLocationId(isbn, locationId) {
            var deferred = $q.defer();

            $http.delete("/api/project/location/" + locationId + "/" + isbn)
                .then(function(locations){
                    deferred.resolve(locations);
                }, function (locations) {
                    deferred.reject(locations);
                });

            return deferred.promise;
        }
    }
})();
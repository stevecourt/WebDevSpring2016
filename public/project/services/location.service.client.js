"use strict";

(function () {
    angular
        .module("BookExchangeApp")
        .factory("LocationService", locationService);

    function locationService() {

        var locations = [];
        locations = [
            {"address": "1 1st Ave Seattle",
                "capacity": "100",
                "type": "Coffee Shop",
                "open": "8am",
                "close": "5pm",
                "notes": "Please come and get a book!"},
            {"address": "2 1st Ave Seattle",
                "capacity": "50",
                "type": "Individual",
                "open": "N/A",
                "close": "N/A",
                "notes": "... or just watch a movie!"}
        ];

        // CRUD operations
        var api = {
            createLocation: createLocation,
            findAllLocations: findAllLocations,
            updateLocation: updateLocation,
            deleteLocation: deleteLocation,
        };
        return api;

        function createLocation(location, callback) {
            // Creates a new object to be added.
            var newLocation = {
                address: location.address,
                capacity: location.capacity,
                type: location.type,
                open: location.open,
                close: location.close,
                notes: location.notes
            };
            locations.push(newLocation);
            callback(locations);
        }

        function findAllLocations(callback) {
            callback(locations);
        }

        function updateLocation(location, callback) {
            // Creates a new object to be updated.
            var newLocation = {
                address: location.address,
                capacity: location.capacity,
                type: location.type,
                open: location.open,
                close: location.close,
                notes: location.notes
            };
            callback(newLocation);
        }

        function deleteLocation(location, callback) {
            var index = locations.indexOf(location);
            locations.splice(index, 1);
            callback(locations);
        }
    }
})();
"use strict";

(function () {
    angular
        .module("BookExchangeApp")
        .factory("LocationService", locationService);

    function locationService() {

        var locations = [];
        locations = [
            {
                "id": 401,
                "street": "1 1st Ave",
                "apartment": "1A",
                "city": "Seattle",
                "state": "WA",
                "zip": "98001",
                "country": "USA",
                "capacity": "100",
                "type": "Business",
                "open": "1970-01-01T16:00:00.000Z",
                "close": "1970-01-02T02:00:00.000Z",
                "notes": "Please come and get a book!",
                "application": "We'd love to have a location in our coffee shop.",
                "userId": 201
            },
            {
                "id": 402,
                "street": "2 1st Ave",
                "apartment": "2B",
                "city": "Seattle",
                "state": "WA",
                "zip": "98002",
                "country": "USA",
                "capacity": "50",
                "type": "Individual",
                "open": "",
                "close": "",
                "notes": "... or just watch a movie!",
                "application": "I'd like to install a location in front of my house.",
                "userId": 202
            },
            {
                "id": 403,
                "street": "3 1st Ave",
                "apartment": "3C",
                "city": "Seattle",
                "state": "WA",
                "zip": "98003",
                "country": "USA",
                "capacity": "30",
                "type": "Business",
                "open": "1970-01-01T16:00:00.000Z",
                "close": "1970-01-02T04:00:00.000Z",
                "notes": "... but read the book first!",
                "application": "We're a small consignment store.",
                "userId": 203
            }
        ];

        // CRUD operations
        var api = {
            createLocation: createLocation,
            findAllLocations: findAllLocations,
            updateLocation: updateLocation,
            deleteLocation: deleteLocation
        };
        return api;

        function createLocation(location, callback) {
            // Creates a new object to be added.
            var newLocation = {
                id: (new Date).getTime(),
                street: location.street,
                apartment: location.apartment,
                city: location.city,
                state: location.state,
                zip: location.zip,
                country: location.country,
                capacity: location.capacity,
                type: location.type,
                open: location.open,
                close: location.close,
                notes: location.notes,
                application: location.application,
                userId: location.userId
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
                id: (new Date).getTime(),
                street: location.street,
                apartment: location.apartment,
                city: location.city,
                state: location.state,
                zip: location.zip,
                country: location.country,
                capacity: location.capacity,
                type: location.type,
                open: location.open,
                close: location.close,
                notes: location.notes,
                application: location.application,
                userId: location.userId
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
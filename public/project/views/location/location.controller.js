"use strict";

(function () {
    angular
        .module("BookExchangeApp")
        .controller("LocationController", locationController);

    function locationController($scope, LocationService) {

        $scope.addLocation = addLocation;
        $scope.selectLocation = selectLocation;
        $scope.changeLocation = changeLocation;
        $scope.removeLocation = removeLocation;

        // Get all locations for rendering.
        getAllLocations();
        function getAllLocations() {
            var callback = function (locations) {
                $scope.allLocations = locations;
            };
            LocationService.findAllLocations(callback);
        }

        function addLocation(location) {
            var callback = function (locations) {
                // Get all locations for rendering.
                LocationService.findAllLocations(
                    function (locations) {
                        $scope.allLocations = locations;
                    }
                )
            };
            LocationService.createLocation(location, callback);
        }

        function selectLocation(index) {
            $scope.selectedLocationIndex = index;
            $scope.location = {
                id: $scope.allLocations[index].id,
                street: $scope.allLocations[index].street,
                apartment: $scope.allLocations[index].apartment,
                city: $scope.allLocations[index].city,
                state: $scope.allLocations[index].state,
                zip: $scope.allLocations[index].zip,
                country: $scope.allLocations[index].country,
                capacity: $scope.allLocations[index].capacity,
                type: $scope.allLocations[index].type,
                open: $scope.allLocations[index].open,
                close: $scope.allLocations[index].close,
                notes: $scope.allLocations[index].notes,
                application: $scope.allLocations[index].application,
                userId: $scope.allLocations[index].userId
            };
        }

        function changeLocation(location) {
            var callback = function (newLocation) {
                $scope.allLocations[$scope.selectedLocationIndex] = newLocation;
                // Get all locations for rendering.
                LocationService.findAllLocations(
                    function (locations) {
                        $scope.allLocations = locations;
                    }
                )
            };
            LocationService.updateLocation(location, callback);
        }

        function removeLocation(location) {
            var callback = function (locations) {
                // Get all locations for rendering.
                LocationService.findAllLocations(
                    function (locations) {
                        $scope.allLocations = locations;
                    }
                )
            };
            LocationService.deleteLocation(location, callback);
        }
    }
})();
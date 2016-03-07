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
                // Note: Retain this format for easier modification later to locations per domain object.
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
                address: $scope.allLocations[index].address,
                capacity: $scope.allLocations[index].capacity,
                type: $scope.allLocations[index].type,
                open: $scope.allLocations[index].open,
                close: $scope.allLocations[index].close,
                notes: $scope.allLocations[index].notes
            };
        }

        function changeLocation(location) {
            var callback = function (newLocation) {
                $scope.allLocations[$scope.selectedLocationIndex] = newLocation;
                // Get all locations for rendering.
                // Note: Retain this format for easier modification later to locations per domain object.
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
                // Note: Retain this format for easier modification later to locations per domain object.
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

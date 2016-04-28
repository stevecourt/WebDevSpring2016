"use strict";

(function () {
    angular
        .module("BookExchangeApp")
        .controller("LocDetailsController", locdetailsController);

    function locdetailsController($scope, $routeParams, $rootScope, $location, LocationService) {

        $scope.searchBooks = searchBooks;
        $scope.deleteBookByLocationId = deleteBookByLocationId;

        // Form ID from the URL pattern
        $scope.locationId = $routeParams.locationId;
        $rootScope.locationId = $scope.locationId


        // Get the current location for rendering.
        getLocationById($scope.locationId);
        function getLocationById(locationId) {
            LocationService.findLocationById(locationId)
                .then (function (returnedLocation) {
                    $scope.currentLocation = returnedLocation.data;
                }, function (returnedLocation) {
                    console.log("Error: Could not retrieve location.");
                });
        }

        function deleteBookByLocationId(index) {
            var isbn = $scope.currentLocation.inventory[index];

            LocationService
                .deleteBookByLocationId(isbn, $scope.locationId)
                .then (function (returnedLocation) {
                    $scope.currentLocation = returnedLocation.data;
                    getLocationById($scope.locationId);
                }, function (returnedLocation) {
                    console.log("Error: Could not retrieve location.");
                });
        }

        function addBookByLocationId(index) {
            // Get book ISBN from data.docs
            var isbn = $scope.data.docs[index].isbn[0];
            // Call service function and send locationId and ISBN.
            LocationService
                .addBookByLocationId(isbn, $rootScope.locationId)
                .then(
                    function(response) {
                    },
                    function(err) {
                        $scope.error = err;
                    }
                );
        }

        function searchBooks() {
            $location.url("/search/{{locationId}}")
        }
    }
})();
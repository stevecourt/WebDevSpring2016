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

            console.log("in getLocationByUserId");
            console.log(locationId);

            LocationService.findLocationById(locationId)
                .then (function (returnedLocation) {

                    console.log("in getLocationById");

                    $scope.currentLocation = returnedLocation.data;

                    console.log("getLocationById");
                    console.log($scope.currentLocation);

                    $scope.bookDetails = [];

                }, function (returnedLocation) {
                    console.log("Error: Could not retrieve location.");
                });
        }

        function deleteBookByLocationId(index) {

            var isbn = $scope.currentLocation.inventory[index];
            console.log("in deleteBookByLocationId");
            console.log(isbn);
            console.log($scope.locationId);

            LocationService
                .deleteBookByLocationId(isbn, $scope.locationId)
                .then (function (returnedLocation) {

                    console.log("in getLocationById");

                    $scope.currentLocation = returnedLocation.data;

                    console.log("getLocationById");
                    console.log($scope.currentLocation);

                    getLocationById($scope.locationId);

                }, function (returnedLocation) {
                    console.log("Error: Could not retrieve location.");
                });
        }

        function addBookByLocationId(index) {

            // Get book ISBN from data.docs
            var isbn = $scope.data.docs[index].isbn[0];

            console.log("in addBookByLocationId");
            console.log(isbn);
            console.log($rootScope.locationId);

            // Call service function and send locationId and ISBN.
            LocationService
                .addBookByLocationId(isbn, $rootScope.locationId)
                .then(
                    function(response) {

                        console.log("back in controller");

                    },
                    function(err) {
                        $scope.error = err;
                    }
                );
        }

        function searchBooks() {

            console.log("in searchBooks");
            console.log($scope.locationId);

            $location.url("/search/{{locationId}}")
        }
    }
})();
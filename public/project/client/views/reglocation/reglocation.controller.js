"use strict";

(function () {
    angular
        .module("BookExchangeApp")
        .controller("ReglocationController", reglocationController);

    function reglocationController($scope, LocationService) {

        $scope.regLocation = regLocation;

        function regLocation(location)
        {

            var currentUserId = $scope.currentUser._id;
            location.userId = currentUserId;
            LocationService
                .regLocation(location, currentUserId)
                .then(
                    function(response) {
                        var registeredLocation = response.data;
                        if(registeredLocation != null) {
                            $location.url("/homeauth");
                        }
                    },
                    function(err) {
                        $scope.error = err;
                    }
                );
        }
    }
})();
"use strict";

(function () {
    angular
        .module("BookExchangeApp")
        .controller("HeaderController", headerController);

    function headerController($scope, $location, $rootScope, UserService) {

        $scope.logout = logout;

        function logout() {

            console.log("in header controller - logout");

            UserService
                .logout()
                .then(
                    function(response){

                        console.log("back in header controller - logging out");

                        $rootScope.currentUser = null;
                        $location.url("/home");
                    },
                    function(err) {
                        $scope.error = err;
                    }
                );
        }
    }
})();
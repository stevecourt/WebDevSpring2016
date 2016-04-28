"use strict";

(function () {
    angular
        .module("BookExchangeApp")
        .controller("HeaderController", headerController);

    function headerController($scope, $location, $rootScope, UserService) {

        $scope.logout = logout;

        function logout() {
            UserService
                .logout()
                .then(
                    function(response){
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
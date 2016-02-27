"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", headerController);

    function headerController($scope, $location, $rootScope) {

        $scope.logout = logout;

        function logout() {
            $rootScope.currentUser = null;
            $location.url("/home");
        }
    }
})();
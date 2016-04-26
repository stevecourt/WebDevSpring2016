"use strict";

(function () {
    angular
        .module("BookExchangeApp")
        .controller("MainController", mainController);

    function mainController($scope, $location) {

        $scope.$location = $location;
    }
})();
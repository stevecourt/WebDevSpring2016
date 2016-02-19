"use strict";

(function(){
    angular
        .module("FormBuilderApp", ["ngRoute"])
        .controller("MainController", MainController);
    function MainController($scope, $location) {
        $scope.$location = $location;
    }
})();
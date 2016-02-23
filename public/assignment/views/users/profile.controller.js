"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController);
    // $scope, $location - USE THESE PARAMS???
    function profileController($scope, $location) {
        //BODY HERE
        $scope.$location = $location;
    }
})();
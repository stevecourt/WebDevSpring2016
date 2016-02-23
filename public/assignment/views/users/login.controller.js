"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", loginController);
    // $scope, $location - USE THESE PARAMS???
    function loginController($scope, $location) {
        //BODY HERE
        $scope.$location = $location;
    }
})();
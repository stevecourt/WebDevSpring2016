"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", loginController);

    function loginController($scope, $rootScope, $location, UserService) {

        $scope.login = login;

        function login(username, password) {

            var callback = function(aUser) {
                if (aUser === null) {
                    alert("The username or password entered is not recognized.");
                }
                else {
                    $rootScope.currentUser = aUser;
                    $location.url("/profile");
                }
            }
            UserService.findUsersByUsernameAndPassword(username, password, callback);
        }
    }
})();
"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", registerController);

    function registerController($scope, $rootScope, $location, UserService) {

        $scope.register = register;

        function register(username, password, password2, email) {

            var callback = function(aUser) {
                $rootScope.currentUser = aUser;
                $location.url("/profile");
            }

            if(password === password2) {
                var user = {"username":username, "password":password, "email":email};
                UserService.createUser(user, callback);
            }
            else {
                alert("Password and password verification do not match. Please re-enter details.");
            }
        }
    }
})();

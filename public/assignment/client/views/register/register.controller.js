"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", registerController);

    function registerController($scope, $rootScope, $location, UserService) {

        $scope.register = register;

        function register(username, password, password2, email) {
            // Check for password consistency before creating user.
            if (password == password2) {
                var enteredUser = {"username": username, "password": password, "email": email};
                UserService.createUser(enteredUser)
                    .then(function (returnedUsers) {
                        for (var i = 0; i < returnedUsers.data.length; i++) {
                            if (returnedUsers.data[i].username == username) {
                                var userFound = returnedUsers.data[i];
                                $rootScope.currentUser = userFound;
                                $location.url("/profile");
                            }
                        }
                    }, function (returnedUsers) {
                        console.log("Error: The user was not registered in the system.");
                    });
            } else {
                alert("Password and password verification do not match. Please re-enter details.");
            }
        }
    }
})();
"use strict";

(function () {
    angular
        .module("BookExchangeApp")
        .controller("AuthenticateController", authenticateController);

    function authenticateController($scope, $rootScope, $location, UserService) {

        $scope.login = login;
        $scope.register = register;

        function login(user) {
            if(user) {
                UserService
                    .login(user)
                    .then(
                        function(response)
                        {
                            var loggedInUser = response.data;

                            // Converts emails, phones and roles from arrays to comma separated strings.
                            var clientUser = arraysToCsv(loggedInUser);

                            $rootScope.currentUser = clientUser;
                            $location.url("/homeauth");
                        },
                        function(err) {
                            alert("The username or password entered is not recognized.");
                            $scope.error = err;
                        }
                    );
            }
        }

        function register(user)
        {
            if(user.password != user.password2 || !user.password || !user.password2) {
                $scope.error = "Your passwords don't match";
            } else {
                UserService
                    .register(user)
                    .then(
                        function(response) {
                            var registeredUser = response.data;
                            $rootScope.currentUser = registeredUser;
                            if(user != null) {
                                $location.url("/homeauth");
                            }
                        },
                        function(err) {
                            $scope.error = err;
                        }
                    );
            }
        }

        function arraysToCsv(userFound) {
            var clientUser = userFound;
            var userRoles = arrayToCsv(userFound.roles);
            clientUser.roles = userRoles;
            return clientUser;
        }

        function arrayToCsv(array) {
            var commaSeparatedString = "";
            for (var i = 0; i < array.length; i++) {
                if (i < array.length - 1) {
                    commaSeparatedString = commaSeparatedString + array[i] + ",";
                } else {
                    commaSeparatedString = commaSeparatedString + array[i];
                }
            }
            return commaSeparatedString;
        }
    }
})();
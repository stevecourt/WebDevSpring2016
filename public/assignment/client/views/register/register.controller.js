"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", registerController);

    function registerController($scope, $rootScope, $location, UserService) {

        $scope.register = register;

        function register(user)
        {
            if(user.password != user.password2 || !user.password || !user.password2)
            {
                $scope.error = "Your passwords don't match";
            }
            else
            {
                UserService
                    .register(user)
                    .then(
                        function(response) {
                            var registeredUser = response.data;

                            console.log("register controller returned user");
                            console.log(registeredUser);

                            // Converts emails, phones and roles from arrays to comma separated strings.
                            var clientUser = arraysToCsv(registeredUser);

                            $rootScope.currentUser = clientUser;
                            if(user != null) {
                                $location.url("/profile");
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
            var userEmails = arrayToCsv(userFound.emails);
            var userPhones = arrayToCsv(userFound.phones);
            var userRoles = arrayToCsv(userFound.roles);
            clientUser.emails = userEmails;
            clientUser.phones = userPhones;
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
"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", loginController);

    function loginController($scope, $rootScope, $location, UserService) {

        $scope.login = login;

        function login(user)
        {
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
                            $location.url("/profile");
                        },
                        function(err) {
                            alert("The username or password entered is not recognized.");
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
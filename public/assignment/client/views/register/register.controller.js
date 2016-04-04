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
                var enteredUser = {"username": username, "password": password, "emails": email};
                UserService.createUser(enteredUser)
                    .then(function (returnedUsers) {
                        for (var i = 0; i < returnedUsers.data.length; i++) {
                            if (returnedUsers.data[i].username == username) {
                                var userFound = returnedUsers.data[i];
                                // Converts emails and phones from arrays to comma separated strings.
                                var clientUser = emailAndPhoneToCsv(userFound);
                                $rootScope.currentUser = clientUser;
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

        function emailAndPhoneToCsv(userFound) {
            var clientUser = userFound;
            var userEmails = arrayToCsv(userFound.emails);
            var userPhones = arrayToCsv(userFound.phones);
            clientUser.emails = userEmails;
            clientUser.phones = userPhones;
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
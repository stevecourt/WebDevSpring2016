"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", loginController);

    function loginController($scope, $rootScope, $location, UserService) {

        $scope.login = login;
/*
        function login(username, password) {
            UserService.findUserByCredentials(username, password)
                .then(function (returnedUser) {
                    var returnedUserObject = returnedUser.data;
                    // Converts emails and phones from arrays to comma separated strings.
                    var clientUser = emailAndPhoneToCsv(returnedUserObject);
                    $rootScope.currentUser = clientUser;
                    $location.url("/profile");
                }, function (returnedUser) {
                    alert("The username or password entered is not recognized.");
                });
        }
*/
        function login(user)
        {
            if(user)
                UserService
                    .login(user)
                    .then(
                        function(response)
                        {

                            console.log("returned to controller");
                            console.log("response.data = ");
                            console.log(response.data);

                            $rootScope.currentUser = response.data;
                            $location.url("/profile");
                        },
                        function(err) {
                            alert("The username or password entered is not recognized.");
                            $scope.error = err;
                        }
                    );
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
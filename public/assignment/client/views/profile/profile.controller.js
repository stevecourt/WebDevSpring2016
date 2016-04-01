"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController);

    function profileController($scope, $rootScope, $location, UserService) {

        $scope.update = update;

        function update(user) {
            UserService.updateUser(user._id, user)
                .then(function (returnedUsers) {
                    // Filter for the updated current user
                    for (var i = 0; i < returnedUsers.data.length; i++) {
                        if (returnedUsers.data[i]._id == user._id) {
                            var userFound = returnedUsers.data[i];

                            // Converts emails and phones from arrays to comma separated strings.
                            var clientUser = emailAndPhoneToCsv(userFound);

                            $scope.message = "Profile updated successfully. (Click to close.)";
                            $rootScope.currentUser = clientUser;
                            $location.url("/profile");
                        }
                    }
                }, function (returnedUsers) {
                    console.log("Error: The user was not updated in the system.");
                });
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

        $scope.closeButtonAlert = function () {
            $scope.message = null;
        }
    }
})();
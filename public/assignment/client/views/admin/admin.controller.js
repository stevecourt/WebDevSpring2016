"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", adminController);

    function adminController($scope, UserService) {

        $scope.createUser = createUser;
        $scope.findAllUsers = findAllUsers;
        //$scope.findUserById = findUserById;
        //$scope.deleteUserById = deleteUserById;
        //$scope.updateUserById = updateUserById;

        // Get the current users for rendering.
        findAllUsers();
        function findAllUsers() {
            UserService.findAllUsers()
                .then (function (returnedUsers) {

                    console.log(returnedUsers.data);

                    var convertedUsers = convertRoles(returnedUsers.data);

                    $scope.users = returnedUsers.data;
                }, function (returnedUsers) {
                    console.log("Error: Could not retrieve users.");
                });
        }

        function createUser(newUser) {
            UserService.createUser(newUser)
                .then (function (returnedUsers) {

                    console.log(returnedUsers.data);

                    var convertedUsers = convertRoles(returnedUsers.data);

                    $scope.users = returnedUsers.data;
                }, function (returnedUsers) {
                    console.log("Error: Could not add user.");
                });
        }

        function convertRoles(userArray) {
            for (var i = 0; i < userArray.length; i++) {
                userArray[i].roles = arrayToCsv(userArray[i].roles);
            }
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
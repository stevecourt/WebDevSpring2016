"use strict";

(function () {
    angular
        .module("BookExchangeApp")
        .controller("AdminController", adminController);

    function adminController($scope, UserService) {

        $scope.createUser = createUser;
        $scope.findAllUsers = findAllUsers;
        $scope.findUserById = findUserById;
        $scope.deleteUserById = deleteUserById;
        $scope.updateUserById = updateUserById;

        // Get the current users for rendering.
        findAllUsers();
        function findAllUsers() {
            UserService.findAllUsers()
                .then (function (returnedUsers) {
                    var convertedUsers = convertRoles(returnedUsers.data);
                    $scope.users = convertedUsers;
                }, function (returnedUsers) {
                    console.log("Error: Could not retrieve users.");
                });
        }

        function createUser(newUser) {
            UserService.createUser(newUser)
                .then (function (returnedUsers) {
                    var convertedUsers = convertRoles(returnedUsers.data);
                    $scope.users = convertedUsers;
                }, function (returnedUsers) {
                    console.log("Error: Could not add user.");
                });
        }

        function findUserById(index) {
            UserService.findUserById($scope.users[index]._id)
                .then (function (returnedUser) {
                    $scope.selectedUser = returnedUser.data;
                    $scope.selectedUser.roles = arrayToCsv($scope.selectedUser.roles);
                    $scope.user = $scope.selectedUser;
                }, function (returnedUser) {
                    console.log("Error: Could not select user.");
                });
        }

        function deleteUserById(index) {
            UserService.deleteUserById($scope.users[index]._id)
                .then (function (returnedUsers) {
                    var convertedUsers = convertRoles(returnedUsers.data);
                    $scope.users = convertedUsers;
                }, function (returnedUsers) {
                    console.log("Error: Could not delete user.");
                });
        }

        function updateUserById(updatedUser) {
            UserService.updateUserById(updatedUser._id, updatedUser)
                .then (function (returnedUsers) {
                    var convertedUsers = convertRoles(returnedUsers.data);
                    $scope.users = convertedUsers;
                }, function (returnedUsers) {
                    console.log("Error: Could not update user.");
                });
        }

        function convertRoles(userArray) {
            for (var i = 0; i < userArray.length; i++) {
                userArray[i].roles = arrayToCsv(userArray[i].roles);
            }
            return userArray;
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
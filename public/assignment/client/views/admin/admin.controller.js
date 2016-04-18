"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", adminController);

    function adminController($scope, UserService) {

        $scope.createUser = createUser;
        $scope.findAllUsers = findAllUsers;
        $scope.findUserById = findUserById;
        $scope.deleteUserById = deleteUserById;
        $scope.updateUserById = updateUserById;
        $scope.sortUsers = sortUsers;

        // Get the current users for rendering.
        findAllUsers();
        function findAllUsers() {
            UserService.findAllUsers()
                .then (function (returnedUsers) {

                    console.log(returnedUsers.data);

                    var convertedUsers = convertRoles(returnedUsers.data);

                    console.log(convertedUsers);

                    $scope.users = convertedUsers;
                }, function (returnedUsers) {
                    console.log("Error: Could not retrieve users.");
                });
        }

        function createUser(newUser) {
            UserService.createUser(newUser)
                .then (function (returnedUsers) {

                    console.log(returnedUsers.data);

                    var convertedUsers = convertRoles(returnedUsers.data);

                    $scope.users = convertedUsers;
                }, function (returnedUsers) {
                    console.log("Error: Could not add user.");
                });
        }

        function findUserById(index) {
            UserService.findUserById($scope.users[index]._id)
                .then (function (returnedUser) {

                    console.log(returnedUser.data);

                    $scope.selectedUser = returnedUser.data;
                    $scope.selectedUser.roles = arrayToCsv($scope.selectedUser.roles);
                    $scope.user = $scope.selectedUser; //TODO: Check for simplification.

                }, function (returnedUser) {
                    console.log("Error: Could not select user.");
                });
        }

        function deleteUserById(index) {
            UserService.deleteUserById($scope.users[index]._id)
                .then (function (returnedUsers) {

                    console.log(returnedUsers.data);

                    var convertedUsers = convertRoles(returnedUsers.data);

                    $scope.users = convertedUsers;
                }, function (returnedUsers) {
                    console.log("Error: Could not delete user.");
                });
        }

        function updateUserById(updatedUser) {

            console.log("admin controller update");
            console.log(updatedUser._id);
            console.log(updatedUser);

            UserService.updateUserById(updatedUser._id, updatedUser)
                .then (function (returnedUsers) {

                    console.log(returnedUsers.data);

                    var convertedUsers = convertRoles(returnedUsers.data);

                    $scope.users = convertedUsers;
                }, function (returnedUsers) {
                    console.log("Error: Could not update user.");
                });
        }

        function sortUsers(field) {
            var usersToBeSorted = $scope.users;
            switch(field) {
                case "userName":
                    if ($scope.lastUserSort == "userNameDesc") {
                        $scope.users = sortUserArray(usersToBeSorted, "userNameAsc");
                        $scope.lastUserSort = "userNameAsc";
                    } else {
                        $scope.users = sortUserArray(usersToBeSorted, "userNameDesc");
                        $scope.lastUserSort = "userNameDesc";
                    }
                    break;
                case "firstName":
                    if ($scope.lastUserSort == "firstNameDesc") {
                        $scope.users = sortUserArray(usersToBeSorted, "firstNameAsc");
                        $scope.lastUserSort = "firstNameAsc";
                    } else {
                        $scope.users = sortUserArray(usersToBeSorted, "firstNameDesc");
                        $scope.lastUserSort = "firstNameDesc";
                    }
                    break;
                case "lastName":
                    if ($scope.lastUserSort == "lastNameDesc") {
                        $scope.users = sortUserArray(usersToBeSorted, "lastNameAsc");
                        $scope.lastUserSort = "lastNameAsc"
                    } else {
                        $scope.users = sortUserArray(usersToBeSorted, "lastNameDesc");
                        $scope.lastUserSort = "lastNameDesc"
                    }
                    break;
            }
        }

        function sortUserArray(usersToBeSorted, fieldAndDirection) {
            var sortedUsers = usersToBeSorted;
            switch(fieldAndDirection) {
                case "userNameAsc":
                    sortedUsers = usersToBeSorted.sort(compareUserName);
                    sortedUsers.reverse();
                    break;
                case "userNameDesc":
                    sortedUsers = usersToBeSorted.sort(compareUserName);
                    break;
                case "firstNameAsc":
                    sortedUsers = usersToBeSorted.sort(compareFirstName);
                    sortedUsers.reverse();
                    break;
                case "firstNameDesc":
                    sortedUsers = usersToBeSorted.sort(compareFirstName);
                    break;
                case "lastNameAsc":
                    sortedUsers = usersToBeSorted.sort(compareLastName);
                    sortedUsers.reverse();
                    break;
                case "lastNameDesc":
                    sortedUsers = usersToBeSorted.sort(compareLastName);
                    break;
            }
            return sortedUsers;
        }

        function compareUserName(a,b) {
            if (a.username.toLowerCase() < b.username.toLowerCase())
                return -1;
            else if (a.username.toLowerCase() > b.username.toLowerCase())
                return 1;
            else
                return 0;
        }

        function compareFirstName(a,b) {
            if (a.firstName.toLowerCase() < b.firstName.toLowerCase())
                return -1;
            else if (a.firstName.toLowerCase() > b.firstName.toLowerCase())
                return 1;
            else
                return 0;
        }

        function compareLastName(a,b) {
            if (a.lastName.toLowerCase() < b.lastName.toLowerCase())
                return -1;
            else if (a.lastName.toLowerCase() > b.lastName.toLowerCase())
                return 1;
            else
                return 0;
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

            console.log(commaSeparatedString);

            return commaSeparatedString;
        }
    }
})();
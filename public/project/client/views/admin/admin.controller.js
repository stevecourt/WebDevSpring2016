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

                    console.log("admin controller - returned users");
                    console.log(returnedUsers.data);

                    var convertedUsers = convertRoles(returnedUsers.data);
                    $scope.users = convertedUsers;
                }, function (returnedUsers) {
                    console.log("Error: Could not retrieve users.");
                });
        }

        function createUser(newUser) {

            console.log("new user sent");
            console.log(newUser);

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

/*
$scope.addUser = addUser;
$scope.selectUser = selectUser;
$scope.changeUser = changeUser;
$scope.removeUser = removeUser;

// Get all users for rendering.
getAllUsers();
function getAllUsers() {
    var callback = function (users) {
        $scope.allUsers = users;
    };
    UserService.findAllUsers(callback);
}

function addUser(user) {
    var callback = function (users) {
        // Get all users for rendering.
        UserService.findAllUsers(
            function (users) {
                $scope.allUsers = users;
            }
        )
    };
    UserService.createUser(user, callback);
}

function selectUser(index) {
    $scope.selectedUserIndex = index;
    $scope.user = {
        id: $scope.allUsers[index].id,
        firstName: $scope.allUsers[index].firstName,
        lastName: $scope.allUsers[index].lastName,
        email: $scope.allUsers[index].email,
        username: $scope.allUsers[index].username,
        password: $scope.allUsers[index].password,
        type: $scope.allUsers[index].type
    };
}

function changeUser(user) {
    var callback = function (newUser) {
        $scope.allUsers[$scope.selectedUserIndex] = newUser;
        // Get all users for rendering.
        UserService.findAllUsers(
            function (users) {
                $scope.allUsers = users;
            }
        )
    };
    UserService.updateUser(user, callback);
}

function removeUser(user) {
    var callback = function (users) {
        // Get all users for rendering.
        UserService.findAllUsers(
            function (users) {
                $scope.allUsers = users;
            }
        )
    };
    UserService.deleteUser(user, callback);
}
    */
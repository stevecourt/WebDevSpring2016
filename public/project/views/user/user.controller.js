"use strict";

(function () {
    angular
        .module("BookExchangeApp")
        .controller("UserController", userController);

    function userController($scope, UserService) {

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
    }
})();
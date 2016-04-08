"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", adminController);

    function adminController($scope, UserService) {

        //$scope.createUser = createUser;
        $scope.findAllUsers = findAllUsers;
        //$scope.findUserById = findUserById;
        //$scope.deleteUserById = deleteUserById;
        //$scope.updateUserById = updateUserById;

        // Get the current users for rendering.
        findAllUsers();
        function findAllUsers() {
            UserService.findAllUsers()
                .then (function (returnedUsers) {
                    $scope.users = returnedUsers.data;
                }, function (returnedUsers) {
                    console.log("Error: Could not retrieve users.");
                });
        }


    }
})();
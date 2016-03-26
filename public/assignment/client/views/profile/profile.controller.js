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
                    for (var i = 0; i < returnedUsers.data.length; i++) {
                        if (returnedUsers.data[i]._id == user._id) {
                            var userFound = returnedUsers.data[i];
                            $scope.message = "Profile updated successfully. (Click to close.)";
                            $rootScope.currentUser = userFound;
                            $location.url("/profile");
                        }
                    }
                }, function (returnedUsers) {
                    console.log("Error: The user was not updated in the system.");
                });
        }

        $scope.closeButtonAlert = function () {
            $scope.message = null;
        }
    }
})();
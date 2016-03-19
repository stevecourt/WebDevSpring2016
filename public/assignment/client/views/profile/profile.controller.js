"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController);

    function profileController($scope, $rootScope, $location, UserService) {

        $scope.update = function (user) {
            UserService.updateUser(user._id, user)
                .then(function (returnedUsers) {

                    for (var i = 0; i < returnedUsers.length; i++) {

                        console.log(returnedUsers[i]._id);

                        if (returnedUsers[i]._id == user._id) {
                            var userFound = returnedUsers[i];
                            console.log(userFound);
                            $scope.message = "Profile updated successfully. (Click to close.)";
                            $rootScope.currentUser = userFound;
                            $location.url("/profile");
                        }
                    }
            });
        }

        $scope.closeButtonAlert = function () {
            $scope.message = null;
        }
    }
})();
"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", loginController);

    function loginController($scope, $rootScope, $location, UserService) {

        $scope.login = login;

        function login(username, password) {
            var returnedUser = UserService.findUserByCredentials(username, password)
                .then(function (returnedUser) {
                        // TODO: Can revert back to pass by reference when database is in use.
                        $rootScope.currentUser = {
                            "_id":returnedUser.data._id,
                            "firstName": returnedUser.data.firstName,
                            "lastName": returnedUser.data.lastName,
                            "username": returnedUser.data.username,
                            "password": returnedUser.data.password,
                            "email": returnedUser.data.email,
                            "roles": returnedUser.data.roles};

                    $location.url("/profile");
                }, function (returnedUser) {
                    alert("The username or password entered is not recognized.");
                });
        }
    }
})();
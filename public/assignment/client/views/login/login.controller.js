"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", loginController);

    function loginController($scope, $rootScope, $location, UserService) {

        $scope.login = login;

        function login(username, password) {

            // Login verification occurs before setting the current user.
            var callback = function (aUser) {
                if (aUser === null) {
                    alert("The username or password entered is not recognized.");
                } else {
                    // TODO: The commented line can replace the subsequent line once the database is used.
                    // This temporarily prevents an issue where the user profile can be updated
                    // without clicking the update button.
                    //$rootScope.currentUser = aUser;
                    $rootScope.currentUser = {
                        "_id": aUser._id,
                        "firstName": aUser.firstName,
                        "lastName": aUser.lastName,
                        "username": aUser.username,
                        "password": aUser.password,
                        "email": aUser.email,
                        "roles": aUser.roles};
                    $location.url("/profile");
                }
            };

            UserService.findUsersByUsernameAndPassword(username, password, callback);
        }
    }
})();
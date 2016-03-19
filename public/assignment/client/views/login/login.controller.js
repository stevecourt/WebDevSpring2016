"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", loginController);

    function loginController($scope, $rootScope, $location, UserService) {

        $scope.login = function(username, password) {
            var returnedUser = UserService.findUserByCredentials(username, password)
                .then(function (returnedUser) {
                    //if (returnedUser == null) {
                    //    alert("The username or password entered is not recognized.");
                    //    console.log("The username or password entered is not recognized.");
                    //} else {

                        console.log(returnedUser.data);
                        console.log("Client Controller Path 1");

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
                    //}
                }, function (returnedUser) {
                    console.log("OMG it really did work!!!!!");
                    console.log("Client Controller Path 2");
                    alert("The username or password entered is not recognized.");
                });
        }
    }
})();
"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", registerController);

    function registerController($scope, $rootScope, $location, UserService) {

        $scope.register = function (username, password, password2, email) {
            // Check for password consistency before creating user.
            if (password == password2) {
                var enteredUser = {"username": username, "password": password, "email": email};

                console.log("passwords match");

                // All users are initially returned (per requirements and for use on the admin page),
                // so the newly created user is then retrieved using and existing function.
                // TODO: consider pulling the user from the returned array for performance.
                UserService.createUser(enteredUser)
                    .then(function (returnedUsers) {

                        console.log("back in reg controller");
                        console.log(returnedUsers);

                        for (var i = 0; i < returnedUsers.length; i++) {

                            console.log(returnedUsers[i].username);
                            console.log(returnedUsers[i].password);

                            if (returnedUsers[i].username == username && returnedUsers[i].username == username) {
                                var userFound = returnedUsers[i];
                                console.log(userFound);
                                $rootScope.currentUser = userFound;
                                $location.url("/profile");
                            }
                        }
                    });




                   /* .then(UserService.findUserByCredentials(enteredUser.username, enteredUser.password))

                    .then(function (returnedUser) {

                        console.log("Should have found user");
                        console.log(returnedUser);

                        $rootScope.currentUser = returnedUser;
                        $location.url("/profile");
                    });*/

            } else {
                alert("Password and password verification do not match. Please re-enter details.");
            }
        }
    }
})();
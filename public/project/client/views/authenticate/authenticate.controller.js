"use strict";

(function () {
    angular
        .module("BookExchangeApp")
        .controller("AuthenticateController", authenticateController);

    function authenticateController($scope, $rootScope, $location, UserService) {

        $scope.login = login;
        $scope.register = register;

        function login(user)
        {
            if(user) {
                UserService
                    .login(user)
                    .then(
                        function(response)
                        {
                            var loggedInUser = response.data;

                            // Converts emails, phones and roles from arrays to comma separated strings.
                            //var clientUser = arraysToCsv(loggedInUser);

                            $rootScope.currentUser = loggedInUser;
                            $location.url("/profile");
                        },
                        function(err) {
                            alert("The username or password entered is not recognized.");
                            $scope.error = err;
                        }
                    );
            }
        }

        function register(user)
        {
            if(user.password != user.password2 || !user.password || !user.password2)
            {
                $scope.error = "Your passwords don't match";
            }
            else
            {

                console.log("controller");
                console.log(user);

                UserService
                    .register(user)
                    .then(
                        function(response) {
                            var registeredUser = response.data;

                            console.log("back in controller");
                            console.log(registeredUser);
                            console.log("");

                            $rootScope.currentUser = registeredUser;

                            console.log("current user = ");
                            console.log(registeredUser);

                            if(user != null) {
                                $location.url("/profile");
                            }
                        },
                        function(err) {
                            $scope.error = err;
                        }
                    );
            }
        }
    }
})();
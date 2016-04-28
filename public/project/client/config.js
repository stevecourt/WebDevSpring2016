"use strict";

(function () {
    angular
        .module("BookExchangeApp", ["ngRoute"])
        .config(function ($routeProvider) {
            $routeProvider
                .when("/authenticate", {
                    templateUrl: "views/authenticate/authenticate.view.html",
                    controller: "AuthenticateController"
                })
                .when("/profile", {
                    templateUrl: "views/profile/profile.view.html",
                    controller: "ProfileController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/locationDetails/:locationId", {
                    templateUrl: "views/locdetails/locdetails.view.html",
                    controller: "LocDetailsController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/home", {
                    templateUrl: "views/home/home.view.html",
                    controller: "HomeController"
                })
                .when("/homeauth", {
                    templateUrl: "views/homeauth/homeauth.view.html",
                    controller: "HomeauthController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/location", {
                    templateUrl: "views/location/location.view.html",
                    controller: "LocationController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/search", {
                    templateUrl: "views/search/search.view.html",
                    controller: "SearchController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })

                .when("/search/:title?/:author?/:isbn?/:subject?/:place?/:person?/:publisher?", {
                    templateUrl: "views/search/search.view.html",
                    controller: "SearchController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/user", {
                    templateUrl: "views/user/user.view.html",
                    controller: "UserController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html",
                    controller: "AdminController",
                    resolve: {
                        loggedin: checkAdmin
                    }
                })
                .when("/reglocation", {
                    templateUrl: "views/reglocation/reglocation.view.html",
                    controller: "ReglocationController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .otherwise({
                    redirectTo: "/home"
                });
        });

    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') != -1)
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
        });

        return deferred.promise;
    };

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/home');
            }
        });

        return deferred.promise;
    };

})();
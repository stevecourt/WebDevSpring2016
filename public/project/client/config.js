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
                .when("/book", {
                    templateUrl: "views/book/book.view.html",
                    controller: "BookController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/details", {
                    templateUrl: "views/details/details.view.html",
                    controller: "DetailsController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/editions", {
                    templateUrl: "views/editions/editions.view.html",
                    controller: "EditionsController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                // TODO: Update with rest keyword and check functionality.
                .when("/editions/:edition_key", {
                    templateUrl: "views/editions/editions.view.html",
                    controller: "EditionsController",
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
                .when("/maker", {
                    templateUrl: "views/maker/maker.view.html",
                    controller: "MakerController",
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
                .when("/wishlist", {
                    templateUrl: "views/wishlist/wishlist.view.html",
                    controller: "WishlistController",
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
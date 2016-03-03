"use strict";

(function () {
    angular
        .module("BookExchangeApp", ["ngRoute"])
        .config(function ($routeProvider) {
            $routeProvider
                .when("/home", {
                    templateUrl: "views/home/home.view.html",
                    controller: "HomeController"
                })
                .when("/book", {
                    templateUrl: "views/book/book.view.html",
                    controller: "BookController"
                })
                .when("/location", {
                    templateUrl: "views/location/location.view.html",
                    controller: "LocationController"
                })
                .when("/provider", {
                    templateUrl: "views/provider/provider.view.html",
                    controller: "ProviderController"
                })
                .when("/user", {
                    templateUrl: "views/user/user.view.html",
                    controller: "UserController"
                })
                .when("/wishlist", {
                    templateUrl: "views/wishlist/wishlist.view.html",
                    controller: "wishlistController"
                })
                .otherwise({
                    redirectTo: "/home"
                });
        });
})();
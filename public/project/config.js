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
                .when("/user", {
                    templateUrl: "views/user/user.view.html",
                    controller: "UserController"
                })
                .when("/book", {
                    templateUrl: "views/book/book.view.html",
                    controller: "BookController"
                })
                .when("/wishlist", {
                    templateUrl: "views/wishlist/wishlist.view.html",
                    controller: "WishlistController"
                })
                .when("/location", {
                    templateUrl: "views/location/location.view.html",
                    controller: "LocationController"
                })
                .when("/maker", {
                    templateUrl: "views/maker/maker.view.html",
                    controller: "MakerController"
                })
                .when("/search", {
                    templateUrl: "views/search/search.view.html",
                    controller: "SearchController"
                })
                .when("/search/:title?/:author?/:isbn?/:subject?/:place?/:person?/:publisher?", {
                    templateUrl: "views/search/search.view.html",
                    controller: "SearchController"
                })
                .when("/editions", {
                    templateUrl: "views/editions/editions.view.html",
                    controller: "EditionsController"
                })
                .when("/details", {
                    templateUrl: "views/details/details.view.html",
                    controller: "DetailsController"
                })
                .otherwise({
                    redirectTo: "/"
                });
        });
})();
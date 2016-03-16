"use strict";

(function () {
    angular
        .module("BookExchangeApp", ["ngRoute"])
        .config(function ($routeProvider) {
            $routeProvider
                .when("/book", {
                    templateUrl: "views/book/book.view.html",
                    controller: "BookController"
                })
                .when("/details", {
                    templateUrl: "views/details/details.view.html",
                    controller: "DetailsController"
                })
                .when("/editions", {
                    templateUrl: "views/editions/editions.view.html",
                    controller: "EditionsController"
                })
                // TODO: Update with rest keyword and check functionality.
                .when("/editions/:edition_key", {
                    templateUrl: "views/editions/editions.view.html",
                    controller: "EditionsController"
                })
                .when("/home", {
                    templateUrl: "views/home/home.view.html",
                    controller: "HomeController"
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
                .when("/user", {
                    templateUrl: "views/user/user.view.html",
                    controller: "UserController"
                })
                .when("/wishlist", {
                    templateUrl: "views/wishlist/wishlist.view.html",
                    controller: "WishlistController"
                })
                .otherwise({
                    redirectTo: "/"
                });
        });
})();
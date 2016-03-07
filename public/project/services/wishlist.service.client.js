"use strict";

(function () {
    angular
        .module("BookExchangeApp")
        .factory("WishlistService", wishlistService);

    function wishlistService() {

        var wishlists = [];
        wishlists = [
            {"id": 101, "address": "3 3rd Ave, Seattle", "distance": "25", name: "Al's List", userId: "123"},
            {"id": 102, "address": "4 4th Ave, Seattle", "distance": "35", name: "Learn to read List", userId: "234"},
            {"id": 103, "address": "5 5th Ave, Seattle", "distance": "40", name: "Posh List", userId: "345"},
            {"id": 104, "address": "6 6th Ave, Seattle", "distance": "10", name: "Our List", userId: "456"}
        ];

        // CRUD operations
        var api = {
            createWishlist: createWishlist,
            findAllWishlists: findAllWishlists,
            updateWishlist: updateWishlist,
            deleteWishlist: deleteWishlist,
        };
        return api;

        function createWishlist(wishlist, callback) {
            // Creates a new object to be added.
            var newWishlist = {
                id: wishlist.id,
                address: wishlist.address,
                distance: wishlist.distance,
                name: wishlist.name,
                userId: wishlist.userId
            };
            wishlists.push(newWishlist);
            callback(wishlists);
        }

        function findAllWishlists(callback) {
            callback(wishlists);
        }

        function updateWishlist(wishlist, callback) {
            // Creates a new object to be updated.
            var newWishlist = {
                id: wishlist.id,
                address: wishlist.address,
                distance: wishlist.distance,
                name: wishlist.name,
                userId: wishlist.userId
            };
            callback(newWishlist);
        }

        function deleteWishlist(wishlist, callback) {
            var index = wishlists.indexOf(wishlist);
            wishlists.splice(index, 1);
            callback(wishlists);
        }
    }
})();
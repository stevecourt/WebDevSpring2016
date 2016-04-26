"use strict";

(function () {
    angular
        .module("BookExchangeApp")
        .factory("WishlistService", wishlistService);

    function wishlistService() {

        var wishlists = [];
        wishlists = [
            {
                "id": 301,
                "name": "Al's List",
                "street": "3 3rd Ave",
                "apartment": "",
                "city": "Seattle",
                "state": "WA",
                "zip": 98001,
                "country": "USA",
                "distance": "25",
                "userId": 201
            },
            {
                "id": 302,
                "name": "Learn to read List",
                "street": "4 4th Ave",
                "apartment": "4",
                "city": "Seattle",
                "state": "WA",
                "zip": 98002,
                "country": "USA",
                "distance": "30",
                "userId": 202
            },
            {
                "id": 303,
                "name": "Posh List",
                "street": "5 5th Ave",
                "apartment": "",
                "city": "Seattle",
                "state": "WA",
                "zip": 98003,
                "country": "USA",
                "distance": "40",
                "userId": 203
            },
            {
                "id": 304,
                "name": "Our List",
                "street": "6 6th Ave",
                "apartment": "6",
                "city": "Seattle",
                "state": "WA",
                "zip": 98004,
                "country": "USA",
                "distance": "100",
                "userId": 204
            }
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
                id: (new Date).getTime(),
                name: wishlist.name,
                street: wishlist.street,
                apartment: wishlist.apartment,
                city: wishlist.city,
                state: wishlist.state,
                zip: wishlist.zip,
                country: wishlist.country,
                distance: wishlist.distance,
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
                id: (new Date).getTime(),
                name: wishlist.name,
                street: wishlist.street,
                apartment: wishlist.apartment,
                city: wishlist.city,
                state: wishlist.state,
                zip: wishlist.zip,
                country: wishlist.country,
                distance: wishlist.distance,
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
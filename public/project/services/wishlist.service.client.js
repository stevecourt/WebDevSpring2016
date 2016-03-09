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
                "street1": "3 3rd Ave",
                "street2": "",
                "apartment": "",
                "city": "Seattle",
                "state": "WA",
                "zip": 98001,
                "country": "USA",
                "distance": "25",
                "name": "Al's List",
                "userId": 201
            },
            {
                "id": 302,
                "street1": "4 4th Ave",
                "street2": "",
                "apartment": "4",
                "city": "Seattle",
                "state": "WA",
                "zip": 98002,
                "country": "USA",
                "distance": "30",
                "name": "Learn to read List",
                "userId": 202
            },
            {
                "id": 303,
                "street1": "5 5th Ave",
                "street2": "",
                "apartment": "",
                "city": "Seattle",
                "state": "WA",
                "zip": 98003,
                "country": "USA",
                "distance": "40",
                "name": "Posh List",
                "userId": 203
            },
            {
                "id": 304,
                "street1": "6 6th Ave",
                "street2": "",
                "apartment": "6",
                "city": "Seattle",
                "state": "WA",
                "zip": 98004,
                "country": "USA",
                "distance": "100",
                "name": "Our List",
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
                street1: wishlist.street1,
                street2: wishlist.street2,
                apartment: wishlist.apartment,
                city: wishlist.city,
                state: wishlist.state,
                zip: wishlist.zip,
                country: wishlist.country,
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
                id: (new Date).getTime(),
                street1: wishlist.street1,
                street2: wishlist.street2,
                apartment: wishlist.apartment,
                city: wishlist.city,
                state: wishlist.state,
                zip: wishlist.zip,
                country: wishlist.country,
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
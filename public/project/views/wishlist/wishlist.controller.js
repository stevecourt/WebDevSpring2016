"use strict";

(function () {
    angular
        .module("BookExchangeApp")
        .controller("WishlistController", wishlistController);

    function wishlistController($scope, WishlistService) {

        $scope.addWishlist = addWishlist;
        $scope.selectWishlist = selectWishlist;
        $scope.changeWishlist = changeWishlist;
        $scope.removeWishlist = removeWishlist;

        // Get all wishlists for rendering.
        getAllWishlists();
        function getAllWishlists() {
            var callback = function (wishlists) {
                $scope.allWishlists = wishlists;
            };
            WishlistService.findAllWishlists(callback);
        }

        function addWishlist(wishlist) {
            var callback = function (wishlists) {
                // Get all wishlists for rendering.
                WishlistService.findAllWishlists(
                    function (wishlists) {
                        $scope.allWishlists = wishlists;
                    }
                )
            };
            WishlistService.createWishlist(wishlist, callback);
        }

        function selectWishlist(index) {
            $scope.selectedWishlistIndex = index;
            $scope.wishlist = {
                id: $scope.allWishlists[index].id,
                name: $scope.allWishlists[index].name,
                street: $scope.allWishlists[index].street,
                apartment: $scope.allWishlists[index].apartment,
                city: $scope.allWishlists[index].city,
                state: $scope.allWishlists[index].state,
                zip: $scope.allWishlists[index].zip,
                country: $scope.allWishlists[index].country,
                distance: $scope.allWishlists[index].distance,
                userId: $scope.allWishlists[index].userId
            };
        }

        function changeWishlist(wishlist) {
            var callback = function (newWishlist) {
                $scope.allWishlists[$scope.selectedWishlistIndex] = newWishlist;
                // Get all wishlists for rendering.
                WishlistService.findAllWishlists(
                    function (wishlists) {
                        $scope.allWishlists = wishlists;
                    }
                )
            };
            WishlistService.updateWishlist(wishlist, callback);
        }

        function removeWishlist(wishlist) {
            var callback = function (wishlists) {
                // Get all wishlists for rendering.
                WishlistService.findAllWishlists(
                    function (wishlists) {
                        $scope.allWishlists = wishlists;
                    }
                )
            };
            WishlistService.deleteWishlist(wishlist, callback);
        }
    }
})();
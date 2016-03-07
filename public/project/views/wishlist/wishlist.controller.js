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
                // Note: Retain this format for easier modification later to wishlists per domain object.
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
                address: $scope.allWishlists[index].address,
                distance: $scope.allWishlists[index].distance,
                name: $scope.allWishlists[index].name,
                userId: $scope.allWishlists[index].userId
            };
        }

        function changeWishlist(wishlist) {
            var callback = function (newWishlist) {
                $scope.allWishlists[$scope.selectedWishlistIndex] = newWishlist;
                // Get all wishlists for rendering.
                // Note: Retain this format for easier modification later to wishlists per domain object.
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
                // Note: Retain this format for easier modification later to wishlists per domain object.
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

"use strict";

(function () {
    angular
        .module("BookExchangeApp")
        .controller("HomeController", homeController);

    function homeController($scope, HomeService) {

        $scope.addHome = addHome;
        $scope.selectHome = selectHome;
        $scope.changeHome = changeHome;
        $scope.removeHome = removeHome;

        // Get all homes for rendering.
        getAllHomes();
        function getAllHomes() {
            var callback = function (homes) {
                $scope.allHomes = homes;
            };
            HomeService.findAllHomes(callback);
        }

        function addHome(home) {
            var callback = function (homess) {
                // Get all homes for rendering.
                HomeService.findAllHomes(
                    function (homes) {
                        $scope.allHomes = homes;
                    }
                )
            };
            HomeService.createHome(home, callback);
        }

        function selectHome(index) {
            $scope.selectedHomeIndex = index;
            $scope.home = {
                id: $scope.allHomes[index].id,
                title: $scope.allHomes[index].title,
                text: $scope.allHomes[index].text,
                image: $scope.allHomes[index].image
            };
        }

        function changeHome(home) {
            var callback = function (newHome) {
                $scope.allHomes[$scope.selectedHomeIndex] = newHome;
                // Get all homes for rendering.
                HomeService.findAllHomes(
                    function (homes) {
                        $scope.allHomes = homes;
                    }
                )
            };
            HomeService.updateHome(home, callback);
        }

        function removeHome(home) {
            var callback = function (homes) {
                // Get all homes for rendering.
                HomeService.findAllHomes(
                    function (homes) {
                        $scope.allHomes = homes;
                    }
                )
            };
            HomeService.deleteHome(home, callback);
        }
    }
})();
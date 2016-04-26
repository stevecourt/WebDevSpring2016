"use strict";

(function () {
    angular
        .module("BookExchangeApp")
        .controller("MakerController", makerController);

    function makerController($scope, MakerService) {

        $scope.addMaker = addMaker;
        $scope.selectMaker = selectMaker;
        $scope.changeMaker = changeMaker;
        $scope.removeMaker = removeMaker;

        // Get all makers for rendering.
        getAllMakers();
        function getAllMakers() {
            var callback = function (makers) {
                $scope.allMakers = makers;
            };
            MakerService.findAllMakers(callback);
        }

        function addMaker(maker) {
            var callback = function (makers) {
                // Get all makers for rendering.
                MakerService.findAllMakers(
                    function (makers) {
                        $scope.allMakers = makers;
                    }
                )
            };
            MakerService.createMaker(maker, callback);
        }

        function selectMaker(index) {
            $scope.selectedMakerIndex = index;
            $scope.maker = {
                id: $scope.allMakers[index].id,
                name: $scope.allMakers[index].name,
                street: $scope.allMakers[index].street,
                apartment: $scope.allMakers[index].apartment,
                city: $scope.allMakers[index].city,
                state: $scope.allMakers[index].state,
                zip: $scope.allMakers[index].zip,
                country: $scope.allMakers[index].country,
                phone: $scope.allMakers[index].phone,
                email: $scope.allMakers[index].email,
                web: $scope.allMakers[index].web,
                notes: $scope.allMakers[index].notes,
                application: $scope.allMakers[index].application,
                userId: $scope.allMakers[index].userId
            };
        }

        function changeMaker(maker) {
            var callback = function (newMaker) {
                $scope.allMakers[$scope.selectedMakerIndex] = newMaker;
                // Get all makers for rendering.
                MakerService.findAllMakers(
                    function (makers) {
                        $scope.allMakers = makers;
                    }
                )
            };
            MakerService.updateMaker(maker, callback);
        }

        function removeMaker(maker) {
            var callback = function (makers) {
                // Get all makers for rendering.
                MakerService.findAllMakers(
                    function (makers) {
                        $scope.allMakers = makers;
                    }
                )
            };
            MakerService.deleteMaker(maker, callback);
        }
    }
})();
"use strict";

(function(){

    angular
        .module("BookExchangeApp")
        .controller("EditionsController", EditionsController);

    function EditionsController($scope, $routeParams, BookService) {

        console.log("in the editions controller");

        //var vm = this;
        $scope.editionArray = [];

        var editionKey = [];

        var editionKey = $routeParams.edition_key;
        console.log(editionKey);                    // DELETE
        //var editionKeyArray = editionKey.slice(2, editionKey.length - 1).split(",");
        //var editionKeyArray = editionKey.replace('"', "");
        var editionKeyArray = editionKey.replace(/[\[\]"]+/g, '').split(",");
        console.log(editionKeyArray);                    // DELETE

        function init() {
            //fetchEdition(editionKey);//
        }
        init();

        function fetchEdition(editionKey) {
            console.log("in fetchEdition");
            for (var i = 0; i < editionKey.length; i++) {
                BookService.findEditionByOLID(editionKey[i], renderDetails);
                //BookService.findEditionByOLID("OL23999169M", renderDetails);
            }
        }

        function renderDetails(response) {
            console.log("in renderDetails");
            console.log(response);                  // DELETE
            //vm.details = response;
            $scope.editionArray.push(response);
        }
    }
})();
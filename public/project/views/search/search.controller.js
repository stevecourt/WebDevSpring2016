(function(){
    //var SEARCN_URL = "http://www.omdbapi.com/?s=TITLE&page=PAGE&type=movie";
    var SEARCH_URL = "http://openlibrary.org/search.json?title=TITLE";
/*    var SEARCH_URL = "http://openlibrary.org/search.json?" +
        "title=TITLE&" +
        "author=AUTHOR&" +
        "isbn=ISBN&" +
        "subject=SUBJECT&" +
        "place=PLACE&" +
        "person=PERSON&" +
        "publisher=PUBLISHER";*/

    angular
        .module("BookExchangeApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, $http, $routeParams, $location, BookService) {

        function init() {
            var bookTitle = $routeParams.title;
            if(bookTitle) {
                fetchBook(bookTitle);
            }
        }
        init();

        function fetchBook(bookTitle) {
            BookService.findBooksByTitle(bookTitle, renderBooks);
        }

        function renderBooks(response) {
            $scope.data = response;
            addCovers();
        }

        function addCovers() {
            var docs = $scope.data.docs;
            for (var i = 0; i < docs.length; i++) {
                var searchPicUrl = "http://covers.openlibrary.org/b/id/" + docs[i].cover_i +"-M.jpg";
                docs[i].cover = searchPicUrl;
            }
        }
    }
})();
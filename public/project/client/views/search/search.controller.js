"use strict";

(function(){

    angular
        .module("BookExchangeApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, $routeParams, BookService) {

        function init() {
            var bookTitle = $routeParams.title;
            var bookAuthor = $routeParams.author;
            var bookIsbn = $routeParams.isbn;
            var bookSubject = $routeParams.subject;
            var bookPlace = $routeParams.place;
            var bookPerson = $routeParams.person;
            var bookPublisher = $routeParams.publisher;
            if(bookTitle || bookAuthor || bookIsbn || bookSubject || bookPlace || bookPerson || bookPublisher) {
                fetchBook(bookTitle, bookAuthor, bookIsbn, bookSubject, bookPlace, bookPerson, bookPublisher);
            }
        }
        init();

        function fetchBook(bookTitle, bookAuthor, bookIsbn, bookSubject, bookPlace, bookPerson, bookPublisher) {
            BookService.findBooksBySearchTerms(
                bookTitle,
                bookAuthor,
                bookIsbn,
                bookSubject,
                bookPlace,
                bookPerson,
                bookPublisher,
                renderBooks);
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
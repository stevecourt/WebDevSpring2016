"use strict";

(function () {
    angular
        .module("BookExchangeApp")
        .controller("BookController", bookController);

    function bookController($scope, BookService) {

        $scope.addBook = addBook;
        $scope.selectBook = selectBook;
        $scope.changeBook = changeBook;
        $scope.removeBook = removeBook;

        // Get all books for rendering.
        getAllBooks();
        function getAllBooks() {
            var callback = function (books) {
                $scope.allBooks = books;
            };

            BookService.findAllBooks(callback);
        }

        function addBook(book) {

        }

        function selectBook(index) {

        }

        function changeBook(book) {

        }

        function removeBook(book) {

        }
    }
})();

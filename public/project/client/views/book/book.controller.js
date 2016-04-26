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
            var callback = function (books) {
                // Get all books for rendering.
                BookService.findAllBooks(
                    function (books) {
                        $scope.allBooks = books;
                    }
                )
            };
            BookService.createBook(book, callback);
        }

        function selectBook(index) {
            $scope.selectedBookIndex = index;
            $scope.book = {
                isbn: $scope.allBooks[index].isbn,
                wishlist: $scope.allBooks[index].wishlist,
                location: $scope.allBooks[index].location
            };
        }

        function changeBook(book) {
            var callback = function (newBook) {
                $scope.allBooks[$scope.selectedBookIndex] = newBook;
                // Get all books for rendering.
                BookService.findAllBooks(
                    function (books) {
                        $scope.allBooks = books;
                    }
                )
            };
            BookService.updateBook(book, callback);
        }

        function removeBook(book) {
            var callback = function (books) {
                // Get all books for rendering.
                BookService.findAllBooks(
                    function (books) {
                        $scope.allBooks = books;
                    }
                )
            };
            BookService.deleteBook(book, callback);
        }
    }
})();
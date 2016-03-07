"use strict";

(function () {
    angular
        .module("BookExchangeApp")
        .factory("BookService", bookService);

    function bookService() {

        var books = [];
        books = [
            {"isbn": 1212121212121, "wishlist": "Wishlist1", "location": "LocationA"},
            {"isbn": 2323232323232, "wishlist": "Wishlist2", "location": "LocationB"},
            {"isbn": 3434343434343, "wishlist": "Wishlist3", "location": "LocationC"}
        ];

        // CRUD operations
        var api = {
            createBook: createBook,
            findAllBooks: findAllBooks,
            updateBook: updateBook,
            deleteBook: deleteBook
        };
        return api;

        function createBook(book, callback) {
            // Creates a new object to be added.
            var newBook = {
                isbn: book.isbn,
                wishlist: book.wishlist,
                location: book.location
            };
            books.push(newBook);
            callback(books);
        }

        function findAllBooks(callback) {
            callback(books);
        }

        function updateBook(book, callback) {
            // Creates a new object to be updated.
            var newBook = {
                isbn: book.isbn,
                wishlist: book.wishlist,
                location: book.location
            };
            callback(newBook);
        }

        function deleteBook(book, callback) {
            var index = books.indexOf(book);
            books.splice(index, 1);
            callback(books);
        }
    }
})();
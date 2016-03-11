"use strict";

(function () {

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
        .factory("BookService", bookService);

    function bookService($http) {

        var books = [];
        books = [
            {"isbn": "978-3-16-148410-0", "wishlist": 301, "location": 401},
            {"isbn": "978-4-16-148410-0", "wishlist": 302, "location": 402},
            {"isbn": "978-5-16-148410-0", "wishlist": 303, "location": 403}
        ];

        // CRUD and Search operations
        var api = {
            createBook: createBook,
            findAllBooks: findAllBooks,
            updateBook: updateBook,
            deleteBook: deleteBook,
            findBooksByTitle: findBooksByTitle
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

        function findBooksByTitle(title, callback) {
            var url = SEARCH_URL
                .replace("TITLE", title);
            $http.get(url)
                .success(callback);
        }
    }
})();
"use strict";

(function () {

    var SEARCH_URL = "http://openlibrary.org/search.json?";
    //var EDITION_URL = "https://openlibrary.org/api/books?bibkeys=OLID:EDITION_OLID&format=json&jscmd=data";

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
            findBooksBySearchTerms: findBooksBySearchTerms,
            findEditionByOLID: findEditionByOLID
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

        function findBooksBySearchTerms(title, author, isbn, subject, place, person, publisher, callback) {
            var url = SEARCH_URL;
            var notFirstParam = false;
            if (title) {
                url += "title=";
                url += title;
                notFirstParam = true;
            }
            if (author) {
                addAmpersand();
                url += "author=";
                url += author;
                notFirstParam = true;
            }
            if (isbn) {
                addAmpersand();
                url += "isbn=";
                url += isbn;
                notFirstParam = true;
            }
            if (subject) {
                addAmpersand();
                url += "subject=";
                url += subject;
                notFirstParam = true;
            }
            if (place) {
                addAmpersand();
                url += "place=";
                url += place;
                notFirstParam = true;
            }
            if (person) {
                addAmpersand();
                url += "person=";
                url += person;
                notFirstParam = true;
            }
            if (publisher) {
                addAmpersand();
                url += "publisher=";
                url += publisher;
                notFirstParam = true;
            }

            function addAmpersand() {
                if (notFirstParam) {
                    url += "&";
                }
            }

            $http
                .get(url)
                .success(callback);

        }

        function findEditionByOLID(editionKey, callback) {
            console.log("in findEditionByOLID");
            $http
                .get("/rest/edition/" + editionKey)
                .success(callback);
        }
    }
})();
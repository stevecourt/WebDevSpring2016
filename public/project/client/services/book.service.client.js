"use strict";

(function () {

    var SEARCH_URL = "http://openlibrary.org/search.json?";

    angular
        .module("BookExchangeApp")
        .factory("BookService", bookService);

    function bookService($http) {

        // Search operations
        var api = {
            findBooksBySearchTerms: findBooksBySearchTerms,
            findEditionByOLID: findEditionByOLID
        };
        return api;

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
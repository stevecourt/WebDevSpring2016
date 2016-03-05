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
            findAllBooks: findAllBooks,
            createBook: createBook,
            selectBook: readBook,
            updateBook: updateBook,
            deleteBook: deleteBook,
        };
        return api;

        function findAllBooks(callback) {
            callback(books);
        }

        function createBook(book, callback) {
            forms.push(form);
            callback(forms);
        }

        function readBook(userId, callback) {
            var userForms = [];
            for (var i = 0; i < forms.length; i++) {
                if (forms[i].userId === userId) {
                    userForms.push(forms[i]);
                }
            }
            callback(userForms);
        }

        function updateBook(formId, newForm, callback) {
            for (var i = 0; i < forms.length; i++) {
                if (forms[i]._id === formId) {
                    forms[i] = newForm;
                    callback(forms[i]);
                    break;
                }
            }
        }

        function deleteBook(formId, callback) {
            for (var i = 0; i < forms.length; i++) {
                if (forms[i]._id === formId) {
                    forms.splice(i, 1);
                    break;
                }
            }
            callback(forms);
        }
    }
})();
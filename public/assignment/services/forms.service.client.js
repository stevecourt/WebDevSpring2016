"use strict";

(function () {
    angular
        .module("FormBuilderApp", ["ngRoute"])
        .factory("FormService", formService);

    // LOOK UP WHAT PARAMS SHOULD BE HERE
    // JOSE HAD $http, $q
    function formService() {

        // SHOULD THIS BE INITIALIZED FIRST???
        var forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo", "userId": 123},
            {"_id": "020", "title": "CDs", "userId": 234},
        ]

        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };
        return api;

        function createFormForUser(userId, form, callback) {

        }

        function findAllFormsForUser(userId, callback) {

        }

        function deleteFormById(formId, callback) {

        }

        function updateFormById(formId, newForm, callback) {

        }
    }
})();
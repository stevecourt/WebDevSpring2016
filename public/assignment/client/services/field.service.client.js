"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .factory("FieldService", fieldService);

    function fieldService($http, $q) {

        var api = {
            createFieldForForm: createFieldForForm,
            getFieldsForForm:  getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField,
            moveField: moveField,
            findFormById: findFormById
        };
        return api;

        function createFieldForForm(formId, field) {
            var deferred = $q.defer();

            $http.post("/api/assignment/form/" + formId + "/field", field)
                .then(function(fields){
                    deferred.resolve(fields);
                }, function (fields) {
                    deferred.reject(fields);
                });

            return deferred.promise;
        }

        function getFieldsForForm(formId) {
            var deferred = $q.defer();
            $http.get("/api/assignment/form/" + formId + "/field")
                .then(function(fields){
                    deferred.resolve(fields);
                }, function (fields) {
                    deferred.reject(fields);
                });

            return deferred.promise;
        }

        function getFieldForForm(formId, fieldId) {
            var deferred = $q.defer();

            $http.get("/api/assignment/form/" + formId + "/field/" + fieldId)
                .then(function(field){
                    deferred.resolve(field);
                }, function (field) {
                    deferred.reject(field);
                });

            return deferred.promise;
        }

        function deleteFieldFromForm(formId, fieldId) {
            var deferred = $q.defer();

            $http.delete("/api/assignment/form/" + formId + "/field/" + fieldId)
                .then(function(fields){
                    deferred.resolve(fields);
                }, function (fields) {
                    deferred.reject(fields);
                });

            return deferred.promise;
        }

        function updateField(formId, fieldId, field) {
            var deferred = $q.defer();

            $http.put("/api/assignment/form/" + formId + "/field/" + fieldId, field)
                .then(function(fields){
                    deferred.resolve(fields);
                }, function (fields) {
                    deferred.reject(fields);
                });

            return deferred.promise;
        }

        function moveField(formId, startIndex, endIndex) {
            var deferred = $q.defer();

            $http.put("/api/assignment/form/" + formId + "/field?startIndex=" + startIndex + "&endIndex=" + endIndex)
                .then(function (response) {
                    deferred.resolve(response);
                }, function (form) {
                    deferred.reject(response);
                });

            return deferred.promise;
        }

        // Talks to the server side forms service.  Form title is needed for
        // rendering, but only the form id is available from route params.
        function findFormById(formId) {
            var deferred = $q.defer();

            $http.get("/api/assignment/form/" + formId)
                .then(function (form) {
                    deferred.resolve(form);
                }, function (form) {
                    deferred.reject(form);
                });

            return deferred.promise;
        }
    }
})();
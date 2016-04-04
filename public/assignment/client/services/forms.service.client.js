"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .factory("FormService", formService);

    function formService($http, $q) {

        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };
        return api;

        function createFormForUser(userId, form) {
            var deferred = $q.defer();

            $http.post("/api/assignment/user/" + userId + "/form", form)
                .then(function(forms){
                    deferred.resolve(forms);
                }, function (forms) {
                    deferred.reject(forms);
                });
            return deferred.promise;
        }

        function findAllFormsForUser(userId) {
            var deferred = $q.defer();

            $http.get("/api/assignment/user/" + userId + "/form")
                .then(function(forms){
                    deferred.resolve(forms);
                }, function (forms) {
                    deferred.reject(forms);
                });

            return deferred.promise;
        }

        function deleteFormById(formId) {
            var deferred = $q.defer();

            $http.delete("/api/assignment/form/" + formId)
                .then(function(forms){
                    deferred.resolve(forms);
                }, function (forms) {
                    deferred.reject(forms);
                });

            return deferred.promise;
        }

        function updateFormById(formId, newForm) {
            var deferred = $q.defer();

            $http.put("/api/assignment/form/" + formId, newForm)
                .then(function(forms){
                    deferred.resolve(forms);
                }, function (forms) {
                    deferred.reject(forms);
                });

            return deferred.promise;
        }
    }
})();
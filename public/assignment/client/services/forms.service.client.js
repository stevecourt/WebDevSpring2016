"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .factory("FormService", formService);

    function formService($http, $q) {

        // TODO: Delete array
/*        var forms = [];
        forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo", "userId": 123},
            {"_id": "020", "title": "CDs", "userId": 234}
        ];*/

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
                .success(function(forms){
                    deferred.resolve(forms);
                });

            return deferred.promise;
        }

        function findAllFormsForUser(userId) {
            var deferred = $q.defer();

            $http.get("/api/assignment/user/" + userId)
                .success(function(forms){
                    deferred.resolve(forms);
                });

            return deferred.promise;
        }

        function deleteFormById(formId) {
            var deferred = $q.defer();

            $http.delete("/api/assignment/form/" + formId)
                .success(function(forms){
                    deferred.resolve(forms);
                });

            return deferred.promise;
        }

        function updateFormById(formId, newForm) {
            var deferred = $q.defer();

            $http.put("/api/assignment/form/" + formId, form)
                .success(function(forms){
                    deferred.resolve(forms);
                });

            return deferred.promise;
        }
    }
})();
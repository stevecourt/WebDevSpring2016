"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", formController);

    function formController($scope) {
        $scope.addForm = addForm;

        function addForm(formName) {
            $scope.formNameCont = formName;
        }
    }
})();
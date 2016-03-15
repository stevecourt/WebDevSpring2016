"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController", formController);

    function formController($scope, $rootScope, FormService) {

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        var user = $rootScope.currentUser;

        // Get the current user's forms for rendering.
        getUserForms(user);
        function getUserForms(user) {
            var callback = function (userForms) {
                $scope.userForms = userForms;
            };

            FormService.findAllFormsForUser(user._id, callback);
        }

        function addForm(formTitle) {
            var newForm = {title: formTitle};

            // Callback updates the form list after new form is added.
            var callback = function (form) {
                FormService.findAllFormsForUser(
                    user._id,
                    function (userForms) {
                        $scope.userForms = userForms;
                    });
            };

            FormService.createFormForUser(user._id, newForm, callback);
        }

        function updateForm(formTitle) {
            var newForm = {
                _id: $scope.selectedForm._id,
                title: formTitle,
                userId: $scope.selectedForm.userId};

            // Callback updates the form list after new form is updated.
            var callback = function (form) {
                FormService.findAllFormsForUser(
                    user._id,
                    function (userForms) {
                        $scope.userForms = userForms;
                    });
            };
            FormService.updateFormById(newForm._id, newForm, callback);
        }

        function deleteForm(index) {

            // Callback updates the form list after new form is deleted.
            var callback = function (form) {
                FormService.findAllFormsForUser(
                    user._id,
                    function (userForms) {
                        $scope.userForms = userForms;
                    });
            };

            FormService.deleteFormById($scope.userForms[index]._id, callback);
        }

        function selectForm(index) {
            $scope.selectedForm = $scope.userForms[index];
            // formTitle sets the displayed name in the input box of the view.
            $scope.formTitle = $scope.selectedForm.title;
        }
    }
})();
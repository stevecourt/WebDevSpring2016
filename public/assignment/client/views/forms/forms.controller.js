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
            FormService.findAllFormsForUser(user._id)
                .then (function (returnedForms) {
                    $scope.userForms = returnedForms.data;
                }, function (returnedForms) {
                    console.log("Error: Could not retrieve user's forms.");
                });
        }

        function addForm(formTitle) {
            var newForm = {title: formTitle};
            FormService.createFormForUser(user._id, newForm)
                .then (function (returnedForms) {
                    $scope.userForms = returnedForms.data;
                }, function (returnedForms) {
                    console.log("Error: The form was not added to the system.");
                });
        }

        function updateForm(formTitle) {
            var formId = $scope.selectedForm._id;
            var formUserId = $scope.selectedForm.userId;
            var newForm = {
                _id: formId,
                title: formTitle,
                userId: formUserId};
            FormService.updateFormById(newForm._id, newForm)
                .then(function (returnedForms) {
                    // Filter the forms for the user.
                    var allUserForms = [];
                    for (var i = 0; i < returnedForms.data.length; i++) {
                        if (returnedForms.data[i].userId == formUserId) {
                            allUserForms.push(returnedForms.data[i]);
                        }
                    }
                    $scope.userForms = allUserForms;
                }, function (returnedForms) {
                    console.log("Error: The form was not updated in the system.");
                });
        }

        function deleteForm(index) {
            FormService.deleteFormById($scope.userForms[index]._id)
                .then(function (returnedForms) {

                    var formUserId = $scope.userForms[index].userId;
                    var allUserForms = [];

                    // Filter the forms for the user.
                    for (var i = 0; i < returnedForms.data.length; i++) {
                        if (returnedForms.data[i].userId == formUserId) {
                            allUserForms.push(returnedForms.data[i]);
                        }
                    }
                    $scope.userForms = allUserForms;
                }, function () {
                    console.log("Error: The form was not deleted from the system.");
                });
        }

        function selectForm(index) {
            $scope.selectedForm = $scope.userForms[index];
            // formTitle sets the displayed name in the input box of the view.
            $scope.formTitle = $scope.selectedForm.title;
        }
    }
})();
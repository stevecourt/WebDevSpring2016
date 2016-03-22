"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", fieldController);

    function fieldController($scope, $rootScope, $routeParams, FieldService) {

        //$scope.addField = addField;
        //$scope.deleteField = deleteField;

        // A bit of a guess right now.  CHECK. Doesn't the userId come form the currentUser?
        var userId = $routeParams.id;
        var formId = $routeParams.formId;

        var user = $rootScope.currentUser;

        // Get the current forms's fields for rendering.
        getFormFields(formId);
        function getFormFields(formId) {

            console.log("in field controller, getFormFields. FormID = " + formId);

            var returnedFields = FieldService.getFieldsForForm(formId)
                .then (function (returnedFields) {

                    //console.log("fields cont" + returnedFields.data[0]._id);
                    //console.log("fields cont" + returnedFields.data[1]._id);
                    //console.log("fields cont" + returnedFields.data[2]._id);
                    //console.log("fields cont" + returnedFields.data[3]._id);

                    $scope.model = {};
                    $scope.model.fields = returnedFields.data;

                    //console.log("fields cont" + $scope.model.fields[0]._id);
                    //console.log("fields cont" + $scope.model.fields[1]._id);
                    //console.log("fields cont" + $scope.model.fields[2]._id);
                    //console.log("fields cont" + $scope.model.fields[3]._id);

                }, function (returnedFields) {
                    console.log("Error: Could not retrieve form's fields.");
                });
        }

        // Get the current user's forms for rendering.
        //getUserForms(user);
        function getUserForms(user) {
            var returnedForms = FormService.findAllFormsForUser(user._id)
                .then (function (returnedForms) {

                    console.log("forms cont" + returnedForms.data);

                    $scope.userForms = returnedForms.data;
                }, function (returnedForms) {
                    console.log("Error: Could not retreive user's forms.");
                });
        }

        function addForm(formTitle) {
            var newForm = {title: formTitle};
            var updatedForms = FormService.createFormForUser(user._id, newForm)
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
            var returnedForms = FormService.updateFormById(newForm._id, newForm)
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
            var returnedForms = FormService.deleteFormById($scope.userForms[index]._id)
                .then(function (returnedForms) {
                    // Filter the forms for the user.
                    var formUserId = $scope.selectedForm.userId;
                    var allUserForms = [];
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

"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", fieldController);

    function fieldController($scope, $rootScope, $routeParams, FieldService) {

        $scope.addField = addField;
        $scope.deleteField = deleteField;

        // A bit of a guess right now.  CHECK. Doesn't the userId come form the currentUser?
        //var userId = $routeParams.id;
        $scope.formId = $routeParams.formId;

        //var user = $rootScope.currentUser;

        // Get the current forms's fields for rendering.
        getFormFields($scope.formId);
        function getFormFields(formId) {

            console.log("in field controller, getFormFields. FormID = " + formId);

            var returnedFields = FieldService.getFieldsForForm(formId)
                .then (function (returnedFields) {

                    //console.log("fields cont" + returnedFields.data[0]._id);

                    $scope.model = {};
                    $scope.model.fields = returnedFields.data;

                    //console.log("fields cont" + $scope.model.fields[0]._id);

                }, function (returnedFields) {
                    console.log("Error: Could not retrieve form's fields.");
                });
        }

        function addField(fieldType) {

            console.log("in form controller: field type given = " + fieldType);

            var newField = {};
            switch(fieldType) { // Create appropriate field
                case "Single Line Text Field":
                    newField = {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
                    break;
                case "Multi Line Text Field":
                    newField = {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
                    break;
                case "Date Field":
                    newField = {"_id": null, "label": "New Date Field", "type": "DATE"};
                    break;
                case "Dropdown Field":
                    newField = {"_id": null, "label": "New Dropdown", "type": "OPTIONS", "options":
                        [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]};
                    break;
                case "Checkboxes Field":
                    newField = {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]};
                    break;
                case "Radio Buttons Field":
                    newField = {"_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ]};
                    break;
            }

            console.log("in form controller" + newField.type);

            var returnedFields = FieldService.createFieldForForm($scope.formId, newField)
                .then (function (returnedFields) {
                    $scope.model.fields = returnedFields.data;
                }, function (returnedFields) {
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

        function deleteField(field) {

            var fieldId = field._id;

            console.log("in field controller - form id = " + $scope.formId);
            console.log("in field controller - field id = " + fieldId);

            var returnedForms = FieldService.deleteFieldFromForm($scope.formId, fieldId)
                .then(function (returnedFields) {
                    $scope.model.fields = returnedFields.data;
                }, function () {
                    console.log("Error: The field was not deleted from the form.");
                });
        }

        function selectForm(index) {
            $scope.selectedForm = $scope.userForms[index];
            // formTitle sets the displayed name in the input box of the view.
            $scope.formTitle = $scope.selectedForm.title;
        }
    }
})();

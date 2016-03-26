"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", fieldController);

    function fieldController($scope, $rootScope, $routeParams, FieldService) {

        $scope.addField = addField;
        $scope.cloneField = cloneField;
        $scope.deleteField = deleteField;
        $scope.reorderFields = reorderFields;

        $scope.openTextModDialog = openTextModDialog;

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
                    console.log("Error: The field was not added to the form.");
                });
        }

        function cloneField(field) {

            console.log("in form controller: field type given = " + field.type);

            var returnedFields = FieldService.createFieldForForm($scope.formId, field)
                .then (function (returnedFields) {
                    $scope.model.fields = returnedFields.data;
                }, function (returnedFields) {
                    console.log("Error: The field was not cloned in the form.");
                });
        }

        function updateField(formId, fieldId, field) {
            var returnedFields = FieldService.updateField(formId, fieldId, field)
                .then(function (returnedFields) {
                    $scope.model.fields = returnedFields.data;
                }, function (returnedForms) {
                    console.log("Error: The field was not updated in the system.");
                });
        }

        function deleteField(field) {

            var fieldId = field._id;

            console.log("in field controller - form id = " + $scope.formId);
            console.log("in field controller - field id = " + fieldId);

            var returnedFields = FieldService.deleteFieldFromForm($scope.formId, fieldId)
                .then(function (returnedFields) {
                    $scope.model.fields = returnedFields.data;
                }, function () {
                    console.log("Error: The field was not deleted from the form.");
                });
        }

        function reorderFields(formId, fields) {

            console.log("in field controller - reorderFields - form id = " + formId);
            console.log("in field controller - reorderFields - fields = " + fields[0].type);
            console.log("in field controller - reorderFields - fields = " + fields[1].type);

            var returnedFields = FieldService.reorderFieldsForForm(formId, fields)
                .then(function (returnedFields) {

                    console.log("Back in field controller - returned fields = " + returnedFields.data[0].type);
                    console.log("Back in field controller - returned fields = " + returnedFields.data[1].type);

                    $scope.model.fields = returnedFields.data;
                }, function (returnedFields) {
                    console.log("Error: The fields were not reordered on the form.");
                });
        }

        //function selectForm(index) {
        //    $scope.selectedForm = $scope.userForms[index];
        //    // formTitle sets the displayed name in the input box of the view.
        //    $scope.formTitle = $scope.selectedForm.title;
        //}

        var dialogDefinition = $( "#dialog-formSDC" ).dialog({
            autoOpen: false,
            height: 270,
            width: 240,
            modal: true,
            resizable: false,
            buttons: {
                Cancel: function () {
                    dialogDefinition.dialog( "close" );
                },
                "OK": function () {

                    console.log("label out = " + $scope.dialogLabel);
                    console.log("placeholder out = " + $scope.dialogPlaceholder);

                    var formId = $scope.formId;
                    var fieldId = $scope.model.fields[$scope.selectedIndex]._id;

                    var modifiedField = $scope.model.fields[$scope.selectedIndex];
                    modifiedField.label = $scope.dialogLabel;
                    modifiedField.placeholder = $scope.dialogPlaceholder;

                    console.log("form id = " + formId);
                    console.log("field id = " + fieldId);
                    console.log("field out = " + modifiedField._id);
                    console.log("field out = " + modifiedField.label);
                    console.log("field out = " + modifiedField.type);
                    console.log("field out = " + modifiedField.placeholder);

                    updateField(formId, fieldId, modifiedField);
                    dialogDefinition.dialog( "close" );
                }
            },
            close: function () {

                console.log("trying to close");
                //form[ 0 ].reset();
                //allFields.removeClass( "ui-state-error" );
            }
        });

        //function test2() {
        //    console.log("create an account!!!")
        //}

        function openTextModDialog(index) {
            console.log("open text mod dialog in controller " + index);

            $scope.selectedIndex = index;

            console.log("open text mod dialog in controller " + $scope.selectedIndex);

            //$scope.dialogLabel = $scope.model.fields[index].label;
            //$scope.dialogPlaceholder = $scope.model.fields[index].placeholder;

            $( "#dialog-formSDC" ).dialog("open");
        }
    }
})();

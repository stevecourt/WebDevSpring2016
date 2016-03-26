"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", fieldController);

    function fieldController($scope, $routeParams, FieldService) {

        // Main controller functions
        $scope.addField = addField;
        $scope.cloneField = cloneField;
        $scope.deleteField = deleteField;
        $scope.reorderFields = reorderFields;

        // Dialog boxes
        $scope.openModDialogSingle = openModDialogSingle;
        $scope.openModDialogMultiple = openModDialogMultiple;
        $scope.openModDialogDate = openModDialogDate;
        $scope.openModDialogDropdown = openModDialogDropdown;
        $scope.openModDialogCheckbox = openModDialogCheckbox;
        $scope.openModDialogRadio = openModDialogRadio;

        // Form ID from the URL pattern
        $scope.formId = $routeParams.formId;

        // Get the current forms's fields for rendering.
        getFormFields($scope.formId);
        function getFormFields(formId) {
            var returnedFields = FieldService.getFieldsForForm(formId)
                .then (function (returnedFields) {
                    $scope.model = {};
                    $scope.model.fields = returnedFields.data;
                }, function (returnedFields) {
                    console.log("Error: Could not retrieve form's fields.");
                });
        }

        function addField(fieldType) {
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
            if (fieldType != undefined) {
                var returnedFields = FieldService.createFieldForForm($scope.formId, newField)
                    .then (function (returnedFields) {
                        $scope.model.fields = returnedFields.data;
                    }, function (returnedFields) {
                        console.log("Error: The field was not added to the form.");
                    });
            }
        }

        function cloneField(field) {
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
            var returnedFields = FieldService.deleteFieldFromForm($scope.formId, fieldId)
                .then(function (returnedFields) {
                    $scope.model.fields = returnedFields.data;
                }, function () {
                    console.log("Error: The field was not deleted from the form.");
                });
        }

        function reorderFields(formId, fields) {
            var returnedFields = FieldService.reorderFieldsForForm(formId, fields)
                .then(function (returnedFields) {
                    $scope.model.fields = returnedFields.data;
                }, function (returnedFields) {
                    console.log("Error: The fields were not reordered on the form.");
                });
        }

        // Dialog Boxes ///////////////////////////////////////////////////////////////////////////////////////

        // Single
        var dialogDefinitionSingle = $( "#dialogSingle" ).dialog({
            autoOpen: false,
            height: 270,
            width: 240,
            modal: true,
            resizable: false,
            buttons: {
                Cancel: function () {
                    dialogDefinitionSingle.dialog( "close" );
                },
                "OK": function () {
                    var formId = $scope.formId;
                    var fieldId = $scope.model.fields[$scope.selectedIndex]._id;
                    var modifiedField = $scope.model.fields[$scope.selectedIndex];
                    modifiedField.label = $scope.dialogLabelSingle;
                    modifiedField.placeholder = $scope.dialogPlaceholderSingle;

                    updateField(formId, fieldId, modifiedField);
                    dialogDefinitionSingle.dialog( "close" );
                }
            }
        });

        function openModDialogSingle(index) {
            $scope.selectedIndex = index;
            $scope.dialogLabelSingle = $scope.model.fields[index].label;
            $scope.dialogPlaceholderSingle = $scope.model.fields[index].placeholder;

            $( "#dialogSingle" ).dialog("open");
        }

        // Multiple
        var dialogDefinitionMultiple = $( "#dialogMultiple" ).dialog({
            autoOpen: false,
            height: 270,
            width: 240,
            modal: true,
            resizable: false,
            buttons: {
                Cancel: function () {
                    dialogDefinitionMultiple.dialog( "close" );
                },
                "OK": function () {
                    var formId = $scope.formId;
                    var fieldId = $scope.model.fields[$scope.selectedIndex]._id;
                    var modifiedField = $scope.model.fields[$scope.selectedIndex];
                    modifiedField.label = $scope.dialogLabelMultiple;
                    modifiedField.placeholder = $scope.dialogPlaceholderMultiple;

                    updateField(formId, fieldId, modifiedField);
                    dialogDefinitionMultiple.dialog( "close" );
                }
            }
        });

        function openModDialogMultiple(index) {
            $scope.selectedIndex = index;
            $scope.dialogLabelMultiple = $scope.model.fields[index].label;
            $scope.dialogPlaceholderMultiple = $scope.model.fields[index].placeholder;

            $( "#dialogMultiple" ).dialog("open");
        }

        // Date
        var dialogDefinitionDate = $( "#dialogDate" ).dialog({
            autoOpen: false,
            height: 270,
            width: 240,
            modal: true,
            resizable: false,
            buttons: {
                Cancel: function () {
                    dialogDefinitionDate.dialog( "close" );
                },
                "OK": function () {
                    var formId = $scope.formId;
                    var fieldId = $scope.model.fields[$scope.selectedIndex]._id;
                    var modifiedField = $scope.model.fields[$scope.selectedIndex];
                    modifiedField.label = $scope.dialogLabelDate;

                    updateField(formId, fieldId, modifiedField);
                    dialogDefinitionDate.dialog( "close" );
                }
            }
        });

        function openModDialogDate(index) {
            $scope.selectedIndex = index;
            $scope.dialogLabelDate = $scope.model.fields[index].label;
            $scope.dialogPlaceholderDate = $scope.model.fields[index].placeholder;

            $( "#dialogDate" ).dialog("open");
        }

        // Dropdown
        var dialogDefinitionDropdown = $( "#dialogDropdown" ).dialog({
            autoOpen: false,
            height: 510,
            width: 300,
            modal: true,
            resizable: false,
            buttons: {
                Cancel: function () {
                    dialogDefinitionDropdown.dialog( "close" );
                },
                "OK": function () {
                    var formId = $scope.formId;
                    var fieldId = $scope.model.fields[$scope.selectedIndex]._id;
                    var modifiedField = $scope.model.fields[$scope.selectedIndex];
                    modifiedField.label = $scope.dialogLabelDropdown;
                    modifiedField.options = displayToArray($scope.dialogOptionsDropdown);

                    updateField(formId, fieldId, modifiedField);
                    dialogDefinitionDropdown.dialog( "close" );
                }
            }
        });

        function openModDialogDropdown(index) {
            $scope.selectedIndex = index;
            $scope.dialogLabelDropdown = $scope.model.fields[index].label;
            $scope.dialogOptionsDropdown = arrayToDisplay($scope.model.fields[index].options);

            $( "#dialogDropdown" ).dialog("open");
        }

        // Checkbox
        var dialogDefinitionCheckbox = $( "#dialogCheckbox" ).dialog({
            autoOpen: false,
            height: 510,
            width: 300,
            modal: true,
            resizable: false,
            buttons: {
                Cancel: function () {
                    dialogDefinitionCheckbox.dialog( "close" );
                },
                "OK": function () {
                    var formId = $scope.formId;
                    var fieldId = $scope.model.fields[$scope.selectedIndex]._id;
                    var modifiedField = $scope.model.fields[$scope.selectedIndex];
                    modifiedField.label = $scope.dialogLabelCheckbox;
                    modifiedField.options = displayToArray($scope.dialogOptionsCheckbox);

                    updateField(formId, fieldId, modifiedField);
                    dialogDefinitionCheckbox.dialog( "close" );
                }
            }
        });

        function openModDialogCheckbox(index) {
            $scope.selectedIndex = index;
            $scope.dialogLabelCheckbox = $scope.model.fields[index].label;
            $scope.dialogOptionsCheckbox = arrayToDisplay($scope.model.fields[index].options);

            $( "#dialogCheckbox" ).dialog("open");
        }

        // Radio
        var dialogDefinitionRadio = $( "#dialogRadio" ).dialog({
            autoOpen: false,
            height: 510,
            width: 300,
            modal: true,
            resizable: false,
            buttons: {
                Cancel: function () {
                    dialogDefinitionRadio.dialog( "close" );
                },
                "OK": function () {
                    var formId = $scope.formId;
                    var fieldId = $scope.model.fields[$scope.selectedIndex]._id;
                    var modifiedField = $scope.model.fields[$scope.selectedIndex];
                    modifiedField.label = $scope.dialogLabelRadio;
                    modifiedField.options = displayToArray($scope.dialogOptionsRadio);

                    updateField(formId, fieldId, modifiedField);
                    dialogDefinitionRadio.dialog( "close" );
                }
            }
        });

        function openModDialogRadio(index) {
            $scope.selectedIndex = index;
            $scope.dialogLabelRadio = $scope.model.fields[index].label;
            $scope.dialogOptionsRadio = arrayToDisplay($scope.model.fields[index].options);

            $( "#dialogRadio" ).dialog("open");
        }

        // Conversion of options for dialog box display
        function arrayToDisplay(optionsArray) {
            var line = "";
            for (var i = 0; i < optionsArray.length; i++) {
                var label = optionsArray[i].label;
                var value = optionsArray[i].value;
                line = line + label + ":" + value;
                if (i < optionsArray.length - 1) {
                    line = line + "\n";
                }
            }
            return line;
        }

        // Conversion of dialog box input as array of JSON
        function displayToArray(displayString) {
            var optionsArray = [];
            var objectStringArray = displayString.split("\n");
            for (var i = 0; i < objectStringArray.length; i++) {
                var labelValuePair = objectStringArray[i].split(":");
                var optionObject = {label:labelValuePair[0], value:labelValuePair[1]};
                optionsArray.push(optionObject);
            }
            return optionsArray;
        }
    }
})();

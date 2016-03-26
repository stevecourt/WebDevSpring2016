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

                    console.log("label out = " + $scope.dialogLabelSingle); // wrong
                    console.log("placeholder out = " + $scope.dialogPlaceholderSingle); // wrong

                    var formId = $scope.formId;
                    var fieldId = $scope.model.fields[$scope.selectedIndex]._id; //wrong

                    var modifiedField = $scope.model.fields[$scope.selectedIndex];
                    modifiedField.label = $scope.dialogLabelSingle;
                    modifiedField.placeholder = $scope.dialogPlaceholderSingle;

                    console.log("selected index = " + $scope.selectedIndex);  // Error in results after refresh
                    console.log("form id = " + formId);
                    console.log("field id = " + fieldId);
                    console.log("field out = " + modifiedField._id);
                    console.log("field out = " + modifiedField.label);
                    console.log("field out = " + modifiedField.type);
                    console.log("field out = " + modifiedField.placeholder);

                    updateField(formId, fieldId, modifiedField);
                    dialogDefinitionSingle.dialog( "close" );
                }
            }
        });

        function openModDialogSingle(index) {
            console.log("open text mod dialog in controller " + index);

            $scope.selectedIndex = index;

            console.log("open text mod dialog in controller " + $scope.selectedIndex);

            $scope.dialogLabelSingle = $scope.model.fields[index].label;
            $scope.dialogPlaceholderSingle = $scope.model.fields[index].placeholder;

            console.log("dialogLabel " + $scope.dialogLabelSingle);
            console.log("dialogPlaceholder " + $scope.dialogPlaceholderSingle);

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

                    console.log("label out = " + $scope.dialogLabelMultiple); // wrong
                    console.log("placeholder out = " + $scope.dialogPlaceholderMultiple); // wrong

                    var formId = $scope.formId;
                    var fieldId = $scope.model.fields[$scope.selectedIndex]._id; //wrong

                    var modifiedField = $scope.model.fields[$scope.selectedIndex];
                    modifiedField.label = $scope.dialogLabelMultiple;
                    modifiedField.placeholder = $scope.dialogPlaceholderMultiple;

                    console.log("selected index = " + $scope.selectedIndex);  // Error in results after refresh
                    console.log("form id = " + formId);
                    console.log("field id = " + fieldId);
                    console.log("field out = " + modifiedField._id);
                    console.log("field out = " + modifiedField.label);
                    console.log("field out = " + modifiedField.type);
                    console.log("field out = " + modifiedField.placeholder);

                    updateField(formId, fieldId, modifiedField);
                    dialogDefinitionMultiple.dialog( "close" );
                }
            }
        });

        function openModDialogMultiple(index) {
            console.log("open text mod dialog in controller " + index);

            $scope.selectedIndex = index;

            console.log("open text mod dialog in controller " + $scope.selectedIndex);

            $scope.dialogLabelMultiple = $scope.model.fields[index].label;
            $scope.dialogPlaceholderMultiple = $scope.model.fields[index].placeholder;

            console.log("dialogLabel " + $scope.dialogLabelMultiple);
            console.log("dialogPlaceholder " + $scope.dialogPlaceholderMultiple);

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

                    console.log("label out = " + $scope.dialogLabelDate); // wrong

                    var formId = $scope.formId;
                    var fieldId = $scope.model.fields[$scope.selectedIndex]._id; //wrong

                    var modifiedField = $scope.model.fields[$scope.selectedIndex];
                    modifiedField.label = $scope.dialogLabelDate;

                    console.log("selected index = " + $scope.selectedIndex);  // Error in results after refresh
                    console.log("form id = " + formId);
                    console.log("field id = " + fieldId);
                    console.log("field out = " + modifiedField._id);
                    console.log("field out = " + modifiedField.label);
                    console.log("field out = " + modifiedField.type);
                    console.log("field out = " + modifiedField.placeholder);

                    updateField(formId, fieldId, modifiedField);
                    dialogDefinitionDate.dialog( "close" );
                }
            }
        });

        function openModDialogDate(index) {
            console.log("open text mod dialog in controller " + index);

            $scope.selectedIndex = index;

            console.log("open text mod dialog in controller " + $scope.selectedIndex);

            $scope.dialogLabelDate = $scope.model.fields[index].label;
            $scope.dialogPlaceholderDate = $scope.model.fields[index].placeholder;

            console.log("dialogLabel " + $scope.dialogLabelDate);
            console.log("dialogPlaceholder " + $scope.dialogPlaceholderDate);

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

                    console.log("label out = " + $scope.dialogLabelDropdown); // wrong
                    console.log("options out = " + $scope.dialogOptionsDropdown); // wrong

                    var formId = $scope.formId;
                    var fieldId = $scope.model.fields[$scope.selectedIndex]._id; //wrong

                    var modifiedField = $scope.model.fields[$scope.selectedIndex];
                    modifiedField.label = $scope.dialogLabelDropdown;

                    modifiedField.options = displayToArray($scope.dialogOptionsDropdown);

                    console.log("selected index = " + $scope.selectedIndex);  // Error in results after refresh
                    console.log("form id = " + formId);
                    console.log("field id = " + fieldId);
                    console.log("field out = " + modifiedField._id);
                    console.log("field out = " + modifiedField.label);
                    console.log("field out = " + modifiedField.type);
                    console.log("field out = " + modifiedField.placeholder);

                    updateField(formId, fieldId, modifiedField);
                    dialogDefinitionDropdown.dialog( "close" );
                }
            }
        });

        function openModDialogDropdown(index) {
            console.log("open text mod dialog in controller " + index);

            $scope.selectedIndex = index;

            console.log("open text mod dialog in controller " + $scope.selectedIndex);

            $scope.dialogLabelDropdown = $scope.model.fields[index].label;

            $scope.dialogOptionsDropdown = arrayToDisplay($scope.model.fields[index].options);

            console.log("dialogLabel " + $scope.dialogLabelDropdown);
            console.log("dialogOptions " + $scope.dialogOptionsDropdown);

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

                    console.log("label out = " + $scope.dialogLabelCheckbox); // wrong
                    console.log("options out = " + $scope.dialogOptionsCheckbox); // wrong

                    var formId = $scope.formId;
                    var fieldId = $scope.model.fields[$scope.selectedIndex]._id; //wrong

                    var modifiedField = $scope.model.fields[$scope.selectedIndex];
                    modifiedField.label = $scope.dialogLabelCheckbox;

                    modifiedField.options = displayToArray($scope.dialogOptionsCheckbox);

                    console.log("selected index = " + $scope.selectedIndex);  // Error in results after refresh
                    console.log("form id = " + formId);
                    console.log("field id = " + fieldId);
                    console.log("field out = " + modifiedField._id);
                    console.log("field out = " + modifiedField.label);
                    console.log("field out = " + modifiedField.type);
                    console.log("field out = " + modifiedField.placeholder);

                    updateField(formId, fieldId, modifiedField);
                    dialogDefinitionCheckbox.dialog( "close" );
                }
            }
        });

        function openModDialogCheckbox(index) {
            console.log("open text mod dialog in controller " + index);

            $scope.selectedIndex = index;

            console.log("open text mod dialog in controller " + $scope.selectedIndex);

            $scope.dialogLabelCheckbox = $scope.model.fields[index].label;

            $scope.dialogOptionsCheckbox = arrayToDisplay($scope.model.fields[index].options);

            console.log("dialogLabel " + $scope.dialogLabelCheckbox);
            console.log("dialogOptions " + $scope.dialogOptionsCheckbox);

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

                    console.log("label out = " + $scope.dialogLabelRadio); // wrong
                    console.log("options out = " + $scope.dialogOptionsRadio); // wrong

                    var formId = $scope.formId;
                    var fieldId = $scope.model.fields[$scope.selectedIndex]._id; //wrong

                    var modifiedField = $scope.model.fields[$scope.selectedIndex];
                    modifiedField.label = $scope.dialogLabelRadio;

                    modifiedField.options = displayToArray($scope.dialogOptionsRadio);

                    console.log("selected index = " + $scope.selectedIndex);  // Error in results after refresh
                    console.log("form id = " + formId);
                    console.log("field id = " + fieldId);
                    console.log("field out = " + modifiedField._id);
                    console.log("field out = " + modifiedField.label);
                    console.log("field out = " + modifiedField.type);
                    console.log("field out = " + modifiedField.placeholder);

                    updateField(formId, fieldId, modifiedField);
                    dialogDefinitionRadio.dialog( "close" );
                }
            }
        });

        function openModDialogRadio(index) {
            console.log("open text mod dialog in controller " + index);

            $scope.selectedIndex = index;

            console.log("open text mod dialog in controller " + $scope.selectedIndex);

            $scope.dialogLabelRadio = $scope.model.fields[index].label;

            $scope.dialogOptionsRadio = arrayToDisplay($scope.model.fields[index].options);

            console.log("dialogLabel " + $scope.dialogLabelRadio);
            console.log("dialogOptions " + $scope.dialogOptionsRadio);

            $( "#dialogRadio" ).dialog("open");
        }

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

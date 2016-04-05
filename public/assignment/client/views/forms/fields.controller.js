"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", fieldController);

    function fieldController($scope, $routeParams, FieldService) {

        // Main controller functions
        $scope.addField = addField;
        $scope.cloneField = cloneField;
        $scope.updateField = updateField;
        $scope.deleteField = deleteField;
        $scope.moveField = moveField;

        // Dialog boxes
        $scope.openModDialogSingle = openModDialogSingle;
        $scope.openModDialogMultiple = openModDialogMultiple;
        $scope.openModDialogEmail = openModDialogEmail;
        $scope.openModDialogPassword = openModDialogPassword;
        $scope.openModDialogDate = openModDialogDate;
        $scope.openModDialogDropdown = openModDialogDropdown;
        $scope.openModDialogCheckbox = openModDialogCheckbox;
        $scope.openModDialogRadio = openModDialogRadio;

        // Form ID from the URL pattern
        $scope.formId = $routeParams.formId;

        // Get the current forms's fields for rendering.
        getFormFields($scope.formId);
        function getFormFields(formId) {
            FieldService.getFieldsForForm(formId)
                .then (function (returnedFields) {
                    $scope.model = {};
                    $scope.model.fields = returnedFields.data;
                }, function (returnedFields) {
                    console.log("Error: Could not retrieve form's fields.");
                });
        }

        // Get for current form's title for rendering
        getCurrentForm($scope.formId);
        function getCurrentForm(formId) {
            FieldService.findFormById(formId)
                .then (function (returnedForm) {
                    $scope.form = returnedForm.data;
                }, function (returnedForm) {
                    console.log("Error: Could not retrieve current form.");
                });
        }

        function addField(fieldType) {
            var newField = {};
            switch(fieldType) { // Create appropriate field
                case "Single Line Text Field":
                    newField = {"label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
                    break;
                case "Multi Line Text Field":
                    newField = {"label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
                    break;
                case "Email Field":
                    newField = {"label": "New Email", "type": "EMAIL", "placeholder": "New Email"};
                    break;
                case "Password Field":
                    newField = {"label": "New Password", "type": "PASSWORD", "placeholder": "New Password"};
                    break;
                case "Date Field":
                    newField = {"label": "New Date Field", "type": "DATE"};
                    break;
                case "Dropdown Field":
                    newField = {"label": "New Dropdown", "type": "OPTIONS", "options":
                        [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]};
                    break;
                case "Checkboxes Field":
                    newField = {"label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]};
                    break;
                case "Radio Buttons Field":
                    newField = {"label": "New Radio Buttons", "type": "RADIOS", "options": [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ]};
                    break;
            }
            if (fieldType != undefined) {
                FieldService.createFieldForForm($scope.formId, newField)
                    .then (function (returnedFields) {
                        $scope.model.fields = returnedFields.data;
                    }, function (returnedFields) {
                        console.log("Error: The field was not added to the form.");
                    });
            }
        }

        function cloneField(field) {

            var optionArray = [];
            if (field.options) {
                optionArray = field.options;
            }

            var newField = {
                "label": field.label,
                "placeholder": field.placeholder,
                "options": optionArray,
                "type": field.type
            };

            FieldService.createFieldForForm($scope.formId, newField)
                .then (function (returnedFields) {
                    $scope.model.fields = returnedFields.data;
                }, function (returnedFields) {
                    console.log("Error: The field was not cloned in the form.");
                });
        }

        function updateField(formId, fieldId, field) {
            FieldService.updateField(formId, fieldId, field)
                .then(function (returnedFields) {
                    $scope.model.fields = returnedFields.data;
                }, function (returnedForms) {
                    console.log("Error: The field was not updated in the system.");
                });
        }

        function deleteField(field) {
            var fieldId = field._id;
            FieldService.deleteFieldFromForm($scope.formId, fieldId)
                .then(function (returnedFields) {
                    $scope.model.fields = returnedFields.data;
                }, function () {
                    console.log("Error: The field was not deleted from the form.");
                });
        }

        function moveField(start, end) {
            FieldService
                .moveField($scope.formId, start, end)
                .then(
                    function (response) {
                        // No need to update the $scope as jQueryUI does that.
                    },
                    function (err) {
                        console.log("Error: The fields were not reordered on the form.");
                    }
                );
        }

        // Dialog Boxes ///////////////////////////////////////////////////////////////////////////////////////

        // Single
        function openModDialogSingle(index) {
            $scope.selectedIndex = index;
            $scope.dialogLabelSingle = $scope.model.fields[index].label;
            $scope.dialogPlaceholderSingle = $scope.model.fields[index].placeholder;

            defineDialogSingle();
            $( "#dialogSingle" ).dialog("open");
        }

        function defineDialogSingle() {
            var dialogDefinitionSingle = $("#dialogSingle").dialog({
                autoOpen: false,
                height: 270,
                width: 240,
                modal: true,
                resizable: false,
                buttons: {
                    Cancel: function () {
                        dialogDefinitionSingle.dialog("destroy");
                    },
                    "OK": function () {
                        var formId = $scope.formId;
                        var fieldId = $scope.model.fields[$scope.selectedIndex]._id;
                        var modifiedField = $scope.model.fields[$scope.selectedIndex];
                        modifiedField.label = $scope.dialogLabelSingle;
                        modifiedField.placeholder = $scope.dialogPlaceholderSingle;

                        updateField(formId, fieldId, modifiedField);
                        dialogDefinitionSingle.dialog("destroy");
                    }
                },
                close: function() {
                    dialogDefinitionSingle.dialog("destroy");
                }
            });
        }

        // Multiple
        function openModDialogMultiple(index) {
            $scope.selectedIndex = index;
            $scope.dialogLabelMultiple = $scope.model.fields[index].label;
            $scope.dialogPlaceholderMultiple = $scope.model.fields[index].placeholder;

            defineDialogMultiple();
            $( "#dialogMultiple" ).dialog("open");
        }

        function defineDialogMultiple() {
            var dialogDefinitionMultiple = $("#dialogMultiple").dialog({
                autoOpen: false,
                height: 270,
                width: 240,
                modal: true,
                resizable: false,
                buttons: {
                    Cancel: function () {
                        dialogDefinitionMultiple.dialog("destroy");
                    },
                    "OK": function () {
                        var formId = $scope.formId;
                        var fieldId = $scope.model.fields[$scope.selectedIndex]._id;
                        var modifiedField = $scope.model.fields[$scope.selectedIndex];
                        modifiedField.label = $scope.dialogLabelMultiple;
                        modifiedField.placeholder = $scope.dialogPlaceholderMultiple;

                        updateField(formId, fieldId, modifiedField);
                        dialogDefinitionMultiple.dialog("destroy");
                    }
                },
                close: function () {
                    dialogDefinitionMultiple.dialog("destroy");
                }
            });
        }

        // Email
        function openModDialogEmail(index) {
            $scope.selectedIndex = index;
            $scope.dialogLabelEmail = $scope.model.fields[index].label;
            $scope.dialogPlaceholderEmail = $scope.model.fields[index].placeholder;

            defineDialogEmail();
            $( "#dialogEmail" ).dialog("open");
        }

        function defineDialogEmail() {
            var dialogDefinitionEmail = $("#dialogEmail").dialog({
                autoOpen: false,
                height: 270,
                width: 240,
                modal: true,
                resizable: false,
                buttons: {
                    Cancel: function () {
                        dialogDefinitionEmail.dialog("destroy");
                    },
                    "OK": function () {
                        var formId = $scope.formId;
                        var fieldId = $scope.model.fields[$scope.selectedIndex]._id;
                        var modifiedField = $scope.model.fields[$scope.selectedIndex];
                        modifiedField.label = $scope.dialogLabelEmail;
                        modifiedField.placeholder = $scope.dialogPlaceholderEmail;

                        updateField(formId, fieldId, modifiedField);
                        dialogDefinitionEmail.dialog("destroy");
                    }
                },
                close: function() {
                    dialogDefinitionEmail.dialog("destroy");
                }
            });
        }

        // Password
        function openModDialogPassword(index) {
            $scope.selectedIndex = index;
            $scope.dialogLabelPassword = $scope.model.fields[index].label;
            $scope.dialogPlaceholderPassword = $scope.model.fields[index].placeholder;

            defineDialogPassword();
            $( "#dialogPassword" ).dialog("open");
        }

        function defineDialogPassword() {
            var dialogDefinitionPassword = $("#dialogPassword").dialog({
                autoOpen: false,
                height: 270,
                width: 240,
                modal: true,
                resizable: false,
                buttons: {
                    Cancel: function () {
                        dialogDefinitionPassword.dialog("destroy");
                    },
                    "OK": function () {
                        var formId = $scope.formId;
                        var fieldId = $scope.model.fields[$scope.selectedIndex]._id;
                        var modifiedField = $scope.model.fields[$scope.selectedIndex];
                        modifiedField.label = $scope.dialogLabelPassword;
                        modifiedField.placeholder = $scope.dialogPlaceholderPassword;

                        updateField(formId, fieldId, modifiedField);
                        dialogDefinitionPassword.dialog("destroy");
                    }
                },
                close: function() {
                    dialogDefinitionPassword.dialog("destroy");
                }
            });
        }

        // Date
        function openModDialogDate(index) {
            $scope.selectedIndex = index;
            $scope.dialogLabelDate = $scope.model.fields[index].label;

            defineDialogDate();
            $( "#dialogDate" ).dialog("open");
        }

        function defineDialogDate() {
            var dialogDefinitionDate = $("#dialogDate").dialog({
                autoOpen: false,
                height: 270,
                width: 240,
                modal: true,
                resizable: false,
                buttons: {
                    Cancel: function () {
                        dialogDefinitionDate.dialog("destroy");
                    },
                    "OK": function () {
                        var formId = $scope.formId;
                        var fieldId = $scope.model.fields[$scope.selectedIndex]._id;
                        var modifiedField = $scope.model.fields[$scope.selectedIndex];
                        modifiedField.label = $scope.dialogLabelDate;

                        updateField(formId, fieldId, modifiedField);
                        dialogDefinitionDate.dialog("destroy");
                    }
                },
                close: function () {
                    dialogDefinitionDate.dialog("destroy");
                }
            });
        }

        // Dropdown
        function openModDialogDropdown(index) {
            $scope.selectedIndex = index;
            $scope.dialogLabelDropdown = $scope.model.fields[index].label;
            $scope.dialogOptionsDropdown = arrayToDisplay($scope.model.fields[index].options);

            defineDialogDropdown();
            $( "#dialogDropdown" ).dialog("open");
        }

        function defineDialogDropdown() {
            var dialogDefinitionDropdown = $("#dialogDropdown").dialog({
                autoOpen: false,
                height: 510,
                width: 300,
                modal: true,
                resizable: false,
                buttons: {
                    Cancel: function () {
                        dialogDefinitionDropdown.dialog("destroy");
                    },
                    "OK": function () {
                        var formId = $scope.formId;
                        var fieldId = $scope.model.fields[$scope.selectedIndex]._id;
                        var modifiedField = $scope.model.fields[$scope.selectedIndex];
                        modifiedField.label = $scope.dialogLabelDropdown;
                        modifiedField.options = displayToArray($scope.dialogOptionsDropdown);

                        updateField(formId, fieldId, modifiedField);
                        dialogDefinitionDropdown.dialog("destroy");
                    }
                },
                close: function () {
                    dialogDefinitionDropdown.dialog("destroy");
                }
            });
        }

        // Checkbox
        function openModDialogCheckbox(index) {
            $scope.selectedIndex = index;
            $scope.dialogLabelCheckbox = $scope.model.fields[index].label;
            $scope.dialogOptionsCheckbox = arrayToDisplay($scope.model.fields[index].options);

            defineDialogCheckbox();
            $( "#dialogCheckbox" ).dialog("open");
        }

        function defineDialogCheckbox() {
            var dialogDefinitionCheckbox = $("#dialogCheckbox").dialog({
                autoOpen: false,
                height: 510,
                width: 300,
                modal: true,
                resizable: false,
                buttons: {
                    Cancel: function () {
                        dialogDefinitionCheckbox.dialog("destroy");
                    },
                    "OK": function () {
                        var formId = $scope.formId;
                        var fieldId = $scope.model.fields[$scope.selectedIndex]._id;
                        var modifiedField = $scope.model.fields[$scope.selectedIndex];
                        modifiedField.label = $scope.dialogLabelCheckbox;
                        modifiedField.options = displayToArray($scope.dialogOptionsCheckbox);

                        updateField(formId, fieldId, modifiedField);
                        dialogDefinitionCheckbox.dialog("destroy");
                    }
                },
                close: function () {
                    dialogDefinitionCheckbox.dialog("destroy");
                }
            });
        }

        // Radio
        function openModDialogRadio(index) {
            $scope.selectedIndex = index;
            $scope.dialogLabelRadio = $scope.model.fields[index].label;
            $scope.dialogOptionsRadio = arrayToDisplay($scope.model.fields[index].options);

            defineDialogRadio();
            $( "#dialogRadio" ).dialog("open");
        }

        function defineDialogRadio() {
            var dialogDefinitionRadio = $("#dialogRadio").dialog({
                autoOpen: false,
                height: 510,
                width: 300,
                modal: true,
                resizable: false,
                buttons: {
                    Cancel: function () {
                        dialogDefinitionRadio.dialog("destroy");
                    },
                    "OK": function () {
                        var formId = $scope.formId;
                        var fieldId = $scope.model.fields[$scope.selectedIndex]._id;
                        var modifiedField = $scope.model.fields[$scope.selectedIndex];
                        modifiedField.label = $scope.dialogLabelRadio;
                        modifiedField.options = displayToArray($scope.dialogOptionsRadio);

                        updateField(formId, fieldId, modifiedField);
                        dialogDefinitionRadio.dialog("destroy");
                    }
                },
                close: function () {
                    dialogDefinitionRadio.dialog("destroy");
                }
            });
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

"use strict";

var forms = require('./form.mock.json');

module.exports = function (app) {

    var api = {
        createForm: createForm,
        findAllForms: findAllForms,
        findFormsByUserId: findFormsByUserId,
        findFormById: findFormById,
        findFormByTitle: findFormByTitle,
        updateFormById: updateFormById,
        deleteFormById: deleteFormById,
        addFormField: addFormField,
        findAllFormFields: findAllFormFields,
        findFormFieldById: findFormFieldById,
        updateFormFieldById: updateFormFieldById,
        deleteFormFieldById: deleteFormFieldById
    };
    return api;

    function createForm(form) {
        forms.push(form);
        return forms;
    }

    function findAllForms() {
        return forms;
    }

    function findFormsByUserId(userId) {
        var userForms = [];

        console.log("forms model" + forms);

        for (var i = 0; i < forms.length; i++) {

            console.log("forms model" + forms[i]);

            if (forms[i].userId == userId) {
                userForms.push(forms[i]);
            }
        }

        console.log("model" + userForms);

        return userForms;
    }

    /* TODO Try the filter form. Consider changing other functions.
    function findFormsByUserId(userId) {
        var userForms = forms.filter(function (userId) {
            return forms.userId === userId;
        });
        return userForms.length === 0 userForms : null;
    }
    */

    function findFormById(formId) {
        var formFound = null;
        for (var i = 0; i < forms.length; i++) {
            if (forms[i]._id == formId) {
                formFound = forms[i];
                break;
            }
        }
        return formFound;
    }

    function findFormByTitle(title) {
        var formFound = null;
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].title == title) {
                formFound = forms[i];
                break;
            }
        }
        return formFound;
    }

    function updateFormById(formId, form) {
        for (var i = 0; i < forms.length; i++) {
            if (forms[i]._id == formId) {
                forms[i] = form;
                return forms;
            }
        }
        return null;
    }

    function deleteFormById(formId) {
        for (var i = 0; i < forms.length; i++) {
            if (forms[i]._id == formId) {
                forms.splice(i, 1);
                return forms;
            }
        }
        return null;
    }

    function addFormField(formId, field) {
        for (var i = 0; i < forms.length; i++) {
            if (forms[i]._id == formId) {
                forms[i].fields.push(field);
                return forms[i].fields;
            }
        }
        return null;
    }

    function findAllFormFields(formId) {

        console.log("Model - findAllFormFields - given form ID = " + formId);

        for (var i = 0; i < forms.length; i++) {

            console.log("Model - findAllFormFields - next form ID = " + forms[i]._id);

            if (forms[i]._id == formId) {

                console.log("Match found");
                console.log(forms[i]._id);
                console.log(forms[i].title);
                console.log(forms[i].userId);
                console.log(forms[i].fields);

                return forms[i].fields;
            }
        }
        return null;
    }

    function findFormFieldById(formId, fieldId) {
        for (var i = 0; i < forms.length; i++) {
            if (forms[i]._id == formId) {
                var fields = forms[j].fields;
                for (var j = 0; j < fields.length; j++) {
                    if (fields[j]._id == fieldId) {
                        return fields[j];
                    }
                }
                return null;
            }
        }
        return null;
    }

    function updateFormFieldById(formId, fieldId, field) {
        for (var i = 0; forms.length; i++) {
            if (forms[i]._id == formId) {
                var fields = forms[j].fields;
                for (var j = 0; j < fields.length; j++) {
                    if (fields[j]._id == fieldId) {
                        forms[i].field[j] = field;
                        return forms[i].fields;
                    }
                }
                return null;
            }
        }
        return null;
    }

    function deleteFormFieldById(formId, fieldId) {

        console.log("in model - form id = " + formId);
        console.log("in model - field id = " + fieldId);

        for (var i = 0; i < forms.length; i++) {

            console.log("in model - given form id = " + formId);
            console.log("in model - checking against form id = " + forms[i]._id);

            if (forms[i]._id == formId) {
                var fields = forms[i].fields;
                for (var j = 0; j < fields.length; j++) {

                    console.log("in model - given field id = " + fieldId);
                    console.log("in model - checking against field id = " + fields[j]._id);

                    if (fields[j]._id == fieldId) {
                        forms[i].fields.splice(j, 1);

                        console.log("in model - forms returned = " + forms[i].fields);

                        return forms[i].fields;
                    }
                }

                console.log("bypassed for inner loop");

                return null;
            }
        }

        console.log("bypassed for outer loop");

        return null;
    }
}
"use strict";

var forms = require('./form.mock.json');

module.exports = function (app) {

    var api = {
        createForm: createForm,
        findAllForms: findAllForms,
        findFormsByUserId: findFormsByUserId,
        findFormById: findFormById,
        findFormByTitle: findFormByTitle,
        updateForm: updateForm,
        deleteForm: deleteForm,
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
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].userId === userId) {
                userForms.push(forms[i]);
            }
        }
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
        for (var i = 0; forms.length; i++) {
            if (forms[i]._id === formId) {
                formFound = forms[i];
                break;
            }
        }
        return formFound;
    }

    function findFormByTitle(title) {
        var formFound = null;
        for (var i = 0; forms.length; i++) {
            if (forms[i].title === title) {
                formFound = forms[i];
                break;
            }
        }
        return formFound;
    }

    function updateForm(formId, form) {
        for (var i = 0; forms.length; i++) {
            if (forms[i]._id === formId) {
                forms[i] = form;
                break;
            }
        }
        return forms;
    }

    function deleteForm(formId) {
        for (var i = 0; forms.length; i++) {
            if (forms[i]._id === formId) {
                forms.splice(i, 1);
                break;
            }
        }
        return forms;
    }

    function addFormField(formId, field) {
        for (var i = 0; forms.length; i++) {
            if (forms[i]._id === formId) {
                forms[i].fields.push(field);
                return forms[i].fields;
            }
        }
    }

    function findAllFormFields(formId) {
        var fields = [];
        for (var i = 0; forms.length; i++) {
            if (forms[i]._id === formId) {
                return forms[i].fields;
            }
        }
        return fields;
    }

    function findFormFieldById(formId, fieldId) {
        var field = null;
        for (var i = 0; forms.length; i++) {
            if (forms[i]._id === formId) {
                var fields = forms[j].fields;
                for (var j = 0; fields.length; j++) {
                    if (fields[j]._id === fieldId) {
                        return fields[j];
                    }
                }
                break;
            }
        }
        return field;
    }

    function updateFormFieldById(formId, fieldId, field) {
        var form = null;
        for (var i = 0; forms.length; i++) {
            if (forms[i]._id === formId) {
                var fields = forms[j].fields;
                for (var j = 0; fields.length; j++) {
                    if (fields[j]._id === fieldId) {
                        forms[i].field[j] = field;
                        return forms[i];
                    }
                }
                return forms[i];
            }
        }
        return form;
    }

    function deleteFormFieldById(formId, fieldId) {
        var form = null;
        for (var i = 0; forms.length; i++) {
            if (forms[i]._id === formId) {
                var fields = forms[j].fields;
                for (var j = 0; fields.length; j++) {
                    if (fields[j]._id === fieldId) {
                        forms[i].fields.splice(j, 1);
                        return forms[i];
                    }
                }
                return forms[i];
            }
        }
        return form;
    }
}
"use strict";

var q = require("q");

module.exports = function (mongoose, db) { //TODO Check is db and app are needed here

    //var formModel = require('./form.model.server.js') (mongoose); //TODO Add (mongoose) ???
    var fieldSchema = require('./field.schema.server.js') (mongoose); //TODO find out whether forms, fields or bot are needed
    var fieldModel = mongoose.model("field", fieldSchema);

    var api = {
        addFormField: addFormField,
        findAllFormFields: findAllFormFields,
        findFormFieldById: findFormFieldById,
        updateFormFieldById: updateFormFieldById,
        deleteFormFieldById: deleteFormFieldById,
        reorderFormFields: reorderFormFields
    };
    return api;

    function addFormField(formId, field) {
        var deferred = q.defer();
        formModel.findById({_Id: formId}, function (err, formFound) {
            if (err) {
                deferred.reject(err);
            } else {
                formFound.fields.push(field);
                formFound.save(function (err, formSaved) {
                    deferred.resolve(formSaved.fields);
                });
            }
        });
        return deferred.promise;
    }

    function findAllFormFields(formId) {
        var deferred = q.defer();
        formModel.findById({_Id: formId}, function (err, formFound) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(formFound.fields);
            }
        });
        return deferred.promise;
    }

    function findFormFieldById(formId, fieldId) {
        var deferred = q.defer();
        formModel.findById({_Id: formId}, function (err, formFound) {
            if (err) {
                deferred.reject(err);
            } else {
                //formFound.findById({_Id: fieldId}, function (err, fieldFound) {
                //    deferred.resolve(fieldFound);
                //});
                var fields = formFound.fields;
                for (var i = 0; i < fields.length; i++) {
                    if (fields[i]._id == fieldId) {
                        deferred.resolve(fields[i]);
                    }
                }
                deferred.reject(err);
            }
        });
        return deferred.promise;
    }

    function updateFormFieldById(formId, fieldId, field) {
        var deferred = q.defer();
        formModel.findById({_Id: formId}, function (err, formFound) {
            if (err) {
                deferred.reject(err);
            } else {
                var fields = formFound.fields;
                for (var i = 0; i < fields.length; i++) {
                    if (fields[i]._id == fieldId) {
                        formFound.fields[i] = field;
                        formFound.save(function (err, form) {
                            deferred.resolve(form.fields);
                        });
                    }
                }
                deferred.reject(err);
            }
        });
        return deferred.promise;
    }

    function deleteFormFieldById(formId, fieldId) {
        var deferred = q.defer();
        formModel.findById({_Id: formId}, function (err, formFound) {
            if (err) {
                deferred.reject(err);
            } else {
                var fields = formFound.fields;
                for (var i = 0; i < fields.length; i++) {
                    if (fields[i]._id == fieldId) {
                        formFound.fields.splice(i, 1);
                        formFound.save(function (err, form) {
                            deferred.resolve(form.fields);
                        });
                    }
                }
                deferred.reject(err);
            }
        });
        return deferred.promise;
    }

    function reorderFormFields(formId, fieldsArray) {
        var deferred = q.defer();
        formModel.findById({_Id: formId}, function (err, formFound) {
            if (err) {
                deferred.reject(err);
            } else {
                formFound.fields = fieldsArray;
                formFound.save(function (err, form) {
                    deferred.resolve(form.fields);
                });
                deferred.reject(err);
            }
        });
        return deferred.promise;
    }
};

/*
 function addFormField(formId, field) {
 for (var i = 0; i < forms.length; i++) {
 if (forms[i]._id == formId) {
 forms[i].fields.push(field);
 return forms[i].fields;
 }
 }
 return null;
 }
 */
/*
function findAllFormFields(formId) {
    for (var i = 0; i < forms.length; i++) {
        if (forms[i]._id == formId) {
            return forms[i].fields;
        }
    }
 return null;
 }
 */

/*
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
 */
/*
 function updateFormFieldById(formId, fieldId, field) {
 for (var i = 0; i < forms.length; i++) {
 if (forms[i]._id == formId) {
 var fields = forms[i].fields;
 for (var j = 0; j < fields.length; j++) {
 if (fields[j]._id == fieldId) {
 forms[i].fields[j] = field;
 return forms[i].fields;
 }
 }
 return null;
 }
 }
 return null;
 }
 */
/*
function deleteFormFieldById(formId, fieldId) {
    for (var i = 0; i < forms.length; i++) {
        if (forms[i]._id == formId) {
            var fields = forms[i].fields;
            for (var j = 0; j < fields.length; j++) {
                if (fields[j]._id == fieldId) {
                    forms[i].fields.splice(j, 1);
                    return forms[i].fields;
                }
            }
            return null;
        }
    }
    return null;
}
*/
/*
function reorderFormFields(formId, fieldsArray) {
    for (var i = 0; i < forms.length; i++) {
        if (forms[i]._id == formId) {
            forms[i].fields = fieldsArray;
            return forms[i].fields;
        }
    }
    return null;
}
*/
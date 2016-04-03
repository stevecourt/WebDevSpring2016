"use strict";

var q = require("q");

module.exports = function (mongoose, formModel) { //TODO Check is db and app are needed here

    //var formModel = require('./form.model.server.js') (mongoose); //TODO Add (mongoose) ???
    var fieldSchema = require('./field.schema.server.js') (mongoose); //TODO find out whether forms, fields or bot are needed
    var fieldModel = mongoose.model("field", fieldSchema);
    var db_form_model = formModel.getDbModel();


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
        console.log("");
        console.log("field received by field model");
        console.log(field);
        console.log("");
        console.log("formId received by field model");
        console.log(formId);
        fieldModel.create(field, function (err, createdField) {
            if (err) {
                deferred.reject(err);
            } else {
                console.log("");
                console.log("created field from db");
                console.log(createdField);
                db_form_model.findById(formId, function (err, formFound) {
                    if (err) {
                        console.log("");
                        console.log("form not found");
                        deferred.reject(err);
                    } else {
                        console.log("");
                        console.log("field.model.server - addFormField BEFORE adding");
                        console.log(formFound);
                        formFound.fields.push(createdField);
                        console.log("");
                        console.log("field.model.server - addFormField AFTER adding");
                        console.log(formFound);
                        formFound.save(function (err, formSaved) {
                            deferred.resolve(formSaved.fields);
                        });
                    }
                });
            }
        });
        return deferred.promise;
    }

    function findAllFormFields(formId) {
        var deferred = q.defer();
        db_form_model.findById(formId, function (err, formFound) {
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
        db_form_model.findById(formId, function (err, formFound) {
            if (err) {
                deferred.reject(err);
            } else {
                var fields = formFound.fields;
                for (var i = 0; i < fields.length; i++) {
                    if (fields[i]._id == fieldId) {
                        deferred.resolve(fields[i]);
                    }
                }
            }
        });
        return deferred.promise;
    }

    function updateFormFieldById(formId, fieldId, fieldGiven) {
        var deferred = q.defer();

        console.log("in update");
        console.log("form id");
        console.log(formId);
        console.log("field id");
        console.log(fieldId);
        console.log("field given");
        console.log(fieldGiven);

        db_form_model.findById(formId, function (err, formFound) {
            if (err) {

                console.log("form not found");

                deferred.reject(err);
            } else {

                console.log("form found");
                console.log(formFound);

                var fields = formFound.fields;
                for (var i = 0; i < fields.length; i++) {
                    if (fields[i]._id == fieldId) {

                        console.log("field match found");
                        console.log("field given");
                        console.log(fieldGiven);
                        console.log("field in form");
                        console.log(formFound.fields[i]);

                        // Update the field in the field collection
                        fieldModel.update({_id: fieldId}, {$set: fieldGiven}, function (err, fieldReturned) {
                            if (err) {
                                deferred.reject(err);
                            }
                        });

                        // Update the field in the form
                        formFound.fields[i].label = fieldGiven.label;
                        formFound.fields[i].placeholder = fieldGiven.placeholder;
                        formFound.fields[i].options = fieldGiven.options;

                        formFound.save(function (err, formSaved) {
                            deferred.resolve(formSaved.fields);
                        });
                    }
                }
            }
        });
        return deferred.promise;
    }

    function deleteFormFieldById(formId, fieldId) {
        var deferred = q.defer();
        db_form_model.findById(formId, function (err, formFound) {
            if (err) {
                deferred.reject(err);
            } else {
                var fields = formFound.fields;
                for (var i = 0; i < fields.length; i++) {
                    if (fields[i]._id == fieldId) {

                        // Remove field from field collection
                        fieldModel.remove({_id: fieldId}, function (err, allFields) {
                            if (err) {
                                deferred.reject(err);
                            } else {
                                console.log("Fields id");
                                console.log(fieldId);
                                console.log("Fields after removal");
                                console.log(allFields);
                            }
                        });
                        console.log("fields BEFORE");
                        console.log(formFound.fields);
                        console.log("i =");
                        console.log(i);

                        // Remove field from form
                        formFound.fields.splice(i, 1);

                        console.log("fields AFTER");
                        console.log(formFound.fields);


                        formFound.save(function (err, formSaved) {
                            if (err) {
                                deferred.reject(err);
                            } else {
                                console.log("fields returned");
                                console.log(formSaved.fields);

                                deferred.resolve(formSaved.fields);
                            }
                        });
                    }
                }
            }
        });
        return deferred.promise;
    }

    function reorderFormFields(formId, fieldsArray) {
        var deferred = q.defer();
        db_form_model.findById(formId, function (err, formFound) {
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
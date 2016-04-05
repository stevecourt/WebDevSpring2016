"use strict";

var q = require("q");

module.exports = function (mongoose, formModel) {

    var fieldSchema = require('./field.schema.server.js') (mongoose);
    var fieldModel = mongoose.model("field", fieldSchema);
    var db_form_model = formModel.getDbFormModel();


    var api = {
        addFormField: addFormField,
        findAllFormFields: findAllFormFields,
        findFormFieldById: findFormFieldById,
        updateFormFieldById: updateFormFieldById,
        deleteFormFieldById: deleteFormFieldById,
        reorderFields : reorderFields
    };
    return api;

    function addFormField(formId, field) {
        var deferred = q.defer();
        fieldModel.create(field, function (err, createdField) {
            if (err) {
                deferred.reject(err);
            } else {
                db_form_model.findById(formId, function (err, formFound) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        formFound.fields.push(createdField);
                        formFound.updated = new Date();
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
        db_form_model.findById(formId, function (err, formFound) {
            if (err) {
                deferred.reject(err);
            } else {
                var fields = formFound.fields;
                for (var i = 0; i < fields.length; i++) {
                    if (fields[i]._id == fieldId) {

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
                        formFound.updated = new Date();

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
                            }
                        });
                        // Remove field from form
                        formFound.fields.splice(i, 1);

                        formFound.updated = new Date();
                        formFound.save(function (err, formSaved) {
                            if (err) {
                                deferred.reject(err);
                            } else {
                                deferred.resolve(formSaved.fields);
                            }
                        });
                    }
                }
            }
        });
        return deferred.promise;
    }

    function reorderFields(formId, startIndex, endIndex) {
        var deferred = q.defer();
        db_form_model.findById(formId, function (err, formFound) {
            if (err) {
                deferred.reject(err);
            } else {
                var movingField = formFound.fields.splice(startIndex, 1);
                formFound.fields.splice(endIndex, 0, movingField[0]);
                formFound.updated = new Date();
                formFound.save(function (err, form) {
                    deferred.resolve(form.fields);
                });
                deferred.reject(err);
            }
        });
        return deferred.promise;
    }
};
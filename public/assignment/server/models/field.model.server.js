"use strict";

var q = require("q");

module.exports = function (mongoose, db) { //TODO Check is db and app are needed here

    var fieldSchema = require('./field.schema.server.js')(mongoose); //TODO find out whether forms, fields or bot are needed
    var fieldModel = mongoose.model("field", fieldSchema);

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
        deleteFormFieldById: deleteFormFieldById,
        reorderFormFields: reorderFormFields
    };
    return api;

    function createForm(newForm) {
        var deferred = q.defer();
        formModel.create(newForm, function(err, forms){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(forms);
            }
        });
        return deferred.promise;
    }

    function findAllForms() {
        var deferred = q.defer();
        formModel.find(function(err, forms){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(forms);
            }
        });
        return deferred.promise;
    }

    function findFormsByUserId(userIdGiven) {
        var deferred = q.defer();
        formModel.find({userId: userIdGiven}, function(err, formsFound){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(formsFound);}
        });
        return deferred.promise;
    }

    function findFormById(formId) {
        var deferred = q.defer();
        formModel.findById({_Id: formId}, function(err, formFound){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(formFound);}
        });
        return deferred.promise;
    }

    function findFormByTitle(titleGiven) {
        var deferred = q.defer();
        formModel.findOne({title: titleGiven}, function(err, formFound){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(formFound);}
        });
        return deferred.promise;
    }

    function updateFormById(formId, formGiven) {
        var deferred = q.defer();
        formModel.update({_id: formId}, {$set: formGiven}, function(err, user) { //TODO Check return. Change to findOneAndUpdate?
            if(err){deferred.reject(err);}
            else{
                formModel.find(function(err, forms){
                    if(err){
                        deferred.reject(err);
                    }
                    else{
                        deferred.resolve(forms);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function deleteFormById(formId) {
        var deferred = q.defer();
        formModel.remove({_id: formId},function(err, users){ //TODO Check return.
            if(err){
                deferred.reject(err);
            }
            else{
                formModel.find(function(err, forms){
                    if(err){
                        deferred.reject(err);
                    }
                    else{
                        deferred.resolve(forms);
                    }
                });
            }
        });
        return deferred.promise;
    }

    ///////////////////////////////////////////////////////////////////////

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
        for (var i = 0; i < forms.length; i++) {
            if (forms[i]._id == formId) {
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

    function reorderFormFields(formId, fieldsArray) {
        for (var i = 0; i < forms.length; i++) {
            if (forms[i]._id == formId) {
                forms[i].fields = fieldsArray;
                return forms[i].fields;
            }
        }
        return null;
    }
};
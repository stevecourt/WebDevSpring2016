"use strict";

var q = require("q");

module.exports = function (mongoose) {

    var formSchema = require('./form.schema.server.js')(mongoose);
    var formModel = mongoose.model("form", formSchema);

    var api = {
        createForm: createForm,
        findAllForms: findAllForms,
        findFormsByUserId: findFormsByUserId,
        findFormById: findFormById,
        findFormByTitle: findFormByTitle,
        updateFormById: updateFormById,
        deleteFormById: deleteFormById,
        getDbFormModel : getDbFormModel
    };
    return api;

    function getDbFormModel(){
        return formModel;
    }

    function createForm(newForm) {
        var deferred = q.defer();
        formModel.create(newForm, function (err, forms) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(forms);
            }
        });
        return deferred.promise;
    }

    function findAllForms() {
        var deferred = q.defer();
        formModel.find(function (err, forms) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(forms);
            }
        });
        return deferred.promise;
    }

    function findFormsByUserId(userIdGiven) {
        var deferred = q.defer();
        formModel.find({userId: userIdGiven}, function (err, formsFound) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(formsFound);
            }
        });
        return deferred.promise;
    }

    function findFormById(formId) {
        var deferred = q.defer();
        formModel.findById(formId, function (err, formFound) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(formFound);
            }
        });
        return deferred.promise;
    }

    function findFormByTitle(titleGiven) {
        var deferred = q.defer();
        formModel.findOne({title: titleGiven}, function (err, formFound) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(formFound);
            }
        });
        return deferred.promise;
    }

    function updateFormById(formId, formGiven) {
        var deferred = q.defer();
        formModel.update({_id: formId}, {$set: formGiven}, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                formModel.find(function (err, forms) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(forms);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function deleteFormById(formId) {
        var deferred = q.defer();
        formModel.remove({_id: formId},function (err, forms) {
            if (err) {
                deferred.reject(err);
            } else {
                formModel.find(function (err, forms) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(forms);
                    }
                });
            }
        });
        return deferred.promise;
    }
};
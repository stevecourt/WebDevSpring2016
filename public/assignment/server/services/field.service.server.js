"use strict";

var uuid = require('uuid');

module.exports = function(app, formModel) {

    // Form Service Endpoints

    /* Probably not required, depending on Piazza answer. Implement if needed.
    app.post("/api/assignment/field", createField);
    app.get("/api/assignment/field", findAllFields);
    app.get("/api/assignment/field/:fieldId", findFieldById);
    app.put("/api/assignment/field/:fieldId", updateFieldById);
    app.delete("/api/assignment/field/:fieldId", deleteFieldById);
    */

    app.post("/api/assignment/form/:formId/field", addFormField);
    app.get("/api/assignment/form/:formId/field", findAllFormFields);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFormFieldById);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFormFieldById);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFormFieldById);

    function addFormField(req, res) {
        var formId = req.params.formId;
        var fieldObj = req.body;

        // Create random ID
        fieldObj._id = uuid.v1();

        formModel
            .addFormField(formId, fieldObj)
            .then(function (fields) {
                res.json(fields);
            });
    }

    function findAllFormFields(req, res) {
        var formId = req.params.formId;
        formModel
            .findAllFormFields(formId)
            .then(function (formFields) {
                res.json(formFields);
            });
    }

    function findFormFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        formModel
            .findFormFieldById(formId, fieldId)
            .then(function (field) {
                res.json(field);
            });
    }

    function updateFormFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        formModel
            .updateFormById(formId, fieldId)
            .then(function (forms) {
                res.json(forms);
            });
    }

    function deleteFormFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        formModel
            .deleteFormById(formId, fieldId)
            .then(function (fields) {
                res.json(fields);
            });
    }
}
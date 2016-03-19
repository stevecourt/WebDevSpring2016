"use strict";

var uuid = require('node-uuid');
var users = require('../models/form.model.js');

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
        fieldObj._id = uuid.v1(); // Create random ID
        formModel.addFormField(formId, fieldObj);
        res.json(fields);
    }

    function findAllFormFields(req, res) {
        var formId = req.params.formId;
        formModel.findAllFormFields(formId);
        res.json(formFields);
    }

    function findFormFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        formModel.findFormFieldById(formId, fieldId);
        res.json(field);
    }

    function updateFormFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        formModel.updateFormById(formId, fieldId);
        res.json(form);
    }

    function deleteFormFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        formModel.deleteFormById(formId, fieldId);
        res.json(fields);
    }
}
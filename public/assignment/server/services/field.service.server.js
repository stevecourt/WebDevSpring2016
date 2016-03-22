"use strict";

var uuid = require('node-uuid');
//var forms = require('../models/form.model.js');

module.exports = function(app, formModel) {

    // Form Service Endpoints
    app.post("/api/assignment/form/:formId/field", addFormField);
    app.get("/api/assignment/form/:formId/field", findAllFormFields);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFormFieldById);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFormFieldById);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFormFieldById);

    function addFormField(req, res) {
        var formId = req.params.formId;
        var fieldObj = req.body;
        fieldObj._id = uuid.v1(); // Create random ID
        var updatedFields = formModel.addFormField(formId, fieldObj);
        if (updatedFields) {
            res.json(updatedFields);
        } else {
            res.send(404);
        }
    }

    function findAllFormFields(req, res) {
        var formId = req.params.formId;
        var formFields = formModel.findAllFormFields(formId);
        if (formFields) {
            res.json(formFields);
        } else {
            res.send(404);
        }
    }

    function findFormFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var fieldFound = formModel.findFormFieldById(formId, fieldId);
        if (fieldFound) {
            res.json(fieldFound);
        } else {
            res.send(404);
        }
    }

    function updateFormFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var updatedFields = formModel.updateFormById(formId, fieldId);
        if (updatedFields) {
            res.json(updatedFields);
        } else {
            res.send(404);
        }
    }

    function deleteFormFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var updatedFields = formModel.deleteFormById(formId, fieldId);
        if (updatedFields) {
            res.json(updatedFields);
        } else {
            res.send(404);
        }
    }
}
"use strict";

var uuid = require('node-uuid');

module.exports = function(app, formModel) {

    // Form Service Endpoints
    app.post("/api/assignment/form/:formId/field", addFormField);
    app.get("/api/assignment/form/:formId/field", findAllFormFields);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFormFieldById);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFormFieldById);
    app.put("/api/assignment/form/:formId/fields", reorderFormFields);
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

        console.log("in server field service, findAllFormFields. FormID = " + formId);

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
        var fieldObj = req.body;

        console.log("req form id = " + formId);
        console.log("req field id = " + fieldId);
        console.log("req field in = " + fieldObj._id);
        console.log("req field in = " + fieldObj.label);
        console.log("req field in = " + fieldObj.type);
        console.log("req field in = " + fieldObj.placeholder);

        var updatedFields = formModel.updateFormFieldById(formId, fieldId, fieldObj);
        if (updatedFields) {
            res.json(updatedFields);
        } else {
            res.send(404);
        }
    }

    function reorderFormFields(req, res) {
        var formId = req.params.formId;
        var fieldsArray = req.body;

        console.log("in server field service - field array given = " + fieldsArray[0].type);
        console.log("in server field service - field array given = " + fieldsArray[1].type);

        var reorderedFields = formModel.reorderFormFields(formId, fieldsArray);
        if (reorderedFields) {

            console.log("in server field service - returning = " + reorderedFields[0].type);
            console.log("in server field service - returning = " + reorderedFields[1].type);

            res.json(reorderedFields);
        } else {
            res.send(404);
        }
    }

    function deleteFormFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;

        console.log("in server field service - form id = " + formId);
        console.log("in server field service - field id = " + fieldId);

        var updatedFields = formModel.deleteFormFieldById(formId, fieldId);
        if (updatedFields) {
            res.json(updatedFields);
        } else {
            res.send(404);
        }
    }
}
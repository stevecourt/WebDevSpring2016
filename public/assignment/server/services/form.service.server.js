"use strict";

var uuid = require('node-uuid');
var users = require('../models/form.model.js');

module.exports = function(app, formModel) {

    // Form Service Endpoints
    app.post("/api/assignment/form", createForm);                       // May delete depending on Piazza answer.
    app.post("/api/assignment/user/:userId/form", createFormByUserId);
    app.get("/api/assignment/form", findAllForms);                      // May delete depending on Piazza answer.
    app.get("/api/assignment/user/:userId/form", findFormsByUserId);
    app.get("/api/assignment/form/:formId", findFormById);
    app.put("/api/assignment/form/:formId", updateFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);

    function createForm(req, res) {
        var formObj = req.body;
        formModel.createForm(formObj);
        res.json(forms);
    }

    function createFormByUserId(req, res) {
        var userId = req.params.userId;
        var formObj = req.body;
        formObj.userId = userId;
        formObj._id = uuid.v1(); // Create random ID
        formModel.createUser(formObj);
        res.json(forms);
    }

    function findAllForms(req, res) {
        formModel.findAllForms();
        res.json(forms);
    }

    function findFormsByUserId(req, res) {
        var userId = req.params.userId;
        formModel.findFormsByUserId(userId);
        res.json(userForms);
    }

    function findFormById(req, res) {
        var formId = req.params.formId;
        formModel.findFormById(formId);
        res.json(form);
    }

    function updateFormById(req, res) {
        var formId = req.params.formId;
        formModel.updateFormById(formId);
        res.json(forms);
    }

    function deleteFormById(req, res) {
        var formId = req.params.formId;
        formModel.deleteFormById(formId);
        res.json(forms);
    }
}
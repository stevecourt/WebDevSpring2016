"use strict";

var uuid = require('node-uuid');

module.exports = function(app, formModel) {

    // Form Service Endpoints
    app.post("/api/assignment/form", createForm);
    app.post("/api/assignment/user/:userId/form", createFormByUserId);
    app.get("/api/assignment/form", findAllForms);
    app.get("/api/assignment/user/:userId/form", findFormsByUserId);
    app.get("/api/assignment/form/:formId", findFormById);
    app.put("/api/assignment/form/:formId", updateFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);

    function createForm(req, res) {
        var formObj = req.body;
        var updatedFormList = formModel.createForm(formObj);
        if (updatedFormList) {
            res.json(updatedFormList);
        } else {
            res.send(500);
        }
    }

    function createFormByUserId(req, res) {
        var userId = req.params.userId;
        var formObj = req.body;
        formObj.userId = userId;
        formObj._id = uuid.v1(); // Create random ID
        formObj.fields = [];
        var updatedFormList = formModel.createForm(formObj);
        if (updatedFormList) {
            var userForms = formModel.findFormsByUserId(userId);
            if (userForms) {
                res.json(userForms);
            } else {
                res.send(500);
            }
        } else {
            res.send(500);
        }
    }

    function findAllForms(req, res) {
        var formList = formModel.findAllForms();
        if (formList) {
            res.json(formList);
        } else {
            res.send(500);
        }
    }

    function findFormsByUserId(req, res) {
        var userId = req.params.userId;
        var userForms = formModel.findFormsByUserId(userId);
        if (userForms) {
            res.json(userForms);
        } else {
            res.send(500);
        }
    }

    function findFormById(req, res) {
        var formId = req.params.formId;
        var formFound = formModel.findFormById(formId);
        if (formFound) {
            res.json(formFound);
        } else {
            res.send(404);
        }
    }

    function updateFormById(req, res) {
        var formId = req.params.formId;
        var formObj = req.body;
        var updatedFormList = formModel.updateFormById(formId, formObj);
        if (updatedFormList) {
            res.json(updatedFormList);
        } else {
            res.send(404);
        }
    }

    function deleteFormById(req, res) {
        var formId = req.params.formId;
        var updatedFormList = formModel.deleteFormById(formId);
        if (updatedFormList) {
            res.json(updatedFormList);
        } else {
            res.send(404);
        }
    }
}
"use strict";

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
        formModel.createForm(formObj)
            .then(function (updatedFormList) {
                if (updatedFormList) {
                    formModel.findFormsByUserId(userId)
                        .then(function (userForms) {
                            if (userForms) {
                                res.json(userForms);
                            } else {
                                res.send(500);
                            }
                        });
                } else {
                    res.send(500);
                }
            });
    }

    function createFormByUserId(req, res) {
        var userId = req.params.userId;
        var formObj = req.body;
        formObj.userId = userId;
        formModel.createForm(formObj)
            .then(function (updatedFormList) {
                if (updatedFormList) {
                    formModel.findFormsByUserId(userId)
                        .then(function (userForms) {
                            if (userForms) {
                                res.json(userForms);
                            } else {
                                res.send(500);
                            }
                        });
                } else {
                    res.send(500);
                }
            });
    }

    function findAllForms(req, res) {
        formModel.findAllForms()
            .then(function (formList) {
                if (formList) {
                    res.json(formList);
                } else {
                    res.send(500);
                }
            });
    }

    function findFormsByUserId(req, res) {
        var userId = req.params.userId;
        formModel.findFormsByUserId(userId)
            .then(function (userForms) {
                if (userForms) {
                    res.json(userForms);
                } else {
                    res.send(500);
                }
            });
    }

    function findFormById(req, res) {
        var formId = req.params.formId;
        formModel.findFormById(formId)
            .then(function (formFound) {
                if (formFound) {
                    res.json(formFound);
                } else {
                    res.send(404);
                }
            });
    }

    function updateFormById(req, res) {
        var formId = req.params.formId;
        var formObj = req.body;
        formModel.updateFormById(formId, formObj)
            .then(function (updatedFormList) {
                if (updatedFormList) {
                    res.json(updatedFormList);
                } else {
                    res.send(404);
                }
            });
    }

    function deleteFormById(req, res) {
        var formId = req.params.formId;
        formModel.deleteFormById(formId)
            .then(function (updatedFormList) {
                if (updatedFormList) {
                    res.json(updatedFormList);
                } else {
                    res.send(404);
                }
            });
    }
};
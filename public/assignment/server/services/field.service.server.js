"use strict";

module.exports = function(app, fieldModel) {

    // Form Service Endpoints
    app.post("/api/assignment/form/:formId/field", addFormField);
    app.get("/api/assignment/form/:formId/field", findAllFormFields);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFormFieldById);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFormFieldById);
    app.put("/api/assignment/form/:formId/field", reorderFields);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFormFieldById);

    function addFormField(req, res) {
        var formId = req.params.formId;
        var fieldObj = req.body;
        fieldModel.addFormField(formId, fieldObj)
            .then(function (updatedFields) {
                if (updatedFields) {
                    res.json(updatedFields);
                } else {
                    res.send(404);
                }
            });
    }

    function findAllFormFields(req, res) {
        var formId = req.params.formId;
        fieldModel.findAllFormFields(formId)
            .then(function (formFields) {
                if (formFields) {
                    res.json(formFields);
                } else {
                    res.send(404);
                }
            });
    }

    function findFormFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel.findFormFieldById(formId, fieldId)
            .then(function (fieldFound) {
                if (fieldFound) {
                    res.json(fieldFound);
                } else {
                    res.send(404);
                }
            });
    }

    function updateFormFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var fieldObj = req.body;
        fieldModel.updateFormFieldById(formId, fieldId, fieldObj)
            .then(function (updatedFields) {
                if (updatedFields) {
                    res.json(updatedFields);
                } else {
                    res.send(404);
                }
            });
    }

    function reorderFields(req, res) {
        var formId = req.params.formId;
        var startIndex = req.query.startIndex;
        var endIndex = req.query.endIndex;
        if (startIndex && endIndex) {
            fieldModel.reorderFields(formId, startIndex, endIndex)
                .then(function (reorderedFields) {
                    if (reorderedFields) {
                        return res.send(200);
                    } else {
                        return res.send(400);
                    }
                });
        }
    }

    function deleteFormFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel.deleteFormFieldById(formId, fieldId)
            .then(function (updatedFields) {
                if (updatedFields) {
                    res.json(updatedFields);
                } else {
                    res.send(404);
                }
            });
    }
};
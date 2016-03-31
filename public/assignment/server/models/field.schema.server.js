"use strict";

module.exports = function(mongoose) {
    var fieldTypes = ["TEXT", "TEXTAREA", "DATE", "OPTIONS", "CHECKBOXES", "RADIOS"]; // TODO: change depending on Piazza response.

    var fieldSchema = mongoose.Schema({
        "label" : String,
        "type": {type: String, enum: fieldTypes, default: "TEXT"},
        "placeholder" : String,
        "options" : [{"label": {type: String}, "value": {type: String}}]
    }, {collection: "field"});

    return fieldSchema;
};
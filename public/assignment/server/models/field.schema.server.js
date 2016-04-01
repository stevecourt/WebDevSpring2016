"use strict";

module.exports = function (mongoose) {
    var fieldTypes = ["TEXT", "TEXTAREA", "EMAIL", "PASSWORD", "DATE", "OPTIONS", "CHECKBOXES", "RADIOS"];

    var fieldSchema = mongoose.Schema (
        {
            "label" : String,
            "type": {type: String, enum: fieldTypes, default: "TEXT"},
            "placeholder" : String,
            "options" : [{"label": {type: String}, "value": {type: String}}]
        },
        {collection: "field"}
    );

    return fieldSchema;
};
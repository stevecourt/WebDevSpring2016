"use strict";

module.exports = function (mongoose) {

    var userSchema = mongoose.Schema(
        {
            "username": String,
            "password": String,
            "firstName": String,
            "lastName": String,
            "emails": [String],
            "phones": [String]
        },
        {collection: "user"}
    );
    return userSchema;
};
"use strict";

module.exports = function (mongoose) {

    var roleTypes = ["student", "faculty", "admin"];

    var userSchema = mongoose.Schema(
        {
            "username": String,
            "password": String,
            "firstName": String,
            "lastName": String,
            "emails": [String],
            "phones": [String],
            "roles": [{type: String, enum: roleTypes, default: "student"}]
        },
        {collection: "user"}
    );
    return userSchema;
};
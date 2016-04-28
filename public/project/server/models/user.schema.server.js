"use strict";

module.exports = function (mongoose) {

    var roleTypes = ["basic", "location", "admin"];

    var userSchema = mongoose.Schema(
        {
            "username": String,
            "password": String,
            "firstName": String,
            "lastName": String,
            "email": [String],
            "roles": [{type: String, enum: roleTypes, default: "basic"}],
            "follows": Number
        },
        {collection: "exchanger"}
    );
    return userSchema;
};
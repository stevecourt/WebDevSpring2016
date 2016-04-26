"use strict";

module.exports = function (mongoose) {

    var roleTypes = ["basic", "location", "maker", "admin"];

    var userSchema = mongoose.Schema(
        {
            "username": String,
            "password": String,
            "firstName": String,
            "lastName": String,
            "email": [String],
            "roles": [{type: String, enum: roleTypes, default: "basic"}],
            "follows": [String],
            "likes": [String]
        },
        {collection: "exchanger"}
    );
    return userSchema;
};
"use strict";

module.exports = function (mongoose) {

    var userSchema = mongoose.Schema(
        {
            "name": String,
            "street": String,
            "apartment": String,
            "city": String,
            "state": String,
            "zip": Number,
            "capacity": Number,
            "type": String,
            "notes": String,
            "likes": Number,
            "userId": String,
            "inventory": [String]
        },
        {collection: "location"}
    );
    return userSchema;
};
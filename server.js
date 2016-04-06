var express = require('express');
var mongoose = require('mongoose');
//var http = require('http'); // TODO: Resolve http config issue for project.
var bodyParser = require('body-parser');
var multer = require('multer');

//var passport = require('passport');
//var cookieParser = require('cookie-parser');
//var session = require('express-session');

var app = express();
app.use(express.static(__dirname + '/public')); // Location of assignment and project

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

/*
app.use(session({
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
*/

// MongoDB localhost (baseline) or OpenShift configuration, if OPENSHIFT env variables are present
var connectionString = 'mongodb://127.0.0.1:27017/cs5610spring2016';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
    connection_string =
        process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

mongoose.connect(connectionString);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || '3000';
app.listen(port, ipaddress);

// For assignments only
require('./public/assignment/server/app.js')(app, mongoose);

// Section below under development for project ////////////////////////////
app.get('/rest/edition/:editionKey', getEditionData);

function getEditionData(req, res) {

    console.log("in server");
    var editionOLID = req.params.editionKey;
    var EDITION_URL = "https://openlibrary.org/api/books?bibkeys=OLID:EDITION_OLID&format=json&jscmd=data"
        .replace("EDITION_OLID", editionOLID);

    console.log("about to make get call");
    http.get(
        //"https://openlibrary.org/api/books?bibkeys=OLID:OL22625549M&callback=processData&jscmd=data",
        EDITION_URL,
        function (response) {
            res.send(response);
            //response;
    });
    console.log("made get call");
    //function processData(data) {
    //    res.send(data);
    //}
}
// Section above under development for project ////////////////////////////
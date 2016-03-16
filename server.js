var express = require('express');
var http = require('http'); // TODO: Resolve http config issue for project.
var bodyParser = require('body-parser');
var multer = require('multer');

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

app.get('/rest/edition/:editionKey', getEditionData);

// For assignments only
//require('./public/assignment/server/app.js')(app);

// This section under development for project.
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
};

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || '3000';
app.listen(port, ipaddress);
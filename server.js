var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multer = require('multer');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(express.static(__dirname + '/public')); // Location of assignment and project
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

// Security
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// MongoDB localhost (baseline) or OpenShift configuration, if OPENSHIFT env variables are present
var connectionString = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://127.0.0.1:27017/cs5610spring2016';
mongoose.connect(connectionString);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || '3000';
app.listen(port, ipaddress);

// Define User Models. NOTE: Must be done at this level for Passport security.
var assignmentUserModel = require("./public/assignment/server/models/user.model.server.js")(mongoose);
var projectUserModel = require("./public/project/server/models/user.model.server.js")(mongoose);

// app.js for assignments and project
require('./public/assignment/server/app.js')(app, mongoose, assignmentUserModel);
require('./public/project/server/app.js')(app, mongoose, assignmentUserModel, projectUserModel);
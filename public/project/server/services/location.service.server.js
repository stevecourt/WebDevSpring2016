"use strict";

var passport = require('passport');

module.exports = function (app, locationModel) {

    var auth = authenticated;

    // User authentification endpoints
    app.post ("/api/project/reglocation", auth, regLocation);
    app.get ("/api/project/location", auth, findAllLocations);
    app.get ("/api/project/location/:locationId", auth, findLocationById);
    app.put ("/api/project/like/:locationId", auth, addLikeById);
    app.put ("/api/project/location/:locationId/:isbn", auth, addBook);
    app.delete ("/api/project/location/:locationId/:isbn", auth, deleteBook);

    function authenticated (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function regLocation(req, res) {
        var newLocation = req.body;

        if (!newLocation.likes) {
            newLocation.likes = 0;
        }
        newLocation.inventory = [];
        locationModel
            .findLocationByName(newLocation.name)
            .then(
                function(location){
                    if(location) {
                        res.json(null);
                    } else {
                        return locationModel.createLocation(newLocation);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function findAllLocations(req, res) {
        locationModel
            .findAllLocations()
            .then(
                function (locations) {
                    res.json(locations);
                },
                function () {
                    res.status(400).send(err);
                }
            );
    }

    function findLocationById(req, res) {
        locationModel.findLocationById(req.params.locationId)
            .then(function (locationFound) {
                if (locationFound) {
                    res.json(locationFound);
                } else {
                    res.send(404);
                }
            });
    }

    function addLikeById(req, res) {
        var locationId = req.params.locationId;

        locationModel
            .findLocationById(locationId)
            .then(function (location) {
                location.likes = location.likes + 1;
                locationModel
                    .updateLocationById(locationId, location)
                    .then(
                        function(location){
                            return locationModel.findAllLocations();
                        },
                        function(err){
                            res.status(400).send(err);
                        }
                    )
                    .then(
                        function(locations){
                            res.json(locations);
                        },
                        function(err){
                            res.status(400).send(err);
                        }
                    );
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function addBook(req, res) {
        var locationId = req.params.locationId;
        var isbn = req.params.isbn;

        locationModel
            .findLocationById(locationId)
            .then(function (location) {
                location.inventory.push(isbn);
                locationModel
                    .updateLocationById(locationId, location)
                    .then(
                        function(location){
                            return locationModel.findAllLocations();
                        },
                        function(err){
                            res.status(400).send(err);
                        }
                    )
                    .then(
                        function(locations){
                            res.json(locations);
                        },
                        function(err){
                            res.status(400).send(err);
                        }
                    );
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function deleteBook(req, res) {
        var locationId = req.params.locationId;
        var isbn = req.params.isbn;

        locationModel
            .findLocationById(locationId)
            .then(function (location) {
                for (var i = 0; i < location.inventory.length; i++) {
                    if (location.inventory[i] == isbn) {
                        location.inventory.splice(i, 1);
                    }
                }
                locationModel
                    .updateLocationById(locationId, location)
                    .then(
                        function(location){
                            return locationModel.findAllLocations();
                        },
                        function(err){
                            res.status(400).send(err);
                        }
                    )
                    .then(
                        function(locations){
                            res.json(locations);
                        },
                        function(err){
                            res.status(400).send(err);
                        }
                    );
            }, function (err) {
                res.status(400).send(err);
            });
    }
};
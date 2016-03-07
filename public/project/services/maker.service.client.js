"use strict";

(function () {
    angular
        .module("BookExchangeApp")
        .factory("MakerService", makerService);

    function makerService() {

        var makers = [];
        makers = [
            {
                "id": 201,
                "name": "Alice's Arts",
                "address": "6 N 6th St",
                "phone": "206-123-4567",
                "email": "aliceart@email.com",
                "web": "www.aliceart.com",
                "notes": "These are the best libraries ever!",
                "application": "I want to build library boxes because it's a really good idea. Please say yes!",
                "userId": "567"
            },
            {
                "id": 202,
                "name": "Bob's Boxes",
                "address": "7 N 7th St",
                "phone": "206-234-5678",
                "email": "bobbox@email.com",
                "web": "www.bobbox.com",
                "notes": "... until mine came along, which are better!",
                "application": "I want to build library boxes because I have wood, nails a hammer and time on my " +
                "hands. If you don't say yes, I'll have a lot of spare boxes!",
                "userId": "678"
            },
            {
                "id": 203,
                "name": "Carl's Collections",
                "address": "8 N 8th St",
                "phone": "206-123-4567",
                "email": "carlcollect@email.com",
                "web": "www.carlcollect.com",
                "notes": "Mine are adequate, but they're cheap!",
                "application": "I want to build library boxes because I like building cheap, low quality products. " +
                "Say yes! What have you got to lose?",
                "userId": "789"
            }
        ];

        // CRUD operations
        var api = {
            createMaker: createMaker,
            findAllMakers: findAllMakers,
            updateMaker: updateMaker,
            deleteMaker: deleteMaker,
        };
        return api;

        function createMaker(maker, callback) {
            // Creates a new object to be added.
            var newMaker = {
                id: maker.id,
                name: maker.name,
                address: maker.address,
                phone: maker.phone,
                email: maker.email,
                web: maker.web,
                notes: maker.notes,
                application: maker.application,
                userId: maker.userId
            };
            makers.push(newMaker);
            callback(makers);
        }

        function findAllMakers(callback) {
            callback(makers);
        }

        function updateMaker(maker, callback) {
            // Creates a new object to be updated.
            var newMaker = {
                id: maker.id,
                name: maker.name,
                address: maker.address,
                phone: maker.phone,
                email: maker.email,
                web: maker.web,
                notes: maker.notes,
                application: maker.application,
                userId: maker.userId
            };
            callback(newMaker);
        }

        function deleteMaker(maker, callback) {
            var index = makers.indexOf(maker);
            makers.splice(index, 1);
            callback(makers);
        }
    }
})();
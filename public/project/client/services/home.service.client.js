"use strict";

(function () {
    angular
        .module("BookExchangeApp")
        .factory("HomeService", homeService);

    function homeService() {

        var homes = [];
        homes = [
            {
                "id": 101,
                "title": "Book Exchanger",
                "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit." +
                "Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus," +
                "ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie " +
                "elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet " +
                "quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus " +
                "aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius " +
                "pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper " +
                "at ultricies metus viverra. Pellentesque arcu mauris, malesuada quis ornare accumsan, " +
                "blandit sed diam.",
                "image": "Image1"
            }
        ];

        // CRUD operations
        var api = {
            createHome: createHome,
            findAllHomes: findAllHomes,
            updateHome: updateHome,
            deleteHome: deleteHome
        };
        return api;

        function createHome(home, callback) {
            // Creates a new object to be added.
            var newHome = {
                id: (new Date).getTime(),
                title: home.title,
                text: home.text,
                image: home.image
            };
            homes.push(newHome);
            callback(homes);
        }

        function findAllHomes(callback) {
            callback(homes);
        }

        function updateHome(home, callback) {
            // Creates a new object to be updated.
            var newHome = {
                id: (new Date).getTime(),
                title: home.title,
                text: home.text,
                image: home.image
            };
            callback(newHome);
        }

        function deleteHome(home, callback) {
            var index = homes.indexOf(home);
            homes.splice(index, 1);
            callback(homes);
        }
    }
})();
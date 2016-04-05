"use strict";

(function(){
    angular
        .module("reorder", [])
        .directive("reorder", reorder);

    function reorder() {
        var start = null;
        var end = null;
        function link(scope, element, attributes) {
            var jgaAxis = attributes.jgaAxis;
            $(element).sortable({
                cancel: "",
                handle: "#reorderButton",
                axis: jgaAxis,
                start: function(event, ui) {
                    start = ui.item.index();
                },
                stop: function(event, ui) {
                    end = ui.item.index();
                    scope.moveField(start, end);
                }
            });
        }
        return {
            link: link
        };
    }
})();
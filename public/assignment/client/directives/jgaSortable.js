"use strict";

(function(){
    angular
        .module("jgaSortable", [])
        .directive("jgaSortable", jgaSortable);

    function jgaSortable() {
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

                    console.log("start = " + start);

                },
                stop: function(event, ui) {
                    end = ui.item.index();

                    console.log("end = " + end);

                    var temp = scope.model.fields[start];
                    scope.model.fields[start] = scope.model.fields[end];
                    scope.model.fields[end] = temp;
                    scope.$apply();
                    scope.reorderFields(scope.formId, scope.model.fields);
                }
            });
        }
        return {
            link: link
        }
    }
})();
(function(){
    angular
        .module("jgaSortable", [])
        .directive("jgaSortable", jgaSortable);

    function jgaSortable() {

        console.log("in jgaSortable");

        var start = null;
        var end = null;
        function link(scope, element, attributes) {
            var jgaAxis = attributes.jgaAxis;

            $(element).sortable({
                axis: jgaAxis,
                start: function(event, ui) {
                    start = ui.item.index();

                    console.log("start = " + start);

                },
                stop: function(event, ui) {
                    end = ui.item.index();

                    console.log("end = " + end);

                    var temp = scope.users[start];
                    scope.users[start] = scope.users[end];
                    scope.users[end] = temp;
                    scope.$apply();
                }
            });
        }
        return {
            link: link
        }
    }
})();
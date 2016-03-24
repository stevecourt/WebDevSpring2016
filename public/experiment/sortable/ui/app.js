(function(){
    angular
        .module("SortableApp", ["jgaSortable"])
        .controller("SortableController", SortableController);

    function SortableController($scope) {
        $scope.users = [
            {"_id": "212", "label": "Title", "type": "TEXT", "placeholder": "Title"},
            {"_id": "323", "label": "Description", "type": "TEXTAREA", "placeholder": "Description"},
            {"_id": "434", "label": "Due Date", "type": "DATE"},
            {
                "_id": "545",
                "label": "State",
                "type": "OPTIONS",
                "options":
                    [
                        {"label": "Massachussetts", "value": "MA"},
                        {"label": "New Hampshire", "value": "NH"}
                    ]
            },
            {
                "_id": "656",
                "label": "New Checkboxes",
                "type": "CHECKBOXES",
                "options":
                    [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]
            },
            {
                "_id": "767",
                "label": "New Radio Buttons",
                "type": "RADIOS",
                "options":
                    [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ]
            }
        ];
    }
})();
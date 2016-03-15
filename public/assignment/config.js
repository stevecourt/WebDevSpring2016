"use strict";

(function () {
    angular
        .module("FormBuilderApp", ["ngRoute"])
        .config(function ($routeProvider) {
            $routeProvider
                .when("/home", {
                    templateUrl: "views/home/home.view.html",
                    controller: "HomeController"
                })
                .when("/forms", {
                    templateUrl: "views/forms/forms.view.html",
                    controller: "FormController"
                })
                .when("/register", {
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController"
                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html",
                    controller: "LoginController"
                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController"
                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html",
                    controller: "AdminController"
                })
                .when("/forms/:formId/fields", {
                    templateUrl: "client/views/forms/fields.view.html",
                    controller: "FieldController"
                })
                .otherwise({
                    redirectTo: "/home"
                });
        });
})();
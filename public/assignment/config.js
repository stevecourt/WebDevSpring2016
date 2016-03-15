"use strict";

(function () {
    angular
        .module("FormBuilderApp", ["ngRoute"])
        .config(function ($routeProvider) {
            $routeProvider
                .when("/home", {
                    templateUrl: "client/views/home/home.view.html",
                    controller: "HomeController"
                })
                .when("/forms", {
                    templateUrl: "client/views/forms/forms.view.html",
                    controller: "FormController"
                })
                .when("/register", {
                    templateUrl: "client/views/register/register.view.html",
                    controller: "RegisterController"
                })
                .when("/login", {
                    templateUrl: "client/views/login/login.view.html",
                    controller: "LoginController"
                })
                .when("/profile", {
                    templateUrl: "client/views/profile/profile.view.html",
                    controller: "ProfileController"
                })
                .when("/admin", {
                    templateUrl: "client/views/admin/admin.view.html",
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
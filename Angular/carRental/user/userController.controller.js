(function () {
    function UserController($state,$cookies) {
        var userService = new UserService($state, $cookies);
        this.register = function (user) {
            userService.register(user);
        }
        this.login = function (user) {
            userService.login(user);
        }
        return this;
    }

    var compareTo = function () {
        return {
            require: "ngModel",
            scope: {
                otherModelValue: "=compareTo"
            },
            link: function (scope, element, attributes, ngModel) {
                ngModel.$validators.compareTo = function (modelValue) {
                    return modelValue == scope.otherModelValue;
                };

                scope.$watch("otherModelValue", function () {
                    ngModel.$validate();
                });
            }
        };
    };

   
    angular.module('carRental.users', ['ui.router', 'ngCookies']).controller('UserController', UserController)
        .directive("compareTo", compareTo);
})();
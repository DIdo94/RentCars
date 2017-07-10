(function () {
    function UserController($scope, $state, $cookies, Notification, UserService) {
        var controller = this;
        function isLogged() {
            if ($cookies.getObject('token')) {
                $scope.isLogged = true;
            } else {
                $scope.isLogged = false;
            }
        }

        isLogged();
        //$scope.isLogged = isLogged;

        controller.register = function (user) {
            UserService.register(user).success(function () {
                Notification.success('Successfully registered');
                controller.login(user);
                isLogged();
            }).error(function (error) {
                Notification.error('Unuccessfully registered');
            });
        }

        controller.login = function (user) {
            UserService.login(user).success(function (data) {
                Notification.success('Successfully logged in');
                $cookies.putObject('token', data.access_token);
            }).error(function (error) {
                Notification.error('Unuccessfully logged in');
            });
            // isLogged();          
        }

        $scope.logout = function () {
            var user = $cookies.get('user');
            debugger;
            if ($cookies.get('token')) {
                $cookies.remove('token');
                $state.go('login');
                $scope.isLogged = false;
                Notification.success('Successfully logged out');
            }
        }

        return controller;
    }

    var compareTo = function () {
        return {
            require: "ngModel",
            scope: {
                otherModelValue: "=compareTo"
            },
            link: function (scope, element, attributes, ngModel) {
                ngModel.$validators.compareTo = function (modelValue) {
                    return modelValue === scope.otherModelValue;
                };

                scope.$watch("otherModelValue", function () {
                    ngModel.$validate();
                });
            }
        };
    };


    angular.module('carRental.users', ['ui.router', 'ngCookies']).controller('UserController', ['$scope', '$state', '$cookies', 'Notification', 'UserService', UserController])
        .directive("compareTo", compareTo);
})();
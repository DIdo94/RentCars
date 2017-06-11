(function () {
    function UserController($scope, $state, $cookies, Notification) {
        var userService = new UserService($state, $cookies);
        function isLogged() {
            if ($cookies.getObject('user')) {
                $scope.isLogged = true;
            } else {
                $scope.isLogged = false;
            }
        }

        isLogged();
        $scope.isLogged = isLogged;
       
        this.register = function (user) {
            userService.register(user);
            Notification.success('Successfully registered');
            isLogged();
        }
        this.login = function (user) {
            userService.login(user);
            isLogged();
            Notification.success('Successfully logged in');
        }

        $scope.logout = function () {
            var user = $cookies.get('user');
            if ($cookies.get('user')) {
                $cookies.remove('user');
                $state.go('login');
                $scope.isLogged = false;
                Notification.success('Successfully logged out');
            }
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
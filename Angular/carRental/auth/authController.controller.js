(function () {
    function AuthController($scope, $state, $cookies, Notification, UserService, AuthFactory) {
        $scope.isLogged = function () {
            if ($cookies.getObject('user') && (new Date($cookies.getObject('user')['.expires']) > new Date())) {
                return true;
            } else {
                logout(true);
                return false;
            }
        };

        var roles = AuthFactory.getUserRoles();
        function logout(hasCookieExpired) {
            if ($cookies.get('user')) {
                $cookies.remove('user');
                $state.go('login');
                hasCookieExpired ?
                    Notification.error('Your cookie has expired') :
                    Notification.success('Successfully logged out');
            }
        }

        var controller = this;
        controller.login = AuthFactory.login;
        controller.register = AuthFactory.register;
        $scope.$on('isLogged', function () {
            $state.go('cars');
        });

        $scope.isAdmin = function () {
            return roles.includes('Admin');
        }

        $scope.logout = logout;

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


    angular.module('carRental.auth', ['ui.router', 'ngCookies'])
        .controller('AuthController',
            ['$scope', '$state', '$cookies', 'Notification', 'UserService', 'AuthFactory', AuthController])
        .directive("compareTo", compareTo);
})();
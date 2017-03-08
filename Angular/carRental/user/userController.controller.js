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
    angular.module('carRental.users', ['ui.router', 'ngCookies']).controller('UserController', UserController);
})();
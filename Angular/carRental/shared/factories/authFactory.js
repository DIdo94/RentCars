function AuthFactory($cookies, Notification, UserService, $rootScope) {
    var factory = {};

    factory.login = function (user) {
        UserService.login(user).success(function (data) {
            Notification.success('Successfully logged in');
            $cookies.putObject('user', data);
            $rootScope.$broadcast('isLogged');
        }).error(function (error) {
            Notification.error('Unuccessfully logged in');
        });
    };

    factory.register = function (user) {
        UserService.register(user).success(function () {
            Notification.success('Successfully registered');
            factory.login(user);
        }).error(function (error) {
            Notification.error('Unuccessfully registered');
        });
    };

    factory.getUserRoles = function () {
        var roles = [];
        if ($cookies.getObject('user')) {
            roles = $cookies.getObject('user').roles.split(',');
        }

        return roles;
    }

    return factory;
}
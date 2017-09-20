function AuthFactory($cookies, Notification, UserService, $rootScope) {
    var factory = {};
    factory.userRoles = [];
    updatetUserRoles = function () {
        if ($cookies.getObject('user')) {
            factory.userRoles = $cookies.getObject('user').roles.split(',');
        }
    }
    factory.login = function (user) {
        UserService.login(user).success(function (data) {
            Notification.success('Successfully logged in');
            $cookies.putObject('user', data);
            updatetUserRoles();
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

    return factory;
}
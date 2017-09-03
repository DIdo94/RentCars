(function () {
    angular.element(document).ready(function () {
        angular.bootstrap(document.getElementsByTagName('body')[0], ['ngCookies', 'carRental']);
    });
    angular.module('carRental',
            ['carRental.auth',
                'carRental.users',
                'carRental.cars',
                'carRental.rentalHistory',
                'ui.bootstrap',
                'ui.router',
                'ngDialog',
                'ngCookies',
                'ui-notification',
                'ui.bootstrap.datetimepicker',
                'SignalR'])
        .service('CarService', CarService)
        .service('UserService', UserService)
        .factory('AuthFactory', AuthFactory)
        .config(($stateProvider, $urlRouterProvider, $locationProvider, NotificationProvider) => {
            NotificationProvider.setOptions({
                delay: 4000,
                startTop: 20,
                startRight: 10,
                verticalSpacing: 40,
                horizontalSpacing: 40,
                positionX: 'right',
                positionY: 'top'
            });
            $stateProvider
                .state('mainPage', {
                    url: '/',
                    templateUrl: 'carRental/main/main.template.html'
                })
                .state('users', {
                    url: '/users',
                    templateUrl: 'carRental/user/user.template.html',
                    resolve: {
                        data: function (UserService) {
                            return UserService.getAll().then(function (data) {
                                return data.data;
                            }, function () {
                                location.href = '/';
                            });
                        }
                    },
                    controller: 'UserController as uc'
                })
                .state('rentalHistories', {
                    url: '/users/:id/rentalHistories',
                    templateUrl: 'carRental/rentalHistory/rentalHistory.template.html',
                    resolve: {
                        data: function (UserService, $stateParams) {
                            debugger;
                            return UserService.getUserRentalHistories($stateParams.id).then(function (data) {
                                return data.data;
                            }, function () {
                                location.href = '/';
                            });
                        }
                    },
                    controller: 'RentalHistoryController as rhc'
                })
                .state('cars', {
                    url: '/cars',
                    templateUrl: 'carRental/car/car.template.html',
                    resolve: {
                        data: function (CarService) {
                            return CarService.getAll().then(function (data) {
                                CarService.setFilterCarsResult(data.data);
                                return data.data;
                            }, function () {
                                location.href = '/';
                            });
                        }
                    },
                    controller: 'CarsController as cc'
                })
                .state('register', {
                    url: '/register',
                    templateUrl: 'carRental/auth/register.template.html',
                    controller: 'AuthController as ac'
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'carRental/auth/login.template.html',
                    controller: 'AuthController as ac'
                });
        });
})();
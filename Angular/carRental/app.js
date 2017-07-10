(function () {
    angular.element(document).ready(function () {
        angular.bootstrap(document.getElementsByTagName('body')[0], ['ngCookies', 'carRental']);
    });

    angular.module('carRental', ['carRental.users', 'carRental.cars', 'carRental.renters', 'carRental.rentalHistory', 'carRental.carDetails', 'ui.bootstrap', 'ui.router', 'ngDialog', 'ngCookies', 'ui-notification', 'ui.bootstrap.datetimepicker'])
        .service('CarService', CarService)
        .service('UserService', UserService)
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
                    url: '/'
                })
            .state('renters', {
                url: '/renters',
                templateUrl: 'carRental/renter/renter.template.html',
                resolve: {
                    data: function (UserService) {
                        return UserService.getAll().then(function (data) {
                            return data.data;
                        }, function () {
                            $location.url('/');
                        });
                    }
                },
                controller: 'RenterController as rc'
            })
            .state('details', {
                url: '/renters/:id',
                templateUrl: 'carRental/rentalHistory/rentalHistory.template.html',
                resolve: {
                    data: function (UserService, $stateParams) {
                        return UserService.getUserRentalHistories($stateParams.id).then(function (data) {
                            return data.data;
                        }, function () {
                            alert('FCK');
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
                            return data.data;
                        }, function () {
                            location.href = '/';
                        });
                    }
                },
                controller: 'CarsController as cc',
            })
            //.state('cars.details', {
            //    url: '/:id',
            //    templateUrl: 'carRental/carDetails/carDetails.template.html',
            //    controller: 'CarDetailsController as cdc'
            //})
            //.state('rented', {
            //    url: '/rented',
            //    templateUrl: 'carRental/rentalHistory/rentalHistory.template.html',
            //    controller: 'RentalHistoryController as rhc'
            //})
            .state('register', {
                url: '/register',
                templateUrl: 'carRental/user/register.template.html',
                controller: 'UserController as uc'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'carRental/user/login.template.html',
                controller: 'UserController as uc'
            });
        })
})();
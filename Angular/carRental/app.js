(function () {
    angular.element(document).ready(function () {
        console.log(document.getElementsByTagName('main')[0]);
        angular.bootstrap(document.getElementsByTagName('body')[0], ['ngCookies', 'carRental']);
    });

    angular.module('carRental', ['carRental.users', 'carRental.cars', 'carRental.renters', 'carRental.rentalHistory', 'carRental.carDetails', 'ui.bootstrap', 'ui.router', 'ngDialog', 'ngCookies', 'ui-notification', 'ui.bootstrap.datetimepicker'])
        .config(($stateProvider, $urlRouterProvider, $locationProvider, NotificationProvider) => {
           NotificationProvider.setOptions({
                delay: 3000,
                startTop: 20,
                startRight: 10,
                verticalSpacing: 20,
                horizontalSpacing: 20,
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
                controller: 'RenterController as rc'
            })
            .state('details', {
                url: '/renters/:id',
                templateUrl: 'carRental/rentalHistory/rentalHistory.template.html',
                controller: 'RentalHistoryController as rhc'
            })
            .state('cars', {
                url: '/cars',
                templateUrl: 'carRental/car/car.template.html',
                controller: 'CarsController as cc'
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
        });
})();
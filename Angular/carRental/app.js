(function () {
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['ngCookies', 'carRental']);
    });

    angular.module('carRental', ['carRental.users', 'carRental.cars', 'carRental.renters', 'carRental.rentalHistory', 'carRental.carDetails', 'ui.bootstrap', 'ui.router', 'ngDialog', 'ngCookies'])
        .controller('main', function ($scope, $cookies, $state) {
            $scope.logout = function () {
                var user = $cookies.get('user');
                if ($cookies.get('user')) {
                    $cookies.remove('user');
                    $state.go('login');
                    $scope.isLogged = false;
                }
            }

            if ($cookies.getObject('user')) {
                $scope.isLogged = true;
            } else {
                $scope.isLogged = false;
            }
        })
        .config(($stateProvider, $urlRouterProvider, $locationProvider) => {
            $stateProvider
                .state('mainPage', {
                    url: '/'
                })
            .state('renters', {
                url: '/renters',
                templateUrl: 'carRental/renter/renter.template.html',
                controller: 'RenterController as rc'
            })
            .state('cars', {
                url: '/cars',
                templateUrl: 'carRental/car/car.template.html',
                controller: 'CarsController as cc'
            })
            .state('cars.details', {
                url: '/:id',
                templateUrl: 'carRental/carDetails/carDetails.template.html',
                controller: 'CarDetailsController as cdc'
            })
            .state('rented', {
                url: '/rented',
                templateUrl: 'carRental/rentalHistory/rentalHistory.template.html',
                controller: 'RentalHistoryController as rhc'
            })
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
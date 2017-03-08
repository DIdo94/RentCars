(function () {
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['ngCookies','carRental']);
    });

    function MainController($scope,$cookies) {
        $scope.logout = function () {
            if ($cookies.get('user')) {
                $cookies.remove('user');
            }
        }

        $scope.isLogged = $cookies.get('user');
    }

    angular.module('carRental', ['carRental.users', 'carRental.cars', 'carRental.renters', 'carRental.rentalHistory', 'carRental.carDetails', 'ui.router', 'ngDialog','ngCookies'])
        .controller('main', function ($scope, $cookies) {
            $scope.logout = function () {
                var user = $cookies.get('user');
                if ($cookies.get('user')) {
                    $cookies.remove('user');
                }

                location.reload();
            }

            if ($cookies.get('user')) {
                $scope.isLogged = true;
            } else {
                $scope.isLogged = false;
            }         
        })
        //.run(function ($rootScope, $urlRouter, $cookies) {
        //    $rootScope.$on('$locationChangeSuccess', function(evt) {
        //        // Halt state change from even starting
        //        evt.preventDefault();
        //        // Perform custom logic
        //        if ($cookies.get('user')) {
        //            $rootScope.isLogged = true;
        //        } else {
        //            $rootScope.isLogged = false;
        //        }

        //        $urlRouter.sync();
        //    })
        //})
        .config(($stateProvider) => {
            $stateProvider
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
            .state('register',{
                url: '/register',
                templateUrl: 'carRental/user/register.template.html',
                controller: 'UserController as uc'
            })
            .state('login',{
                url: '/login',
                templateUrl: 'carRental/user/login.template.html',
                controller: 'UserController as uc'
            });
        });
        })();
(function () {
    function CarsController($state, $scope, ngDialog, $cookies, data, CarService, AuthFactory, Notification, Hub, Upload) {
        var controller = this;
        var roles = AuthFactory.getUserRoles();
        controller.cars = [];
        var filterCriteria = {
            brand: '',
            model: '',
            pageNumber: 1,
            itemsPerPage: 4,
            status: 'Available'
        };
        controller.filterCriteria = filterCriteria;
        controller.cars = data.cars;
        controller.totalItems = data.totalItems;
        controller.currentUser = $cookies.getObject('user');
        function matchCriteria(parsedCar) {
            if (parsedCar.brand.name.toLowerCase().includes(controller.filterCriteria.brand) &&
                parsedCar.model.name.toLowerCase().includes(controller.filterCriteria.model) &&
                parsedCar.status === controller.filterCriteria.status) {
                return true;
            }

            return false;
        }
        var hub = new Hub('carHub', {
            listeners: {
                'carUpdated': function (dbCar) {
                    var parsedCar = JSON.parse(dbCar);
                    var carIndex = controller.cars.findIndex(function (car) {
                        return car.id === parsedCar.id;
                    });
                    if (carIndex > -1 && matchCriteria(parsedCar)) {
                        angular.copy(parsedCar, controller.cars[carIndex]);
                        $scope.$apply();
                    }
                },
                'carAdded': function (dbCar) {
                    var parsedCar = JSON.parse(dbCar);
                    if (matchCriteria(parsedCar)) {
                        if (controller.totalItems % controller.filterCriteria.itemsPerPage) {
                            controller.cars.push(parsedCar);
                        }

                        controller.totalItems += 1;
                        $scope.$apply();
                    }
                },
                'carRemoved': function (carId) {
                    var carIndex = controller.cars.findIndex(car => car.id === carId);
                    if (carIndex > -1) {
                        controller.cars.splice(controller.cars[carIndex], 1);
                        controller.totalItems -= 1;
                        $scope.$apply();
                    }
                }
            },
            rootPath: 'http://localhost:61818/signalr'
        });

        controller.pageChange = function () {
            CarService.getAll(filterCriteria).success(function (data) {
                controller.cars = data.cars;
            }).error(function () {
                Notification.error('Unable to load cars');
            });
        };

        controller.filter = function () {
            controller.filterCriteria.pageNumber = 1;
            controller.filterCriteria.model = controller.filterCriteria.model.toLowerCase();
            controller.filterCriteria.brand = controller.filterCriteria.brand.toLowerCase();
            CarService.getAll(filterCriteria).success(function (data) {
                controller.cars = data.cars;
                controller.totalItems = data.totalItems;
            }).error(function () {
                Notification.error('Unable to load cars');
            });
        };

        this.watchFunction = function (value) {
            controller.cars = CarService.filterCarsResult.cars;
            controller.totalItems = CarService.filterCarsResult.totalItems;
        };

        $scope.$watch(function ($scope) {
            return CarService.filterCarsResult.cars;
        }, this.watchFunction, true);

        var modalOptions = {
            template: '',
            controller: ['car', 'cars', 'currentUser', 'CarService', 'Notification', 'filterCriteria', 'totalItems','Upload', CarModalController],
            className: 'ngdialog-theme-default',
            controllerAs: 'vm',
            showClose: false,
            scope: $scope,
            resolve: {
                car: function () { return null; },
                cars: function () { return controller.cars; },
                currentUser: function () { return controller.currentUser; },
                CarService: function () { return CarService; },
                notification: function () { return Notification; },
                filterCriteria: function () { return controller.filterCriteria; },
                totalItems: function () { return controller.totalItems; },
                Upload: function () {
                    return Upload;
                }
            }
        };

        controller.rentCar = function (car) {
            modalOptions.template = 'carRental/car/rentCar.template.html';
            modalOptions.resolve.car = function () {
                return car;
            };
            ngDialog.open(modalOptions);
        };

        controller.addCar = function () {
            modalOptions.template = 'carRental/car/addCar.template.html';
            modalOptions.resolve.car = function () {
                return null;
            };

            ngDialog.open(modalOptions);
        };

        controller.editCar = function (car) {
            modalOptions.template = 'carRental/car/editCar.template.html';
            modalOptions.resolve.car = function () {
                return car;
            };
            ngDialog.open(modalOptions);
        };

        controller.deleteCar = function (car) {
            modalOptions.template = 'carRental/car/removeCar.template.html';
            modalOptions.resolve.car = function () {
                return car;
            };
            ngDialog.open(modalOptions);
        };

        controller.isAdmin = function () {
            return roles.includes('Admin');
        }

        return controller;
    }
    angular.module('carRental.cars', ['carRental.rentalHistory', 'ngCookies', 'ui.bootstrap.tpls', 'ngFileUpload'])
        .controller('CarsController', CarsController);
})();
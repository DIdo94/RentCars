(function () {
    function CarsController($state, $scope, ngDialog, $cookies, data, CarService, Notification, Hub) {
        debugger;
        var controller = this;
        controller.carService = CarService;
        var cars = [];
        var itemBrand = '';
        var itemModel = '';
        controller.cars = [];
        var page = 1;
        var numberOfRecords = 1;
        controller.page = page;
        controller.numberOfRecords = numberOfRecords;
        cars = data;
        controller.cars = cars.slice();
        var firstRecords = (controller.page - 1) * controller.numberOfRecords;
        var filteredCars = controller.cars.slice(firstRecords, (page - 1) * controller.numberOfRecords + controller.numberOfRecords);
        controller.filteredCars = filteredCars;
        var currentUser = $cookies.getObject('user');
        controller.currentUser = currentUser;

        var hub = new Hub('carHub', {
            listeners: {
                'carUpdated': function (dbCar) {
                    var parsedCar = JSON.parse(dbCar);
                    var updatedCarIndex = cars.findIndex(function (car) {
                        return car.id === parsedCar.id;
                    });

                    angular.copy(parsedCar, cars[updatedCarIndex]);
                    $scope.$apply();
                },
                'carAdded': function (dbCar) {
                    var parsedCar = JSON.parse(dbCar);
                    cars.push(parsedCar);
                    $scope.$apply();
                },
                'carRemoved': function (carId) {
                    var carIndex = cars.findIndex(car => car.id == carId);
                    if (carIndex > -1) {
                        cars.splice(cars[carIndex], 1);
                        $scope.$apply();
                    }
                }
            },
            rootPath: 'http://localhost:61818/signalr'
        });

        function pageChange(pageNumber) {
            this.page = pageNumber;
            firstRecords = (this.page - 1) * controller.numberOfRecords;
            angular.copy(controller.cars.slice(firstRecords, firstRecords + controller.numberOfRecords), controller.filteredCars);
        }

        function filter(brand, model) {
            this.page = 1;
            controller.page = 1;
            angular.copy(cars.filter(function (item) {
                itemBrand = brand ? brand : '';
                itemModel = model ? model : '';
                return item.brand.name.toLowerCase().includes(itemBrand.toLowerCase()) && item.model.name.toLowerCase().includes(itemModel.toLocaleLowerCase());
            }), controller.cars);
            firstRecords = (this.page - 1) * controller.numberOfRecords;
            angular.copy(controller.cars.slice(firstRecords, firstRecords + controller.numberOfRecords), controller.filteredCars);
        }

        this.watchFunction = function (value) {
            angular.copy(cars.slice(), controller.cars);
            filter(itemBrand, itemModel);
        }

        $scope.$watch(function ($scope) {
            return cars;
        }, this.watchFunction, true);

        function isAvailable(carRentDate) {
            return carRentDate > new Date().getTime();
        }

        function rentModal(car) {
            ngDialog.open({
                template: 'carRental/car/rentModal.html',
                controller: ['car', 'dbCars', 'currentUser', 'CarService', 'Notification', RentModal],
                className: 'ngdialog-theme-default',
                controllerAs: 'vm',
                showClose: false,
                scope: $scope,
                resolve: {
                    car: function () {
                        var dbCar = cars.filter(function (item) {
                            return item.id === car.id;
                        })[0];
                        return dbCar;
                    },
                    dbCars: function () { return controller.cars; },
                    currentUser: function () { return controller.currentUser; },
                    CarService: function () { return controller.carService; },
                    notification: function () { return Notification }
                }
            });
        }

        function addModal(controllerCars) {
            ngDialog.open({
                template: 'carRental/car/addCarTemplate.html',
                controller: ['car', 'cars', 'currentUser', 'CarService', 'Notification', RentModal],
                className: 'ngdialog-theme-default',
                controllerAs: 'vm',
                showClose: false,
                scope: $scope,
                resolve: {
                    car: function () { return null; },
                    cars: function () { return cars; },
                    currentUser: function () { return currentUser; },
                    CarService: function () { return controller.carService; },
                    notification: function () { return Notification }
                }
            });
        }

        function editModal(car) {
            ngDialog.open({
                template: 'carRental/car/editCarTemplate.html',
                controller: ['car', 'cars', 'currentUser', 'CarService', 'Notification', RentModal],
                className: 'ngdialog-theme-default',
                controllerAs: 'vm',
                showClose: false,
                scope: $scope,
                resolve: {
                    car: function () { return car; },
                    cars: function () { return cars; },
                    currentUser: function () { return currentUser; },
                    CarService: function () { return controller.carService; },
                    notification: function () { return Notification }
                }
            });
        }

        function deleteModal(car) {
            ngDialog.open({
                template: 'carRental/car/removeCarTemplate.html',
                controller: ['car', 'cars', 'currentUser', 'CarService', 'Notification', RentModal],
                className: 'ngdialog-theme-default',
                controllerAs: 'vm',
                showClose: false,
                scope: $scope,
                resolve: {
                    car: function () { return car; },
                    cars: function () { return cars; },
                    currentUser: function () { return currentUser; }
                }
            });
        }

        return {
            cars: controller.cars,
            filteredCars: controller.filteredCars,
            isAvailable: isAvailable,
            rent: rentModal,
            add: addModal,
            editCar: editModal,
            remove: deleteModal,
            page: controller.page,
            pageChange: pageChange,
            numberOfRecords: controller.numberOfRecords,
            filter: filter,
            currentUser: controller.currentUser
        };
    }
    angular.module('carRental.cars', ['carRental.rentalHistory', 'carRental.renters', 'ngCookies', 'ui.bootstrap.tpls'])
        .controller('CarsController', CarsController);
})();
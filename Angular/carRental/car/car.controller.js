(function () {
    function CarsController($state, $scope, ngDialog, $cookies) {
        var controller = this;
        var carService = new CarService($state, $cookies);
        var cars = carService.getAll();
        var page = 1;
        var numberOfRecords = 1;
        controller.page = page;
        controller.numberOfRecords = numberOfRecords;
        controller.cars = cars.slice();
        var firstRecords = (controller.page - 1) * controller.numberOfRecords;
        var filteredCars = controller.cars.slice(firstRecords, (page - 1) * controller.numberOfRecords + controller.numberOfRecords);
        controller.filteredCars = filteredCars;
        var currentUser = $cookies.getObject('user');
        var itemBrand = '';
        var itemModel = '';
        controller.currentUser = currentUser;
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
                return item.brand.toLowerCase().includes(itemBrand.toLowerCase()) && item.model.toLowerCase().includes(itemModel.toLowerCase());
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

        function rentModal(car, dbCars) {
            ngDialog.open({
                template: 'carRental/car/rentModal.html',
                controller: ['car', 'dbCars', 'currentUser', RentModal],
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
                    currentUser: function () { return controller.currentUser; }
                }
            });
        }

        function addModal(controllerCars) {
            ngDialog.open({
                template: 'carRental/car/addCarTemplate.html',
                controller: ['car', 'cars', 'currentUser', RentModal],
                className: 'ngdialog-theme-default',
                controllerAs: 'vm',
                showClose: false,
                scope: $scope,
                resolve: {
                    car: function () { return null; },
                    cars: function () { return cars; },
                    currentUser: function () { return currentUser; }
                }
            });
        }

        function editModal(car) {
            ngDialog.open({
                template: 'carRental/car/editCarTemplate.html',
                controller: ['car', 'cars', 'currentUser', RentModal],
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

        function deleteModal(car) {
            ngDialog.open({
                template: 'carRental/car/removeCarTemplate.html',
                controller: ['car', 'cars', 'currentUser', RentModal],
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
            isAvailable : isAvailable,
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
(function () {
    function CarsController($state, $scope, ngDialog, $cookies) {
        var controller = this;
        var carService = new CarService($state, $cookies);
        var cars = carService.getAll();
        var page = 1;
        var numberOfRecords = 4;
        this.page = page;
        this.numberOfRecords = numberOfRecords;
        this.cars = cars.slice();
        var filteredCars = this.cars.slice((page - 1) * this.numberOfRecords, (page - 1) * this.numberOfRecords + this.numberOfRecords);
        this.filteredCars = filteredCars;
        var currentUser = $cookies.getObject('user');
        this.currentUser = currentUser;
        function pageChange(pageNumber) {
            this.filteredCars = this.cars.slice((pageNumber - 1) * this.numberOfRecords, (pageNumber - 1) * this.numberOfRecords + this.numberOfRecords);
        }

        function filter(brand, model) {
            this.cars = cars.filter(function (item) {
                var itemBrand = brand ? brand : "";
                var itemModel = model ? model : "";
                return item.brand.toLowerCase().includes(itemBrand.toLowerCase()) && item.model.toLowerCase().includes(itemModel.toLowerCase());
            });

            var firstRecords = (page - 1) * this.numberOfRecords;
            controller.filteredCars = controller.cars.slice(firstRecords, firstRecords + this.numberOfRecords);
        }

        $scope.$watch(function watchFunction($scope) {
            return controller.cars;
        }, function () {
            debugger;
            var firstRecords = (page - 1) * controller.numberOfRecords;
            controller.filteredCars= controller.cars.slice(firstRecords, firstRecords + controller.numberOfRecords);
            $scope.$apply();
        }, true);

        function rentModal(car, cars) {
            ngDialog.open({
                template: 'carRental/car/rentModal.html',
                controller: ['car', 'cars', 'currentUser', RentModal],
                className: 'ngdialog-theme-default',
                controllerAs: 'vm',
                showClose: false,
                scope: $scope,
                resolve: {
                    car: function () { return controller.car; },
                    cars: function () { return controller.cars; },
                    currentUser: function () { return controller.currentUser; }
                }
            });
        }

        function addModal(cars) {
            ngDialog.open({
                template: 'carRental/car/addCarTemplate.html',
                controller: ['car', 'cars', 'currentUser', RentModal],
                className: 'ngdialog-theme-default',
                controllerAs: 'vm',
                showClose: false,
                scope: $scope,
                resolve: {
                    car: function () { return null; },
                    cars: function () { return controller.cars; },
                    currentUser: function () { return currentUser; }
                }
            });
        }
        return {
            cars: controller.cars,
            filteredCars: controller.filteredCars,
            rent: rentModal,
            add: addModal,
            page: page,
            pageChange: pageChange,
            numberOfRecords: controller.numberOfRecords,
            filter: filter,
            currentUser: controller.currentUser
        };
    }
    angular.module('carRental.cars', ['carRental.rentalHistory', 'carRental.renters', 'ngCookies', 'ui.bootstrap.tpls'])
        .controller('CarsController', CarsController);
})();
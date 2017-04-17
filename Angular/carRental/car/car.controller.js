(function () {
    function CarsController($state, $scope, ngDialog, $cookies) {
        var carService = new CarService($state, $cookies);
        var cars = carService.getAll();
        var page = 1;
        var numberOfRecords = 1;
        this.page = page;
        this.filtered = cars.slice();
        this.numberOfRecords = numberOfRecords;
        this.cars = cars.slice();
        var filteredCars = this.cars.slice((page - 1) * this.numberOfRecords, (page - 1) * this.numberOfRecords + this.numberOfRecords);
        this.filteredCars = filteredCars;
        var currentUser = $cookies.getObject('user');
        this.currentUser = currentUser;
        function pageChange(pageNumber) {
            this.filteredCars = this.filtered.slice((pageNumber - 1) * this.numberOfRecords, (pageNumber - 1) * this.numberOfRecords + this.numberOfRecords);
        }
        function filter(brand, model) {
            this.filtered = carService.getAll().filter(function (item) {
                var itemBrand = brand ? brand : "";
                var itemModel = model ? model : "";
                return item.brand.toLowerCase().includes(itemBrand.toLowerCase()) && item.model.toLowerCase().includes(itemModel.toLowerCase());
            });
            this.filteredCars = this.filtered.slice((page - 1) * this.numberOfRecords, (page - 1) * this.numberOfRecords + this.numberOfRecords);
        }
        function rentModal(car, cars) {
            ngDialog.open({
                template: 'templateId',
                controller: ['car', 'cars', 'currentUser', RentModal],
                controllerAs: 'vm',
                scope: $scope,
                resolve: {
                    car: function () { return car; },
                    cars: function () { return cars; },
                    currentUser: function () { return currentUser; }
                }
            });
        }
        return {
            cars: this.cars,
            filteredCars: this.filteredCars,
            rent: rentModal,
            page: page,
            pageChange: pageChange,
            numberOfRecords: this.numberOfRecords,
            filter: filter,
            filtered: this.filtered,
            currentUser: this.currentUser
        };
    }
    angular.module('carRental.cars', ['carRental.rentalHistory', 'carRental.renters', 'ngCookies', 'ui.bootstrap.tpls'])
        .controller('CarsController', CarsController);
})();
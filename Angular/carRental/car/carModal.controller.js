function CarModalController(car, dbCars, currentUser, CarService, notification, filterCriteria, totalItems, Upload) {
    var vm = this;
    vm.car = {};
    if (car) {
        angular.copy(car, vm.car);
        vm.car.rentedUntil = null;
        vm.car.numberOfDoors = car.numberOfDoors.toString();
    }

    vm.status = vm.car.status;
    CarService.getAllBrands().success(function (data) {
        vm.brands = data;
    });

    vm.addCar = function (scope) {
        vm.car.numberOfDoors = parseInt(vm.car.numberOfDoors);
        CarService.addCar(vm.car).success(function () {
            filterCriteria.pageNumber = 1;
            CarService.getAll(filterCriteria).success(function (data) {
                CarService.setFilterCarsResult(data);
            });
            notification.success('Car successfully added');
        }).error(function () {
            notification.error('Car not successfully added');
        });

        scope.closeThisDialog();
    };

    vm.loadPhoto = function (file) {
        if (file) {
            Upload.base64DataUrl(file).then(function (base64Image) {
                vm.car.mainImage = base64Image;
            });          
        }
    };

    vm.rentCar = function (scope) {
        vm.car.rentedFrom = new Date().toISOString();
        vm.car.rentedUntil = new Date(vm.car.rentedUntil).toISOString();
        CarService.rent(vm.car).success(function (data) {
            notification.warning('Redirecting to payment');
            setTimeout(() => window.location = data, 2000);
            //filterCriteria.pageNumber = 1;
            //CarService.getAll(filterCriteria).success(function (data) {
            //    CarService.setFilterCarsResult(data);
            //});

        }).error(function () {
            notification.error('Not successfully rented');
        });

        scope.closeThisDialog();
    };

    vm.editCar = function (scope) {
        vm.car.numberOfDoors = parseInt(vm.car.numberOfDoors);
        CarService.editCar(vm.car).success(function () {
            CarService.getAll(filterCriteria).success(function (data) {
                CarService.setFilterCarsResult(data);
            });
            notification.success('Successfully edited');
        }).error(function () {
            notification.error('Not successfully edited');
        });

        scope.closeThisDialog();
    };

    vm.removeCar = function (scope) {
        var dbCar = dbCars.map(function (item) {
            return item.id;
        }).indexOf(car.id);
        CarService.removeCar(car.id).success(function () {
            CarService.getAll(filterCriteria).success(function (data) {
                CarService.setFilterCarsResult(data);
            });
            notification.success('Successfully removed');
        }).error(function () {
            notification.error('Not successfully removed');
        });

        scope.closeThisDialog();
    };

    vm.startDateBeforeRender = function ($dates, $view) {
        var activeDate = moment().subtract(1, $view).add(1, 'm');
        $dates.filter(function (date) {
            return date.localDateValue() < activeDate.valueOf();
        }).forEach(function (date) {
            date.selectable = false;
        });
    };

    vm.onTimeSet = function (newDate, oldDate) {
        vm.car.rentedUntil = moment(vm.car.rentedUntil).format("YYYY-MM-DDTHH:mm:ss");
    };

    return vm;
}
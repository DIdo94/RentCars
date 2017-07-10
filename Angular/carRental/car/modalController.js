function RentModal(car, dbCars, currentUser, CarService, notification) {
    var vm = this;
    vm.car = {};
    vm.statuses = [
        {
            "key": 0,
            "value": "Rented"
        },
        {
            "key": 1,
            "value": "Available"
        },
        {
            "key": 2,
            "value": "Out of order"
        }
    ];
    if (car) {
        angular.copy(car, vm.car);
        vm.car.rentedUntil = null;
    }

    vm.status = vm.statuses[vm.car.status];

    CarService.getAllBrands().success(function (data) {
        vm.brands = data;
    });

    vm.addCar = function (scope) {
        vm.car.status = 1;
        CarService.addCar(vm.car).success(function () {
            dbCars.push(vm.car);
            notification.success('Car successfully added');
        }).error(function () {
            notification.error('Car not successfully added');
        });

        scope.closeThisDialog();
    }

    vm.loadPicture = function (form) {
        if (form.car.image.$valid) {

        }
    }

    vm.rentCar = function (scope) {
        vm.car.rentedBy = currentUser;//.name;
        vm.car.status = 0;
        var wrapper = moment();
        vm.car.rentedFrom = new Date().toISOString();
        vm.car.rentedUntil = new Date(vm.car.rentedUntil).toISOString();
        CarService.rent(vm.car).success(function () {
            angular.copy(vm.car, car);
            notification.success('Successfully rented');
        }).error(function () {
            notification.error('Not successfully rented');
        });
        scope.closeThisDialog();
    };

    vm.editCar = function (scope) {
        debugger;
        vm.car.status = vm.status.key;
        CarService.editCar(vm.car).success(function () {
            angular.copy(vm.car, car);
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
            dbCars.splice(dbCar, 1);
            notification.success('Successfully removed');
        }).error(function () {
            notification.error('Not successfully removed');
        });

        scope.closeThisDialog();
    }

    vm.startDateBeforeRender = function ($dates, $view) {
        var activeDate = moment().subtract(1, $view).add(1, 'm');
        $dates.filter(function (date) {
            return date.localDateValue() < activeDate.valueOf();
        }).forEach(function (date) {
            date.selectable = false;
        });
    }
    vm.onTimeSet = function (newDate, oldDate) {
        vm.car.rentedUntil = moment(vm.car.rentedUntil).format("MM-DD-YYYY, h:mm:ss A");
    }

    return vm;
}
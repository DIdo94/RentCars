function RentModal(car, dbCars, currentUser) {
    var vm = this;
    vm.car = {};
    if (car) {
        angular.copy(car, vm.car);
        vm.car.rentedUntil = null;
    }

    vm.addCar = function (scope) {
        vm.rentedBy = null;
        vm.rentedUntil = null;
        vm.rentedFrom = null;
        vm.status = 'Available';
        dbCars.push(vm.car);
        scope.closeThisDialog();
    }

    vm.loadPicture = function (form) {
        if (form.car.image.$valid) {

        }
    }
    vm.rentCar = function (scope) {
        vm.car.rentedBy = currentUser.name;
        vm.car.status = 'Rented';
        vm.car.rentedFrom = new Date();
        vm.car.rentedUntil = new Date(vm.car.rentedUntil);
        angular.copy(vm.car, car);
        scope.closeThisDialog();
    };

    vm.editCar = function (scope) {
        vm.car.rentedUntil = car.rentedUntil;
        angular.copy(vm.car, car);
        scope.closeThisDialog();
    };

    vm.removeCar = function (scope) {
        var som = dbCars.map(function(item) {
            return item.id;
        }).indexOf(car.id);
        dbCars.splice(som, 1);
        scope.closeThisDialog();
    }

    vm.startDateBeforeRender = function ($dates, $view) {
        var activeDate = moment().subtract(1, $view).add(1,'m');
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
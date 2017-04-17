function RentModal(car, cars, currentUser) {
    var vm = this;
    vm.car = car;
    vm.car.rentFor = '';// moment("100", "hmm").format("HH:mm");
    vm.cars = cars;
    vm.rentCar = function (carToRent, scope) {
        var dbCar = vm.cars.find(function (item) {
            return item.id === carToRent.id;
        });
        var momentDate = moment(dbCar.rentedUntil);
        if (momentDate) {
            momentDate = moment();
        }
        var hoursToAdd = moment(carToRent.rentFor).hours();
        var minsToadd = moment(carToRent.rentFor).minutes();
        momentDate.add(minsToadd, 'm').add(hoursToAdd, 'h');
        for (i in cars) {
            if (cars[i].id === carToRent.id) {
                cars[i].rentedUntil = momentDate.format('YYYY-MM-DD hh:mm A');
                cars[i].rentedBy = currentUser.name;
                cars[i].status = 'Rented';
                break;
            }
        }
        scope.closeThisDialog();
    };
    return vm;
}
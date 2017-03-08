(function () {
    function RentalHistoryController() {
        var rh = [
            { id: 1, rentedBy: 'Sasho', rentedUntil: new Date(2017, 2, 3, 21, 21, 30) },
            { id: 2, rentedBy: 'Gosho', rentedUntil: new Date(2017, 2, 3, 21, 21, 30) }
        ];
        return { rh: rh };
    }
    angular.module('carRental.rentalHistory',[])
        .controller('RentalHistoryController', RentalHistoryController);
})();
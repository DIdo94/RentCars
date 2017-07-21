(function () {
    function RentalHistoryController($scope, user, data, Hub) {
        var rh = [];
        rh = data;
        controller = this;
        controller.rentals = rh;

        return controller;
    }
    angular.module('carRental.rentalHistory', ['carRental.cars', 'data-table', 'smart-table'])
        .controller('RentalHistoryController', ['$scope', '$stateParams', 'data', RentalHistoryController]);
})();
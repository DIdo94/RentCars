(function () {
    function RentalHistoryController($scope, data, $stateParams, UserService) {
        debugger;
        controller = this;
        controller.rentalHistories = data.rentalHistories;
        controller.totalItems = data.totalItems;
        var rentalHistoriesFilterCriteria = {
            model: '',
            brand: '',
            rentedFrom: '',
            rentedUntil: '',
            itemsPerPage: 10,
            pageNumber: 1
        };
        controller.filter = function (tableState) {
            debugger;
            var pagination = tableState.pagination;
            rentalHistoriesFilterCriteria.pageNumber = ((pagination.start || 0) / pagination.number) + 1;
            rentalHistoriesFilterCriteria.itemsPerPage = pagination.number || 1;
            var search = tableState.search.predicateObject;
            rentalHistoriesFilterCriteria.brand = '';
            rentalHistoriesFilterCriteria.model = '';
            if (search.brand) {
                rentalHistoriesFilterCriteria.brand = search.brand;
            }

            if (search.model) {
                rentalHistoriesFilterCriteria.model = search.model;
            }

            UserService.getUserRentalHistories($stateParams.id, rentalHistoriesFilterCriteria).success(function (data) {
                controller.rentalHistories = data.rentalHistories;
                tableState.pagination.numberOfPages = Math.ceil(data.totalItems / rentalHistoriesFilterCriteria.itemsPerPage);
            });
        };
        return controller;
    }
    angular.module('carRental.rentalHistory', ['carRental.cars', 'smart-table'])
        .controller('RentalHistoryController', ['$scope', 'data', '$stateParams', 'UserService', RentalHistoryController]);
})();
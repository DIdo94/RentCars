(function () {
    function RentalHistoryController($scope, user, data) {
        var rh = [];
        //    { id: 1, userId: 1, rentedBy: 'Sasho1', carId: 1, brand: "Ford", model: "Mustang2", rentedFrom: new Date('10-10-2010'), rentedUntil: new Date('10-10-2015') },
        //    { id: 2, userId: 1, rentedBy: 'Sasho', carId: 1, brand: "Ford", model: "Mustang1", rentedFrom: new Date('10-10-2011'), rentedUntil: new Date('10-10-2010') },
        //    { id: 2, userId: 1, rentedBy: 'Sasho', carId: 1, brand: "Ford", model: "Mustang1", rentedFrom: new Date('10-10-2011'), rentedUntil: new Date('10-10-2010') },

        //];
        rh = data;
        controller = this;
        //var rentals = rh.filter(function (item) {
        //    return item.userId == parseInt(user.id);
        //});
        controller.rentals = rh;
        //var page = 1;
        //var numberOfRecords = 2;
        //controller.page = page;
        //controller.numberOfRecords = numberOfRecords;
        //controller.sortBy = '';
        //var firstRecords = (controller.page - 1) * controller.numberOfRecords;
        //var filteredRentals = controller.rentals.slice(firstRecords, firstRecords + controller.numberOfRecords);
        //controller.filteredRentals = filteredRentals;
        //function pageChange(pageNumber) {
        //    this.page = pageNumber;
        //    firstRecords = (this.page - 1) * controller.numberOfRecords;
        //    angular.copy(controller.rentals.slice(firstRecords, firstRecords + controller.numberOfRecords), controller.filteredRentals);
        //}
        //function changeSort(sortColumn) {
        //    controller.sortBy = sortColumn;
        //}
        //controller.pageChange = pageChange;
        //controller.changeSort = changeSort;
        //function filter(brand, model) {
        //    this.page = 1;
        //    angular.copy(rentals.filter(function (item) {
        //        itemBrand = brand ? brand : '';
        //        itemModel = model ? model : '';
        //        return item.brand.toLowerCase().includes(itemBrand.toLowerCase()) && item.model.toLowerCase().includes(itemModel.toLowerCase());
        //    }), controller.cars);
        //    firstRecords = (this.page - 1) * controller.numberOfRecords;
        //    angular.copy(controller.cars.slice(firstRecords, firstRecords + controller.numberOfRecords), controller.filteredCars);
        //}
        return controller;
    }
    angular.module('carRental.rentalHistory', ['carRental.cars', 'data-table', 'smart-table'])
        .controller('RentalHistoryController', ['$scope', '$stateParams', 'data', RentalHistoryController]);
})();
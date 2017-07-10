(function () {
    function RenterController(data, UserService) {
        //var renters = [
        //    { id: 1, firstName: 'firstName', lastName: 'Spoer', imageUrl: 'http://www.clker.com/cliparts/A/Y/O/m/o/N/placeholder-md.png' },
        //    { id: 2, firstName: 'second', lastName: 'Lvhe', imageUrl: 'http://www.clker.com/cliparts/A/Y/O/m/o/N/placeholder-md.png' },
        //    { id: 3, firstName: 'some', lastName: 'Dea', imageUrl: 'http://www.clker.com/cliparts/A/Y/O/m/o/N/placeholder-md.png' },
        //    { id: 4, firstName: 'seco', lastName: 'Soae', imageUrl: 'http://www.clker.com/cliparts/A/Y/O/m/o/N/placeholder-md.png' },
        //    { id: 5, firstName: 'thr', lastName: 'Ses', imageUrl: 'http://www.clker.com/cliparts/A/Y/O/m/o/N/placeholder-md.png' },
        //    { id: 6, firstName: 'thr', lastName: 'Ses', imageUrl: 'http://www.clker.com/cliparts/A/Y/O/m/o/N/placeholder-md.png' },
        //    { id: 6, firstName: 'thr', lastName: 'Ses', imageUrl: 'http://www.clker.com/cliparts/A/Y/O/m/o/N/placeholder-md.png' },
        //    { id: 6, firstName: 'thr', lastName: 'Ses', imageUrl: 'http://www.clker.com/cliparts/A/Y/O/m/o/N/placeholder-md.png' },
        //    { id: 6, firstName: 'thr', lastName: 'Ses', imageUrl: 'http://www.clker.com/cliparts/A/Y/O/m/o/N/placeholder-md.png' },
        //    { id: 6, firstName: 'thr', lastName: 'Ses', imageUrl: 'http://www.clker.com/cliparts/A/Y/O/m/o/N/placeholder-md.png' },
        //];
        var vm = this;
        var page = 1;
        var numberOfRecords = 1;
        vm.page = page;
        vm.filtered = data;
        vm.numberOfRecords = numberOfRecords;
        vm.renters = data;
        var filteredRenters = vm.renters.slice((page - 1) * vm.numberOfRecords, (page - 1) * vm.numberOfRecords + vm.numberOfRecords);
        vm.filteredRenters = filteredRenters;

        function pageChange(pageNumber) {
            this.page = pageNumber;
            var firstRecords = (pageNumber - 1) * vm.numberOfRecords;
            angular.copy(vm.filtered.slice(firstRecords, firstRecords + vm.numberOfRecords),vm.filteredRenters);
        }
        function filter(name) {
            vm.page = 1;
            vm.filtered = renters.filter(function (item) {
                var itemName = name ? name : '';
                var fullName = item.firstName + ' ' + item.lastName;
                return fullName.toLowerCase().includes(itemName.toLowerCase());
            });

            angular.copy(vm.filtered.slice((page - 1) * vm.numberOfRecords, (page - 1) * vm.numberOfRecords + vm.numberOfRecords),vm.filteredRenters);
        }
        return {
            renters: vm.renters,
            filtered: vm.filtered,
            filteredRenters: vm.filteredRenters,
            page: vm.page,
            pageChange: pageChange,
            numberOfRecords: vm.numberOfRecords,
            filter: filter
        };
    }
    angular
        .module('carRental.renters', [])
        .controller('RenterController', RenterController)
})();

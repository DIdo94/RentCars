(function () {
    function RenterController(data, $scope, UserService, Hub) {
        var vm = this;
        var page = 1;
        var numberOfRecords = 1;
        vm.page = page;
        vm.filtered = data;
        vm.numberOfRecords = numberOfRecords;
        vm.renters = data;
        var filteredRenters = vm.renters.slice((page - 1) * vm.numberOfRecords, (page - 1) * vm.numberOfRecords + vm.numberOfRecords);
        vm.filteredRenters = filteredRenters;


        var hub = new Hub('renterHub', {
            listeners: {
                'userAdded': function (user) {
                    debugger;
                    var parsedRenter = JSON.parse(user);
                    vm.renters.push(parsedRenter);
                    $scope.$apply();
                }
            },
            rootPath: 'http://localhost:61818/signalr'
        });

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

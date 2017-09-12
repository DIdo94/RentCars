(function () {
    function UserController(data, $scope, UserService, Hub) {
        var vm = this;
        vm.users = data.users;
        vm.totalItems = data.totalItems;
        var filterCriteria = {
            firstName: '',
            lastName: '',
            itemsPerPage: 4,
            pageNumber: 1
        };
        vm.filterCriteria = filterCriteria;
        var hub = new Hub('renterHub', {
            listeners: {
                'userAdded': function (user) {
                    var parsedUser = JSON.parse(user);
                    vm.users.push(parsedUser);
                    $scope.$apply();
                }
            },
            rootPath: 'http://localhost:61818/signalr'
        });

        vm.pageChange = function () {
            UserService.getAll(filterCriteria).success(function (data) {
                vm.users = data.users;
                vm.totalItems = data.totalItems;
            });
        };

        vm.filter = function () {
            vm.filterCriteria.pageNumber = 1;
            UserService.getAll(filterCriteria).success(function (data) {
                vm.users = data.users;
                vm.totalItems = data.totalItems;
            });
        };

        return vm;
    }

    angular
        .module('carRental.users', [])
        .controller('UserController', UserController);
})();

(function () {
    function CarDetailsController($stateParams) {
        var vm;
        var allCars = [
            { id: 1, name: 'Lincoln', color: 'blue', rentedBy: 'firstName Some', rentedUntil: new Date(2017, 2, 3, 21, 21, 30), imageUrl: 'http://media.caranddriver.com/images/media/51/lincoln-inline-photo-533489-s-original.jpg' },
            { id: 2, name: 'Ford', color: 'red', rentedBy: 'firstName Hey', rentedUntil: new Date(2017, 2, 3, 21, 21, 30), imageUrl: 'http://mustangsdaily.com/blog/wp-content/uploads/2013/02/10-2014-mustang-fp6-appearance-package.jpg' }
        ];
        var len = allCars.length;
        for (var i = 0; i < len; i++) {
            if (allCars[i].id == $stateParams.id) {
                vm = allCars[i];
                break;
            }
        }
        return vm;
    }

    angular.module('carRental.carDetails',[])
            .controller('CarDetailsController',['$stateParams',CarDetailsController])
})();
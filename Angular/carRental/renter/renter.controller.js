(function () {
    function RenterController() {
        var renters = [
            { id: 1, firstName: 'firstName', lastName: 'Some' },
            { id: 2, firstName: 'second', lastName: 'Some' }
        ];
        return {
            renters: renters
        };
    }
    angular
        .module('carRental.renters', [])
        .controller('RenterController', RenterController)
})();

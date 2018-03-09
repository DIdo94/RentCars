(function () {
    function PaymentController($scope, data, PaymentService) {
        var displayText = "Wait to finish payment…";
        controller = this;
        PaymentService.rentSucessful(data.paymentId, data.payerId)
        .then(function () {
            controller.displayText = "Payment Completed. Car successfully rented";
        }, function (ex) {
            debugger;
            controller.displayText = "Unexpected error. Car was not successfully rented";
        });

        controller.displayText = displayText;
        return controller;
    }
    angular.module('carRental.payment', [])
        .controller('PaymentController', PaymentController);
})();
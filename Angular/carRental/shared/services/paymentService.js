function PaymentService($cookies, $http) {
    var successfulRentUrl = 'http://localhost:61818/api/cars/rent/paymentSuccessful';
    var unsuccessfulRentUrl = 'http://localhost:61818/api/cars/rent/paymentFailed';

    function getToken() {
        if ($cookies.getObject('user')) {
            return $cookies.getObject('user').access_token;
        }

        return '';
    }

    var request = {
        headers: {
            'Authorization': 'Bearer ' + getToken(),
            'Content-Type': 'application/json'
        }
    };
    this.rentSucessful = function (paymentId, payerId) {
        debugger;
        request.method = 'POST';
        request.url = successfulRentUrl;
        request.data = JSON.stringify({
            paymentId: paymentId,
            payerId: payerId
        });
        return $http(request);
    }

    return this;
}
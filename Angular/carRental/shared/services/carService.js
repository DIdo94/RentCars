function CarService($cookies, $http) {
    function getToken() {
        return $cookies.getObject('token');
    }

    this.getAll = function () {
        debugger;
        var token = $cookies;
        var request = {
            method: 'GET',
            url: 'http://localhost:61818/api/cars',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + getToken(),
            },
            data: '',
            params: ''
        };

        return $http(request);
    };

    this.rent = function (car) {
        var request = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:61818/api/cars/rent/" + car.id,
            "method": "PUT",
            "headers": {
                "content-type": "application/json",
                "Authorization": "Bearer " + getToken(),
                "cache-control": "no-cache",
            },
            "processData": false,
            "data": JSON.stringify(car),
        };

        return $http(request);
    };

    this.getAllBrands = function () {
        var request = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:61818/api/cars/brands",
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "Authorization": "Bearer " + getToken(),
            },
        };

        return $http(request);
    };

    this.addCar = function (car) {
        var request = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:61818/api/cars/add",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "Authorization": "Bearer " + getToken(),
            },
            "processData": false,
            "data": JSON.stringify(car)
        };

        return $http(request);
    };

    this.editCar = function (car) {
        var request = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:61818/api/cars/" + car.id,
            "method": "PUT",
            "headers": {
                "content-type": "application/json",
                "Authorization": "Bearer " + getToken(),
            },
            "processData": false,
            "data": JSON.stringify(car)
        };

        return $http(request);
    };

    this.removeCar = function (carId) {
        var request = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:61818/api/cars/" + carId,
            "method": "DELETE",
            "headers": {
                "content-type": "application/json",
                "Authorization": "Bearer " + getToken(),
            },
            "processData": false
        };

        return $http(request);
    };
    return this;
}
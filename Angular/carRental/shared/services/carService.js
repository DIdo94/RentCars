function CarService($cookies, $http) {
    function getToken() {
        if ($cookies.getObject('user')) {
            return $cookies.getObject('user').access_token;
        }

        return '';
    }

    var filterCriteria = {
        brand: '',
        model: '',
        pageNumber: 1,
        itemsPerPage: 4,
        status: 'Available'
    };

    var request = {
        method: 'GET',
        url: '',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        },
        data: '',
        params: ''
    };
    this.filterCarsResult = {
        cars: [],
        totalItems: 0
    };
    this.getFilterCarsResult = function () {
        return this.filterCarsResult;
    };

    this.setFilterCarsResult = function (carResult) {
        this.filterCarsResult.cars = carResult.cars;
        this.filterCarsResult.totalItems = carResult.totalItems;
    };

    this.getAll = function (additionalfilterCriteria) {
        var mergedCriteria = filterCriteria;
        if (additionalfilterCriteria) {
            $.extend(mergedCriteria, additionalfilterCriteria);
        }
        request.method = 'GET';
        request.url = 'http://localhost:61818/api/cars';
        request.params = mergedCriteria;
        request.data = '';
        return $http(request);
    };

    this.rent = function (car) {
        request.url = 'http://localhost:61818/api/cars/rent/' + car.id;
        request.method = 'PUT';
        request.data = JSON.stringify(car);
        return $http(request);
    };

    this.getAllBrands = function () {
        request.url = 'http://localhost:61818/api/cars/brands';
        request.method = 'GET';
        request.params = '';
        request.data = '';
        return $http(request);
    };

    this.addCar = function (car) {
        request.url = 'http://localhost:61818/api/cars';
        request.method = 'POST';
        request.data = JSON.stringify(car);
        request.params = '';
        return $http(request);
    };

    this.editCar = function (car) {
        request.url = 'http://localhost:61818/api/cars/' + car.id;
        request.method = 'PUT';
        request.data = JSON.stringify(car);
        request.params = '';
        return $http(request);
    };

    this.removeCar = function (carId) {
        request.url = 'http://localhost:61818/api/cars/' + carId;
        request.method = 'DELETE';
        request.data = '';
        request.params = '';
        return $http(request);
    };

    return this;
}
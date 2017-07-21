function UserService($state, $cookies, $http) {
    function getToken() {
        return $cookies.getObject('token');
    }
    this.register = function (user) {
        var request = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:61818/api/Account/Register",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "cache-control": "no-cache"
            },
            "data": $.param({
                "email": user.email,
                "password": user.password,
                "confirmPassword": user.confirmPassword,
                "imageUrl": user.imageUrl,
                "firstName": user.firstName,
                "lastName": user.lastName
            })
        };
        return $http(request);
    };

    this.login = function (user) {
        var request = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:61818/Token",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "cache-control": "no-cache"
            },
            "data": $.param({
                "grant_type": "password",
                "userName": user.email,
                "password": user.password
            })
        };

        return $http(request);
    };

    this.getAll = function () {
        var request = {
            method: 'GET',
            url: 'http://localhost:61818/api/renters',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + getToken()
            },
            data: '',
            params: ''
        };

        return $http(request);
    };

    this.getUserRentalHistories = function (userId) {
        var request = {
            method: 'GET',
            url: 'http://localhost:61818/api/rentalHistories/' + userId,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + getToken()
            },
            data: '',
            params: ''
        };

        return $http(request);
    };

    return this;
}
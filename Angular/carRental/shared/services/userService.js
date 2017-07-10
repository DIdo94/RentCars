function UserService($state, $cookies, $http) {
    var token = "zAFhM1fdrr00J9hJQjMDfDy8Cp3bhRRBKqIFLtS2LvuzBSNpkG84qht38Rof95atSIXXKAu3852ROSZPb_dlITInW2rQJaNciB7MGRvfntBXW7FDg7vlI7W6JtV3XMheEchUWUnbVcRpuaB1QoLQD2Yg4YtStfKwUZJAN1iQ2eKYZ5geQSLw5xS3k-Hkn4HtZClKIu8F_dCSJ8oBbB8mWnmEqpZOeQdD8m96d5sEQUOE0Vr8rOzLrD6jYXOj8r7sbWaM9_-7vHbbucI8Zu3lIH2jcr1B3JYc2MWst6d26vb-7BuZn-FiM0NFMNMHJYU6AjZyNCY7Ev3UymSPW2ZB9ybw_QcyGN8TGNLUF9FNF0raUYEfxKWPkN1-zwZXOYcf3EoECZSezvgtdokv5GyDR_PC4hLAHDOSnQSJjihS0rsu78C0AZI735mt2iKmWpfM5o5_HwhWMU4sn3KrarDTxDGWA20PzdRDBwh7cHonrf0";
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
    }
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
        //{
        //      $cookies.putObject('user', { name: userWithEmail.name, email: userWithEmail.email, role: userWithEmail.role });
        //      var some = $cookies.getObject('user');
        //      $state.go('cars');
        //  }
    }

    this.getAll = function () {
        var request = {
            method: 'GET',
            url: 'http://localhost:61818/api/renters',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token,
            },
            data: '',
            params: ''
        };

        return $http(request);
    }

    this.getUserRentalHistories = function (userId) {
        var request = {
            method: 'GET',
            url: 'http://localhost:61818/api/renters/' + userId,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token,
            },
            data: '',
            params: ''
        };

        return $http(request);
    }

    return this;
}
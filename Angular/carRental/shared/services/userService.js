function UserService($state, $cookies, $http) {
    function getToken() {
        if ($cookies.getObject('user')) {
            return $cookies.getObject('user').access_token;
        }

        return '';
    }

    var request = {
        async: true,
        crossDomain: true,
        url: '',
        method: '',
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache"
        },
        data: {}
    };

    var usersfilterCriteria = {
        firstName: '',
        lastName: '',
        itemsPerPage: 1,
        pageNumber: 1
    };

    var rentalHistoriesFilterCriteria = {
        model: '',
        brand: '',
        rentedFrom: '',
        rentedUntil: '',
        itemsPerPage: 10,
        pageNumber: 1
    };

    this.register = function (user) {
        request.url = 'http://localhost:61818/api/Account/Register';
        request.method = 'POST';
        request.data = $.param({
            email: user.email,
            password: user.password,
            confirmPassword: user.confirmPassword,
            profileImage: user.profileImage,
            firstName: user.firstName,
            lastName: user.lastName
        });

        return $http(request);
    };

    this.login = function (user) {
        request.url = 'http://localhost:61818/Token';
        request.method = 'POST';
        request.data = $.param({
            "grant_type": "password",
            "userName": user.email,
            "password": user.password
        });
        return $http(request);
    };

    var getCollectionRequest = {
        method: 'GET',
        url: '',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + getToken()
        },
        data: '',
        params: ''
    };

    this.getAll = function (additionalFilterCriteria) {
        var mergedCriteria = usersfilterCriteria;
        if (additionalFilterCriteria) {
            $.extend(mergedCriteria, additionalFilterCriteria);
        }

        getCollectionRequest.url = 'http://localhost:61818/api/users';
        getCollectionRequest.params = mergedCriteria;
        return $http(getCollectionRequest);
    };

    this.getUserRentalHistories = function (userId, additionalFilterCriteria) {
        var mergedCriteria = rentalHistoriesFilterCriteria;
        if (additionalFilterCriteria) {
            $.extend(mergedCriteria, additionalFilterCriteria);
        }

        getCollectionRequest.url = `http://localhost:61818/api/users/${userId}/rentalHistories`;
        getCollectionRequest.params = mergedCriteria;
        return $http(getCollectionRequest);
    };

    return this;
}
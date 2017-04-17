function CarService($state, $cookies) {
    var cars = [
            { id: 1, brand: 'Ford', model: 'Mustang1', color: 'red', rentedBy: 'firstName Hey', status: 'Rented', rentedFrom: new Date(2017, 2, 3, 20, 21, 30), rentedUntil: new Date(2017, 2, 3, 21, 21, 30), imageUrl: 'http://st.motortrend.com/uploads/sites/10/2016/06/2017-ford-mustang-v6-coupe-angular-front.png?interpolation=lanczos-none&fit=around%7C317%3A211' },
            { id: 2, brand: 'Ford', model: 'Mustang2', color: 'red', rentedBy: null, status: 'Available', rentedFrom: new Date(2017, 2, 3, 19, 21, 30), rentedUntil: null, imageUrl: 'http://st.motortrend.com/uploads/sites/10/2016/06/2017-ford-mustang-v6-coupe-angular-front.png?interpolation=lanczos-none&fit=around%7C317%3A211' },
            //{ id: 3, brand: 'Ford', model: 'Mustang3', color: 'red', rentedBy: 'firstName Hey', rentedUntil: new Date(2017, 2, 3, 21, 21, 30), imageUrl: 'http://st.motortrend.com/uploads/sites/10/2016/06/2017-ford-mustang-v6-coupe-angular-front.png?interpolation=lanczos-none&fit=around%7C317%3A211' },
            //{ id: 4, brand: 'Ford', model: 'Mustang4', color: 'red', rentedBy: 'firstName Hey', rentedUntil: new Date(2017, 2, 3, 21, 21, 30), imageUrl: 'http://st.motortrend.com/uploads/sites/10/2016/06/2017-ford-mustang-v6-coupe-angular-front.png?interpolation=lanczos-none&fit=around%7C317%3A211' },
            //{ id: 5, brand: 'Ford', model: 'Mustang5', color: 'red', rentedBy: 'firstName Hey', rentedUntil: new Date(2017, 2, 3, 21, 21, 30), imageUrl: 'http://st.motortrend.com/uploads/sites/10/2016/06/2017-ford-mustang-v6-coupe-angular-front.png?interpolation=lanczos-none&fit=around%7C317%3A211' },
            //{ id: 6, brand: 'Ford', model: 'Mustang6', color: 'red', rentedBy: 'firstName Hey', rentedUntil: new Date(2017, 2, 3, 21, 21, 30), imageUrl: 'http://st.motortrend.com/uploads/sites/10/2016/06/2017-ford-mustang-v6-coupe-angular-front.png?interpolation=lanczos-none&fit=around%7C317%3A211' },
            //{ id: 7, brand: 'Ford', model: 'Mustang7', color: 'red', rentedBy: null, rentedUntil: new Date(2017, 2, 3, 21, 21, 30), imageUrl: 'http://st.motortrend.com/uploads/sites/10/2016/06/2017-ford-mustang-v6-coupe-angular-front.png?interpolation=lanczos-none&fit=around%7C317%3A211' }
    ];
    this.getAll = function () {
        return cars.slice();
    };
    return this;
}
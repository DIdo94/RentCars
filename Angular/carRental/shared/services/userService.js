
function UserService($state, $cookies) {
    var users = [{ id: 1, name: 'Toshp', email: 'dasd@gmail.com', password: 1234 }, { id: 2, name: 'tosho', email: 'das@gmail.com', password: 12345 }];
    this.users = users;
    this.register = function (user) {
        var userWithEmail = users.find(function (singleUser) {
            return singleUser.email == user.email;
        });
        if (userWithEmail) {
            alert('User with email already exists');
        } else {
            users.push(user);
            $cookies.put('user', { name: user.name, email: user.email });
            location.reload();
            $state.go('cars');
        }

    }
    this.login = function (user) {
        var userWithEmail = users.find(function (singleUser) {
            return singleUser.email == user.email;
        });
        if (!userWithEmail) {
            alert('User does not exist');
        } else {
            $cookies.put('user', { name: user.name, email: user.email });
            location.reload();
            $state.go('cars');
        }
    }
    return this;
}
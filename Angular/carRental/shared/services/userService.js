function UserService($state, $cookies) {
    var users = [
        { id: 1, name: 'Toshp', email: 'dasd@gmail.com', password: '123456', role: 'Admin' },
        { id: 2, name: 'tosho', email: 'das@gmail.com', password: '123456', role: 'User' }
    ];
    this.users = users;
    this.register = function (user) {
        var userWithEmail = users.find(function (singleUser) {
            return singleUser.email == user.email;
        });
        if (userWithEmail) {
            alert('User with email already exists');
        } else {
            users.push(user);
            $cookies.putObject('user', { name: user.name, email: user.email, role: user.role });
            $state.go('cars');
            location.reload();
        }
    }
    this.login = function (user) {
        var userWithEmail = users.find(function (singleUser) {
            return singleUser.email == user.email && singleUser.password == user.password;
        });
        if (!userWithEmail) {
            alert('User does not exist');
        } else {
            debugger;
            $cookies.putObject('user', { name: userWithEmail.name, email: userWithEmail.email, role: userWithEmail.role });
            var some = $cookies.getObject('user');
            $state.go('cars');
            location.reload();
        }
    }
    return this;
}
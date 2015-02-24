angular.module('signup').controller('SignupCtrl',function($scope, $rootScope, $state, AUTH_EVENTS, AuthService, Signup, flash){
    $scope.signupData = {
        name: '',
        email: '',
        password: ''
    };

    /**
     * to register user and make them logged in.
     *
     * @param signupData - { email: email, name: name, password: password }
     */
    $scope.singup = function (signupData) {
        $scope.$broadcast('show-errors-check-validity');

        if ($scope.signupForm.$valid) {
            Signup.register(signupData).then(function(register) {
                AuthService.login({username:signupData.email, password:signupData.password }).then(function (user) {
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    $scope.setCurrentUser(user);
                    $state.go('dashboard');
                }, function () {
                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                });
            }, function (response) {
                flash.error = response.data.errors[0];
                // Error response return list of errors.
                // Currently flash module we're using does not support to display list of error messages.
                //TODO: Find a way to display all the error messages from list
            });

        }
    };

});

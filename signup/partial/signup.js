angular.module('signup').controller('SignupCtrl',function($scope, $rootScope, $state, AUTH_EVENTS, AuthService, Signup){

    $scope.signupData = {
        name: '',
        email: '',
        password: ''
    };

    $scope.singup = function (signupData) {
        $scope.$broadcast('show-errors-check-validity');

        if ($scope.signupForm.$valid) {
            Signup.register(signupData).then(function(register) {
                AuthService.login({username:register.email, password:register.password }).then(function (user) {
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    $scope.setCurrentUser(user);
                    $state.go('dashboard');
                }, function () {
                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                });
            });
        } else {
            console.log("Invalid form submission");
            $scope.signupForm.submitted = true;
        }
    };

});

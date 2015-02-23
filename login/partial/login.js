angular.module('login').controller('LoginCtrl',function($scope, $rootScope, $state, AUTH_EVENTS, AuthService){
    $scope.credentials = {
        username: '',
        password: ''
    };
    $scope.login = function (credentials) {
        $scope.$broadcast('show-errors-check-validity');

        if ($scope.loginForm.$valid) {
            AuthService.login(credentials).then(function (user) {
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                $scope.setCurrentUser(user);
                $state.go('dashboard');
            }, function () {
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            });
        } else {
            console.log("Invalid form submission");
            $scope.loginForm.submitted = true;
        }
    };

    //$scope.username = angular.copy($scope.credentials.username);
});

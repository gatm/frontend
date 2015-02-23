angular.module('security').factory('AuthService',function ($http, SessionService) {
    var authService = {};

    authService.login = function (credentials) {
        return $http({
            method: 'POST',
            url: 'http://localhost:8080/gatm/v1/auth/login',
            headers: {'Content-Type': 'application/json;charset=UTF-8'},
            data: {
                username: credentials.username,
                password: credentials.password
            }
        }).then(function (res) {
            SessionService.create(
                res.data.username,
                res.data.access_token,
                res.data.roles
            );
            return res.data.username;
        });
    };

    authService.isAuthenticated = function () {
        return !!SessionService.token;
    };

    authService.isAuthorized = function (authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
        }
        return (authService.isAuthenticated() &&
        authorizedRoles.indexOf(SessionService.userRole) !== -1);
    };

    return authService;
});

angular.module('security').factory('AuthService',function ($http, SessionService, localStorageService) {
    var authService = {};

    /**
     * Login user and create session.
     *
     * @param credentials
     * @returns {*}
     */
    authService.login = function (credentials) {
        return $http({
            method: 'POST',
            url: 'http://localhost:8080/gatm/v1/auth/login', //TODO: Fix url
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
            localStorageService.set('token',res.data.access_token);
            return res.data.username;
        });
    };

    /**
     * Just to check if user has token in session.
     *
     * @returns {SessionService.token|*}
     */
    authService.isAuthenticated = function () {
        return (SessionService.token);
    };

    /**
     * Verify user's role.
     *
     * @param authorizedRoles
     * @returns {*|boolean}
     */
    authService.isAuthorized = function (authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
        }
        return (authService.isAuthenticated() &&
        authorizedRoles.indexOf(SessionService.userRole) !== -1);
    };

    /**
     * Verify current user session from server with token.
     */
    authService.requestCurrentUser = function() {

        if (localStorageService.get('token')) {
            return $http({
                method: 'POST',
                url: 'http://localhost:8080/gatm/v1/auth/validate', //TODO: Fix url
                headers: {'Content-Type': 'application/json;charset=UTF-8'}
            });

        }
        return null;
    };

    /**
     * Remove token from storage/clear up the session
     */
    authService.clearUpSession = function () {
        SessionService.destroy();
        localStorageService.remove('token');
    };

    return authService;
});

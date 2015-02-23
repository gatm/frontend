angular.module('security').config(function ($httpProvider) {
    $httpProvider.interceptors.push([
        '$injector',
        function ($injector) {
            return $injector.get('AuthInterceptor');
        }
    ]);
}).factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS, localStorageService) {
    return {
        // On request success
        request: function (config) {

            if (localStorageService.get('token')) {
                config.headers['Authorization'] = localStorageService.get('token');
            }
            // Return the config or wrap it in a promise if blank.
            return config || $q.when(config);
        },
        // On response failture
        responseError: function (response) {
            localStorageService.remove('token');
            $rootScope.$broadcast({
                401: AUTH_EVENTS.notAuthenticated,
                403: AUTH_EVENTS.notAuthorized,
                419: AUTH_EVENTS.sessionTimeout,
                440: AUTH_EVENTS.sessionTimeout
            }[response.status], response);
            return $q.reject(response);
        }
    };
});

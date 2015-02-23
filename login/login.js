angular.module('login', ['ui.bootstrap','ui.utils', 'ui.router']);

angular.module('login').config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/login");
    /* Add New Routes Above */
    $stateProvider
        .state('login', {
            url: "/login",
            views: {
                body: {
                    templateUrl: "/login/partial/login.html"
                }
            },
            data: {
                isSecure:false
                //authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
            }
        });
});


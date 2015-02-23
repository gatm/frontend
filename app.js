angular.module('gatm', ['ui.bootstrap', 'security', 'login', 'signup', 'dashboard']);

angular.module('gatm').config(function($routeProvider, $locationProvider, $urlRouterProvider) {

    /* Add New Routes Above */
    //$routeProvider.otherwise({redirectTo:'/home'});

    // enable html5Mode for pushstate ('#'-less URLs)
    //$locationProvider.html5Mode(true);
    //$locationProvider.hashPrefix('!');

    //$urlRouterProvider.otherwise('/login');

})
.controller('ApplicationController', function ($scope,
                                               USER_ROLES,
                                               AuthService) {
    $scope.currentUser = null;
    $scope.userRoles = USER_ROLES;
    $scope.isAuthorized = AuthService.isAuthorized;

    $scope.setCurrentUser = function (user) {
        console.log("user->" + user);
        $scope.currentUser = user;
    };
});


angular.module('gatm').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});

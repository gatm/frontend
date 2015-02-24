angular.module('gatm', ['ui.bootstrap', 'LocalStorageModule', 'security', 'login', 'signup', 'dashboard',
    'angular-flash.service', 'angular-flash.flash-alert-directive']);

angular.module('gatm').config(function($routeProvider,
                                       $locationProvider,
                                       $urlRouterProvider,
                                       localStorageServiceProvider,
                                       flashProvider) {
    //setting prefix for storage.
    localStorageServiceProvider.setPrefix('tm');

    // Support bootstrap 3.0 "alert-danger" class with error flash types
    flashProvider.errorClassnames.push('alert-danger');

    /**
     * Also have...
     *
     * flashProvider.warnClassnames
     * flashProvider.infoClassnames
     * flashProvider.successClassnames
     */

    /* Add New Routes Above */
    //$routeProvider.otherwise({redirectTo:'/home'});

    // enable html5Mode for pushstate ('#'-less URLs)
    //$locationProvider.html5Mode(true);
    //$locationProvider.hashPrefix('!');

    //$urlRouterProvider.otherwise('/login');

})
.controller('ApplicationController', function ($scope,
                                               USER_ROLES,
                                               AuthService,
                                               AUTH_EVENTS,
                                               $state) {
        $scope.currentUser = null;
        $scope.userRoles = USER_ROLES;
        $scope.isAuthorized = AuthService.isAuthorized;

        $scope.setCurrentUser = function (user) {
            $scope.currentUser = user;
        };

        //change state to login incase of authorisation declined.
        $scope.$on(AUTH_EVENTS.notAuthenticated, function (event, data) {
            $state.go("login");
        });

        $scope.$on(AUTH_EVENTS.notAuthorized, function (event, data) {
            $state.go("login");
        });

    });


angular.module('gatm').run(function($rootScope, AuthService, AUTH_EVENTS, $state, SessionService) {
    $rootScope.$on('$stateChangeStart', function (event, next) {
        var _isSecure = next.data.isSecure;

        if(_isSecure) {
            if (!AuthService.isAuthenticated()) {
                event.preventDefault();
                $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
            }
        }

        var promise = AuthService.requestCurrentUser();
        if (promise) {

            promise.then(function (res) {
                SessionService.create(res.data.access_token, res.data.username, res.data.roles);
                $state.transitionTo('dashboard');
            }, function(result) {
                //AuthService.clearUpSession();
                //$state.transitionTo('login');
            });
        }
    });

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

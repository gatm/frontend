angular.module('gatm', ['ui.bootstrap', 'ui.utils', 'ngRoute', 'ngAnimate', 'security', 'login', 'signup']);

angular.module('gatm').config(function($routeProvider) {

    /* Add New Routes Above */
    //$routeProvider.otherwise({redirectTo:'/home'});

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

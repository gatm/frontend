angular.module('signup', ['ui.bootstrap','ui.utils', 'ui.router']);

angular.module('signup').config(function($stateProvider) {

    /* Add New Routes Above */
    $stateProvider
        .state('signup', {
            url: "/signup",
            templateUrl: "/signup/partial/signup.html"
        });

});


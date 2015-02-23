angular.module('dashboard', ['ui.bootstrap','ui.utils','ngRoute','ngAnimate']);

angular.module('dashboard').config(function($stateProvider) {

    $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            views: {
                header: {
                    templateUrl: '/dashboard/partial/header/header.html'
                },
                body: {
                    templateUrl: '/dashboard/partial/dashboard/dashboard.html'
                },
                footer: {
                    templateUrl: '/dashboard/partial/footer/footer.html'
                }
            }
        });
});


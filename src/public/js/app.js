var app = angular.module('Cass', ['ngRoute', 'app.controllers', 'app.directives', 'app.services'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', { templateUrl: 'views/login.html', controller: 'LoginCtrl' });
        $routeProvider.when('/:name', {
            templateUrl: function(url) {
                return 'views/' + url.name + '.html';
            }
        });
        $routeProvider.when('/:name/:id', {
            templateUrl: function(url) {
                return 'views/' + url.name + '.html';
            },
            controller: 'UsrCtrl'
        });
        $routeProvider.otherwise({ templateUrl: 'views/login.html', controller: 'LoginCtrl' });
    }]);
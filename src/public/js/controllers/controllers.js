angular.module('app.controllers', [])
    .controller('MainCtrl', ['$scope', 'HttpService', function($scope, HttpService) {
        HttpService.getUsers().then(function(usrs) {
            $scope.users = usrs.data;
        });
    }]);
angular.module('app.controllers', [])
    .controller('MainCtrl', ['$scope', 'HttpService', function($scope, HttpService) {
        HttpService.getUsers().then(function(usrs) {
            $scope.users = usrs.data;
        });
    }])
    .controller('AddUsrCtrl', ['$scope', 'HttpService', function($scope, HttpService) {
        $scope.addUser = function(form) {
            console.log(form.user);
            if ($scope.userForm.$valid) {
                HttpService.addUser(form.user).then(function(added) {
                    console.log(added);
                }, function(err) {
                    console.log(err);
                });
            }
        }
    }])
    .controller('UsrCtrl', ['$scope', '$routeParams', 'HttpService', 
        function($scope, $routeParams, HttpService) {
            console.log($routeParams.id);
            HttpService.getUser($routeParams.id).then(function(usr) {
                $scope.user = usr.data;
            }, function(err) {
                console.log(err);
            });
        }
    ]);
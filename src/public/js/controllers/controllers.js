angular.module('app.controllers', [])
    .controller('LoginCtrl', ['$scope', 'HttpService', '$location', function($scope, HttpService, $location) {
        $scope.validateUser = function() {
            HttpService.signin($scope.uname).then(function(resp) {
                if (resp.data.success) {
                    HttpService.setLoggedIn(true);
                    $location.path(resp.data.path);
                }
            }).catch(function(err) {
                console.log(err);
                alert(err.data.message.message);
            });
        }
    }])
    .controller('MainCtrl', ['$scope', 'HttpService', '$location', function($scope, HttpService, $location) {
        if (HttpService.isLoggedIn()) {
            HttpService.getUsers().then(function(usrs) {
                $scope.users = usrs.data;
            });
        } else {
            $location.path('/');
        }
    }])
    .controller('AddUsrCtrl', ['$scope', 'HttpService', function($scope, HttpService) {
        $scope.addUser = function(form) {
            if ($scope.userForm.$valid) {
                HttpService.addUser(form.user).then(function(added) {
                    console.log(added);
                }, function(err) {
                    console.log(err);
                });

                HttpService.addUserToCommentSystem(form.user.username).then(function(added) {
                    console.log(added);
                }, function(err) {
                    console.log(err);
                });
            }
        }
    }])
    .controller('UsrCtrl', ['$scope', '$routeParams', 'HttpService', 
        function($scope, $routeParams, HttpService) {
            HttpService.getUser($routeParams.id).then(function(usr) {
                $scope.user = usr.data;
            }, function(err) {
                console.log(err);
            });
        }
    ]);
angular.module('app.controllers', [])
    .controller('LoginCtrl', ['$scope', 'LoginService', '$location', function($scope, LoginService, $location) {
        $scope.validateUser = function() {
            LoginService.signin($scope.uname).then(function(resp) {
                if (resp.data.success) {
                    LoginService.setLoggedIn(true);
                    $location.path(resp.data.path);
                }
            }).catch(function(err) {
                console.log(err);
                alert(err.data.message.message);
            });
        }
    }])
    .controller('MainCtrl', ['$scope', 'UserService', 'LoginService', '$location', function($scope, UserService, LoginService, $location) {
        if (LoginService.isLoggedIn()) {
            UserService.getUsers().then(function(usrs) {
                $scope.users = usrs.data;
            });
        } else {
            $location.path('/');
        }
    }])
    .controller('AddUsrCtrl', ['$scope', 'UserService', 'LoginService', '$location', function($scope, UserService, LoginService, $location) {
        if (LoginService.isLoggedIn()) {
            $scope.addUser = function(form) {
                if ($scope.userForm.$valid) {
                    UserService.addUser(form.user).then(function(added) {
                        console.log(added);
                    }, function(err) {
                        console.log(err);
                    });
                }
            }
        } else {
            $location.path('/');
        }
    }])
    .controller('UsrCtrl', ['$scope', '$routeParams', 'UserService', 
        function($scope, $routeParams, UserService) {
            UserService.getUser($routeParams.id).then(function(usr) {
                $scope.user = usr.data;
            }, function(err) {
                console.log(err);
            });
        }
    ]);
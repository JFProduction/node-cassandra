angular.module('app.controllers', [])
    .controller('LoginCtrl', ['$scope', 'LoginService', '$location', ($scope, LoginService, $location) => {
        $scope.validateUser = () => {
            LoginService.signin($scope.uname).then((resp) => {
                if (resp.data.success) {
                    LoginService.setLoggedIn(true);
                    $location.path(resp.data.path);
                }
            }).catch((err) => {
                console.log(err);
                alert(err.data.message.message);
            });
        }
    }])
    .controller('MainCtrl', ['$scope', 'UserService', 'LoginService', '$location', 'SearchService',
            ($scope, UserService, LoginService, $location, SearchService) => {
        if (LoginService.isLoggedIn()) {
            $scope.service = SearchService;
            UserService.getUsers().then((usrs) => {
                $scope.users = usrs.data;
                SearchService.setUsers($scope.users);
            });

            $scope.$watch((scope) => {
                return scope.service.getUsers();
            }, (filteredUsers, users) => {
                $scope.users = filteredUsers;
            });
        } else {
            $location.path('/');
        }
    }])
    .controller('AddUsrCtrl', ['$scope', 'UserService', 'LoginService', '$location', ($scope, UserService, LoginService, $location) => {
        if (LoginService.isLoggedIn()) {
            $scope.addUser = (form) => {
                if ($scope.userForm.$valid) {
                    UserService.addUser(form.user).then((added) => {
                        console.log(added);
                    }, (err) => {
                        console.log(err);
                    });
                }
            }
        } else {
            $location.path('/');
        }
    }])
    .controller('UsrCtrl', ['$scope', '$routeParams', 'UserService', 
        ($scope, $routeParams, UserService) => {
            UserService.getUser($routeParams.id).then((usr) => {
                $scope.user = usr.data;
            }, (err) => {
                console.log(err);
            });
        }
    ]);
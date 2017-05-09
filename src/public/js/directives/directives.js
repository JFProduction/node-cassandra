angular.module('app.directives', [])
    .directive('userdetails', [() => {
        return {
            restrict: 'E',         
            templateUrl: 'views/templates/user.tmp.html'
        }
    }])
    .directive('searchnav', [() => {
        return {
            restrict: 'E',
            templateUrl: 'views/templates/searchnav.tmp.html',
            controller: ['$scope', 'SearchService', ($scope, SearchService) => {
                $scope.search = () => {
                    console.log('you have searched...');
                }

                $scope.filterUsers = () => {
                    SearchService.filterUsers($scope.search.input);
                }
            }]
        }
    }])
    .directive('sidemenu', [() => {
        return {
            restrict: 'E',
            templateUrl: 'views/templates/sidebar.tmp.html',
            controller: ['$scope', '$location', ($scope, $location) => {
                $scope.toggleMenu = () => {
                    $('.sidemenu-wrapper').toggleClass('hide-menu');
                    $('.menu-btn').toggleClass('menu-btn-left');
                    $('.menu-btn').toggleClass('glyphicon glyphicon-triangle-right');
                    $('.menu-btn').toggleClass('glyphicon glyphicon-triangle-left');
                }
            }]
        }
    }])
    .directive('messaging', [() => {
        return {
            restrict: 'E',         
            templateUrl: 'views/templates/messaging.tmp.html',
            controller: ['$scope', ($scope) => {
                $scope.minimizeChat = () => {
                    $('.message-wrapper').toggleClass('minimize');
                    $('.chat-btn').toggleClass('glyphicon glyphicon-triangle-bottom');
                    $('.chat-btn').toggleClass('glyphicon glyphicon-triangle-top');
                }
            }],
        }
    }]);
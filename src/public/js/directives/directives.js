angular.module('app.directives', [])
    .directive('userdetails', [function() {
        return {
            restrict: 'E',         
            templateUrl: 'views/templates/user.tmp.html'
        }
    }])
    .directive('searchnav', [function() {
        return {
            restrict: 'E',
            templateUrl: 'views/templates/searchnav.tmp.html',
            controller: ['$scope', function($scope) {
                $scope.search = function() {
                    console.log('you have searched...');
                }
            }]
        }
    }])
    .directive('sidemenu', [function() {
        return {
            restrict: 'E',
            templateUrl: 'views/templates/sidebar.tmp.html',
            controller: ['$scope', '$location', function($scope, $location) {
                $scope.toggleMenu = function() {
                    $('.sidemenu-wrapper').toggleClass('hide-menu');
                    $('.menu-btn').toggleClass('menu-btn-left');
                    $('.menu-btn').toggleClass('glyphicon glyphicon-triangle-right');
                    $('.menu-btn').toggleClass('glyphicon glyphicon-triangle-left');
                }
            }]
        }
    }])
    .directive('messaging', [function() {
        return {
            restrict: 'E',         
            templateUrl: 'views/templates/messaging.tmp.html',
            controller: ['$scope', function($scope) {
                $scope.minimizeChat = function() {
                    $('.message-wrapper').toggleClass('minimize');
                    $('.chat-btn').toggleClass('glyphicon glyphicon-triangle-bottom');
                    $('.chat-btn').toggleClass('glyphicon glyphicon-triangle-top');
                }
            }],
        }
    }]);
angular.module('app.directives', [])
    .directive('userdetails', [function() {
        return {
            restrict: 'E',         
            templateUrl: 'views/templates/user.tmp.html'
        }
    }])
    .directive('sidemenu', [function() {
        return {
            restrict: 'E',
            templateUrl: 'views/templates/sidebar.tmp.html',
            controller: ['$scope', function($scope) {
                $scope.toggleMenu = function() {
                    $('.sidemenu-wrapper').toggleClass('hide-menu');
                    $('.menu-btn').toggleClass('menu-btn-left');
                    $('.menu-btn').toggleClass('glyphicon glyphicon-triangle-right');
                    $('.menu-btn').toggleClass('glyphicon glyphicon-triangle-left');
                }
            }]
        }
    }]);
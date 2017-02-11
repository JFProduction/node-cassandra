angular.module('app.directives', [])
    .directive('userdetails', [function() {
        return {
            restrict: 'E',         
            templateUrl: 'views/templates/user.tmp.html'
        }
    }]);
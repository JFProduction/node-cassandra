angular.module('app.services', [])
    .service('HttpService', ['$http', '$q', function($http, $q) {
        this.getUsers = function() {
            var deferred = $q.defer();
            $http.get('/users').then(function(users) {
                console.log(users)
                deferred.resolve(users);
            }, function(err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
    }]);
angular.module('app.services', [])
    .service('HttpService', ['$http', '$q', function($http, $q) {
        this.getUsers = function() {
            var deferred = $q.defer();
            $http.get('/users').then(function(users) {
                deferred.resolve(users);
            }, function(err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.getUser = function(id) {
            var deferred = $q.defer();
            $http.get('/user/' + id).then(function(user) {
                deferred.resolve(user);
            }, function(err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.addUser = function(user) {
            var deferred = $q.defer();
            $http({
                url: '/adduser',
                data: JSON.stringify(user),
                contentType: 'application/json',
                method: 'POST'
            }).then(function(added) {
                deferred.resolve(added);
            }, function(err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
    }]);
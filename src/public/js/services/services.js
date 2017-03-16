angular.module('app.services', [])
    .service('UserService', ['$http', '$q', function($http, $q) {
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
    }])
    .service('LoginService', ['$http', '$q', function($http, $q) {
        var loggedIn = false;
        this.setLoggedIn = function(loggedIn) {
            this.loggedIn = loggedIn;
        }
        this.isLoggedIn = function() {
            return this.loggedIn;
        }

        this.signin = function(uname) {
            var deferred = $q.defer();
            $http.get('/validate/' + uname).then(function(resp) {
                deferred.resolve(resp);
            }, function(err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
    }]);
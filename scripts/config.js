
;(function(){
  'use strict';
  angular.module('congressApp')
  .config(function($routeProvider){
    $routeProvider
    .when('/', {
      templateUrl: 'views/search.html',
      controller: 'LocateDistrictController',
      controllerAs: 'Locate'
    })
    .when('/district/:id', {
      templateUrl: 'views/congressman.html',
      controller: 'LocateDistrictController',
      controllerAs: 'Locate'
    })
    .otherwise({redirectTo: '/'});
  });
}());

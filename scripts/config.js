
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
    .when('/new', {
      templateUrl: 'views/congressman.html',
      controller: 'LocateDistrictController',
      controllerAs: 'Locate'
    })
    .otherwise({redirectTo: '/'});
  });
}());

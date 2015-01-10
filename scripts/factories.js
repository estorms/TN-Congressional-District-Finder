;(function() {
  'use strict';
  angular.module('congressApp')
    .factory('apiGrab', function($http) {
       var apiGrab = {};
      apiGrab.findNew = function(lat, lng) {
        var begin = 'https://congress.api.sunlightfoundation.com/districts/locate?latitude=';
        var middle = '&longitude=';
        var end = '&apikey=996b297956f34029b3074b37010cf488';
        var url = begin + lat + middle + lng + end;
        return $http.get(url);
      };
      apiGrab.committees = function(ident) {
        var start = 'https://api.nytimes.com/svc/politics/v3/us/legislative/congress/members/';
        var keys = '.json?api-key=3b102c5c422065bb5014fe911363435f:5:69256977';
        var url = start + ident + keys;
        return $http.get(url);
      };
      apiGrab.bioPhoto = function(district) {
        var firebase = 'https://congressmanfinder.firebaseio.com/district/districts/';
        var url = firebase + district +'/' + '.json';
        return $http.get(url);

      };
      apiGrab.findCongressman = function(lat, lng) {
        var begin = 'https://congress.api.sunlightfoundation.com/legislators/locate?latitude=';
        var middle = '&longitude=';
        var end = '&apikey=996b297956f34029b3074b37010cf488';
        var url = begin + lat + middle + lng + end;
        return $http.get(url);
      };


      return apiGrab;

  });
}());

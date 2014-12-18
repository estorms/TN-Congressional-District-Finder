;(function() {
  'use strict';
  angular.module('congressApp', [])
  .controller('LocateDistrictController', function($http) {
    var a = this;
//grab geolocation information
  a.findNewAddress = function(data) {
    var url = 'http://open.mapquestapi.com/geocoding/v1/address?key=Fmjtd%7Cluurn1uy2u%2C8s%3Do5-9wysd4&inFormat=json&json={"location":{"street": ' + a.newAddress.street +',"city": ' + a.newAddress.city +',"state": ' + a.newAddress.state +',"postalCode": ' + a.newAddress.zipcode +'}}';
     $http.get(url)
    .success(function(data){
      a.geoloced = (data);
      var lat = data.results[0].locations[0].latLng.lat;
      var lng = data.results[0].locations[0].latLng.lng;
      a.districtName(lat, lng);
      a.congressMan(lat, lng);
    })
    .error(function(err){
      console.log(err);
    });
  };
//use geolocation lat and lng to get district information.
  a.districtName = function(lat, lng) {
     var begin = 'https://congress.api.sunlightfoundation.com/districts/locate?latitude=';
     var middle = '&longitude=';
     var end = '&apikey=996b297956f34029b3074b37010cf488';
    var url = begin + lat + middle + lng + end;
    $http.get(url)
    .success(function(data){
      a.district = (data);
      var district = data.results[0].district;
      var state = data.results[0].state;
      console.log(state + district);
      console.log(data);
    })
    .error(function(err){
      console.log(err);
    });
  };
  a.congressMan = function(lat, lng) {
    var begin = 'https://congress.api.sunlightfoundation.com/legislators/locate?latitude=';
    var middle = '&longitude=';
    var end = '&apikey=996b297956f34029b3074b37010cf488';
    var url = begin + lat + middle + lng + end;
    $http.get(url)
    .success(function(data){
      a.representative = (data);
      console.log(data);
    a.congress {
      name:
    }
    })
    .error(function(err){
      console.log(err);
    });
  };

  });
}());

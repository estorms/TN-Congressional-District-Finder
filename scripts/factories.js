;(function() {
  'use strict';
  angular.module('congressApp')
  .factory('findLatLng', function($http) {
      var url = 'https://open.mapquestapi.com/geocoding/v1/address?key=Fmjtd%7Cluurn1uy2u%2C8s%3Do5-9wysd4&inFormat=json&json={"location":{"street": ' + locate.newAddress.street +',"city": ' + locate.newAddress.city +',"state": ' + locate.newAddress.state +',"postalCode": ' + locate.newAddress.zipcode +'}}';
      function findNewAddress(data) {
      $http.get(url)
      .success(function(data){
        data = data;
      })
      .error(function(err){
        console.log(err);
      });
      return {geoLocate: geoLocate};
    }
    });
}());
// var lat = data.results[0].locations[0].latLng.lat;
// var lng = data.results[0].locations[0].latLng.lng;

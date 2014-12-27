;(function() {
  'use strict';
 angular.module('congressApp', ['uiGmapgoogle-maps'])
  .controller('MapController', function($scope) {
  $scope.map = { center: { latitude: 35.78528, longitude: -86.617504 }, options: { minZoom: 7, draggable: false, cursor: false}, zoom: 7, fusionlayer: {
    showFusionTables: true,
    options: {
      query: {
        select: '\'color\'',
        from: '1SQqYHvfYPSeseU6NkjIEAR4_wclKpgaGW3Fwbi66'
      }
    }
}
};
})
  .controller('LocateDistrictController', function($http) {
    var a = this;
//grab geolocation information
  a.findNewAddress = function(data) {
    var url = 'https://open.mapquestapi.com/geocoding/v1/address?key=Fmjtd%7Cluurn1uy2u%2C8s%3Do5-9wysd4&inFormat=json&json={"location":{"street": ' + a.newAddress.street +',"city": ' + a.newAddress.city +',"state": ' + a.newAddress.state +',"postalCode": ' + a.newAddress.zipcode +'}}';
     $http.get(url)
    .success(function(data){
      a.geoLocate = data;
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
      a.district = data.results[0].district;
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
    a.items = {};
    $http.get(url)
    .success(function(data){
      data = data.results[0];
      var website = data.website;
      var phone = data.phone;
      var fax = data.fax;
      var youTube = data.youtube_id;
      var twitter = data.twitter_id;
      var email = data.oc_email;
      var fullName = data.first_name + " " + data.last_name ;
      a.items['fullName'] = fullName;
      a.items['website'] = website;
      a.items['email'] = email;
      a.items['youTube'] = youTube;
      a.items['twitter'] = twitter;
      a.items['phone'] = phone;
      a.items['fax'] = fax;
      console.log(data);
    })
    .error(function(err){
      console.log(err);
    });
  };
});
}());

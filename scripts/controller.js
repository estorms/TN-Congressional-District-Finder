;(function() {
  'use strict';
 angular.module('congressApp')
.controller('MapController', function($scope) {
  $scope.map = { center: { latitude: 35.78528, longitude: -86.617504 }, options: { minZoom: 7, draggable: false, cursor: false}, zoom: 7, fusionlayer: {
    showFusionTables: true,
    options: {
      query: {
        select: 'geometry',
        from: '14LfN-D8Ress56kC0CSM9xQ8I7b_cL4uqT5TUW2MT',
      },
}
  }
};
})
.controller('LocateDistrictController', function($http, $location, $routeParams) {
  var a = this;
  a.items = {};
  a.findNewAddress = function(data) {
    var url = 'https://www.mapquestapi.com/geocoding/v1/address?key=Fmjtd%7Cluurn1uy2u%2C8s%3Do5-9wysd4&inFormat=json&json={"location":{"street": ' + a.newAddress.street +',"city": ' + a.newAddress.city +',"state": ' + a.newAddress.state +',"postalCode": ' + a.newAddress.zipcode +'}}';
    $http.get(url)
    .success(function(data){
      data = data;
     var lat = data.results[0].locations[0].latLng.lat;
     var lng = data.results[0].locations[0].latLng.lng;
      a.findNew(lat,lng);
      a.findCongressman(lat,lng);
      $location.path('/new/');
    })
    .error(function(err){
      console.log(err);
    });
  };

//  use geolocation lat and lng to get district information.
  a.findNew = function(lat, lng) {
    var begin = 'https://congress.api.sunlightfoundation.com/districts/locate?latitude=';
    var middle = '&longitude=';
    var end = '&apikey=996b297956f34029b3074b37010cf488';
    var url = begin + lat + middle + lng + end;
    $http.get(url)
    .success(function(data){
      var district = data.results[0].state + '-' + data.results[0].district;
      a.bioPhoto(district);
      console.log(district);
    })
    .error(function(err){
      console.log(err);
    });
  };
  a.findCongressman = function(lat, lng) {
    var begin = 'https://congress.api.sunlightfoundation.com/legislators/locate?latitude=';
    var middle = '&longitude=';
    var end = '&apikey=996b297956f34029b3074b37010cf488';
    var url = begin + lat + middle + lng + end;
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
a.bioPhoto = function(district) {
  var firebase = 'https://congressmanfinder.firebaseio.com/district/districts/';
  var url = firebase + district +'/' + '.json';
  $http.get(url)
  .success(function(data){
    data = data;
    var biography = data.Biography;
    var counties = data.Counties;
    var elected = data.Elected;
    var image = data.Photo;
    var map = data.map;
    a.items['biography'] = biography;
    a.items['counties'] = counties;
    a.items['elected'] = elected;
    a.items['image'] = image;
    a.items['map'] = map;

  })
  .error(function(err){
    console.log(err);
  });
};
// a.map = function(district) {
//    switch {district}
// }
});
}());

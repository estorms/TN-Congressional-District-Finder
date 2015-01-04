;(function() {
  'use strict';
angular.module('congressApp')
.controller('MapController', function($scope) {
  $scope.map = { center: { latitude: 35.78528, longitude: -86.617504 }, options: { minZoom: 7, draggable: false, cursor: false}, zoom: 7, fusionlayer: {
    showFusionTables: true,
    options: {
      query: {
        select: 'geometry',
        from: '1sYcr1mE6VNXK1kfVhvI4ZefLYCqZ7U3SUoTuFvZV'
      },
     styles: [{
    polygonOptions: {
      borderColor: 'black',
      borderWidth: '10px',
      borderOpacity: 1.0,
    }
  }
// {
//   where: 'Representatives-party = Democrat',
//     polygonOptions: {
//     fillOpacity: 0.5,
//     fillColor: '#232323'
//   }
],
}
  }
};
})
.controller('LocateDistrictController', function($http, $location, $routeParams) {
  var a = this;
  a.items = {};
  //grab geolocation information
  a.findNewAddress = function() {
    var url = 'https://open.mapquestapi.com/geocoding/v1/address?key=Fmjtd%7Cluurn1uy2u%2C8s%3Do5-9wysd4&inFormat=json&json={"location":{"street": ' + a.newAddress.street +',"city": ' + a.newAddress.city +',"state": ' + a.newAddress.state +',"postalCode": ' + a.newAddress.zipcode +'}}';
    $http.get(url)
    .success(function(data){
      data = data;
     var lat = data.results[0].locations[0].latLng.lat;
     var lng = data.results[0].locations[0].latLng.lng;
     a.findNew(lat,lng);
     a.findCongressman(lat,lng);
      console.log(a.items);
    })
    .error(function(err){
      console.log(err);
    });
  };
  //use geolocation lat and lng to get district information.
  a.findNew = function(lat, lng) {
    var begin = 'https://congress.api.sunlightfoundation.com/districts/locate?latitude=';
    var middle = '&longitude=';
    var end = '&apikey=996b297956f34029b3074b37010cf488';
    var url = begin + lat + middle + lng + end;
    $http.get(url)
    .success(function(data){
      var district = data.results[0].state + '-' + data.results[0].district;
      a.photoBio(district);
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
      console.log(a.items);
    })
    .error(function(err){
      console.log(err);
    });
  };
a.photoBio = function(district) {
  var firebase = 'https://congressmanfinder.firebaseio.com/district/districts/';
  var url = firebase + district +'/' + '.json';
  $http.get(url)
  .success(function(data){
    data = data;
    var biography = data.Biography;
    var counties = data.Counties;
    var elected = data.Elected;
    var image = data.Photo;
    a.items['biography'] = biography;
    a.items['counties'] = counties;
    a.items['elected'] = elected;
    a.items['image'] = image;
  })
  .error(function(err){
    console.log(err);
  });
};

});
}());

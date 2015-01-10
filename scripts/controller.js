;(function() {
  'use strict';
   angular.module('congressApp')
// .controller('ChartController', function($scope) {
//   $scope.config = {
//     title: 'Products',
//     tooltips: true,
//     labels: false,
//     mouseover: function() {},
//     mouseout: function() {},
//     click: function() {},
//     legend: {
//       display: true,
//       //could be 'left, right'
//       position: 'right'
//     }
//   };
//
//   $scope.data = {
//     series: ['Sales', 'Income', 'Expense', 'Laptops', 'Keyboards'],
//     data: [{
//       x: "Laptops",
//       y: [100, 500, 0],
//       tooltip: "this is tooltip"
//     }, {
//       x: "Desktops",
//       y: [300, 100, 100]
//     }, {
//       x: "Mobiles",
//       y: [351]
//     }, {
//       x: "Tablets",
//       y: [54, 0, 879]
//     }]
//   };
// })
.controller('LocateDistrictController', function($http, $scope, $location, $routeParams, apiGrab) {
  var a = this;
  a.items = {};
  a.race = {};
  a.income = {};

  a.findNewAddress = function(data) {
      var url = 'https://www.mapquestapi.com/geocoding/v1/address?key=Fmjtd%7Cluurn1uy2u%2C8s%3Do5-9wysd4&inFormat=json&json={"location":{"street": ' + a.newAddress.street +',"city": ' + a.newAddress.city +',"state": ' + a.newAddress.state +',"postalCode": ' + a.newAddress.zipcode +'}}';
    $http.get(url)
    .success(function(data){
      data = data;
     var lat = data.results[0].locations[0].latLng.lat;
     var lng = data.results[0].locations[0].latLng.lng;
      a.findNew(lat,lng);
      a.findCongressman(lat,lng);
    })
    .error(function(err){
      console.log(err);
    });
  };
    a.clearForm = function() {
      a.newAddress.street = '';
      a.newAddress.state = '';
      a.newAddress.zipcode = '';
      a.newAddress.city = '';
    };
//  use geolocation lat and lng to get district information.
  a.findNew = function(lat, lng) {
    apiGrab.findNew(lat, lng)
    .success(function(data){
      data = data;
      var district = data.results[0].state + '-' + data.results[0].district;
      console.log(district);
      a.items.district = district;
      a.bioPhoto(district);
      $location.path('/district/'+ district);
      // a.clearForm();
    })
    .error(function(err){
      console.log(err);
    });
  };



  a.findCongressman = function(lat, lng) {
    apiGrab.findCongressman(lat, lng)
    .success(function(data){
      data = data.results[0];
      var ident = data.bioguide_id;
      var website = data.website;
      var phone = data.phone;
      var fax = data.fax;
      var youTube = data.youtube_id;
      var twitter = data.twitter_id;
      var email = data.oc_email;
      var fullName = data.first_name + " " + data.last_name ;
      a.items.fullName = fullName;
      a.items.website = website;
      a.items.email = email;
      a.items.youTube = youTube;
      a.items.twitter = twitter;
      a.items.phone = phone;
      a.items.fax = fax;
      a.committees(ident);
    })
    .error(function(err){
      console.log(err);
    });
  };
a.bioPhoto = function(district) {
  apiGrab.bioPhoto(district)
  .success(function(data){
    data = data;
    var biography = data.Biography;
    var counties = data.Counties;
    var elected = data.Elected;
    var image = data.Photo;
    var map = data.map;
    var race = data.demographics.Race;
    a.race.race = race;
    console.log(race);
    a.items.biography = biography;
    a.items.counties = counties;
    a.items.elected = elected;
    a.items.image = image;
    a.items.map = map;
  })
  .error(function(err){
    console.log(err);
  });
};

a.committees = function(ident) {
  apiGrab.committees(ident)
     .success(function(data) {
       data = data.results;
       console.log(data);
     })
     .error(function(err){
       console.log(err);
    });
   };


a.finderLink = function() {
    var aurl = $location.url();
    var aurlLength = aurl.length;
    var dist = aurl.charAt(aurlLength - 1);
    if (dist !== '/') {
      var url  = 'https://congress.api.sunlightfoundation.com/legislators?state=TN&district=' + dist + '&apikey=996b297956f34029b3074b37010cf488';
      $http.get(url)
  .success(function(data) {
    data = data.results[0];
    console.log(data);
    var website = data.website;
    var phone = data.phone;
    var fax = data.fax;
    var ident = data.bioguide_id;
    var contact = data.contact_form;
    var youTube = data.youtube_id;
    var twitter = data.twitter_id;
    var email = data.oc_email;
    var fullName = data.first_name + " " + data.last_name ;
    var facebook = data.facebook_id;
    a.items.fullName = fullName;
    a.items.website = website;
    a.items.email = email;
    a.items.youTube = youTube;
    a.items.contact = contact;
    a.items.twitter = twitter;
    a.items.phone = phone;
    a.items.fax = fax;
    a.items.facebook = facebook;
    a.items.district = district;
     var district = 'TN-' + dist;
     a.bioPhoto(district);
     a.committees(ident);
     $location.path('/district/'+ district);
  })
  .error(function(err) {
    console.log(err);
});
}
};

a.finderLink();
});
}());

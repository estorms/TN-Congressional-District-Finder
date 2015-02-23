;(function() {
  'use strict';
   angular.module('congressApp')
.controller('LocateDistrictController', function($http, $scope,$rootScope, $location, $routeParams, apiGrab) {
  var a = this;
  a.items = {};
  a.race = {};
  a.income = {};

  a.findNewAddress = function(data) {
      var url = 'https://open.mapquestapi.com/geocoding/v1/address?key=Fmjtd%7Cluurn1uy2u%2C8s%3Do5-9wysd4&inFormat=json&json={"location":{"street": ' + a.newAddress.street +',"city": ' + a.newAddress.city +',"state": ' + a.newAddress.state +',"postalCode": ' + a.newAddress.zipcode +'}}';
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
      var congressSeat = data.results[0].state + '-' + data.results[0].district;
      a.items.congressSeat = congressSeat;
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
      console.log(data);
      var ident = data.bioguide_id;
      var website = data.website;
      var phone = data.phone;
      var fax = data.fax;
      var youTube = data.youtube_id;
      var twitter = data.twitter_id;
      var email = data.oc_email;
      var fullName = data.first_name + " " + data.last_name ;
      var address = data.office + "  Independence Ave SE Washington, DC 20515";
      a.items.address = address;
      console.log(a.items.address);
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
    var demographic = data.demographics.Race;
    var asian = demographic.Asian;
    var white = demographic.White;
    var black = demographic.Black;
    var hispanic = demographic.Hispanic;
    var party = data.Party;
    a.items.party = party;
    var incomes = data.demographics.Income;
    var oneHundredPlus = incomes.oneHundredPlus;
    var poverty = incomes.below_ten_thou;
    var median = incomes.Median_house;
    var twenty = incomes.fifteen_twentyfive;
    var hundred = incomes.twenty_five_hundred;
    var unemploy = incomes.unemployment;
    var bachelors = data.demographics.Education.bachelors;
    var highSchool = data.demographics.Education.highSchool;
    var education = data.demographics.education;
    var map = data.Map;
    a.income.median = median;
    a.income.unemploy = unemploy;
    a.income.poverty = poverty;
    a.income.twenty = twenty;
    a.income.hundred = hundred;
    a.income.oneHundredPlus = oneHundredPlus;
    a.items.bachelors = bachelors;
    console.log(a.income);
    a.items.highSchool = highSchool;
    var electoral = data.Electoral;
    var population = data.demographics.misc.population;
    var medianAge = data.demographics.misc.median_age;
    a.items.age = medianAge;
    a.items.population = population;
    a.items.map = map;
    a.items.electoral = electoral;
    a.race.white = white;
    a.race.black = black;
    a.race.hispanic = hispanic;
    a.race.asian= asian;
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
       data = data.results[0];
       console.log(data);
       var partyVote = data.votes_with_party_pct;
       var birthDate = data.date_of_birth;
       var committee1 = data.roles[1].committees[0].name;
       var committee2 = data.roles[1].committees[1].name;
       a.items.partyVote = partyVote;
       a.items.birthDate = birthDate;
       a.items.committee1 = committee1;
       a.items.committee2 = committee2;
       console.log(data);

     })
     .error(function(err){
       console.log(err);
    });
   };


a.finderLink = function(dist) {
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
    var district = 'TN' + '-' + dist;
    var address = data.office + "Independence Ave SE Washington, DC 20515";
    a.items.address = address;
    console.log(address);
    a.items.district = district;
    // var district = data.state + '-' + data.district;
    a.items.fullName = fullName;
    a.items.website = website;
    a.items.email = email;
    a.items.youTube = youTube;
    a.items.contact = contact;
    a.items.twitter = twitter;
    a.items.phone = phone;
    a.items.fax = fax;
    a.items.facebook = facebook;
     a.bioPhoto(district);
     a.committees(ident);
     $location.path('/district/'+ district);
  })
  .error(function(err) {
    console.log(err);
});
};
});
}());

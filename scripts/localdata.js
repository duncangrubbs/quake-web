(function() {
  "use strict";
  var app = document.querySelector("#app");
  app.data = [{'mag': '2'}, {'mag': '3'}];
  function getPosition (position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;

    var request = new XMLHttpRequest();
    var date = new Date();

    var startTime = date.getFullYear() + '-' + (date.getMonth() - 1) + '-' + date.getDay();
    var endTime = date.getFullYear() + '-' + (date.getMonth()) + '-' + date.getDay();
    var url = "http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&maxradius=5&minmagnitude=3.5";
    var finalURL = url + "&latitude=" + lat + "&longitude=" + long +
    "&starttime=" + startTime + "&endtime=" + endTime;

    query(finalURL, request);
  }

  function query(finalURL, request) {
    request.open('GET', finalURL, false);
    request.send(null);

    var data = JSON.parse(request.response);
    var features = data.features;
    var content = document.querySelector('#content-local');

    for(var i = 0; i < features.length; i++) {
      var item = document.createElement('div');
      var time = timeConverter(features[i].properties.time);
      item.className = 'local';
      item.innerHTML =
      features[i].properties.mag + ' magnitude earthquake ' + features[i].properties.place +
      ' -- ' + time;
      content.appendChild(item);
    }
    app.set('data', features);
    return false;
  }

  function timeConverter(time){
    var a = new Date(time);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var finalDate = month + ' ' + date + ', ' + year;
    return finalDate;
  }

  app.addEventListener("dom-change", function() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(getPosition);
    } else {
      alert('Your browser does not support geolocation :(');
    }
  });

})();

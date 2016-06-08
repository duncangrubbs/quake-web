(function() {
  "use strict";
  var app = document.querySelector("#app");
  app.data = [{'mag': '2'}, {'mag': '3'}];
  function getPosition (position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    var request = new XMLHttpRequest();
    var url = "http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2016-01-01&endtime=2016-04-20";
    var finalURL = url + "&minmagnitude=" + 4 + "&latitude=" + lat + "&longitude=" + long + "&maxradius=" + 5;
    query(finalURL, request);
    console.log(finalURL);
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
      item.innerHTML = 'There was a ' +
      features[i].properties.mag + ' magnitude earthquake ' + features[i].properties.place +
      ' on ' + time;
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
    var finalDate = month + ' ' + date + ', ' + year + ' at ' + hour + ':' + min + ':' + sec;
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

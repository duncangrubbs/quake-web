function query(){
	var mag = document.getElementById('magnitude').value;
	var lat = document.getElementById('latitude').value;
	var long = document.getElementById('longitude').value;
	var radius = document.getElementById('radius').value;

	var request = new XMLHttpRequest();
	var url = "http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2016-01-01&endtime=2016-04-20&limit=200";
	var finalURL = url + "&minmagnitude=" + mag + "&latitude=" + lat + "&longitude=" + long + "&maxradius=" + radius;
	request.open('GET', finalURL, false);
	request.send(null);

	var data = JSON.parse(request.response);
	var features = data.features;
	var properties = features.properties;

	for(var i = 0; i < features.length; i++){
		features[i].properties.timeString = timeConverter(features[i].properties.time);
	}

	var repeatTemp = document.querySelector('#repeat-temp');
	repeatTemp.items = features;

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

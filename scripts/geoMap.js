// set up the page

var mapCanvas = document.getElementById('map_canvas');
var geoBtn = document.querySelector('button');

// draw the google map, or not

  
var positionDenied = function() {
  console.log('permission denied');
  geoBtn.style.display = 'inline';
  geoBtn.onclick = function() {
    navigator.geolocation.getCurrentPosition(revealPosition,positionDenied,geoSettings);
  }
};
  
var revealPosition = function(position) {
  geoBtn.style.display = 'none';
  var markerTitle = "You are here";

  var latlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
  var myOptions = {
    zoom: 16,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  
  var map = new google.maps.Map(mapCanvas, myOptions);

  var marker = new google.maps.Marker({
    position: latlng,
    map: map,
    title: markerTitle
  });
}

// test for geolocation support, provide geolocation settings, determine location of the user's device


if (!"geolocation" in navigator) {
  alert("No geolocation available!");
}
  
var geoSettings = {
  enableHighAccuracy: false,
  maximumAge        : 30000,
  timeout           : 20000
};

// Start everything off

function handlePermission() {
navigator.permissions.query({name:'geolocation'}).then(function(result) {
  if (result.state == 'granted') {
    console.log(result);
    geoBtn.style.display = 'none';
  } else if (result.state == 'prompt') {
    console.log(result);
    navigator.geolocation.getCurrentPosition(revealPosition,positionDenied,geoSettings);
  } else if (result.state == 'denied') {
    console.log(result);
    geoBtn.style.display = 'inline';
    geoBtn.onclick = function() {
      console.log('Permission currently denied; future features of the Permissions API wil allows us to fix this.')
    }
  }
});
}

handlePermission();
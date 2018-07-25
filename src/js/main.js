//Esconde la pantalla de inicio a los 2 segundos y muestra el resto de la App
setTimeout(function hide() { $('#pantallaInicial').hide('fast');
document.getElementById('pantallaApp').style.display = 'block'; }, 3000);


//MAP de google
var map;
var service;
var infowindow;

function initMap() {
    // Locacion de la ciudad (Santiago)
    var city = { lat: -33.4569, lng: -70.648 };
    
    var map = new google.maps.Map(
        document.getElementById('map'), { zoom: 15, center: city });
    // Marcador de ubicacion
    var marker = new google.maps.Marker({ position: city, map: map });
}

var map, infoWindow;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -33.4569, lng: -70.648 },
        zoom: 15
    });
    infoWindow = new google.maps.InfoWindow;

    // Geolocalizacion
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // ensaje de que el navegador no soporta la geolocalizacion
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}



function initialize() {
  var pyrmont = new google.maps.LatLng(-33.4569,-70.648);
  map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 15
    });

  var request = {
    location: pyrmont,
    radius: '500',
    type: ['restaurant']
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
    }
  }
}

// Funcion para busqueda por input
function onSearch(){

}


//key api zomato c7ca6ecef7e99e1d644aa2d5fab920d0
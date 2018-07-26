//Esconde la pantalla de inicio a los 2 segundos y muestra el resto de la App
setTimeout(function hide() { $('#pantallaInicial').hide('fast');
document.getElementById('pantallaApp').style.display = 'block'; }, 3000);


//MAP de google
var map;
var service;
var infowindow;

function initMap() {
    var city = { lat: -33.4569, lng: -70.648 };
    var marker = new google.maps.Marker({ position: city, map: map });
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -33.4569, lng: -70.648 },
        zoom: 15 //cercanía de imagen al mapa, así se alcanzan a ver calles y nombres.
        
    });
    infoWindow = new google.maps.InfoWindow;
    

    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
   

    // Muestra los resultados en la vista actual del mapa
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // detalles de cada lugar
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      // Se obtiene el icono, el nombre y la ubicacion para cada lugar
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Se crear el marcador para cada lugar
        markers.push(new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));

        if (place.geometry.viewport) {
          
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });

    // GEOLOCALIZACION
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
    type: ['restaurant', 'restoran']
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


function initAutocomplete() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -33.8688, lng: 151.2195},
      zoom: 13,
      mapTypeId: 'roadmap'
    });
    // Create the search box and link it to the UI element.
    
  }






// Funcion para busqueda por input con api de restaurantes.
function onSearch(){

}


//key api zomato c7ca6ecef7e99e1d644aa2d5fab920d0
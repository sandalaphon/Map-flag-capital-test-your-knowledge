var app = function(){
  var center = {lat: 53.004206, lng: -1.740233}
  var container = document.getElementById('main-map')
     mainMap = new MapWrapper(container, center, 4);
   mainMap.addMarker(center, "Great Wall, China")
   mainMap.addClickEvent()
   var country = new CountryInfo('GB')
}

window.onload = app
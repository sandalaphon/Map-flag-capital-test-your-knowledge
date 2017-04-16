var MapWrapper = function(container, coords, zoom){
  this.gmarkers = []
  this.currentCountry = ""
  this.short_name = ""
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
  })
}

MapWrapper.prototype = {
  addMarker: function(coords, address){
    var contentString = "<p>"+"Coordinates here:"+"<br />"+"Lattitude: "+coords.lat+"<br />"+"Longitude: "+coords.lng +"<br />"+ address+"</p>"
    var infoWindow = new google.maps.InfoWindow({
      content:contentString //http://jsfiddle.net/doktormolle/S6vBK/
    })
    var marker = new google.maps.Marker({
      position: coords,
      map: this.googleMap,

    })
    marker.addListener('click', function(){
      infoWindow.open(this.googleMap, marker)
    })
    this.gmarkers.push(marker)
  },

  getCountryFromGeoCode: function(geoCodeResults){
    console.log(geoCodeResults)
    var countryName = ""
    geoCodeResults.forEach(function(obj){
      if(obj.types[0]==="country"){
        this.short_name = obj.address_components[0].short_name
        countryName += "Long Name: " +obj.formatted_address+ " and Short Name: " + this.short_name
        var country = new CountryInfo(this.short_name)

      }
    })
    return countryName
  },


  addClickEvent: function(){
    google.maps.event.addListener(this.googleMap, 'dblclick', function(event){
      var coords = {lat:event.latLng.lat(), lng:event.latLng.lng()
      }
      var marker = this.gmarkers.pop()
      marker.setMap(null)
      var geoCoder = new google.maps.Geocoder;
      geoCoder.geocode({location: coords}, function(results, status){
        if(status==="OK"){
          if(results[1]){
            this.googleMap.setZoom(4),
            this.googleMap.setCenter(coords)
            var countryName = this.getCountryFromGeoCode(results)
            this.addMarker(coords, countryName)
            //results[1].formatted_address
          } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status + "\nDont click in the sea!");
        }
      }.bind(this))
      // this.googleMap.setZoom(10),
      // this.googleMap.setCenter(coords)
      // this.addMarker(coords)
      
    }.bind(this))
  }


}
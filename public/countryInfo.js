var CountryInfo = function(shortName){
  var url = "https://restcountries.eu/rest/v2/alpha/" + shortName
  makeRequest(url, requestComplete)
}

var makeRequest = function(url, callback){

  //create new instance of XMLHttpRequest ...this is an object
  var request = new XMLHttpRequest()
  request.open("GET", url)
  //tell it what fuction to run once complete
  request.onload = callback
  //send request
  request.send()

}

var requestComplete = function(){
  console.log(this)
  if(this.status!== 200) return
      //grab response text
    var jsonString = this.responseText;
    localStorage.setItem("Country Data", jsonString)
    var country = JSON.parse(jsonString);
    displayCountryInfo(country)
  }

  var displayCountryInfo = function(country){
    var displayText = document.querySelector('#country-info')
    displayText.innerText = "Country: " + country.name + "\nCapital City: " + country.capital
    var flagDiv = document.querySelector('#flag')
      flagDiv.removeChild(flagDiv.childNodes[0])
    var flag = document.createElement('img')
    flag.src="#"
    flag.width =150
    flag.height = 100
    flag.src = country.flag
    flagDiv.appendChild(flag)

  }
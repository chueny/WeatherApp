$(document).ready(function(){
  
  $(".fas").on("click", function(){
    event.preventDefault;
    
    var cityInput=$(this).prev().val().trim();
    console.log("readInput is "+cityInput);  
    
    if(cityInput === ""){
      $(".search").text("You didn't type anything"); //PRINT SOME UX SHIT THAT IT CANNOT BE BLANK 
    } 
    else{
      console.log("You created an input"); /// need some valiadaion on city spelling 
      cityList.push(cityInput);
      renderCities(cityList);
      // cityInput.reset(); need to reset this
      //probably need a local storage
    }
  })

  
  var cityList =[]; //initial array of cities

  function renderCities(cityListInput) {
    $("#city-view").empty(); //empty list to start with 
    //var cityList=$(".search").val().trim();
    // Loop through the array of cities
    for (var i = 0; i < cityListInput.length; i++) {
    // Then dynamicaly generating buttons for each movie in the array.
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class
    a.addClass("city-button");
    // Adding a data-attribute with a value of the city at index i
    a.attr("data-name", cityListInput[i]);
    // Providing the button's text with a value of the cityList at index i
    a.text(cityListInput[i]);
    // Adding the button to the HTML
    $("#city-view").append(a);
    }
  }  

  //var APIKey="621d0eb0706fc81d1dfe4fa639011f5e";
  //var APIKey="166a433c57516f51dfab1f7edaed8413";
  var queryURL="http://api.openweathermap.org/data/2.5/uvi?appid="+APIKey+"&lat="+lat+"&lon="+lon; 
  var lat="44.98";
  var lon="-93.26";

  $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {

    // Log the queryURL
    console.log("UV API: "+queryURL);

  });



    var APIKey = "166a433c57516f51dfab1f7edaed8413";
    var cityList = "Seattle";
      
    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ cityList+ "&appid=" + APIKey;

    //console.log(queryURL);

    // Here we run our AJAX call to the OpenWeatherMap API
     $.ajax({
       url: queryURL,
       method: "GET"
     })
       // We store all of the retrieved data inside of an object called "response"
       .then(function(response) {

        // Log the queryURL
        console.log(queryURL);

       // Log the resulting object
       console.log(response);

        // Transfer content to HTML
        $(".city").html("<h1>" + response.name + " Weather Details</h1>");
        $(".wind").text("Wind Speed: " + response.wind.speed+" MPH");
        $(".humidity").text("Humidity: " + response.main.humidity+"%");
        $(".UV").text("UV Index: "+response.value);
        $(".lat").text("Lat: "+response.coord.lat);
        $(".lon").text("Lon: "+response.coord.lon);
        
        
        // Convert the temp to fahrenheit
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;

        // add temp content to html
        $(".temp").text("Temperature (K) " + response.main.temp);
        $(".tempF").text("Temperature: " + tempF.toFixed(2)+"F");

        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + tempF);
        console.log("UV Index: "+ response.value);
      });

});
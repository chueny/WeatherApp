$(document).ready(function(){

  
  //cityList=JSON.parse(localStorage.getItem("cityList"));
  //console.log("cityList from local storage: " + cityList);
  //renderCities(cityList);

  $(".fas").on("click", function(){
    event.preventDefault;
    
    var cityName=$(this).prev().val().trim();
    console.log("readInput is "+cityName);  
    console.log("cityList in search click event: " + cityList);

    if(cityName === ""){
      $(".search").text("You didn't type anything"); 
    } 
    else{
      console.log("You created an input"); 
      if (cityList.includes(cityName)){
        console.log("dont do anything, city list already includes: "+ cityName);
        
      }
        else{
        console.log("cityList before push: " + cityList);
        renderCity(cityName);
        cityList.push(cityName);
        console.log("cityList after push: " + cityList);
        
        currentWeather(cityName);
        fiveDayForecast(cityName);
        localStorage.setItem("cityList", JSON.stringify(cityList));
        console.log("Local storage value is: "+JSON.parse(localStorage.getItem("cityList")));
      
      }
    }
  })

  function renderCity(cityInput) {
      
      if (!cityList.includes(cityInput)){
        var a = $("<button>");
        a.addClass("d-flex flex-column city-button");
        a.attr("data-name", cityInput);
        a.attr("id", 'button');
        a.text(cityInput);
        $("#city-view").append(a);
      }
  }  

  $("#city-view").on("click", ".city-button",function(){
    event.preventDefault;
    
    
    var cityName=$(this).text();
    
    currentWeather(cityName);
    fiveDayForecast(cityName);
    localStorage.setItem("cityList", cityList);
   
    
  });



  var cityList =[]; //initial array of cities


  function setUVIndex(lat, lon){
    var APIKey = "621d0eb0706fc81d1dfe4fa639011f5e";
   

    var uv = 0;

    
    var queryURL = "http://api.openweathermap.org/data/2.5/uvi?appid="+APIKey+"&lat="+lat+"&lon="+lon;
    
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      
      .then(function(response) {

        console.log(queryURL);

        uv = response.value;
         
        console.log("UV index in UVIndex function: " + uv);
        $(".UV").text("UV Index: "+ uv);
        if (uv <=2){
          $(".UV").attr('style', 'background-color:green');
        } else if(uv>2 && uv<=5){
          $(".UV").attr('style','background-color:yellow');
        }
        else if (uv>5 && uv<=7){
          $(".UV").attr('style', 'background-color:orange');

        }else if(uv>7 && uv<=10){
          $(".UV").attr('style','background-color:red');
        }else{
          $(".UV").attr('style', 'background-color:purple');
        }
      });
    }

    function currentWeather(cityName){

    var APIKey = "166a433c57516f51dfab1f7edaed8413";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName+ "&appid=" + APIKey;

     $.ajax({
       url: queryURL,
       method: "GET"
     })
       .then(function(response) {

        var lat=response.coord.lat;
        var lon=response.coord.lon;

        // Transfer content to HTML
        $(".city").html("<h1>" + response.name + " Weather Details</h1>");
        $(".wind").text("Wind Speed: " + response.wind.speed+" MPH");
        $(".humidity").text("Humidity: " + response.main.humidity+"%");
        setUVIndex(lat, lon);

        var tempF = (response.main.temp - 273.15) * 1.80 + 32;

        $(".temp").text("Temperature (K) " + response.main.temp);
        $(".tempF").text("Temperature: " + tempF.toFixed(2)+"°F");

        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + tempF);
        console.log("UV Index: " + setUVIndex(lat, lon));
      });
}

  function fiveDayForecast(cityName){
    var APIKey = "621d0eb0706fc81d1dfe4fa639011f5e";

    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&appid="+APIKey; 

  
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      
      .then(function(response) {

    
        $('.container-forecast').empty();// empties previous 5-day forecast
        $('.container-forecast').append('<h3>5-Day Forecast:</h3>');
        $('.container-forecast').append('<div class="d-flex justify-content-between row forecast"></div>');
        
        
        $(".forecast").html('<div class="col-md-2  col-md-offset-1 one"> </div>');
        var date=moment(response.list[3].dt_txt).format('MM/DD/YYYY');
        var newDate = $('<p>').text(date);
        var icon=response.list[1].weather[0].icon;
        var iconSrc="http://openweathermap.org/img/wn/"+icon+".png";
        var tempP = $("<p>").text("Temp: "+((response.list[3].main.temp - 273.15) * 1.80 + 32).toFixed(2)+" °F");
        var humidP = $('<p>').text("Humidity: "+response.list[3].main.humidity+"%");
      
        var oneDiv = $(".one")
        oneDiv.append(newDate);
        oneDiv.append('<img src='+iconSrc+'>');
        oneDiv.append(tempP);
        oneDiv.append(humidP);
          

        $(".forecast").append('<div class="col-md-2 two"> </div>');
        var date=moment(response.list[10].dt_txt).format('MM/DD/YYYY');
        var newDate = $('<p>').text(date);
        var icon=response.list[10].weather[0].icon;
        var iconSrc="http://openweathermap.org/img/wn/"+icon+".png";
        var tempP = $("<p>").text("Temp: "+((response.list[10].main.temp - 273.15) * 1.80 + 32).toFixed(2)+" °F");
        var humidP = $('<p>').text("Humidity: "+response.list[10].main.humidity+"%");
      
        var oneDiv = $(".two")
        oneDiv.append(newDate);
        oneDiv.append('<img src='+iconSrc+'>');
        oneDiv.append(tempP);
        oneDiv.append(humidP);

        $(".forecast").append('<div class="col-md-2 three"> </div>');
        var date=moment(response.list[18].dt_txt).format('MM/DD/YYYY');
        var newDate = $('<p>').text(date);
        var icon=response.list[18].weather[0].icon;
        var iconSrc="http://openweathermap.org/img/wn/"+icon+".png";
        var tempP = $("<p>").text("Temp: "+((response.list[18].main.temp - 273.15) * 1.80 + 32).toFixed(2)+" °F");
        var humidP = $('<p>').text("Humidity: "+response.list[18].main.humidity+"%");
      
        var oneDiv = $(".three")
        oneDiv.append(newDate);
        oneDiv.append('<img src='+iconSrc+'>');
        oneDiv.append(tempP);
        oneDiv.append(humidP);


        $(".forecast").append('<div class="col-md-2 four"> </div>');
        var date=moment(response.list[26].dt_txt).format('MM/DD/YYYY');
        var newDate = $('<p>').text(date);
        var icon=response.list[26].weather[0].icon;
        var iconSrc="http://openweathermap.org/img/wn/"+icon+".png";
        var tempP = $("<p>").text("Temp: "+((response.list[26].main.temp - 273.15) * 1.80 + 32).toFixed(2)+" °F");
        var humidP = $('<p>').text("Humidity: "+response.list[26].main.humidity+"%");
      
        var oneDiv = $(".four")
        oneDiv.append(newDate);
        oneDiv.append('<img src='+iconSrc+'>');
        oneDiv.append(tempP);
        oneDiv.append(humidP);

        $(".forecast").append('<div class="col-md-2 five"> </div>');
        var date=moment(response.list[34].dt_txt).format('MM/DD/YYYY');
        var newDate = $('<p>').text(date);
        var icon=response.list[34].weather[0].icon;
        var iconSrc="http://openweathermap.org/img/wn/"+icon+".png";
        var tempP = $("<p>").text("Temp: "+((response.list[34].main.temp - 273.15) * 1.80 + 32).toFixed(2)+" °F");
        var humidP = $('<p>').text("Humidity: "+response.list[34].main.humidity+"%");
      
        var oneDiv = $(".five")
        oneDiv.append(newDate);
        oneDiv.append('<img src='+iconSrc+'>');
        oneDiv.append(tempP);
        oneDiv.append(humidP);

      }); 
    };



  
    
});
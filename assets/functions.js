

function momentAddDays(numDays){
    var formatter="MM/DD/YYYY";
   return moment().add(numDays,'day').format(formatter);
}

function displayCurrent(currentDate,response){
    $("img").show();
    var iconCode=response.weather[0]['icon'];
    var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
        $("#city-and-date").text(response.name+","+response.sys.country+"  ("+currentDate+")");
        $('#wicon').attr('src', iconUrl);
        $("#temperature").text("Temperature: "+response.main.temp+" °F");
        $("#humidity").text("Humidity: "+response.main.humidity+"%");
        $("#wind-speed").text("Wind Speed: "+response.wind.speed+" MPH");
}

function displayUVIndex(response){
    $("#uv-index").text("UV Index: "+response.value);
}

function display5Day(response){
    for(var i=0; i<5; i++){
       var temp=response.list[i].main.temp;
       var humid=response.list[i].main.humidity;
       var iconCode=response.list[i].weather[0].icon;
       var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
       console.log("humid: "+humid+" icon: "+iconCode);
      var allEl= $(".col-md-2").eq(i).children();
      allEl.eq(0).text(momentAddDays(i+1));
      allEl.eq(1).attr('src',iconUrl);
      allEl.eq(2).text("Temp: "+temp+" °F");
      allEl.eq(3).text("Humidity: "+humid+"%");

        
    }

}

function displaySearchHistory(){
    for(var i=0; i<localStorage.length; i++){
        if(localStorage.getItem(localStorage.key(i))=="weather_search"){  
           var el= $("<a class=\"list-group-item list-group-item-action\"></a>").text(localStorage.key(i));
            $(".list-group").append(el);
        }
    }
}



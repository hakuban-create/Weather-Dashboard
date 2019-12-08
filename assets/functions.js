function displayCurrent(currentDate,response){
    var iconCode=response.weather[0]['icon'];
    var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
        $("#city-and-date").text(response.name+" ("+currentDate+")");
        $('#wicon').attr('src', iconUrl);
        $("#temperature").text("Temperature: "+response.main.temp+" °F");
        $("#humidity").text("Humidity: "+response.main.humidity+"%");
        $("#wind-speed").text("Wind Speed: "+response.wind.speed+" MPH");
}


function displayUVIndex(response){
    $("#uv-index").text("UV Index: "+response.value);
}
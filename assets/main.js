
var currentDate=momentAddDays(0);


/* * getting weather info for user's current location * */

/* 1 day forecast */
navigator.geolocation.getCurrentPosition(function(position) {
    var queryUrl="http://api.openweathermap.org/data/2.5/weather?lat="+position.coords.latitude+"&lon="+position.coords.longitude+"&units=imperial&appid=7b0bd5c0c62495154f103ff6cbf437d6";
    console.log("query url: "+queryUrl);
  $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){
       displayCurrent(currentDate,response);
    })

    var queryUrlUV="http://api.openweathermap.org/data/2.5/uvi?appid=7b0bd5c0c62495154f103ff6cbf437d6&lat="+position.coords.latitude+"&lon="+position.coords.longitude;
    console.log("query url for uv index: "+queryUrlUV);
    $.ajax({
        url: queryUrlUV,
        method: "GET"
    }).then(function(response){
       displayUVIndex(response);
    })

/* 5 day forecast */

    var queryUrl5Days="http://api.openweathermap.org/data/2.5/forecast?cnt=5&units=imperial&appid=7b0bd5c0c62495154f103ff6cbf437d6&lat="+position.coords.latitude+"&lon="+position.coords.longitude;
    $.ajax({
        url: queryUrl5Days,
        method: "GET"
    }).then(function(response){
        display5Day(response);
    })

  });



/* * * * * * * * */



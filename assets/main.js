$(document).ready(function() {
$("img").hide();
$("#row1").hide();

var currentDate=momentAddDays(0);
var searchClick=0;

displaySearchHistory();

/* * getting weather for default home page based on user's current location * */

/* 1 day forecast */
navigator.geolocation.getCurrentPosition(function(position) {
    var queryUrl="http://api.openweathermap.org/data/2.5/weather?lat="+position.coords.latitude+"&lon="+position.coords.longitude+"&units=imperial&appid=7b0bd5c0c62495154f103ff6cbf437d6";
    console.log("query url: "+queryUrl);
  $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){
       displayCurrent(currentDate,response);
    }).then(function(){
        $("#spinner").hide();
        $("#row1").show();
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


/* * getting weather for user searched City * */

$("#search-btn").on("click",function(){
$("#spinner").hide();
if(searchClick==0){
searchByCity($("#search-input").val());
}
searchClick=1;
});

function searchByCity(cityName){
    var cod=0;
    cityName=cityName.toLowerCase();

    var queryUrlCity1Day="http://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=imperial&appid=7b0bd5c0c62495154f103ff6cbf437d6";
    $.ajax({
        url: queryUrlCity1Day,
        method: "GET"
    }).then(function(response){
        $("#error").hide();
        $("#col2").show();
        displayCurrent(currentDate,response);
        cod=response.cod;
        
        var queryUrlUV="http://api.openweathermap.org/data/2.5/uvi?appid=7b0bd5c0c62495154f103ff6cbf437d6&lat="+response.coord.lat+"&lon="+response.coord.lon;
        $.ajax({
            url: queryUrlUV,
            method: "GET"
        }).then(function(response){
            displayUVIndex(response);
        })
    }).fail(function(){
        $("#error").hide();
        $("#col2").hide();
        var el=$("<div id=\"error\"></div>").text("The city name is not valid");
        $("#search-section").append(el);
    })

   var queryUrlCity5Days="http://api.openweathermap.org/data/2.5/forecast?cnt=5&q="+cityName+"&units=imperial&appid=7b0bd5c0c62495154f103ff6cbf437d6";
   $.ajax({
    url: queryUrlCity5Days,
    method: "GET"
   }).then(function(response){
    display5Day(response);
   }).then(function(){
    
    if(localStorage.getItem(cityName)==undefined && cod==200){
        var el= $("<a class=\"list-group-item list-group-item-action\"></a>").text(cityName);
       $(".list-group").append(el);
       }
       localStorage.setItem(cityName,"weather_search");
       
   })
  
}

/* * * * */

/* getting weather for the search history */
$("a").on("click",function(){
    searchByCity($(this).text());
});

$("#search-input").on("click",function(){
     searchClick=0;
    $("#search-input").val('');
});



});





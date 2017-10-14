/* Setup - Code by Yuki */
var skycons = new Skycons({"color": "black"});
skycons.play();
$("#temp_c").hide();

document.addEventListener("DOMContentLoaded", function(){
  // Handler when the DOM is fully loaded
  var d = new Date();
  var n = d.getHours(); //get current hour
// change background image according to current hour
if(n > 17) {
  document.body.style.backgroundImage = "url('https://res.cloudinary.com/dkzj4hdmd/image/upload/v1498531651/night_tnca4b.jpg')";
  $(this).find("img").fadeIn();
} else if (n > 0 && n < 8) {
  document.body.style.backgroundImage = "url('https://res.cloudinary.com/dkzj4hdmd/image/upload/v1498547933/sunlight_xddstf.jpg')";
  $(this).find("img").fadeIn();
} else {
  document.body.style.backgroundImage = "url('https://res.cloudinary.com/dkzj4hdmd/image/upload/v1498530840/ELFADSC08956_TP_V_wqqxok.jpg')";
  $(this).find("img").fadeIn();
} //end of changing bg image
});

function geoipGet() {
  //get geolocation info from API
  var i = 0; // mouseclick count
  var latlon = 0; //for long/lat
		//get geolocation from API  
 		$.getJSON("https://ipinfo.io?token=20de57451ee87d", function (response) {
   		var keys = Object.keys(response);
  		latlon = response.loc;
      var locat = response.city + ", " + response.country;

    // Get weather report from API
  $.getJSON("https://api.darksky.net/forecast/f44a6b0153eb763f119c3a0a16e2c6c3/"+ latlon + "?exclude=minutely,hourly,alerts,flags&lang=en&callback=?", function(json) {
    var html = "";
    var keys = Object.keys(json);
    var temp = json.currently.temperature;
    
   html += '<h2 class="text-primary">Temp: '+ temp + '°F </h2>';
    var summary =  '<p>'+ json.currently.summary +'</p>';
    
    var today = moment().format("dddd, Do MMMM YYYY");
    var time = '<p><b>Time: </b>'+ today +'</p>'; // get current time via moment js
    
    var daily =  '<p id="daily"><b>Daily Report: </b>'+ json.daily.summary +'</p>';
    
    $("#location").html("<strong>" + locat + "</strong>"); //get city name from api
    $("#temp").html(html); //add weather repot to html
    $("#summary").html(summary);
    $("#time").html(time);
    $("#daily").html(daily);
    
    function getIcon() {
      //change weather icon
      var icon = json.currently.icon.toUpperCase().replace(/-/g,"_"); //replace API format to SkyCon format
      skycons.set("icon1", Skycons[icon]);
    }
    
    document.getElementById("changeDegree").onclick = function(){
      // set onclick function and change temp div
      if(i === 0) {
        var tempc = Math.round(((json.currently.temperature-32) * 5/9)*100)/100;
        var temp_c = '<h2 class="text-primary">Temp: '+ tempc + '°C </h2>';
        i++;
        $("#temp").hide();
        $("#temp_c").html(temp_c).show();
        
      } else if (i === 1) {
        temp = json.currently.temperature;
        $("#temp_c").hide();
        $("#temp").show();
        i--;
      }
    };
    
    getIcon();
	});
});//end of JSON api

}

geoipGet();

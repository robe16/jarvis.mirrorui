var tday=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
var tmonth=new Array("January","February","March","April","May","June","July","August","September","October","November","December");	


function startWeather(pageLocation) {
	
	function GetWeather() {
		// Retrieve weather from server
		//
		var theUri = "/data/info/weather/forecast";
		httpGetAsync(theUri, createWeather);
		// (as XMLHttpRequest is being used async,
		// return the createWeather as callback)
		//
	}
	
	function createWeather(data) {
		//
		var weatherDiv = document.createElement("DIV");
		weatherDiv.className = "weather-container";
		//
		// Parse json
		dataJson = JSON.parse(data);
		//
		var town = dataJson.location.name;
		var forecast = dataJson.days;
		//
		for (d = 0; d < Object.keys(forecast).length; d++) {
			var day_item = forecast[d];
			var daytime = day_item.daytime;
//		    var nighttime = day_item.nighttime;
//		    var hourly = day_item["3hourly"];
			//
		    var dateObj = moment(day_item.date, "YYYY-MM-DD");
		    var strDay = dateObj.format("ddd");
		    var strDate = dateObj.format("Do MMMM");
		    //
		    var type_key = daytime.weather_type;
		    var temp = daytime.temp;
		    var temp_unit = dataJson.units.daily.temp;
		    var wind = daytime.wind_speed;
		    var wind_unit = dataJson.units.daily.wind_speed;
		    var rain = daytime.precipitation_prob;
		    var rain_unit = dataJson.units.daily.precipitation_prob;
		    var visibility = daytime.visibility;
		    var uv = daytime.uv_index;
		    //
		    var sunriseDateObj = moment(day_item.sunRiseSet.sunrise, "YYYY-MM-DD h:mm:ss");
		    var sunrise = sunriseDateObj.format("HH:mm");
		    var sunsetDateObj = moment(day_item.sunRiseSet.sunset, "YYYY-MM-DD h:mm:ss");
		    var sunset = sunsetDateObj.format("HH:mm");
		    //
			//
			if (d==0) {
				// Create top row with today's weather type glyph and temperature
				//
				// weather glyph
				var glyphTodayType = document.createElement("I");
				glyphTodayType.className = "material-text-light-disabled weather_type_glyph_dy wi " + getWeatherType_glyph(daytime["weather_type"]);
				var divTodayType = document.createElement("DIV");
				divTodayType.className = "col-xs-6 weather_detail_type align_left";
				divTodayType.appendChild(glyphTodayType);
				//
				// temperature
				var tempToday = document.createElement("P");
				tempToday.className = "weather_detail_large";
				tempToday.innerHTML = temp;
				var tempUnit = document.createElement("P");
				tempUnit.className = "temp_unit_day";
				tempUnit.innerHTML = temp_unit;
				var divTodayTemp = document.createElement("DIV");
				divTodayTemp.className = "col-xs-6 weather_detail_type temp_div align_left";
				divTodayTemp.appendChild(tempToday);
				divTodayTemp.appendChild(tempUnit);
				//
				var rowDiv = document.createElement("DIV");
				rowDiv.className = "row";
				rowDiv.appendChild(divTodayType);
				rowDiv.appendChild(divTodayTemp);
				//
				weatherDiv.appendChild(rowDiv);
				//
				// Sunrise
				var glyphSunrise = document.createElement("I");
				glyphSunrise.className = "material-text-light-disabled weather_type_glyph_hr wi wi-sunrise";
				glyphSunrise.style.padding = "10px 0px 0px 0px";
				var divSunriseG = document.createElement("DIV");
				divSunriseG.className = "col-xs-1 weather_detail";
				divSunriseG.appendChild(glyphSunrise)
				var divSunriseP = document.createElement("DIV");
				divSunriseP.className = "col-xs-5 weather_detail";
				divSunriseP.innerHTML = sunrise;
				//
				// Sunset
				var glyphSunset = document.createElement("I");
				glyphSunset.className = "material-text-light-disabled weather_type_glyph_hr wi wi-sunrise";
				glyphSunset.style.padding = "10px 0px 0px 0px";
				var divSunsetG = document.createElement("DIV");
				divSunsetG.className = "col-xs-1 weather_detail";
				divSunsetG.appendChild(glyphSunset)
				var divSunsetP = document.createElement("DIV");
				divSunsetP.className = "col-xs-4 weather_detail";
				divSunsetP.innerHTML = sunset;
				//
				var rowDiv = document.createElement("DIV");
				rowDiv.className = "row";
				rowDiv.appendChild(divSunriseG);
				rowDiv.appendChild(divSunriseP);
				rowDiv.appendChild(divSunsetG);
				rowDiv.appendChild(divSunsetP);
				//
				weatherDiv.appendChild(rowDiv);
				//
				// wind
				var glyphWind = document.createElement("I");
				glyphWind.className = "material-text-light-disabled weather_type_glyph_hr glyphicon glyphicon-flag";
				glyphWind.style.padding = "10px 0px 0px 0px";
				var divWindG = document.createElement("DIV");
				divWindG.className = "col-xs-1 weather_detail";
				divWindG.appendChild(glyphWind)
				var divWindP = document.createElement("DIV");
				divWindP.className = "col-xs-5 weather_detail";
				divWindP.innerHTML = wind + wind_unit;
				//
				// rain
				var glyphRain = document.createElement("I");
				glyphRain.className = "material-text-light-disabled weather_type_glyph_hr wi wi-raindrop";
				glyphRain.style.padding = "10px 0px 0px 0px";
				var divRainG = document.createElement("DIV");
				divRainG.className = "col-xs-1 weather_detail";
				divRainG.appendChild(glyphRain)
				var divRainP = document.createElement("DIV");
				divRainP.className = "col-xs-4 weather_detail";
				divRainP.innerHTML = rain + rain_unit;
				//
				var rowDiv = document.createElement("DIV");
				rowDiv.className = "row";
				rowDiv.appendChild(divWindG);
				rowDiv.appendChild(divWindP);
				rowDiv.appendChild(divRainG);
				rowDiv.appendChild(divRainP);
				//
				weatherDiv.appendChild(rowDiv);
				//
				// visibility
				var glyphVisibility = document.createElement("I");
				glyphVisibility.className = "material-text-light-disabled weather_type_glyph_hr glyphicon glyphicon-eye-open";
				glyphVisibility.style.padding = "10px 10px 0px 0px";
				var divVisibilityG = document.createElement("DIV");
				divVisibilityG.className = "col-xs-1 weather_detail align_right temp_div";
				divVisibilityG.appendChild(glyphVisibility)
				var divVisibilityP = document.createElement("DIV");
				divVisibilityP.className = "col-xs-5 weather_detail align_right temp_div";
				divVisibilityP.innerHTML = visibility;
				//
				// uv
				var glyphUv = document.createElement("I");
				glyphUv.className = "material-text-light-disabled weather_type_glyph_hr glyphicon glyphicon-sunglasses";
				glyphUv.style.padding = "10px 5px 0px 0px";
				var divUvG = document.createElement("DIV");
				divUvG.className = "col-xs-1 weather_detail align_right temp_div";
				divUvG.appendChild(glyphUv)
				var divUvP = document.createElement("DIV");
				divUvP.className = "col-xs-4 weather_detail align_right temp_div";
				divUvP.innerHTML = uv;
				//
				var rowDiv = document.createElement("DIV");
				rowDiv.className = "row";
				rowDiv.appendChild(divVisibilityG);
				rowDiv.appendChild(divVisibilityP);
				rowDiv.appendChild(divUvG);
				rowDiv.appendChild(divUvP);
				//
				weatherDiv.appendChild(rowDiv);
				//
				var divider = document.createElement("HR");
				divider.className = "weather_divider material-text-light-disabled";
				var rowDiv = document.createElement("DIV");
				rowDiv.className = "row";
				rowDiv.appendChild(divider);
				//
				weatherDiv.appendChild(rowDiv);
				//
			} else {
				// Create individual rows for each day of the coming week
				var x = document.createElement("DIV");
				//
				var divDay = document.createElement("DIV");
				divDay.className = "col-xs-3 weather_detail material-text-light-disabled";
				divDay.innerHTML = strDay;
				//
				var glyphType = document.createElement("I");
				glyphType.className = "weather_type_glyph_hr wi " + getWeatherType_glyph(daytime["weather_type"]);
				var divGlyph = document.createElement("DIV");
				divGlyph.className = "col-xs-3 weather_detail";
				divGlyph.appendChild(glyphType);
				//
				var tempDay = document.createElement("P");
				tempDay.innerHTML = temp;
				var tempUnit = document.createElement("P");
				tempUnit.className = "temp_unit_hour";
				tempUnit.innerHTML = temp_unit;
				var divTemp = document.createElement("DIV");
				divTemp.className = "col-xs-3 weather_detail temp_div";
				divTemp.appendChild(tempDay);
				divTemp.appendChild(tempUnit);
				//
				var divRain = document.createElement("DIV");
				divRain.className = "col-xs-3 weather_detail";
				divRain.innerHTML = rain + rain_unit;
				//
				var rowDiv = document.createElement("DIV");
				rowDiv.className = "row";
				rowDiv.appendChild(divDay);
				rowDiv.appendChild(divGlyph);
				rowDiv.appendChild(divTemp);
				rowDiv.appendChild(divRain);
				//
				weatherDiv.appendChild(rowDiv)
				//
			}
			//
		}
		//
		// Add to body of document
		document.getElementById(pageLocation).innerHTML = "";
		document.getElementById(pageLocation).appendChild(weatherDiv);
	}
	
	GetWeather();
	setInterval(GetWeather, 100000); //10minutes
}


function getWeatherType_desc(index) {
    return getWeatherType_detail(index, "desc");
}

function getWeatherType_glyph(index) {
    return getWeatherType_detail(index, "glyph");
}

function getWeatherType_detail(index, detail) {
    return weather_type[index][detail];
}

weather_type = {"NA": {"desc": "Not available",
                       "glyph": "wi-na"},
                "0": {"desc": "Clear night",
                      "glyph": "wi-night-clear"},
                "1": {"desc": "Sunny day",
                      "glyph": "wi-day-sunny"},
                "2": {"desc": "Partly cloudy(night)",
                      "glyph": "wi-night-alt-partly-cloudy"},
                "3": {"desc": "Partly cloudy(day)",
                      "glyph": "wi-day-sunny-overcast"},
                "4": {"desc": "Not used",
                      "glyph": "wi-na"},
                "5": {"desc": "Mist",
                      "glyph": "wi-dust"},
                "6": {"desc": "Fog",
                      "glyph": "wi-fog"},
                "7": {"desc": "Cloudy",
                      "glyph": "wi-cloud"},
                "8": {"desc": "Overcast",
                      "glyph": "wi-cloudy"},
                "9": {"desc": "Light rain shower(night)",
                      "glyph": "wi-night-alt-showers"},
                "10": {"desc": "Light rain shower(day)",
                       "glyph": "wi-day-showers"},
                "11": {"desc": "Drizzle",
                       "glyph": "wi-sprinkle"},
                "12": {"desc": "Light rain",
                       "glyph": "wi-showers"},
                "13": {"desc": "Heavy rain shower(night)",
                       "glyph": "wi-night-alt-rain"},
                "14": {"desc": "Heavy rain shower(day)",
                       "glyph": "wi-day-rain",
                       "img": "weather_heavy-rain-day.png"},
                "15": {"desc": "Heavy rain",
                       "glyph": "wi-rain"},
                "16": {"desc": "Sleet shower(night)",
                       "glyph": "wi-night-sleet"},
                "17": {"desc": "Sleet shower(day)",
                       "glyph": "wi-day-sleet"},
                "18": {"desc": "Sleet",
                       "glyph": "wi-sleet"},
                "19": {"desc": "Hail shower(night)",
                       "glyph": "wi-night-hail"},
                "20": {"desc": "Hail shower(day)",
                       "glyph": "wi-day-hail"},
                "21": {"desc": "Hail",
                       "glyph": "wi-hail"},
                "22": {"desc": "Light snow shower(night)",
                       "glyph": "wi-night-alt-snow"},
                "23": {"desc": "Light snow shower(day)",
                       "glyph": "wi-day-snow"},
                "24": {"desc": "Light snow",
                       "glyph": "wi-snow"},
                "25": {"desc": "Heavy snow shower(night)",
                       "glyph": "wi-night-alt-snow"},
                "26": {"desc": "Heavy snow shower(day)",
                       "glyph": "wi-day-snow"},
                "27": {"desc": "Heavy snow",
                       "glyph": "wi-snow"},
                "28": {"desc": "Thunder shower(night)",
                       "glyph": "wi-night-alt-lightning"},
                "29": {"desc": "Thunder shower(day)",
                       "glyph": "wi-day-lightning"},
                "30": {"desc": "Thunder",
                       "glyph": "wi-lightning"}}


function getWind_glyphDegreeFrom(direction) {
    return getWind_glyph(direction, "degree_from");
}

function getWind_glyphDegreeTo(direction) {
    return getWind_glyph(direction, "degree_to");
}

function getWind_glyphCardinalFrom(direction) {
    return getWind_glyph(direction, "cardinal_from");
}

function getWind_glyphCardinalTo(direction) {
    return getWind_glyph(direction, "cardinal_to");
}

function getWind_glyph(direction, detail) {
    return wind[direction.lower()]["glyph"][detail];
}

wind = {"n": {"glyph": {"degree_from": "from-0-deg",
                        "degree_to": "towards-180-deg",
                        "cardinal_from": "wi-from-n",
                        "cardinal_to": "wi-towards-s",
                        "arrow": ""}},
        "nne": {"glyph": {"degree_from": "from-23-deg",
                          "degree_to": "towards-203-deg",
                          "cardinal_from": "wi-from-nne",
                          "cardinal_to": "wi-towards-ssw",
                        "arrow": ""}},
        "ne": {"glyph": {"degree_from": "from-45-deg",
                         "degree_to": "towards-225-deg",
                         "cardinal_from": "wi-from-ne",
                         "cardinal_to": "wi-towards-sw"}},
        "ene": {"glyph": {"degree_from": "from-68-deg",
                          "degree_to": "towards-248-deg",
                          "cardinal_from": "wi-from-ene",
                          "cardinal_to": "wi-towards-wsw"}},
        "e": {"glyph": {"degree_from": "from-90-deg",
                        "degree_to": "towards-270-deg",
                        "cardinal_from": "wi-from-e",
                        "cardinal_to": "wi-towards-w"}},
        "ese": {"glyph": {"degree_from": "from-113-deg",
                          "degree_to": "towards-293-deg",
                          "cardinal_from": "wi-from-ese",
                          "cardinal_to": "wi-towards-wnw"}},
        "se": {"glyph": {"degree_from": "from-135-deg",
                         "degree_to": "towards-313-deg",
                         "cardinal_from": "wi-from-se",
                         "cardinal_to": "wi-towards-nw"}},
        "sse": {"glyph": {"degree_from": "from-158-deg",
                          "degree_to": "towards-336-deg",
                          "cardinal_from": "wi-from-sse",
                          "cardinal_to": "wi-towards-nnw"}},
        "s": {"glyph": {"degree_from": "from-180-deg",
                        "degree_to": "towards-0-deg",
                        "cardinal_from": "wi-from-s",
                        "cardinal_to": "wi-towards-n"}},
        "ssw": {"glyph": {"degree_from": "from-203-deg",
                          "degree_to": "towards-23-deg",
                          "cardinal_from": "wi-from-ssw",
                          "cardinal_to": "wi-towards-nne"}},
        "sw": {"glyph": {"degree_from": "from-225-deg",
                         "degree_to": "towards-45-deg",
                         "cardinal_from": "wi-from-sw",
                         "cardinal_to": "wi-towards-ne"}},
        "wsw": {"glyph": {"degree_from": "from-248-deg",
                          "degree_to": "towards-68-deg",
                          "cardinal_from": "wi-from-wsw",
                          "cardinal_to": "wi-towards-ene"}},
        "w": {"glyph": {"degree_from": "from-270-deg",
                        "degree_to": "towards-90-deg",
                        "cardinal_from": "wi-from-w",
                        "cardinal_to": "wi-towards-e"}},
        "wnw": {"glyph": {"degree_from": "from-293-deg",
                          "degree_to": "towards-113-deg",
                          "cardinal_from": "wi-from-wnw",
                          "cardinal_to": "wi-towards-ese"}},
        "nw": {"glyph": {"degree_from": "from-313-deg",
                         "degree_to": "towards-135-deg",
                         "cardinal_from": "wi-from-nw",
                         "cardinal_to": "wi-towards-se"}},
        "nnw": {"glyph": {"degree_from": "from-336-deg",
                          "degree_to": "towards-158-deg",
                          "cardinal_from": "wi-from-nnw",
                          "cardinal_to": "wi-towards-sse"}}}


function getVisibility_desc(index) {
    return getVisibility_detail(index, "desc");
}

function getVisibility_dist(index) {
    return getVisibility_detail(index, "dist");
}

function getVisibility_detail(index, detail) {
    return visibility[index][detail];
}

visibility = {"UN": {"desc": "Unknown",
                     "dist": "-"},
              "VP": {"desc": "Very poor",
                     "dist": "Less than 1 km"},
              "PO": {"desc": "Poor",
                     "dist": "Between 1 - 4 km"},
              "MO": {"desc": "Moderate",
                     "dist": "Between 4 - 10 km"},
              "GO": {"desc": "Good",
                     "dist": "Between 10 - 20 km"},
              "VG": {"desc": "Very good",
                     "dist": "Between 20 - 40 km"},
              "EX": {"desc": "Excellent",
                     "dist": "More than 40 km"}}


function getUV_desc(index) {
    return getUV_detail(index, "desc");
}

function getUV_protection(index) {
    return getUV_detail(index, "protection");
}

function getUV_colour(index) {
    return getUV_detail(index, "colour")
}

function getUV_detail(index, detail) {
	for (var i = 0; i < uv; i++) {
	    if (item["index"].indexOf(index) >= 0) {
	    	return item[detail]
	    }
	}
}

uv = [{"index": [0],
       "desc": "-",
       "protection": "-",
       "colour": "#ffffff"},
      {"index": [1, 2],
       "desc": "Low",
       "protection": "No protection required.You can safely stay outside",
       "colour": "#289500"},
      {"index": [3, 4, 5],
       "desc": "Moderate",
       "protection" : "Seek shade during midday hours, cover up and wear sunscreen",
       "colour": "#f7e400"},
      {"index": [6, 7],
       "desc": "High",
       "protection": "Seek shade during midday hours, cover up and wear sunscreen",
       "colour": "#f85900"},
      {"index": [8, 9, 10],
       "desc": "Very high",
       "protection": "Avoid being outside during midday hours. Shirt, sunscreen and hat are essential",
       "colour": "#d8001d"},
      {"index": [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
       "desc": "Extreme",
       "protection": "Avoid being outside during midday hours. Shirt, sunscreen and hat essential",
       "colour": "#6b49c8"}]
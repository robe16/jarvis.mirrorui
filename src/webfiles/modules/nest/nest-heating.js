function startHeating(moduleId, serviceIP) {

	function getThermostats() {
		//
		var theUri = "/devices/thermostats";
		httpGetAsync(serviceIP, theUri, createThermostats);
		//
	}

	function createThermostats(data) {
		//
		var thermostatsDiv = document.createElement("DIV");
		thermostatsDiv.className = "container-fluid nest_heating-container";
		//
		// Parse json
		dataJson = JSON.parse(data);
		//
		var thermostats = dataJson.thermostats;
		//
		for (var thermId in thermostats) {
			//
			var thermostat = thermostats[thermId];
			//
		    // var thermId = thermostat.device_id;
			var thermOnline = thermostat.is_online;
		    var thermName = thermostat.name;
			var thermLeaf = thermostat.has_leaf;
			var thermWater = false;  // var thermWater = thermostat.water_heating;
		    var thermTempScale = thermostat.temperature_scale;
		    var thermTempTarget = thermostat["target_temperature_" + thermTempScale.toLowerCase()];
		    var thermTempCurrent = thermostat["ambient_temperature_" + thermTempScale.toLowerCase()];
		    var thermState = thermostat.hvac_state;
		    var thermHumidity = thermostat.humidity
		    //
            var thermDiv = document.createElement("DIV");
            thermDiv.className = "nest_therm";
            //
            if (thermTempScale == "C") {var unit = "&#8451;";}
            else if (thermTempScale == "F") {var unit = "&#8457";}
            else {var unit = "";}
            //
            var divThermTempUnitTarget = document.createElement("P");
            divThermTempUnitTarget.className = "nest_tempUnit";
            divThermTempUnitTarget.innerHTML = unit;
            var divThermTempUnitCurrent = divThermTempUnitTarget.cloneNode(true)
            //
            if (thermOnline) {
                //
                var imgThermIcon = document.createElement("IMG");
                imgThermIcon.className = "nest_thermIcon";
                if (thermState=="heating") {imgThermIcon.src = "/images/icons/icon_nest_thermostat_heat.png";}
                else if (thermState=="cooling") {imgThermIcon.src = "/images/icons/icon_nest_thermostat_cool.png";}
                else if (thermState=="off") {imgThermIcon.src = "/images/icons/icon_nest_thermostat_off.png";}
                else {imgThermIcon.src = "/images/icons/icon_nest_thermostat_offline.png";}
                //
//                var pThermState = document.createElement("P");
//                pThermState.className = "nest_tempState";
//                pThermState.innerHTML = thermState;
                //
                var divThermIcon = document.createElement("DIV");
                divThermIcon.className = "col-xs-3 nest_thermDivs";
                divThermIcon.appendChild(imgThermIcon);
//                divThermIcon.appendChild(pThermState);
                //
                //
                var divThermName = document.createElement("DIV");
                divThermName.className = "nest_thermName material-text-light-primary";
                divThermName.innerHTML = thermName;
                //
                var pThermTempCurrent = document.createElement("P");
                pThermTempCurrent.className = "nest_tempValue";
                pThermTempCurrent.innerHTML = "Current: " + thermTempCurrent;
                var divThermTempCurrent = document.createElement("DIV");
                divThermTempCurrent.className = "nest_temp material-text-light-primary";
                divThermTempCurrent.appendChild(pThermTempCurrent);
                divThermTempCurrent.appendChild(divThermTempUnitCurrent);
                //
                var pThermTempTarget = document.createElement("P");
                pThermTempTarget.className = "nest_tempValue";
                pThermTempTarget.innerHTML = "Target: " + thermTempTarget;
                var divThermTempTarget = document.createElement("DIV");
                divThermTempTarget.className = "nest_temp material-text-light-primary";
                divThermTempTarget.appendChild(pThermTempTarget);
                divThermTempTarget.appendChild(divThermTempUnitTarget);
                //
                var divThermTemp = document.createElement("DIV");
                divThermTemp.className = "material-text-light-primary";
                divThermTemp.appendChild(divThermTempCurrent);
                divThermTemp.appendChild(divThermTempTarget);
                //
                var divThermDetails = document.createElement("DIV");
                divThermDetails.className = "col-xs-7 nest_thermDivs";
                divThermDetails.appendChild(divThermName);
                divThermDetails.appendChild(divThermTemp);
                //
                var divThermDetailsLeafWater = document.createElement("DIV");
                divThermDetailsLeafWater.className = "col-xs-2 nest_thermDivs";
                //
                if (thermWater) {
//                    var imgThermWater = document.createElement("IMG");
//                    imgThermWater.className = "nest_thermIcon";
//                    imgThermWater.src = "/images/icons/icon_nest_water_heating.png";
//                    divThermDetailsLeafWater.appendChild(imgThermWater);
                }
                //
                if (thermLeaf) {
                    var imgThermLeaf = document.createElement("IMG");
                    imgThermLeaf.className = "nest_thermIcon";
                    imgThermLeaf.src = "/images/icons/icon_nest_leaf.png";
                    divThermDetailsLeafWater.appendChild(imgThermLeaf);
                }
                //
                thermDiv.appendChild(divThermIcon);
                thermDiv.appendChild(divThermDetails);
                thermDiv.appendChild(divThermDetailsLeafWater);
                //
            } else {
                //
            }
            //
            thermostatsDiv.appendChild(thermDiv);
            //
		}
		//
        document.getElementById(moduleId).innerHTML = "";
        document.getElementById(moduleId).appendChild(thermostatsDiv);
        //
	}

	getThermostats();
	setInterval(getThermostats, 30000); //30 seconds
}
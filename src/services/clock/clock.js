function startClock(pageLocation) {
	
	function GetClock() {
	    //
		var date = moment().format("dddd Do MMM YYYY");
		var time = moment().format("HH:mm");
		//
		var dateDiv = document.createElement("DIV");
		dateDiv.className = "date material-text-light-secondary";
		dateDiv.innerHTML=date;
		//
		var timeDiv = document.createElement("DIV");
		timeDiv.className = "time";
		timeDiv.innerHTML=time;
		//
		var datetimeDiv = document.createElement("DIV")
		datetimeDiv.appendChild(dateDiv)
		datetimeDiv.appendChild(timeDiv)
		//
		document.getElementById(pageLocation).innerHTML = ""
		document.getElementById(pageLocation).appendChild(datetimeDiv);
	}

	GetClock();
	setInterval(GetClock, 10000);
}
function startClock(pageLocation) {
	
	function GetClock() {
	    //
		//
		var d = moment();
		//
		var date = d.format("dddd Do MMM YYYY");
		var time = d.format("HH:mm");
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
	
//	window.onload=function() {
	GetClock();
	setInterval(GetClock, 10000);
//	}
}
function startClock(pageLocation, dividerTop=false, dividerBottom=false) {
	
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
        //
        if (dividerTop || dividerBottom) {
            var divider = document.createElement("HR");
            divider.className = "divider material-text-light-secondary";
            var dividerDiv = document.createElement("DIV");
            dividerDiv.className = "row icloud_events-row";
            dividerDiv.appendChild(divider);
        }
        //
        if (dividerTop) {document.getElementById(pageLocation).appendChild(dividerDiv);}
        //
		document.getElementById(pageLocation).appendChild(datetimeDiv);
        //
        if (dividerBottom) {document.getElementById(pageLocation).appendChild(dividerDiv);}
	}

	GetClock();
	setInterval(GetClock, 10000);
}
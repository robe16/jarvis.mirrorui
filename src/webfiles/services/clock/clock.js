function startClock(pageLocation, dividerTop=false, dividerBottom=false) {

    randId = generateId(10);
    var clockDivPId = "clockDiv-" + randId;

    var clockDivP = document.createElement("DIV");
    clockDivP.id = clockDivPId;
    clockDivP.draggable = true;
    clockDivP.ondragstart = function(){dragstart(event);};
    clockDivP.ondragend = function(){dragstop(event);};
    document.getElementById(pageLocation).appendChild(clockDivP);

	function GetClock() {
	    //
		var date = moment().format("dddd Do MMM YYYY");
		var time = moment().format("HH:mm");
		//
		var dateDiv = document.createElement("DIV");
		dateDiv.className = "date material-text-light-secondary";
		dateDiv.innerHTML = date;
		//
		var timeDiv = document.createElement("DIV");
		timeDiv.className = "time";
		timeDiv.innerHTML = time;
		//
		var datetimeDiv = document.createElement("DIV");
		datetimeDiv.appendChild(dateDiv);
		datetimeDiv.appendChild(timeDiv);
		//
        document.getElementById(clockDivPId).innerHTML = "";
        if (dividerTop) {document.getElementById(clockDivPId).appendChild(dividerDiv());}
        document.getElementById(clockDivPId).appendChild(datetimeDiv);
        if (dividerBottom) {document.getElementById(clockDivPId).appendChild(dividerDiv());}
	}

	GetClock();
	setInterval(GetClock, 10000);
}
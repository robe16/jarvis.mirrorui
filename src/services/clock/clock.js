var tday=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
var tmonth=new Array("January","February","March","April","May","June","July","August","September","October","November","December");	


function startClock(pageLocation) {
	
	function GetClock() {
		var d=new Date();
		var nday=d.getDay(),nmonth=d.getMonth(),ndate=d.getDate(),nyear=d.getFullYear();
		var nhour=d.getHours(),nmin=d.getMinutes();
		if(nmin<=9) nmin="0"+nmin
		//
		var date=""+tday[nday]+", "+ndate+" "+tmonth[nmonth]+" "+nyear+"";
		var time=""+nhour+":"+nmin+"";
		//
		var dateDiv = document.createElement("DIV");
		dateDiv.className = "date material-text-light-disabled";
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
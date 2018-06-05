function startEvents(pageLocation, serviceIP, dividerTop=false, dividerBottom=false) {

	function getEvents() {
		// Retrieve events from server
		//
		var fromDateObj = moment();
		var toDateObj = moment().add(7, 'days');
		//
		var date_from = fromDateObj.format("YYYY-MM-DD");
		var date_to = toDateObj.format("YYYY-MM-DD");
		//
		var theUri = "/icloud/events/daterange/datefrom/" + date_from + "/dateto/" + date_to;
		httpGetAsync(serviceIP, theUri, createEvents);
		//
	}

	function createEvents(data) {
	    //
		document.getElementById(pageLocation).innerHTML = "";
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
		var eventsDiv = document.createElement("DIV");
		eventsDiv.className = "icloud_events-container";
		//
		// Parse json
		dataJson = JSON.parse(data);
		//
		var events = dataJson.events;
		//
		var tempEvents = {};
		var todaysEvents = new Array();
        //
        var now = new Date();
		//
		for (var e_num in events) {
			//
			var e = events[e_num];
			//
		    var eventDateObj_start = moment(e.start, "YYYY-MM-DD HH:mm");
		    var eventDateObj_end = moment(e.end, "YYYY-MM-DD HH:mm");
		    var eventDate_key = eventDateObj_start.format("YYYY-MM-DD");
		    var eventDate = eventDateObj_start.format("DD MMM");
		    var eventTime = eventDateObj_start.format("HH:mm");
		    //
		    var eventName = e.title;
		    //
//		    if (eventDateObj_end > now) {
		    if (true) {
                //
                if (e.allDay) {
                    var _time = "all day";
                } else {
                    var _time = eventTime;
                }
                //
                var eventDescription = eventName;
                //
//                if (e.location != null) {
//                    //
//                    var location = e.location;
//                    //
//                    if (location.indexOf('\n') > -1) {
//                        var location = location.split('\n');
//                    } else if (location.indexOf(',') > -1) {
//                        var location = location.split(',');
//                    }
//                    //
//                    eventDescription += "  [";
//                    eventDescription += location[0];
//                    eventDescription += "]";
//                }
                //
                var divEventDate = document.createElement("DIV");
                divEventDate.className = "col-xs-3 material-text-light-primary icloud_events-date";
                divEventDate.innerHTML = _time;
                var divEventName = document.createElement("DIV");
                divEventName.className = "col-xs-9 icloud_events-name";
                divEventName.innerHTML = eventDescription;
                //
                var rowDiv = document.createElement("DIV");
                rowDiv.className = "row icloud_events-row";
                rowDiv.appendChild(divEventDate);
                rowDiv.appendChild(divEventName);
                //
                if (!tempEvents.hasOwnProperty(eventDate_key)) {
                    tempEvents[eventDate_key] = {};
                }
                tempEvents[eventDate_key][eventTime] = rowDiv;
                //
            }
		}
		//
		// Sort tempEvents and then add to eventsDiv
		var keys_dates = [];
		for (k_d in tempEvents) {
		  if (tempEvents.hasOwnProperty(k_d)) {
		    keys_dates.push(k_d);
		  }
		}
		keys_dates.sort();
		//
		for (i = 0; i < keys_dates.length; i++) {
            k_d = keys_dates[i];
            //
            var divEventTitle = document.createElement("DIV");
            divEventTitle.className = "row icloud_events-row material-text-light-secondary icloud_events-title";
            //
            _date = moment(k_d, "YYYY-MM-DD").format("dddd Do MMM");
            var today = moment(today).format("dddd Do MMM");
            var tomorrow = moment(today).add(1, 'days').format("dddd Do MMM");
            //
            if (_date == today) {
                var _date = "Today";
            } else if (_date == tomorrow) {
                var _date = "Tomorrow";
            } else {
                var _date = moment(k_d, "YYYY-MM-DD").format("dddd Do");
            }
            divEventTitle.innerHTML = _date;
            //
            eventsDiv.appendChild(divEventTitle);
            //
            var keys_events = [];
            for (k_t in tempEvents[k_d]) {
              if (tempEvents[k_d].hasOwnProperty(k_t)) {
                keys_events.push(k_t);
              }
            }
            keys_events.sort();
            //
            for (j = 0; j < keys_events.length; j++) {
                k_t = keys_events[j];
                eventsDiv.appendChild(tempEvents[k_d][k_t]);
            }
		    //
		}
		//
		// Add to body of document
		document.getElementById(pageLocation).appendChild(eventsDiv);
        //
        if (dividerBottom) {document.getElementById(pageLocation).appendChild(dividerDiv);}
	}

	getEvents();
	setInterval(getEvents, 150000); //15minutes
}

function addZ(n){return n<10? '0'+n:''+n;}
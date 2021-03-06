var calColours = ["red", "orange", "yellow", "green", "blue", "purple", "pink", "brown", "teal", "white", "black"]

function startEvents(moduleId, serviceIP) {

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
		    var eventDate_start = eventDateObj_start.format("DD MMM");
		    var eventTime_start = eventDateObj_start.format("HH:mm");
		    var eventDate_end = eventDateObj_end.format("DD MMM");
		    var eventTime_end = eventDateObj_end.format("HH:mm");
		    //
		    var eventName = e.title;
		    //
		    if (eventDateObj_end > now) {
                //
                var daysCount = eventDateObj_end.diff(eventDateObj_start, "days");
                if (!daysCount) {daysCount=1;}
                //
                for (var d = 0; d < daysCount; d++) {
                    //
                    if (d > 0) {
                        eventDateObj_start.add(1, 'days');
                        var eventDate_key = eventDateObj_start.format("YYYY-MM-DD");
		                var eventDate_start = eventDateObj_start.format("DD MMM");
                    }
                    //
                    if (e.allDay) {
                        var _time = "all day";
                    } else if (d > 0 && eventDate_end != eventDate_start) {
                        var _time = "all day";
                    } else if (d > 0 && eventDate_end == eventDate_start) {
                        var _time = "00:00";
                    } else {
                        var _time = eventTime_start;
                    }
                    //
                    var eventDiv = document.createElement("DIV");
                    //
                    var divEventDate = document.createElement("DIV");
                    divEventDate.className = "col-xs-2 material-text-light-primary icloud_events-date";
                    divEventDate.innerHTML = _time;
                    //
                    var divEventNameColour = document.createElement("DIV");
                    divEventNameColour.className = "col-xs-10 icloud_events-name-and-blob";
                    //
                    var calendars = e.calendars;
                    for (cal in calendars) {
                        // Create array of colurs needed for blobs
                        var colourBlobs = []
                        if (calendars[cal].colour != "none" && calColours.indexOf(calendars[cal].colour)) {
                            colourBlobs.push(calendars[cal].colour);
                        }
                        //
                        for (col in colourBlobs) {
                            //
                            var divColourBlob = document.createElement("DIV");
                            divColourBlob.className = "icloud_events-blob icloud_events-blob_" + colourBlobs[col];
                            divEventNameColour.appendChild(divColourBlob);
                            //
                        }
                    }
                    //
                    var txtEventName = document.createTextNode(eventName);
                    divEventNameColour.appendChild(txtEventName);
                    //
                    var rowDiv = document.createElement("DIV");
                    rowDiv.className = "row icloud_events-row";
                    rowDiv.appendChild(divEventDate);
                    rowDiv.appendChild(divEventNameColour);
                    //
                    eventDiv.appendChild(rowDiv);
                    //
                    if (e.location != null) {
                        //
                        var eventLocation = e.location;
                        //
    //                    eventLocation = eventLocation.replace('\n', ', ')
                        //
                        if (eventLocation.indexOf('\n') > -1) {
                            eventLocation = eventLocation.split('\n');
                            eventLocation = eventLocation[0];
                        } else if (eventLocation.indexOf(',') > -1) {
                            eventLocation = eventLocation.split(',');
                            eventLocation = eventLocation[0];
                        }
                        //
                        var divEventLocation = document.createElement("DIV");
                        divEventLocation.className = "col-xs-10 col-xs-offset-2 material-text-light-secondary icloud_events-location";
                        divEventLocation.innerHTML = eventLocation;
                        //
                        var rowDiv = document.createElement("DIV");
                        rowDiv.className = "row icloud_events-row";
                        rowDiv.appendChild(divEventLocation);
                        //
                        eventDiv.appendChild(rowDiv)
                        //
                    }
                    //
                    if (!tempEvents.hasOwnProperty(eventDate_key)) {
                        tempEvents[eventDate_key] = {};
                    }
                    // If multiple events with same start date and time, issue occurs with overwriting
                    // Following code rectifies this.
                    if (!tempEvents[eventDate_key].hasOwnProperty(eventTime_start)) {
                        tempEvents[eventDate_key][eventTime_start] = eventDiv;
                    } else {
                        eventTime_start += (tempEvents[eventDate_key].length + 1)
                        tempEvents[eventDate_key][eventTime_start] = eventDiv;
                    }
                    //
                }
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
        var fromDateObj = moment(moment().format("YYYY-MM-DD"), "YYYY-MM-DD");
        var toDateObj = moment().add(7, 'days');
        var todayDateObj = moment().format("dddd Do MMM");
        var tomorrowDateObj = moment().add(1, 'days').format("dddd Do MMM");
		//
		for (i = 0; i < keys_dates.length; i++) {
            k_d = keys_dates[i];
            //
            var itemDateObj = moment(k_d, "YYYY-MM-DD")
            //
            if (itemDateObj >= fromDateObj && itemDateObj <= toDateObj) {
                //
                var _date = itemDateObj.format("dddd Do MMM");
                //
                if (_date == todayDateObj) {
                    var _date = "Today";
                } else if (_date == tomorrowDateObj) {
                    var _date = "Tomorrow";
                } else {
                    var _date = moment(k_d, "YYYY-MM-DD").format("dddd Do");
                }
                //
                var divEventTitle = document.createElement("DIV");
                divEventTitle.className = "row icloud_events-row material-text-light-secondary icloud_events-title";
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
		}
		//
        document.getElementById(moduleId).innerHTML = "";
        document.getElementById(moduleId).appendChild(eventsDiv);
        //
	}

	getEvents();
	setInterval(getEvents, 150000); //15minutes
}

function addZ(n){return n<10? '0'+n:''+n;}
function startBirthdays(serviceId, serviceIP, dividerTop, dividerBottom) {

	function getBirthdays() {
		// Retrieve birthdays from server
		//
		var fromDateObj = moment();
		var toDateObj = moment().add(1, 'months');
		//
		var date_from = fromDateObj.format("YYYY-MM-DD");
		var date_to = toDateObj.format("YYYY-MM-DD");
		//
		var theUri = "/icloud/birthdays/daterange/datefrom/" + date_from + "/dateto/" + date_to;
		httpGetAsync(serviceIP, theUri, createBirthdays);
		//
	}

	function createBirthdays(data) {
		//
		var birthdayDiv = document.createElement("DIV");
		birthdayDiv.className = "icloud_birthday-container";
		//
		// Parse json
		dataJson = JSON.parse(data);
		//
		var birthdays = dataJson.birthdays;
		//
		var tempBirthdays = {};
		var todaysBirthdays = new Array();
		//
		for (var b_num in birthdays) {
			//
			var b = birthdays[b_num];
			//
			var today = new Date();
			var today = moment(today).format("DD MMM");
			//
		    var birthdayDateObj = moment(b.birthday, "YYYY-MM-DD");
		    var birthdayDate = birthdayDateObj.format("DD MMM");
		    //
		    var birthdayName = '';
		    //
		    if(b.hasOwnProperty('firstName')) {birthdayName += b.firstName + ' ';}
		    if(b.hasOwnProperty('lastName')) {birthdayName += b.lastName;}
		    //
		    if (birthdayDate == today) {
		        //
		        todaysBirthdays.push(birthdayName);
		        //
		    } else {
                //
                var divBirthdayDate = document.createElement("DIV");
                divBirthdayDate.className = "col-xs-2 material-text-light-primary icloud_birthday-date";
                divBirthdayDate.innerHTML = birthdayDate;
                var divBirthdayName = document.createElement("DIV");
                divBirthdayName.className = "col-xs-10 icloud_birthday-name";
                divBirthdayName.innerHTML = birthdayName;
                //
                var rowDiv = document.createElement("DIV");
                rowDiv.className = "row icloud_birthday-row";
                rowDiv.appendChild(divBirthdayDate);
                rowDiv.appendChild(divBirthdayName);
                //
                // If current month is December (12), then next month will be January (01) - this means
                // listing the tempBirthdays array based on month first will give incorrect ordering of dates.
                // To rectify this, the current year is added, unless the month number is before current month,
                // in which case use the following years number.
                if (birthdayDateObj.format("MM") < moment().format("MM")) {
                    y = moment().add(1, 'years').format("YYYY");
                } else {
                    y = moment().format("YYYY");
                }
                //
                tempBirthdays[birthdayDateObj.format(y + "-MM-DD")] = rowDiv;
                //
            }
		}
		//
		// Create a 'today's birthday' section if a birthday is today
		if (todaysBirthdays.length > 0) {
		    //
            var divBirthdayTodayTitle = document.createElement("DIV");
            divBirthdayTodayTitle.className = "row icloud_birthday-row material-text-light-secondary icloud_birthday-title";
            divBirthdayTodayTitle.innerHTML = "Today's birthdays";
		    document.getElementById(pageLocation).appendChild(divBirthdayTodayTitle);
            //
            for (b in todaysBirthdays) {
                //
                var divBirthdayName = document.createElement("DIV");
                divBirthdayName.className = "col-xs-10 col-xs-offset-2 icloud_birthday-name";
                divBirthdayName.innerHTML = todaysBirthdays[b];
                //
                var rowDiv = document.createElement("DIV");
                rowDiv.className = "row icloud_birthday-row";
                rowDiv.appendChild(divBirthdayName);
                //
                birthdayDiv.appendChild(rowDiv)
                //
            }
            //
            document.getElementById(pageLocation).appendChild(rowDiv);
            //
		}
        //
        // 'material-text-primary-500' or 'material-text-light'
        var divBirthdayTitle = document.createElement("DIV");
        divBirthdayTitle.className = "row icloud_birthday-row material-text-light-secondary icloud_birthday-title";
        divBirthdayTitle.innerHTML = "Upcoming birthdays";
		birthdayDiv.appendChild(divBirthdayTitle);
		//
		// Sort tempBirthdays and then add to birthdayDiv
		keys = [];
		for (k in tempBirthdays) {
		  if (tempBirthdays.hasOwnProperty(k)) {
		    keys.push(k);
		  }
		}
		keys.sort();
		//
		for (i = 0; i < keys.length; i++) {
		  k = keys[i];
		  birthdayDiv.appendChild(tempBirthdays[k]);
		}
		//
        document.getElementById(serviceId).innerHTML = "";
        if (dividerTop) {document.getElementById(serviceId).appendChild(dividerDiv());}
        document.getElementById(serviceId).appendChild(birthdayDiv);
        if (dividerBottom) {document.getElementById(serviceId).appendChild(dividerDiv());}
        //
	}

	getBirthdays();
	setInterval(getBirthdays, 150000); //15minutes
}

function addZ(n){return n<10? '0'+n:''+n;}
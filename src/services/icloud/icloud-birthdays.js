function startBirthdays(pageLocation, serviceIP) {

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
		document.getElementById(pageLocation).innerHTML = "";
		//
		var birthdayDiv = document.createElement("DIV");
		birthdayDiv.className = "birthday-container";
		//
		// Parse json
		dataJson = JSON.parse(data);
		//
		var birthdays = dataJson.birthdays;
		//
		var tempBirthdays = {};
		var todaysBirthdays = new Array();
        //
        // 'material-text-primary-500' or 'material-text-light'
        var divBirthdayTitle = document.createElement("DIV");
        divBirthdayTitle.className = "row birthday_row material-text-primary-500 birthday_title";
        divBirthdayTitle.innerHTML = "Upcoming birthdays";
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
                divBirthdayDate.className = "col-xs-2 material-text-light-secondary birthday_date";
                divBirthdayDate.innerHTML = birthdayDate;
                var divBirthdayName = document.createElement("DIV");
                divBirthdayName.className = "col-xs-10 birthday_name";
                divBirthdayName.innerHTML = birthdayName;
                //
                var rowDiv = document.createElement("DIV");
                rowDiv.className = "row birthday_row";
                rowDiv.appendChild(divBirthdayDate);
                rowDiv.appendChild(divBirthdayName);
                //
                tempBirthdays[birthdayDateObj.format("MM-DD")] = rowDiv;
                //
            }
		}
		//
		// Create a 'today's birthday' section if a birthday is today
		if (todaysBirthdays.length > 0) {
		    //
            var divBirthdayTodayTitle = document.createElement("DIV");
            divBirthdayTodayTitle.className = "row birthday_row material-text-primary-500 birthday_title";
            divBirthdayTodayTitle.innerHTML = "Today's birthdays:";
		    document.getElementById(pageLocation).appendChild(divBirthdayTodayTitle);
            //
            for (b in todaysBirthdays) {
                //
                var divBirthdayName = document.createElement("DIV");
                divBirthdayName.className = "col-xs-11 col-xs-1-offset birthday_name";
                divBirthdayName.innerHTML = todaysBirthdays[b];
                //
                var rowDiv = document.createElement("DIV");
                rowDiv.className = "row birthday_row";
                rowDiv.appendChild(divBirthdayName);
                //
                document.getElementById(pageLocation).appendChild(rowDiv);
                //
            }
            //
		}
		//
		// Sort tempBirthdays and then add to newsDiv
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
		// Add to body of document
		document.getElementById(pageLocation).appendChild(divBirthdayTitle);
		document.getElementById(pageLocation).appendChild(birthdayDiv);
	}

	getBirthdays();
	setInterval(getBirthdays, 150000); //15minutes
}

function addZ(n){return n<10? '0'+n:''+n;}
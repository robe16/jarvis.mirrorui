function httpGetAsync(serverIP, theUri, callback) {
	//
	var service_header_clientid_label = "jarvis.client-service";
	var service_id = "mirrorui";
	//
	var theUrl = serverIP + theUri;
	//
	var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {callback(xmlHttp.responseText);}
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
	xmlHttp.setRequestHeader(service_header_clientid_label, service_id);
    xmlHttp.send(null);
    //
}

function httpPostAsync(serverIP, theUri, payload) {
	//
	var service_header_clientid_label = "jarvis.client-service";
	var service_id = "mirrorui";
	//
	var theUrl = serverIP + theUri;
	//
	var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {}
    }
    xmlHttp.open("POST", theUrl, true); // true for asynchronous
	xmlHttp.setRequestHeader(service_header_clientid_label, service_id);
	xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(payload);
    //
}
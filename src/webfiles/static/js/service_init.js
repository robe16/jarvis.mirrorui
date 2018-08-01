function service_init(service, bundle, index, url=false, dividerTop=false, dividerBottom=false) {
    //
    var serviceId = service + "-" + generateId(10);
    //
    var serviceDiv = document.createElement("DIV");
    serviceDiv.id = serviceId;
    serviceDiv.draggable = true;
    serviceDiv.ondragstart = function(){dragstart(event);};
    serviceDiv.ondragend = function(){dragstop(event);};
    document.getElementById(bundle).appendChild(serviceDiv);
    //
    switch(service) {
        case "clock":
            startClock(serviceId, dividerTop, dividerBottom);
            break;
        case "weather":
            startWeather(serviceId, url, dividerTop, dividerBottom);
            break;
        case "news":
            startNews(serviceId, url, dividerTop, dividerBottom);
            break;
        case "icloud-events":
            startEvents(serviceId, url, dividerTop, dividerBottom);
            break;
        case "icloud-birthdays":
            startBirthdays(serviceId, url, dividerTop, dividerBottom);
            break;
        default:
            return false
    }
    //
}
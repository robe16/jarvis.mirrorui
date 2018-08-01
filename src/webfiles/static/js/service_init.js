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
            img = "module_clock.png";
            break;
        case "weather":
            startWeather(serviceId, url, dividerTop, dividerBottom);
            img = "module_weather.png";
            break;
        case "news":
            startNews(serviceId, url, dividerTop, dividerBottom);
            img = "module_news.png";
            break;
        case "icloud-events":
            startEvents(serviceId, url, dividerTop, dividerBottom);
            img = "module_calendar.png";
            break;
        case "icloud-birthdays":
            startBirthdays(serviceId, url, dividerTop, dividerBottom);
            img = "module_birthday.png";
            break;
        default:
            return false
    }
    //
    var imgBtn = document.createElement("IMG")
    imgBtn.className = "btn_img btn_pointer grayscale";
    imgBtn.src = "/images/modules/" + img;
    document.getElementById("btn_bar").appendChild(imgBtn);
    //
}
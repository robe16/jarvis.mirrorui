function module_init(service, bundle, index, url=false, dividerTop=false, dividerBottom=false) {
    //
    var moduleId = service + "-" + generateId(10);
    //
    var moduleDiv = document.createElement("DIV");
    moduleDiv.className = "module";
    moduleDiv.id = moduleId;
    moduleDiv.style.display = "block";
    moduleDiv.draggable = true;
    moduleDiv.ondragstart = function(){dragstart(event);};
    moduleDiv.ondragend = function(){dragstop(event);};
    document.getElementById(bundle).appendChild(moduleDiv);
    //
    switch(service) {
        case "clock":
            startClock(moduleId, dividerTop, dividerBottom);
            img = "module_clock.png";
            break;
        case "weather":
            startWeather(moduleId, url, dividerTop, dividerBottom);
            img = "module_weather.png";
            break;
        case "news":
            startNews(moduleId, url, dividerTop, dividerBottom);
            img = "module_news.png";
            break;
        case "icloud-events":
            startEvents(moduleId, url, dividerTop, dividerBottom);
            img = "module_calendar.png";
            break;
        case "icloud-birthdays":
            startBirthdays(moduleId, url, dividerTop, dividerBottom);
            img = "module_birthday.png";
            break;
        default:
            return false
    }
    //
    var imgBtn = document.createElement("IMG");
    imgBtn.className = "btn_img btn_pointer grayscale";
    imgBtn.src = "/images/modules/" + img;
    imgBtn.onclick = function(){toggleView(moduleId);};
    document.getElementById("btn_bar").appendChild(imgBtn);
    //
}
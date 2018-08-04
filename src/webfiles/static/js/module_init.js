function module_init(module, group, index, url=false) {
    //
    var moduleId = module + "-" + generateId(10);
    //
    var moduleDiv = document.createElement("DIV");
    moduleDiv.id = moduleId;
    document.getElementById(group).appendChild(moduleDiv);
    var moduleDiv = document.getElementById(moduleId);
    //
    moduleDiv.className = "module";
    moduleDiv.setAttribute("moduletype", module);
    if (url) {moduleDiv.setAttribute("moduleurl", url);}
    moduleDiv.style.display = "block";
    moduleDiv.draggable = true;
    moduleDiv.ondragstart = function(){dragstart(event);};
    moduleDiv.ondragend = function(){dragstop(event);};
    //
    switch(module) {
        case "divider":
            document.getElementById(moduleId).appendChild(createDivider(moduleId));
            img = false
            break;
        case "clock":
            startClock(moduleId);
            img = "module_clock.png";
            break;
        case "weather":
            startWeather(moduleId, url);
            img = "module_weather.png";
            break;
        case "news":
            startNews(moduleId, url);
            img = "module_news.png";
            break;
        case "icloud-events":
            startEvents(moduleId, url);
            img = "module_calendar.png";
            break;
        case "icloud-birthdays":
            startBirthdays(moduleId, url);
            img = "module_birthday.png";
            break;
        default:
            return false
    }
    //
    if (img) {
        var imgBtn = document.createElement("IMG");
        imgBtn.className = "btn_img btn_pointer grayscale";
        imgBtn.src = "/images/modules/" + img;
        imgBtn.onclick = function(){toggleView(moduleId);};
        document.getElementById("btn_bar").appendChild(imgBtn);
    }
    //
}
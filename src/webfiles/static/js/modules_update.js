function updateModules() {
    //
    var config = {};
    config.modules = [];
    //
    var moduleGroups = document.getElementsByClassName("module-group");
    //
    for (var i = 0; i < moduleGroups.length; i++) {
        bundle = moduleGroups[i].id;
        modules = moduleGroups[i].childNodes;
        for (var j = 0; j < modules.length; j++) {
            service = modules[j].getAttribute("moduletype");
            m = {"bundle": bundle, "service": service, "index": j};
            if (modules[j].hasAttribute("moduleurl")) {m.url = modules[j].getAttribute("moduleurl");}
            config.modules.push(m);
        }
    }
    //
    httpPostAsync("", "/modules", JSON.stringify(config))
    //
}
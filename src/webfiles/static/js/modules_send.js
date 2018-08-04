function modulesSendUpdate() {
    //
    var config = {};
    config.modules = [];
    //
    var moduleGroups = document.getElementsByClassName("module-group");
    //
    for (var i = 0; i < moduleGroups.length; i++) {
        group = moduleGroups[i].id;
        modules = moduleGroups[i].childNodes;
        for (var j = 0; j < modules.length; j++) {
            module = modules[j].getAttribute("moduletype");
            m = {"group": group, "module": module, "index": j};
            if (modules[j].hasAttribute("moduleurl")) {m.url = modules[j].getAttribute("moduleurl");}
            config.modules.push(m);
        }
    }
    //
    httpPostAsync("", "/modules", JSON.stringify(config))
    //
}
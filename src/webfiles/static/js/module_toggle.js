function toggleView(moduleId) {
    //
    var moduleDiv = document.getElementById(moduleId);
    var vis = moduleDiv.style.display;
    //
    if (vis == "block") {
        moduleDiv.style.display = "none";
    } else {
        moduleDiv.style.display = "block";
    }
    //
}

function toggleView(serviceId) {
    //
    var srvDiv = document.getElementById(serviceId);
    var vis = srvDiv.style.display;
    //
    if (vis == "block") {
        srvDiv.style.display = "none";
    } else {
        srvDiv.style.display = "block";
    }
    //
}

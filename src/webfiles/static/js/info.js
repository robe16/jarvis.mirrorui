function infoToggle() {
    //
    var infoDiv = document.getElementById("information");
    var vis = infoDiv.style.display;
    //
    if (vis == "block") {
        infoDiv.style.display = "none";
    } else {
        infoDiv.style.display = "block";
    }
    //
}
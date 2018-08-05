function createDivider(moduleId) {
    var divider = document.createElement("HR");
    divider.className = "divider material-text-light-secondary";
    var dividerDiv = document.createElement("DIV");
    dividerDiv.className = "row";
    dividerDiv.appendChild(divider);
    return dividerDiv;
}
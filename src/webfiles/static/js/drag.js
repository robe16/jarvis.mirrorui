function allowDrop(ev) {
    ev.preventDefault();
}

function updateTargets(dragging) {
    if (dragging) {
        border = "dashed";
        trash = "inline-block";
    } else {
        border = "hidden";
        trash = "none";
    }
    //
    var targets = document.getElementsByClassName("module-group");
    for (var i = 0; i < targets.length; i++) {
        targets[i].style.border = border;
    }
    //
    document.getElementById("trash").style.display = trash;
    //
    if (!dragging) {
        modulesSendUpdate();
    }
    //
}

function getTarget(target) {
    if (target.classList.contains("module-group")) {
        return target;
    } else {
        return getTarget(target.parentElement);
    }
}

function dragstart(ev) {
    updateTargets(true);
    ev.dataTransfer.setData("text", ev.target.id);
}

function dragstop(ev) {
    updateTargets(false);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    //
    if (ev.target.id == "trash") {
        document.getElementById(data).remove();
    } else {
        var target = getTarget(ev.target);
        if (target) {
            target.appendChild(document.getElementById(data));
        }
    }
}
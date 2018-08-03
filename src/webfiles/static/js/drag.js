function allowDrop(ev) {
    ev.preventDefault();
}

function updateTargets(dragging) {
    if (dragging) {
        border = "dashed";
    } else {
        border = "hidden";
    }
    //
    var targets = document.getElementsByClassName("module-group");
    for (var i = 0; i < targets.length; i++) {
        targets[i].style.border = border;
    }
    //
    if (!dragging) {
        updateModules();
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
    var target = getTarget(ev.target);
    target.appendChild(document.getElementById(data));
}
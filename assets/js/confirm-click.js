

function installConfirmClick(node) {
    let parent = node;
    node.childNodes[0].style.display = "none";
    node.childNodes[1].style.display = "none";

    node.addEventListener('click', () => {
        const parent = node.parentElement;
        const confirm = node.childNodes[0].cloneNode(true)
        confirm.style.display = "unset";
        parent.insertBefore(node, confirm);
        const cancel = node.childNodes[1].cloneNode(true);
        cancel.style.display = "unset"
        cancel.addEventListener('click', () => {
            parent.insertBefore(cancel, node);
            parent.removeChild(confirm);
            parent.removeChild(cancel);
        });
        parent.insertBefore(node, cancel);
        parent.removeChild(node);
    });
}

let nodes = document.querySelectorAll(".confirm-click");
nodes.forEach(installConfirmClick)
// --------------------- Todo Custom ContextMenu Project Start--------------------

const ContextMenu = document.getElementById('contextMenu')

function contextHandler(event) {
    event.preventDefault()

    if (ContextMenu.style.display === 'none') {
        ContextMenu.style.left = event.pageX + 'px';
        ContextMenu.style.top = event.pageY + 'px';
        ContextMenu.style.display = 'block';
    }else{
        ContextMenu.style.left = event.pageX + 'px';
        ContextMenu.style.top = event.pageY + 'px';
    }
    
    console.log(event);

}

function noneContextHandler() {
    ContextMenu.style.display = 'none';
}

function keyNoneContextHandler(event) {
    if (event.key == "Escape") {
        ContextMenu.style.display = 'none';
    }
}

document.body.addEventListener('contextmenu', contextHandler)
document.body.addEventListener('click', noneContextHandler)
document.body.addEventListener('keydown', keyNoneContextHandler)

// --------------------- FIXME Custom ContextMenu Project Start--------------------

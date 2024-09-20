// 1
const $ = document;
const dropBoxElement = $.querySelector('.dropbox');

function dragStartHandler(event){
    console.log('draged');
    event.dataTransfer.setData('elemId',event.target.id)
}

function dropHandler(event){
    event.preventDefault(); // Prevent the default behavior on drop
    let targetId = event.dataTransfer.getData('elemId');
    let targetElement = $.getElementById(targetId);
    console.log(targetElement);
    dropBoxElement.appendChild(targetElement);    
}

function dragOverHandler(event){
    event.preventDefault();
}

// 2
// Dragged Events = 1- onDragStart * 2- onDrag * 3- onDragEnd
// Dropped Events = 1- onDragEnter * 2- onDragOver * 3- onDragLeave * 4- onDrop

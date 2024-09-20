const $ = document;
const dropBoxElement = $.querySelector('.dropbox');

function dragStartHandler(event){
    console.log('draged');
    event.dataTransfer.setData('elemId',event.target.id)
}

function dropHandler(event){
    let targetId = event.dataTransfer.getData('elemId');
    let targetElement = $.getElementById(targetId);
    console.log(targetElement);
    // dropBoxElement.append();
    
}

function dragOverHandler(event){
    event.preventDefault();
}

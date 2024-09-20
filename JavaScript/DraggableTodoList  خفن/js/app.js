const $ = document;
const modalElement = $.getElementById('todo_form');
const closeBtnModalElement = $.querySelector('.close-modal');
const addBtnTodoElement = $.getElementById('add_btn');
const overlayElement = $.getElementById('overlay');

// console.log(addBtnElement);


function showModalHandler() {
    overlayElement.style.display = 'block'
    modalElement.style.top = '15%';
}

function closeBtnModalHandler(){
    modalElement.style.top = '-50%';
    overlayElement.style.display = 'none'
}

function keyCloseModalHandler(event) {
    if (event.key == "Escape") {
        l.style.top = '-50%';
        overlayElement.style.display = 'none'
    }
}

// function onScreenCloseModalHandler(){
//     console.log('کلیک شد');
    
//     // modalElement.style.top = '-50%';
// }

addBtnTodoElement.addEventListener('click', showModalHandler)
closeBtnModalElement.addEventListener('click', closeBtnModalHandler)
document.body.addEventListener('keydown', keyCloseModalHandler)
// document.body.addEventListener('click', onScreenCloseModalHandler)
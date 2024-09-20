// -------------------- Todo MaxLength Project Start--------------------

let $ = document;

const inputElement = $.querySelector('input');
const spanElement = $.querySelector('.counter');
const inputMaxLength = inputElement.getAttribute('maxlength');


function typingInputHandler(event){
    spanElement.innerHTML = inputMaxLength - event.target.value.length ;
}
inputElement.addEventListener('keyup',typingInputHandler)

// -------------------- FIXME MaxLength Project End--------------------
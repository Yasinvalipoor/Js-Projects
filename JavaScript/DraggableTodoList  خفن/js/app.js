const $ = document;
const modalElement = $.getElementById('todo_form');
const closeBtnModalElement = $.querySelector('.close-modal');
const addBtnTodoElement = $.getElementById('add_btn');
const overlayElement = $.getElementById('overlay');
const todoInputElement = $.getElementById('todo_input');
const todoFormElement = $.getElementById('body-form');
const noStatusBoxElement = $.getElementById('no_status');

//Show Modal Method
function showModalHandler() {
    overlayElement.style.display = 'block'
    modalElement.style.top = '15%';
};

function closeBtnModalHandler(){
    modalElement.style.top = '-50%';
    overlayElement.style.display = 'none'
};

function keyCloseModalHandler(event) {
    if (event.key === "Escape") {
        modalElement.style.top = '-50%';
        overlayElement.style.display = 'none'
    }
};

//Add New Todo To No Status Box
function addNewTodo(newTodoValue) {
    let newTodoDiv = $.createElement("div");
    newTodoDiv.className ="todo";
    newTodoDiv.innerHTML = newTodoValue;

    let newTodoSpan = $.createElement("span");
    newTodoSpan.className ="close";
    newTodoSpan.innerHTML = '&times;';
    newTodoDiv.append(newTodoSpan);

    noStatusBoxElement.append(newTodoDiv);
};

function addNewTodoHandler(event) {
    event.preventDefault(); // Prevent form submission from reloading the page
    let newTodoValue = todoInputElement.value.trim();
    
    if (newTodoValue) {
        addNewTodo(newTodoValue);
        todoInputElement.value = ''; // Clear the input field
    }
};

addBtnTodoElement.addEventListener('click', showModalHandler)
closeBtnModalElement.addEventListener('click', closeBtnModalHandler)
$.body.addEventListener('keydown', keyCloseModalHandler)
todoFormElement.addEventListener('submit', addNewTodoHandler)


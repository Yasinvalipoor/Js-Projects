const $ = document;
const modalElement = $.getElementById("todo_form");
const closeBtnModalElement = $.querySelector(".close-modal");
const addBtnTodoElement = $.getElementById("add_btn");
const overlayElement = $.getElementById("overlay");
const todoInputElement = $.getElementById("todo_input");
const todoFormElement = $.getElementById("body-form");
const noStatusBoxElement = $.getElementById("no_status");

//Show Modal Method
function showModalHandler() {
    overlayElement.style.display = "block";
    modalElement.style.top = "15%";
}

function closeBtnModalHandler() {
    modalElement.style.top = "-50%";
    overlayElement.style.display = "none";
}

function keyCloseModalHandler(event) {
    if (event.key === "Escape") {
        modalElement.style.top = "-50%";
        overlayElement.style.display = "none";
    }
}

//Add New Todo To No Status Box
function addNewTodo(newTodoValue) {
    let newTodoDiv = $.createElement("div");
    newTodoDiv.className = "todo";
    newTodoDiv.setAttribute("draggable", "true");
    newTodoDiv.setAttribute("ondragstart", "dragStartHandler(event)");
    newTodoDiv.id = newTodoValue;
    newTodoDiv.innerHTML = newTodoValue;

    let newTodoSpan = $.createElement("span");
    newTodoSpan.className = "close";
    newTodoSpan.innerHTML = "&times;";
    newTodoDiv.append(newTodoSpan);

    noStatusBoxElement.append(newTodoDiv);

    //Delete Todo In Status Box
    newTodoSpan.addEventListener("click", function (event) {
        const parentElementValue = event.target.parentElement;
        if (parentElementValue) {
            parentElementValue.remove();
        }
    });
}

function addNewTodoHandler(event) {
    event.preventDefault(); // Prevent form submission from reloading the page
    let newTodoValue = todoInputElement.value.trim();

    if (newTodoValue) {
        addNewTodo(newTodoValue);
        todoInputElement.value = ""; // Clear the input field
    }
}

addBtnTodoElement.addEventListener("click", showModalHandler);
closeBtnModalElement.addEventListener("click", closeBtnModalHandler);
$.body.addEventListener("keydown", keyCloseModalHandler);
todoFormElement.addEventListener("submit", addNewTodoHandler);

//Drag And Drop Option
function dragStartHandler(event) {
    // console.log('Element is being dragged');
    event.dataTransfer.setData("elemId", event.target.id);
}

//Drag And Drop Option
function dropHandler(event) {
    event.preventDefault();

    let targetId = event.dataTransfer.getData("elemId");
    let targetElement = document.getElementById(targetId);
    const dropBoxElement = event.target.closest(".status");

    if (dropBoxElement && targetElement) {
        // if (dropBoxElement.id === 'no_status') {
        //     console.log('Dropped in the No Status column');
        // }
        dropBoxElement.appendChild(targetElement);
        // console.log('Element dropped into:', dropBoxElement.id);
    }
}

//Drag And Drop Option
function dragOverHandler(event) {
    event.preventDefault();
}

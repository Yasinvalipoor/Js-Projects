// ----------------------------- Todo List Project Start---------------------------

let $ = document;
let inputElem = $.querySelector("input");
let ulElem = $.querySelector(".todos");

let formElem = $.querySelector("form");
formElem.addEventListener("submit", function (event) {
    event.preventDefault();
});

function addNewToDo(newTodoValue) {
    let newTodoLi = $.createElement("li");

    newTodoLi.className =
        "list-group-item d-flex justify-content-between align-items-center";

    let newTodoSpan = $.createElement("span");
    newTodoSpan.innerHTML = newTodoValue;
    newTodoLi.append(newTodoSpan);

    let newTodoIcon = $.createElement("i");
    newTodoIcon.className = "fa fa-trash-o delete";
    newTodoLi.append(newTodoIcon);

    let alertTimeout;

    newTodoIcon.addEventListener("click", function (event) {
        const parentElementValue = event.target.parentElement;
        if (parentElementValue) {
            parentElementValue.remove();
            // 1:
            // alert("Deleted");

            // 2:
            // Display custom alert
            const customAlert = document.getElementById("custom-alert");
            customAlert.innerHTML = 'Deleted ' + newTodoValue;
            customAlert.style.display = "block";

            // Display the message with fade-in effect
            customAlert.classList.add("show");
            customAlert.classList.remove("hide");

            // If there is already a timeout set, clear it
            if (alertTimeout) {
                clearTimeout(alertTimeout);
            }

            // Start the fade-out effect after 2 seconds
            alertTimeout = setTimeout(function () {
                customAlert.classList.add("hide");
                customAlert.classList.remove("show");

                // After the fade-out is complete, hide the element
                setTimeout(function () {
                    customAlert.style.display = "none";
                }, 500); // Wait for the fade-out animation (0.5 seconds)
            }, 2000); // Display the message for 2 seconds
        }
    });

    ulElem.append(newTodoLi);
}

inputElem.addEventListener("keydown", function (event) {
    let newTodoValue = event.target.value.trim();

    if (event.key == "Enter") {
        if (newTodoValue) {
            inputElem.value = "";
            addNewToDo(newTodoValue);
        }
    }
});

// ----------------------------- FIXME List Project End---------------------------



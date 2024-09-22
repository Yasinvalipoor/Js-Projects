var $ = document;
function _id(id_name) {return $.getElementById(id_name);}
function _class(class_name) {return $.getElementsByClassName(class_name);}
// Select Elements : 
// Inputs
var titleInputElement = _id("title-field");
var textAreaInputElement = _id("body-field");
// Labels
var titleLabelElement = _id("title-label");
var bodyLabelElement = _id("body-label");
// noteList.card-panel div.listed 
var listPanelDivElement = _id("listed");
// Icons
var penIconIElement = _id("pen-icon");
var textIconIElement = _id("text-icon");
// Buttons
var btnSaveElement = _id("btn-save");
var btnDeleteElement = _id("icon-deleted");
// notepad.card-panel
var notepadElement = $.querySelector("notepad");
// Colors - div.color-box
var colorBoxes = document.querySelectorAll(".color-box");
// Date Time
var now = new Date();
var formattedDate = now.toLocaleString("en-US", { hour12: true });
var selectedColor = "#FFFA81";

// Consolidate focus, blur, and keyup events for title and textarea inputs
function setupInputHandlers(inputElement, labelElement, iconElement) {
    inputElement.addEventListener("focus", () => {
        iconElement.classList.add("active");
        labelElement.classList.add("active");
    });

    inputElement.addEventListener("blur", () => {
        if (!inputElement.value) {
            labelElement.classList.remove("active");
        }
        iconElement.classList.remove("active");
    });

    inputElement.addEventListener("keyup", () => {
        labelElement.classList.toggle("active", !!inputElement.value);
    });
}

// Title Input
setupInputHandlers(titleInputElement, titleLabelElement, penIconIElement);

// Textarea Input
setupInputHandlers(textAreaInputElement, bodyLabelElement, textIconIElement);

// Handle color selection
colorBoxes.forEach(function (box) {
    box.addEventListener("click", function () {
        selectedColor = box.getAttribute("data-color");
        colorBoxes.forEach(function (box) {
            box.classList.remove("selected");
        });
        box.classList.add("selected");
        notepadElement.setAttribute("style", `background-color: ${selectedColor};`);
    });
});

// Save note and add to list
btnSaveElement.addEventListener("click", function () {
    var titleValue = titleInputElement.value.trim();
    var textAreaValue = textAreaInputElement.value;

    if (titleValue && textAreaValue) {
        const newNote = document.createElement("div");
        newNote.setAttribute(
            "style",
            `background-color: ${selectedColor};position: relative;border-radius: 5px;margin-top: 5px;padding: 5px 5px;`
        );

        const listTitle = document.createElement("div");
        listTitle.classList.add("list-title");
        listTitle.innerHTML = titleValue;

        const listDate = document.createElement("div");
        listDate.classList.add("list-date");
        listDate.innerHTML = formattedDate;

        const listText = document.createElement("div");
        listText.classList.add("list-date");
        listText.innerHTML = textAreaValue;

        const iconDelete = document.createElement("i");
        iconDelete.classList.add("material-icons", "delete-icon");
        iconDelete.innerHTML = "delete";

        newNote.append(listTitle, listText, listDate, iconDelete);

        listPanelDivElement.appendChild(newNote);

        titleInputElement.value = "";
        textAreaInputElement.value = "";
        notepadElement.setAttribute("style", ``);
    }
});

// Event delegation for delete button
listPanelDivElement.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-icon")) {
        event.target.parentElement.remove();
        alert("Your task has been completed successfully");
    }
});
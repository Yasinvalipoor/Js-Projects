const $ = document;
const imgElement = $.getElementById("bulb");
const btnElement = $.getElementById("btn");

let bulbFlag = false;

function turnOffOrOn() {
    if (bulbFlag) {
        imgElement.setAttribute("src", "pics/bulboff.gif");
        btnElement.innerHTML = "Turn On";
        bulbFlag = false;
    } else {
        imgElement.setAttribute("src", "pics/bulbon.gif");
        btnElement.innerHTML = "Turn Off";
        bulbFlag = true;
    }
}

const $ = document;
const convertBtnElement = $.querySelector(".convertButton");
const resetBtnElement = $.querySelector(".resetButton");
const changeBtnElement = $.querySelector(".changeButton");
const convertInputElement = $.getElementById("converter"); //Id
const spanCElement = $.querySelector(".C");
const spanFElement = $.querySelector(".F");
const resultElement = $.querySelector(".result");

let isCToFChanged = false;

const convertToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;
const convertToCelsius = (fahrenheit) => ((fahrenheit - 32) * 5) / 9;

convertBtnElement.addEventListener("click", function () {
    const value = parseFloat(convertInputElement.value);
    if (!isNaN(value)) {
        resultElement.style.color = ""; // Reset color
        const result = isCToFChanged ? convertToCelsius(value) : convertToFahrenheit(value);
        const fromUnit = isCToFChanged ? "°F" : "°C"; // Input unit
        const toUnit = isCToFChanged ? "°C" : "°F";   // Output unit
        resultElement.innerHTML = `${value}${fromUnit} = ${result.toFixed(2)}${toUnit}`; // Rounding to 2 decimal places
    } else {
        resultElement.innerHTML = "Please enter a valid number!";
        resultElement.style.color = "red"; // Error message
    }
});

resetBtnElement.addEventListener("click", function () {
    resultElement.innerHTML = "";
    convertInputElement.value = "";
});

changeBtnElement.addEventListener("click", function () {
    isCToFChanged = !isCToFChanged;
    const fromUnit = isCToFChanged ? "°F" : "°C"; // Input unit
    const toUnit = isCToFChanged ? "°C" : "°F";   // Output unit
    convertInputElement.setAttribute("placeholder", fromUnit);
    spanCElement.innerHTML = fromUnit;
    spanFElement.innerHTML = toUnit;
    document.title = `Temp conversion | ${fromUnit} to ${toUnit}`;
});
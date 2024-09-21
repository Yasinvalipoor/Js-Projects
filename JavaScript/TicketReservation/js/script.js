const $ = document;
const countrySelectElement = $.querySelector(".countrySelect");
const citySelectElement = $.querySelector(".citySelect");

const countryCities = {
    Iran: ["Isfahan", "Tehran", "Shiraz", "Mashhad", "Yazd", "Kerman", "Qom", "Rasht", "Ahvaz", "Tabriz"],
    Canada: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa", "Edmonton", "Quebec City", "Winnipeg", "Hamilton", "Victoria"],
    US: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"]
};

countrySelectElement.addEventListener("change", function (event) {
    if (countrySelectElement.value == 'Please Select') {
        citySelectElement.innerHTML = '';
        let optionElement = `<option value="Please Select Country">Please Select Country</option>`;
        citySelectElement.innerHTML = optionElement;
    } else {
        let city = countryCities[countrySelectElement.value];
        citySelectElement.innerHTML = '';
        city.forEach(element => {
            let optionElement = `<option class="option" value="${element}">${element}</option>`;
            citySelectElement.innerHTML += optionElement;
        });
    }
});
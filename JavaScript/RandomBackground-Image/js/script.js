const $ = document;
const body = $.body;
const submitBtnSearchElement = $.getElementById("submit-btn-search");
const inputSearchBarElement = $.querySelector(".search-bar");
const cardElement = $.querySelector(".card");
const loadingElement = $.querySelector(".weather.loading");
const cityElement = $.querySelector(".city");
const tempElement = $.querySelector(".temp");
const descriptionElement = $.querySelector(".description");
const humidityElement = $.querySelector(".humidity");
const windElement = $.querySelector(".wind");

let imgCollection = ["rainy-weather.jpg", "sunlit.jpg", "sunny-weather-with-cherry.jpg", "tornado-wild.jpg", "weather-and-sky.jpg", "winter.jpg"];

let weatherDatas = [
    { city: "Isfahan", temp: "10", des: "Cloudy", Humidity: "60", WindSpeed: "3.1", imgUrl: "isfahan.jpg" },
    { city: "Tehran", temp: "29", des: "Passing clouds", Humidity: "14", WindSpeed: "23", imgUrl: "tehran.jpg" },
    { city: "Yazd", temp: "39", des: "Sunny", Humidity: "30", WindSpeed: "7.1", imgUrl: "Yazd.jpg" }
];

//
inputSearchBarElement.addEventListener("keyup", function checkValue(event) {
    if (!event.target.value) {
        cardElement.style.height = "";
        loadingElement.style.visibility = "hidden";
        loadingElement.style.setProperty("--after-content", '"Loading..."');
        body.style.backgroundImage = `url('img/${imgCollection[Math.floor(Math.random() * 5)]}')`;
    }
});

//
submitBtnSearchElement.addEventListener("click", function () {
    let value = inputSearchBarElement.value;
    let data = weatherDatas.find(function (item) {
        return item.city === value;
    });
    if (data) {
        cardElement.style.height = "33%";
        loadingElement.style.visibility = "visible";
        loadingElement.style.setProperty("--after-content", '""');
        cityElement.innerHTML = `Weather in ${data.city}`;
        tempElement.innerHTML = `${data.temp}°C`;
        descriptionElement.innerHTML = `${data.des}`;
        humidityElement.innerHTML = `Humidity: ${data.Humidity} %`;
        windElement.innerHTML = `Wind speed: ${data.WindSpeed} km/h`;
        body.style.backgroundImage = `url('img/${data.imgUrl}')`;
    } else {
        cardElement.style.height = "";
        loadingElement.style.visibility = "hidden";
        loadingElement.style.setProperty("--after-content", '"Loading..."');
        body.style.backgroundImage = `url('img/${imgCollection[Math.floor(Math.random() * 5)]}')`;
        alert("Please Enter The Name Of A City");
    }
});
const $ = document;
const bodyElement = $.body;
const svgElement = $.querySelector('svg');
const titleElement = $.querySelector('.title');

setInterval(function () {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    if (r > 50 && g > 50 && b > 50) { //Just For Fun :) - You can comment out lines 10 to 13
        titleElement.style.color = 'white';
    }else{
        titleElement.style.color = 'black';
        bodyElement.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }
}, 1000);
const $ = document;
const navBarElement = $.getElementById('mainNav');
const logoImgElement = $.querySelector('img');

$.addEventListener('scroll',function() {
    // console.log($.documentElement.scrollTop);
    if ($.documentElement.scrollTop > 0) {
        navBarElement.classList.add('bg-black','txt-white')
        logoImgElement.style.height = '60px'
    }else{
        navBarElement.classList.remove('bg-black','txt-white')
        logoImgElement.style.height = '84px'
    }
})
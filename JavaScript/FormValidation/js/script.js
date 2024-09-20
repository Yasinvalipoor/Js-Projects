const $ = document;
const textInputElement = $.querySelector('.username');
const passwordInputElement = $.querySelector('.password');
const modalElement = $.querySelector('.modal');

function dataValidation() {
    let userNameValueLength = textInputElement.value.length;
    let passwordValueLength = passwordInputElement.value.length;
    if (userNameValueLength < 12 || passwordValueLength < 8) {
        modalElement.style.background = 'red'
        modalElement.innerHTML = 'لطفا اطلاعات لازم را به درستی وارد کنید';
        modalElement.style.display = 'block';
    } else {
        console.log('Ok Brother');
        modalElement.style.background = 'green'
        modalElement.innerHTML = 'وارد شدید';
        modalElement.style.display = 'block';
    }
    setTimeout(function () {
        modalElement.style.display = 'none'
    }, 3000)
}
// Just Check Length And Show Modal - Version 1
const $ = document;
const textInputElement = $.querySelector(".username");
const passwordInputElement = $.querySelector(".password");
const modalElement = $.querySelector(".modal");

function dataValidation() {
    let userNameValueLength = textInputElement.value.length;
    let passwordValueLength = passwordInputElement.value.length;
    if (userNameValueLength < 12 || passwordValueLength < 8) {
        modalElement.style.background = "red";
        modalElement.innerHTML = "لطفا اطلاعات لازم را به درستی وارد کنید";
        modalElement.style.display = "block";
    } else {
        modalElement.style.background = "green";
        modalElement.innerHTML = "وارد شدید";
        modalElement.style.display = "block";
    }
    setTimeout(function () {
        modalElement.style.display = "none";
    }, 3000);
}

// A Dynamic Form And character Validation Based Nn Length And Warning Display - Version 2
const divFormValidationInputElement = $.querySelector(".formvalidation");
const spanUserNameElement = $.querySelector(".username-livevalidation");
const spanPasswordElement = $.querySelector(".password-livevalidation");

textInputElement.addEventListener("keyup", function (event) {
    if (event.target.value) {
        if (event.target.value.length < 12) {
            divFormValidationInputElement.style.margin = "0 0 1rem 0";
            spanUserNameElement.style.display = "block";
        } else {
            spanUserNameElement.style.display = "none";
            divFormValidationInputElement.style.margin = "0";
        }
    } else {
        spanUserNameElement.style.display = "none";
        divFormValidationInputElement.style.margin = "0";
    }
});

passwordInputElement.addEventListener("keyup", function (event) {
    if (event.target.value) {
        if (event.target.value.length < 8) {
            spanPasswordElement.style.display = "block";
        } else {
            spanPasswordElement.style.display = "none";
        }
    } else {
        spanPasswordElement.style.display = "none";
        divFormValidationInputElement.style.margin = "0";
    }
});

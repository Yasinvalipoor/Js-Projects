const toggleBtnElement = document.getElementsByClassName("toggle")[0];
let isDark = true ;

window.onload = function(){
    let localStorageTheme = localStorage.getItem('theme');
    if(localStorageTheme === 'dark'){
        document.body.setAttribute("data-dark-mode", true);
        toggleBtnElement.ariaPressed = "true";
    }
}

function switchModeTheme() {
    if (isDark) {
        toggleBtnElement.ariaPressed = "true";
        localStorage.setItem('theme','dark');
        document.body.setAttribute("data-dark-mode", isDark);
        isDark = false;
    }else{
        toggleBtnElement.ariaPressed = "false";
        localStorage.setItem('theme','light');
        document.body.setAttribute("data-dark-mode", isDark);
        isDark = true;
    }
}

toggleBtnElement.addEventListener('click', switchModeTheme)

$(document).ready(function () {
    showHide();
});

function showHide(){
    const osType = getMobileOperatingSystem();
    const appleBtn = document.querySelector('#add-to-apple-wallet-btn');
    const androidBtn = document.querySelector('#add-to-google-wallet-btn');
    osType ? showBtnType(osType,appleBtn,androidBtn) : showBtnType('',appleBtn,androidBtn);
    
}

const addClickEventBtn  = (ele,id)  => {
    ele?.addEventListener("click",  () => {
        document.querySelector(`${id}`)?.click();
    });
}
const showBtnType = (type, appleBtn, androidBtn) =>{

    switch (type) {
        case "iOS":
            checkBtnEml(appleBtn,androidBtn, '#add-to-apple-wallet-btn-submit');
            break;
        case "Android":
            checkBtnEml(androidBtn,appleBtn, '#add-to-google-wallet-btn-submit');
            break;
    
        default:
            if (appleBtn && appleBtn.style) {appleBtn.style.display = "none";}
            if (androidBtn && androidBtn.style) {androidBtn.style.display = "none";}
            break;
    }

}
const checkBtnEml = (btn1Eml, btn2Eml, id) => {
    if (btn1Eml &&  btn1Eml.style) {
        btn1Eml.style.display = "block";
        addClickEventBtn(btn1Eml, id);
    }
    if (btn2Eml && btn2Eml.style) {
        btn2Eml.style.display = "none";
    }
}
function getMobileOperatingSystem() {
    const userAgent = navigator.userAgent || window.opera;

    if(/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }
    if(/android/i.test(userAgent)) {
        return "Android";
    }
    if(/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}



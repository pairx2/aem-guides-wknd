/***** Common Utilities ******************/

//show existing hcp's name
$('#existingHcpNames').text(sessionStorage.getItem('existingHcpName'));

//function to check if URL contains parameter
let currentUrl = window.location.href;

let isAPIRunning =false,userEmail,maskedString,finalString,maskedStringLength,userEmailFirstPart,userEmailSecondPart;

function hasUrlParameter(name) {
    let hasParam = (window.location.href.indexOf(name) > -1);
    return hasParam;
}
function getApiFromCurrentServer(){
    let apiUrl = $('#session-api-url').val();
    let domainName = apiUrl.split('api')[0];
    return domainName;
}

function getHeaders(){
    let myHeaders = new Headers();
    myHeaders.append("x-application-id", $("input[name=x-application-id]").val());
    myHeaders.append("x-country-code", $("input[name=x-country-code]").val());
    myHeaders.append("x-preferred-language", $("input[name=x-preferred-language]").val());
    myHeaders.append("x-secret-header", $("input[name=x-secret-header]").val());

    myHeaders.append("Content-Type", "application/json");
    return myHeaders;
}

function getCaptchaToken(){
    let captchaValue= $("#recaptcha-token").val();

    return captchaValue;

}
//function to get URL parameter
function getUrlParameter(name) {
    name = name.replace(/[\\[]/, '\\[').replace(/[\\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(window.location.href);
    return results === null ? '' : decodeURIComponent(results[1]);
}
// function to show loading spinner
function showLoading() {
    console.log ("Show Page Loader");
    $('#page-spinner').show();
}

// function to hide loading spinner
function hideLoading() {
    console.log ("Hide Page Loader");
    $('#page-spinner').hide();
}

// SB HCPPORTAL-57 Page loader visible before page loads completely
document.onreadystatechange = function() {
            if (document.readyState !== "complete") {
                console.log("incomplete")
                showLoading();
			}else if(isAPIRunning) {
				console.log("API Running")
                showLoading();
            } else {
                let isLoginPage = window.location.pathname.includes("login.html");
				if(!(isLoginPage && hasUrlParameter("isActivated"))){
                    console.log("complete")
                    hideLoading();
                }
				if($("#beforeAPICall").length>0)
                {
					$("#beforeAPICall").show();
                }
            }
};

// function to set Local Storage Object
function setLocalStorage(key, object) {
    localStorage.setItem(key, JSON.stringify(object));
}

// function to get Local Storage Object
function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

// function to remove Local Storage Object
function removeLocalStorage(key) {
    localStorage.removeItem(key);
}

//function to setCookie
function setCookie(cname, cvalue, exdays) {
    let expires = "";
    if (exdays !== '') {
        let d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        expires = "expires="+ d.toUTCString();
    }
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;Secure;";
}

//function to getCookie
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i in ca) {
        let c = ca[i];
        while (c.startsWith(' ')) {
            c = c.substring(1);
        }
        if (c.startsWith(name)) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

//function to get Cookies Obj
function getCookiesObj(cname) {
    let cVal = getCookie(cname);
    let cObj = (cVal && cVal !== "") ? JSON.parse(cVal) : cVal;
    return cObj;
}

//function to deleteCookie
function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;Secure;';
}
function apiShowList(errorResponse,id,finalString){
    
    if(errorResponse.i18nMessageKey === "ES-0001" && $("#inputProcessingFailure").length) {
        $('#successErrorMessage p').html($('#inputProcessingFailure').html());
    }

    else if(errorResponse.i18nMessageKey === "REG-USER-1021" && $("#registrationFailure").length) {
        $('#successErrorMessage p').html($('#registrationFailure').html());
    }
    else if(errorResponse.i18nMessageKey === "REG-USER-1045" && $("#discrepancyErrorMsg_fullRegister").length) {
        $("#discrepancyErrorMsg_fullRegister span").text(finalString);
        $('#successErrorMessage p').html($('#discrepancyErrorMsg_fullRegister').html());
    }

    else if(errorResponse.i18nMessageKey === "REG-USER-1044" && $("#discrepancyErrorMsg_partialRegister").length) {
        $("#discrepancyErrorMsg_partialRegister span").text(finalString);
        $('#successErrorMessage p').html($('#discrepancyErrorMsg_partialRegister').html());
    }

    else if(errorResponse.i18nMessageKey === "REG-USER-1030" && $("#userExistsFailure").length) {
        $("#userExistsFailure span").text(finalString);
        $('#successErrorMessage p').html($('#userExistsFailure').html());
    }
    else if(id==="UP-EML-1030") {
       let errorMessage = document.querySelector('#successErrorMessage p');
        let contactUslink; 
        $(".footer .m-link-stack").each(function(ele){
            let e = $(this).find("a").prop("href");                
              if(e.includes("contact-us.html")){
                contactUslink = e;
                  return false;
             }
        })
        errorMessage.innerHTML = 'Email ID already exists, Please <a href="'+ contactUslink+'">contact us</a>.'
    }
    else{
        $('#successErrorMessage p').html($('input[name=failureMessage]').val());
    }
}

function showApiError(errorResponse) {
	let id = errorResponse?.i18nMessageKey;
    if (typeof id == "undefined" || id == "") {
        id = "500";
    }
    let error = $("#" + id);
    if (error.length) {
        $("[id^=apiError] .cmp-text").hide();
        $(".o-form-container__error-msg").hide();
        error.show();
        $("[id^=apiError]").show()
    } else {
		$("#successErrorMessage").css("background","#E40046").addClass("abt-icon abt-icon-cancel");
		$("#successErrorMessage").show();
		$("#successErrorMessage").css('display', 'flex').css('gap','20px');
        userEmail=$("input#email[type='email']").val();
        userEmail=userEmail.split("@");
        userEmailFirstPart=userEmail[0];
        userEmailSecondPart=userEmail[1];
        maskedStringLength=userEmailFirstPart.length;
        maskedString=new Array(maskedStringLength-2).join("x");
        userEmailFirstPart=userEmailFirstPart.substr(userEmailFirstPart.length-3,userEmailFirstPart.length);
        finalString=maskedString+userEmailFirstPart+"@"+userEmailSecondPart;
        apiShowList(errorResponse,id,finalString);
        $(".o-form-container__error-msg").css("display","none");
        $("#successErrorMessage").show();
        $("#successErrorMessage").css('display', 'flex').css('gap','20px');

        $(".abt-icon-cancel").on("click", function(){
    		$('#successErrorMessage').hide();
        });
    }
}

function hideApiError() {
	$("#successErrorMessage").show();
    $("#successErrorMessage").css('display', 'flex').css('gap','20px');
	$("#successErrorMessage").css("background","#00B140");
    $('#successErrorMessage p').text($('input[name=successMessage]').val());
    $('#successErrorMessage').addClass("abt-icon abt-icon-cancel");
    $(".o-form-container__error-msg").css("display","none");

    $(".abt-icon-cancel").on("click", function(){
        $('#successErrorMessage').hide();
    });

    $("[id^=apiError] .cmp-text").hide();
    $("[id^=apiError]").hide();
    $(".o-form-container__error-msg").hide();
}

function encodeBase64(input) {
    return window.btoa(decodeURI(encodeURIComponent(input)));
}

function decodeBase64(input) {
    return decodeURIComponent(encodeURI(window.atob(input)));
}

//toggle eye icon
$('.a-input-field .form-group .a-input-grp .icon.icon-right').addClass("abt-icon-eye-slash");
$('.abt-icon-eye').click(function () {
	$(this).parent().toggleClass('abt-icon-eye-slash');
})
$('#sitemap .cmp-navigation__item-link').each(function(){
    if($(this).html() == 'secure' || $(this).html() == 'Secure'){
        $(this).hide();
        $(this).parent('li').addClass('hidebullet');
    }
});

let queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
if(isCountryCodeUK() && ($("input[name=x-application-id]").val()=="anhcpproconnect")) {
if(urlParams.has("q") && "freego" === urlParams.get("q").toLowerCase()){
	window.location="/content/an/hcpproconnect/uk/en/home/resources-freego.html";
}
}

//scroll to hash
$(window).on("load", function() {
    if (location.hash) location.href = location.hash;
});


function captchaCallback(){
    let siteKey = '';
    let completeEmailChangeForm = $("#complete-email-change");
    let loginForm = $("#loginForm");
    let completeRegForm = $("#completeRegistraionForm");
    let sampleProductForm = $("#sampleProductForm");

    if("true" === completeEmailChangeForm.attr("data-recaptcha")) {
        siteKey = completeEmailChangeForm.attr("data-captcha-script-src");
    } else if("true" === loginForm.attr("data-recaptcha")) {
        siteKey = loginForm.attr("data-captcha-script-src");
    } else if("true" === completeRegForm.attr("data-recaptcha") &&
               currentUrl.indexOf("complete") >= 0) {
        siteKey = completeRegForm.attr("data-captcha-script-src");
    } else if("true" === sampleProductForm.attr("data-recaptcha")) {
        siteKey = sampleProductForm.attr("data-captcha-script-src");
    }

    if(siteKey) {
        let secretKey=siteKey.split("render=")[1];

        grecaptcha.execute(secretKey, {
            action: 'submit'
        }).then(function (token) {
            localStorage.setItem("captchaValue",token);

            if(currentUrl.indexOf("complete") >= 0) {
                prepop();
            }
        });
        if("true" === loginForm.attr("data-recaptcha")) {
           grecaptcha.execute(secretKey, {
               action: 'submit'
           }).then(function (token) {
               localStorage.setItem("captchaValueActivate",token);
           });
        }
    }
}

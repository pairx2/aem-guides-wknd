let formPopup_ = $('#ph-popup-newsletter-signup');
let lang_ = $("html").attr("lang"); 
let brandName = $('input[name="x-application-id"]').val();
let country_Code = $('input[name="x-country-code"]').val();
let langCode = $('input[name="x-preferred-language"]').val();
let brandCountryLang = "-"+brandName+"-"+country_Code+"-"+langCode;
let numNewsletterPopUpAppear = 'numNewsletterPopUpAppear' + brandCountryLang;
let newsletterDelay = 3000, numClosePopup = 3, scrollToBottom = true, resetAfterHour = 24;
let numberPopUpAppear = localStorage.getItem(numNewsletterPopUpAppear) == null ? 0 : localStorage.getItem(numNewsletterPopUpAppear); 
function newsLetterPopupOnLoad(){
    let newsLetterButton = $("#newsletter-signup-btn").length;
    let historyPageUrl = window.localStorage.hisoryArrayUrls;
    let currentPageLocation = window.location.href;
    let popupDisable = $("#popup-disable").val().split(",");
    let pageUrl = window.location.pathname;    
    if(newsLetterButton){
        $(".sample-btn-hide").closest('.button').addClass("d-none");                
    }
    if (!historyPageUrl?.includes(currentPageLocation)){
        if (parseInt(numberPopUpAppear) < 2){  
            if( popupDisable.includes(pageUrl) || newsLetterButton ){
                return;
            }else{                
                showPopUp(numberPopUpAppear, numClosePopup+1, newsletterDelay);
                }
        }
    }   
}
function showPopUp(n, nc, nd){
    if(n < nc) {
        setTimeout(function() {
           formPopup_.addClass('active');
           if( lang_ == "en-AU"){
            if( window.location.href.indexOf('au-en/pediasure') > 0 || window.location.href.indexOf('au-en/glucerna') > 0 || window.location.href.indexOf('au-en/ensure') > 0 ){
                    $('#ph-popup-newsletter-signup-form').addClass("popup__overlay");
                    $('body').removeClass('popup-overlay');
                }
            }
            else{
                $('body').addClass('popup-overlay');
            }
        }, nd); // for 3 second delay
    }
}
function pageScrollToBottom(){
    if(scrollToBottom == "true") {
        $(window).scroll(function() {
           // near bottom
           if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
                showPopUp(numberPopUpAppear, numClosePopup, newsletterDelay);
           }
        });
    } else {
            showPopUp(numberPopUpAppear, numClosePopup, newsletterDelay);
    }
}

 function initPopUpNewsletter(){
     let formPopupClose = formPopup_.find('#ph-popup-close');
     if (formPopup_.length > 0) {
        document.body.appendChild(document.getElementById('ph-popup-newsletter-signup'));
     }
     let setupNewsletterTime = 'setupNewsletterTime' + brandCountryLang; 
     let role = formPopup_.attr('role');
     let roleSplited = role.split(',');

     if (role) {
         newsletterDelay = roleSplited[0].split('=')[1];
         numClosePopup = roleSplited[1].split('=')[1];
         scrollToBottom = roleSplited[2].split('=')[1];

         if(roleSplited.length > 3) {
            resetAfterHour= roleSplited[3].split('=')[1];
         }
     }

     function removeItem() {
        localStorage.removeItem(setupNewsletterTime);
        localStorage.removeItem(numNewsletterPopUpAppear);
     }

     let setupTime = localStorage.getItem(setupNewsletterTime);
     let hours = resetAfterHour; // to clear the localStorage after 24 hour
     let now = new Date().getTime();

     if(setupTime !== null) {
         if(now-setupTime > hours*60*60*1000) {
            removeItem();
         }
     }
     
     // get sample/ newsletter sign up button switch on-switch off     
    
    if( lang_ == "en-AU"){
        if( window.location.href.indexOf('au-en/pediasure') > 0 || window.location.href.indexOf('au-en/glucerna') > 0 || window.location.href.indexOf('au-en/ensure') > 0 ){
            newsLetterPopupOnLoad();
        }
    }   

    pageScrollToBottom();    

    formPopupClose.on('click', function() {
        numberPopUpAppear++;
        localStorage.setItem(numNewsletterPopUpAppear, numberPopUpAppear);
        localStorage.setItem(setupNewsletterTime, now)
        formPopup_.removeClass('active');
        $('body').removeClass('popup-overlay');

        if(scrollToBottom != "true") {
            showPopUp(numberPopUpAppear, numClosePopup, newsletterDelay);
        }
    });
 }

$(document).ready(function () {
    if($('#ph-popup-newsletter-signup').length > 0 && !$("#product_information").length) {
        initPopUpNewsletter();
    }
	else if($("#product_information").length && $('#ph-popup-newsletter-signup').length) {
		let newsletterFormPopup = $('#ph-popup-newsletter-signup');
		let newsletterFormPopupClose = newsletterFormPopup.find('#ph-popup-close');
		if (newsletterFormPopup.length > 0) {
			document.body.appendChild(document.getElementById('ph-popup-newsletter-signup'));
		}
		if($('#product-information-newsletter').length) {
			$('#product-information-newsletter').on('click', function() {
				newsletterFormPopup.addClass('active');
				$('body').addClass('popup-overlay');
			});
			newsletterFormPopupClose.on('click', function() {
				newsletterFormPopup.removeClass('active');
				$('body').removeClass('popup-overlay');
			});
		}
	}
});
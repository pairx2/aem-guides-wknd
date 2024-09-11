/** 
User guide:
Style2- for ensure
Style4- for pediasure
Style5- for Glucerna **/

let lowRiskll = 0;
let lowRiskul = 1;
let mediumRiskll = 2;
let mediumRiskul = 4;
let highRiskll = 5;
let highRiskul = 10;
let pediasureLowRiskll = 12;
let pediasureLowRiskul = 15;
let pediasureMediumRiskll = 9;
let pediasureMediumRiskul = 11;
let pediasureHighRiskll = 5;
let pediasureHighRiskul = 8;
let glucernaLowRiskll = 24;
let glucernaLowRiskul = 30;
let glucernaMediumRiskll = 16;
let glucernaMediumRiskul = 23;
let glucernaHighRiskll = 10;
let glucernaHighRiskul = 15;
let totalQuestions = $('.a-container--questionary .options.o-form-option--base').length;
let failureMessage = $('input[name="failureMessage"]').val();
let largeScreen;

$(window).on('load',function() {
    $('.tabs.a-tabs--base.a-tabs--questioners .a-container--questionary .featurescard.o-features-card-base').addClass('d-none');
});

function displayErrorOnRadioButton() {
	let optionContainer = $('.o-form-option--base');
    for (let i = 0; i< optionContainer.length ; i++) {
        if($('.o-form-container--base .o-form-container__error-msg > p').is(":visible")) {
            if($($($('.o-form-container--base .o-form-option--base')[i]).find('input[type=radio]:checked')).length > 0) {
				$($($('.o-form-container--base .o-form-option--base')[i]).prev()).find('h4').removeClass('red-error');
            	$($('.o-form-container--base .o-form-option--base')[i]).find('span.a-radio__custom').removeClass('red-error-border');
            } else {
				$($($('.o-form-container--base .o-form-option--base')[i]).prev()).find('h4').addClass('red-error');
            	$($('.o-form-container--base .o-form-option--base')[i]).find('span.a-radio__custom').addClass('red-error-border');
        	}
        }
        else if($('.o-form-option--base input[type=radio]:checked').length === totalQuestions) {
			$($($('.o-form-container--base .o-form-option--base')[i]).prev()).find('h4').removeClass('red-error');
           	$($('.o-form-container--base .o-form-option--base')[i]).find('span.a-radio__custom').removeClass('red-error-border');
    	}
     }
}
function displayErrorMessage() {
	$('.o-form-container--base .o-form-container__error-msg').empty();
    if($('.o-form-container--base .o-form-option--base input[type=radio]:checked').length < totalQuestions) {
		$('.o-form-container--base .o-form-container__error-msg').append('<p>' + failureMessage + '</p>');
    } else {
        $('.o-form-container--base .o-form-container__error-msg').empty();
    }
    displayErrorOnRadioButton();
}
function checkingScreen(){    
    if($('.o-features-card-style5').length > 0) {
        largeScreen = window.matchMedia("(max-width: 767px)");
            if (largeScreen.matches) {
                $($($('.o-features-card-base.o-features-card-style5').parents('.tabs.a-tabs--base.a-tabs--questioners')).parents('.a-container--questionary')).parent().css({paddingLeft: '11px', paddingRight: '11px'});
        }
    }
    
    if($('.o-features-card-style4').length > 0) {
        largeScreen = window.matchMedia("(min-width: 992px)");
        if (largeScreen.matches) {
            $($('.o-features-card-base.o-features-card-style4').parents('.tabs.a-tabs--base.a-tabs--questioners')).css({marginLeft: '15px', marginRight: '15px'});
        }
    }
}
function messageInfo(totalItems){
    if (totalItems >= lowRiskll && totalItems <= lowRiskul) {
        $($('.tabs.a-tabs--base.a-tabs--questioners .a-tabs__content.tab-content').children()[0]).addClass('active');
        $($('.tabs.a-tabs--base.a-tabs--questioners .a-tabs__content.tab-content').children()[1]).removeClass('active');
        $($('.tabs.a-tabs--base.a-tabs--questioners .a-tabs__content.tab-content').children()[2]).removeClass('active');
    }
    else if(totalItems >= mediumRiskll && totalItems <= mediumRiskul) {
        $($('.tabs.a-tabs--base.a-tabs--questioners .a-tabs__content.tab-content').children()[0]).removeClass('active');
        $($('.tabs.a-tabs--base.a-tabs--questioners .a-tabs__content.tab-content').children()[1]).addClass('active');
        $($('.tabs.a-tabs--base.a-tabs--questioners .a-tabs__content.tab-content').children()[2]).removeClass('active');
    }
    else if(totalItems >= highRiskll && totalItems <= highRiskul) {
        $($('.tabs.a-tabs--base.a-tabs--questioners .a-tabs__content.tab-content').children()[0]).removeClass('active');
        $($('.tabs.a-tabs--base.a-tabs--questioners .a-tabs__content.tab-content').children()[1]).removeClass('active');
        $($('.tabs.a-tabs--base.a-tabs--questioners .a-tabs__content.tab-content').children()[2]).addClass('active');
    }
    largeScreen = window.matchMedia("(min-width: 992px)");
    if (largeScreen.matches){
        let contentHeight = $('.a-tabs__content.tab-content>.active .a-container--questionary .featurescard.o-features-card-base.o-features-card-style2 .o-features-card__block').height();
        $('.a-tabs__content.tab-content>.active .a-container--questionary .featurescard.o-features-card-base.o-features-card-style2 .o-features-card').height(contentHeight);
    }
}
function pediasureRiskResult(totalItems){
    if (totalItems >= pediasureLowRiskll && totalItems <= pediasureLowRiskul) {
        $($('.tabs.a-tabs--base.a-tabs--questioners .a-tabs__content.tab-content').children()[0]).addClass('active');
        $($('.tabs.a-tabs--base.a-tabs--questioners .a-tabs__content.tab-content').children()[1]).removeClass('active');
        $($('.tabs.a-tabs--base.a-tabs--questioners .a-tabs__content.tab-content').children()[2]).removeClass('active');
    }
    else if(totalItems >= pediasureMediumRiskll && totalItems <= pediasureMediumRiskul) {
        $($('.tabs.a-tabs--base.a-tabs--questioners .a-tabs__content.tab-content').children()[0]).removeClass('active');
        $($('.tabs.a-tabs--base.a-tabs--questioners .a-tabs__content.tab-content').children()[1]).addClass('active');
        $($('.tabs.a-tabs--base.a-tabs--questioners .a-tabs__content.tab-content').children()[2]).removeClass('active');
    }
    else if(totalItems >= pediasureHighRiskll && totalItems <= pediasureHighRiskul) {
        $($('.tabs.a-tabs--base.a-tabs--questioners .a-tabs__content.tab-content').children()[0]).removeClass('active');
        $($('.tabs.a-tabs--base.a-tabs--questioners .a-tabs__content.tab-content').children()[1]).removeClass('active');
        $($('.tabs.a-tabs--base.a-tabs--questioners .a-tabs__content.tab-content').children()[2]).addClass('active');
    }
}


function glucernaRiskResult(totalItems){
    if (totalItems >= glucernaLowRiskll && totalItems <= glucernaLowRiskul) {
        $($('.tabs.a-tabs--base.a-tabs--questioners .a-tabs__content.tab-content').children()[0]).addClass('active');
        $($('.tabs.a-tabs--base.a-tabs--questioners .a-tabs__content.tab-content').children()[1]).removeClass('active');
        $($('.tabs.a-tabs--base.a-tabs--questioners .a-tabs__content.tab-content').children()[2]).removeClass('active');
    }
    else if(totalItems >= glucernaMediumRiskll && totalItems <= glucernaMediumRiskul) {
        $($('.tabs.a-tabs--base.a-tabs--questioners .a-tabs__content.tab-content').children()[0]).removeClass('active');
        $($('.tabs.a-tabs--base.a-tabs--questioners .a-tabs__content.tab-content').children()[1]).addClass('active');
        $($('.tabs.a-tabs--base.a-tabs--questioners .a-tabs__content.tab-content').children()[2]).removeClass('active');
    }
    else if(totalItems >= glucernaHighRiskll && totalItems <= glucernaHighRiskul) {
        $($('.tabs.a-tabs--base.a-tabs--questioners .a-tabs__content.tab-content').children()[0]).removeClass('active');
        $($('.tabs.a-tabs--base.a-tabs--questioners .a-tabs__content.tab-content').children()[1]).removeClass('active');
        $($('.tabs.a-tabs--base.a-tabs--questioners .a-tabs__content.tab-content').children()[2]).addClass('active');
    }
}
$(document).ready(function() { 
    /** Ensure stament starts **/
    $('o-form-container--base .o-form-container__error-msg').addClass('d-none');
    $('.tabs.a-tabs--base.a-tabs--questioners .a-container--questionary .featurescard.o-features-card-base.o-features-card-style2').addClass('d-none');
    $('.o-features-card-base.o-features-card-style2 >div:nth-of-type(1)').append('<div class="wrap"></div>');
    $('.o-features-card-base.o-features-card-style2 >div:nth-of-type(1) >.wrap').append('<div class="halfCircleTop"></div>');
    $('.o-features-card-base.o-features-card-style2 .halfCircleTop').append('<svg viewBox="0 0 64 64" class="pieWrap"></svg>');
    $('.o-features-card-base.o-features-card-style2 .pieWrap').append('<circle r="21%" cx="50%" cy="50%" class="greenLayer"></circle>');
    $('.o-features-card-base.o-features-card-style2 .pieWrap').append('<circle r="21%" cx="50%" cy="50%" class="yellowLayer"></circle>');
    $('.o-features-card-base.o-features-card-style2 .pieWrap').append('<circle r="21%" cx="50%" cy="50%" class="redLayer"></circle>');
    $('.o-features-card-base.o-features-card-style2 .pieWrap').append('<polygon class="low" points="9,18 29,36 37,32"></polygon>');
    $('.o-features-card-base.o-features-card-style2 .pieWrap').append('<polygon class="medium" points="32,7 29,30 37,30"></polygon>');
    $('.o-features-card-base.o-features-card-style2 .pieWrap').append('<polygon class="high" points="56,18 29,30 37,35"></polygon>');
    $('.o-features-card-base.o-features-card-style2 .pieWrap').append('<circle r="5" cx="33" cy="33" class="strokeCircle"></circle>');
    $('.o-features-card-base.o-features-card-style2 >div:nth-of-type(1) >.wrap').append('<div class="halfCircleBottom"></div>');
    $('.o-features-card-base.o-features-card-style2 >div:nth-of-type(1) >.wrap').append('<div class="selectedColor"></div>');
    /** Ensure stament End **/    
    /** Pediasure statement starts **/
    $('.tabs.a-tabs--base.a-tabs--questioners .a-container--questionary .featurescard.o-features-card-base.o-features-card-style4').addClass('d-none');    
    $('.o-features-card-base.o-features-card-style4 >div:nth-of-type(1)').append('<div class="wrap"></div>');
    $('.o-features-card-base.o-features-card-style4 >div:nth-of-type(1) >.wrap').append('<div class="halfCircleTop"></div>');
    $('.o-features-card-base.o-features-card-style4 .halfCircleTop').append('<svg viewBox="0 0 64 64" class="pieWrap"></svg>');
    $('.o-features-card-base.o-features-card-style4 .pieWrap').append('<circle r="21%" cx="50%" cy="50%" class="greenLayer"></circle>');
    $('.o-features-card-base.o-features-card-style4 .pieWrap').append('<circle r="21%" cx="50%" cy="50%" class="yellowLayer"></circle>');
    $('.o-features-card-base.o-features-card-style4 .pieWrap').append('<circle r="21%" cx="50%" cy="50%" class="redLayer"></circle>');
    $('.o-features-card-base.o-features-card-style4 .pieWrap').append('<polygon class="low" points="9,18 29,36 37,32"></polygon>');
    $('.o-features-card-base.o-features-card-style4 .pieWrap').append('<polygon class="medium" points="32,7 29,30 37,30"></polygon>');
    $('.o-features-card-base.o-features-card-style4 .pieWrap').append('<polygon class="high" points="56,18 29,30 37,35"></polygon>');
    $('.o-features-card-base.o-features-card-style4 .pieWrap').append('<circle r="5" cx="33" cy="33" class="strokeCircle"></circle>');
    $('.o-features-card-base.o-features-card-style4 >div:nth-of-type(1) >.wrap').append('<div class="halfCircleBottom"></div>');
    $('.o-features-card-base.o-features-card-style4 >div:nth-of-type(1) >.wrap').append('<div class="selectedColor"></div>');
    $(".halfCircleTop").html($(".halfCircleTop").html());
    /** Pediasure statement Ends **/ 
    /** Glucerna statement starts **/  
    $('.tabs.a-tabs--base.a-tabs--questioners .a-container--questionary .featurescard.o-features-card-base.o-features-card-style5').addClass('d-none');  
    $('.o-features-card-base.o-features-card-style5 >div:nth-of-type(1)').append('<div class="wrap"></div>');
    $('.o-features-card-base.o-features-card-style5 >div:nth-of-type(1) >.wrap').append('<div class="halfCircleTop"></div>');
    $('.o-features-card-base.o-features-card-style5 .halfCircleTop').append('<svg viewBox="0 0 64 64" class="pieWrap"></svg>');
    $('.o-features-card-base.o-features-card-style5 .pieWrap').append('<circle r="21%" cx="50%" cy="50%" class="greenLayer"></circle>');
    $('.o-features-card-base.o-features-card-style5 .pieWrap').append('<circle r="21%" cx="50%" cy="50%" class="yellowLayer"></circle>');
    $('.o-features-card-base.o-features-card-style5 .pieWrap').append('<circle r="21%" cx="50%" cy="50%" class="redLayer"></circle>');
    $('.o-features-card-base.o-features-card-style5 .pieWrap').append('<polygon class="low" points="9,18 29,36 37,32"></polygon>');
    $('.o-features-card-base.o-features-card-style5 .pieWrap').append('<polygon class="medium" points="32,7 29,30 37,30"></polygon>');
    $('.o-features-card-base.o-features-card-style5 .pieWrap').append('<polygon class="high" points="56,18 29,30 37,35"></polygon>');
    $('.o-features-card-base.o-features-card-style5 .pieWrap').append('<circle r="5" cx="33" cy="33" class="strokeCircle"></circle>');
    $('.o-features-card-base.o-features-card-style5 >div:nth-of-type(1) >.wrap').append('<div class="halfCircleBottom"></div>');
    $('.o-features-card-base.o-features-card-style5 >div:nth-of-type(1) >.wrap').append('<div class="selectedColor"></div>');
    $(".halfCircleTop").html($(".halfCircleTop").html());
    /** Glucerna statement Ends **/ 

    $('.a-container--questionary .o-form-container--base.formcontainer .button.link.a-button--base').on('click', function() {
        displayErrorMessage();
    });
    checkingScreen();
    $('.a-container--questionary .o-form-container--base .o-form-option--base .a-radio__input').on('change',function() {
        let checkedBox = $('.o-form-option--base input[type="radio"]:checked');
        let totalItems = 0;
        displayErrorOnRadioButton();

        for (let i of checkedBox) {
            totalItems = totalItems + parseInt(i.value);
        }
        $('.a-container--questionary .o-form-container--base.formcontainer .button.link.a-button--base').on('click', function() {
            displayErrorMessage();
            if($('.o-form-option--base input[type=radio]:checked').length === totalQuestions) {
                $('.tabs.a-tabs--base.a-tabs--questioners .a-container--questionary .featurescard.o-features-card-base.o-features-card-style2').removeClass('d-none');
                $('.tabs.a-tabs--base.a-tabs--questioners .a-container--questionary .featurescard.o-features-card-base.o-features-card-style4').removeClass('d-none');
                $('.tabs.a-tabs--base.a-tabs--questioners .a-container--questionary .featurescard.o-features-card-base.o-features-card-style5').removeClass('d-none');
                if($('.o-features-card-style2').length > 0) {
                messageInfo(totalItems);
                    $('html,body').animate({
                    scrollTop: $(".tabs.a-tabs--base.a-tabs--questioners .a-container--questionary .featurescard.o-features-card-base.o-features-card-style2:visible").offset().top - 140},
                    'slow');
                }
                /** Pediasure stament starts **/
                else if($('.o-features-card-style4').length > 0) {
                    pediasureRiskResult(totalItems);
                    $('html,body').animate({
                    scrollTop: $(".tabs.a-tabs--base.a-tabs--questioners .a-container--questionary .featurescard.o-features-card-base.o-features-card-style4:visible").offset().top - 140},
                    'slow');
                }
                /** Pediasure stament Ends **/
                /** Glucerna stament starts **/
                else if($('.o-features-card-style5').length > 0) {
                    $('.o-features-card-base.o-features-card-style5').parents('.tabs.a-tabs--base.a-tabs--questioners').css({marginLeft:'unset', marginRight:'unset'});
                    $($('.o-features-card-base.o-features-card-style5').parents('.tabs.a-tabs--base.a-tabs--questioners')).parents().css({maxWidth: '100%'});
                    glucernaRiskResult(totalItems);
                    $('html,body').animate({
                    scrollTop: $(".tabs.a-tabs--base.a-tabs--questioners .a-container--questionary .featurescard.o-features-card-base.o-features-card-style5:visible").offset().top - 140},
                    'slow');
                }
                /** Glucerna stament Ends **/
            } else {
                $('.tabs.a-tabs--base.a-tabs--questioners .a-container--questionary .featurescard.o-features-card-base.o-features-card-style2').addClass('d-none');
                $('.tabs.a-tabs--base.a-tabs--questioners .a-container--questionary .featurescard.o-features-card-base.o-features-card-style4').addClass('d-none');
                $('.tabs.a-tabs--base.a-tabs--questioners .a-container--questionary .featurescard.o-features-card-base.o-features-card-style5').addClass('d-none');
            }
        });
    });
});
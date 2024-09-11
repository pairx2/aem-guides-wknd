class WizardButton{
    formButtonWrapper: JQuery<any>;


    constructor(elements) {
        this.formButtonWrapper = $(elements);
        this.checkButtonAlignment(this.formButtonWrapper);
    }

    /*
        @function
        @desc check button count and alignment
    */

    checkButtonAlignment(elements){
        let totalButtons = $(elements).find('.button');
        let formButtonCount = $(totalButtons).length;
        
        if(formButtonCount == 1){
            let firstButton = totalButtons[0];

            if($(firstButton).hasClass('justify-content-center')){
                $(elements).addClass('justify-content-center');
            }else if($(firstButton).hasClass('justify-content-start')){
                $(elements).addClass('justify-content-start');
            }else{
                $(elements).addClass('justify-content-end');
            }

        }else if(formButtonCount == 2){
            let firstButton= totalButtons[0];
            let secondButton= totalButtons[1];

            if($(firstButton).hasClass('justify-content-start') && ($(secondButton).hasClass('justify-content-center') || $(secondButton).hasClass('justify-content-start'))){
                $(elements).addClass('justify-content-start');
            }else if($(firstButton).hasClass('justify-content-start') && $(secondButton).hasClass('justify-content-end')){
                $(elements).addClass('justify-content-between');
            }else if($(firstButton).hasClass('justify-content-center')){
                $(elements).addClass('justify-content-around');
            }else if($(firstButton).hasClass('justify-content-end')){
                $(elements).addClass('justify-content-end');
            }else{
                $(elements).addClass('justify-content-between');
            }

        }else if(formButtonCount == 3){
            let firstButton= totalButtons[0];
            let secondButton= totalButtons[1];
            let thirdButton= totalButtons[2];

            if($(firstButton).hasClass('justify-content-start') && $(secondButton).hasClass('justify-content-center') !== true && $(thirdButton).hasClass('justify-content-end') !== true){
                $(elements).addClass('justify-content-start');
            }
            else if($(firstButton).hasClass('justify-content-start') && $(secondButton).hasClass('justify-content-center') && $(thirdButton).hasClass('justify-content-end')){
                $(elements).addClass('justify-content-between');
            }else if($(firstButton).hasClass('justify-content-center')){
                $(elements).addClass('justify-content-around');
            }else if($(firstButton).hasClass('justify-content-end')){
                $(elements).addClass('justify-content-end');
            }else{
                $(elements).addClass('justify-content-between');
            }

        }else{
            $(elements).addClass('justify-content-end');
        }
    }
}


$(document).ready(function () {
    document.querySelectorAll(".o-form-container__buttons, .o-wizard__btn").forEach(function (ele) {
        new WizardButton(ele);
    });
});
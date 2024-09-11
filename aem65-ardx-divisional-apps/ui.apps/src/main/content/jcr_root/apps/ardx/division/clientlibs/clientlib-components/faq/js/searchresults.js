$(document).ready(function() { 
    setTimeout(() =>{
        $('.searchresults [data-search-type="faqsearch"] .a-result, .searchresults [data-search-type="faqsearchglobal"] .a-result, .searchresults [data-search-type="getfaqsearch"] .a-result, .searchresults [data-search-type="getfaqsearchglobal"] .a-result')?.find('p').hide();
	    $('.searchresults [data-search-type="faqsearch"] .a-result, .searchresults [data-search-type="faqsearchglobal"] .a-result, .searchresults [data-search-type="getfaqsearch"] .a-result, .searchresults [data-search-type="getfaqsearchglobal"] .a-result')?.find('ul').hide();
	    $('.searchresults [data-search-type="faqsearch"] .a-result, .searchresults [data-search-type="faqsearchglobal"] .a-result, .searchresults [data-search-type="getfaqsearch"] .a-result, .searchresults [data-search-type="getfaqsearchglobal"] .a-result')?.find('ol').hide();
        $("body").delegate(".searchresults [data-search-type='faqsearch'] .a-result .a-result__title, .searchresults [data-search-type='faqsearchglobal'] .a-result .a-result__title, .searchresults [data-search-type='getfaqsearch'] .a-result .a-result__title, .searchresults [data-search-type='getfaqsearchglobal'] .a-result .a-result__title", "click", function(){
            $(this).toggleClass('active');
            $(this).closest('.a-result').find('p').slideToggle();
            $(this).closest('.a-result').find('ul').slideToggle();
        });
        if($('.searchresults [data-search-type="faqsearch"] [type="reset"], .searchresults [data-search-type="faqsearchglobal"] [type="reset"], .searchresults [data-search-type="getfaqsearch"] [type="reset"], .searchresults [data-search-type="getfaqsearchglobal"] [type="reset"]').length > 0){
            let resetButton = $('.searchresults [data-search-type="faqsearch"] [type="reset"]:first, .searchresults [data-search-type="faqsearchglobal"] [type="reset"]:first, .searchresults [data-search-type="getfaqsearch"] [type="reset"]:first, .searchresults [data-search-type="getfaqsearchglobal"] [type="reset"]:first').parent().parent();
            let updateHTML = $('.searchresults [data-search-type="faqsearch"] [type="reset"]:first, .searchresults [data-search-type="faqsearchglobal"] [type="reset"]:first, .searchresults [data-search-type="getfaqsearch"] [type="reset"]:first, .searchresults [data-search-type="getfaqsearchglobal"] [type="reset"]:first').parent().parent().html();
            if($('.searchresults [data-search-type="faqsearch"] .m-search-bar__container [type="reset"], .searchresults [data-search-type="faqsearchglobal"] .m-search-bar__container [type="reset"], .searchresults [data-search-type="getfaqsearch"] .m-search-bar__container [type="reset"], .searchresults [data-search-type="getfaqsearchglobal"] .m-search-bar__container [type="reset"]').length == 0){
                $('.searchresults [data-search-type="faqsearch"] .m-search-bar__container, .searchresults [data-search-type="faqsearchglobal"] .m-search-bar__container, .searchresults [data-search-type="getfaqsearch"] .m-search-bar__container, .searchresults [data-search-type="getfaqsearchglobal"] .m-search-bar__container').append(updateHTML);
            }
            resetButton.remove();
            $('.searchresults [data-search-type="faqsearch"] [type="reset"]:first, .searchresults [data-search-type="faqsearchglobal"] [type="reset"]:first, .searchresults [data-search-type="getfaqsearch"] [type="reset"]:first, .searchresults [data-search-type="getfaqsearchglobal"] [type="reset"]:first').addClass('reset-btn')
        }
        
        if($('.searchresults [data-search-type="faqsearch"] .search__heading input, .searchresults [data-search-type="faqsearchglobal"] .search__heading input, .searchresults [data-search-type="getfaqsearch"] .search__heading input, .searchresults [data-search-type="getfaqsearchglobal"] .search__heading input')?.val()?.length > 0){
            addHighlight();
        }
        $("body").delegate(".reset-btn", "click", function(){
            $('.searchresults [data-search-type="faqsearch"] .m-search-bar__input-field, .searchresults [data-search-type="faqsearchglobal"] .m-search-bar__input-field, .searchresults [data-search-type="getfaqsearch"] .m-search-bar__input-field, .searchresults [data-search-type="getfaqsearchglobal"] .m-search-bar__input-field').val('');
            let inputField = document.querySelector('.searchresults [data-search-type="faqsearch"] .m-search-bar__input-field, .searchresults [data-search-type="faqsearchglobal"] .m-search-bar__input-field, .searchresults [data-search-type="getfaqsearch"] .m-search-bar__input-field, .searchresults [data-search-type="getfaqsearchglobal"] .m-search-bar__input-field');
            $('.searchresults [data-search-type="faqsearch"] .m-search-bar__close, .searchresults [data-search-type="faqsearchglobal"] .m-search-bar__close, .searchresults [data-search-type="getfaqsearch"] .m-search-bar__close, .searchresults [data-search-type="getfaqsearchglobal"] .m-search-bar__close').removeClass('show');
            setTimeout(function(){
                const ev = new KeyboardEvent('keyup', { 'key': 'Enter' , 'keyCode': 13, 'which': 13 });
                inputField.dispatchEvent(ev)
            },100);
        });
        $("body").delegate(".searchresults [data-search-type='faqsearch'] .m-search-bar__button .btn, .searchresults [data-search-type='faqsearchglobal'] .m-search-bar__button .btn, .searchresults [data-search-type='getfaqsearch'] .m-search-bar__button .btn, .searchresults [data-search-type='getfaqsearchglobal'] .m-search-bar__button .btn", "click", function(){
            addHighlight();
        });
        $("body").delegate(".searchresults [data-search-type='faqsearch'] .search-icon, .searchresults [data-search-type='faqsearchglobal'] .search-icon, .searchresults [data-search-type='getfaqsearch'] .search-icon, .searchresults [data-search-type='getfaqsearchglobal'] .search-icon", "click", function(){
            addHighlight();
        });
        $(document).on('keypress',function(e) {
            if(e.which == 13) {
                addHighlight();
            }
        });
        
        let targetNode = $('.a-spinner');
        if($('.searchresults [data-search-type="faqsearch"], .searchresults [data-search-type="faqsearchglobal"], .searchresults [data-search-type="getfaqsearch"], .searchresults [data-search-type="getfaqsearchglobal"]').length > 0){
            targetNode.each(function(){
                addClassNameListener(this, addHighlight)
            })
        }
       
        
    }, 1000);
    
});
function addClassNameListener(elem, callback) {
    let lastClassName = elem.className;
    window.setInterval( function() {   
        let className = elem.className;
        if (className !== lastClassName) {
            callback();   
            lastClassName = className;
        }
    },10);
}
function addHighlight(){
    setTimeout(()=>{
        let searched = document.querySelector('.search__heading input').value.trim();
        let searchedLower = searched.toLowerCase();
        if(searched.length > 0){
            $('.o-search-res__results .a-result').each(function(){
                let compareText = $(this).find('.a-result__title--link').text().toLowerCase();
                if(compareText.indexOf(searchedLower) >= 0) {
                    let text = this.querySelector(".a-result__title--link").innerHTML;
                    let re = new RegExp(searchedLower,"g"); // search for all instances
                    let exist = `<mark>${searched}`;
                    let _this = this;
                    oSearchResultcall(text, exist, re, _this, searched);
                }
                let compareTextTwo = $(this).find('p').text().toLowerCase();
                if(compareTextTwo.indexOf(searchedLower) >= 0) {
                    $(this).find("p").each(function(){
                        let text = this.innerHTML;
                        let textLower = text.toLowerCase();
                        let originalText;
                        if(text.toLowerCase().indexOf(searchedLower) >= 0){
                            let startPos = textLower.indexOf(searchedLower);
                            let endPos = startPos + searched.length;
                            originalText = text.slice(startPos,endPos);
                            let re = new RegExp(originalText,"g");
                            let exist = `<mark>${originalText}`;
                            let _this = this;
                            callOriginalText(_this, text, exist, re, originalText);
                        }
                        
                    })

                }
            });
        }
        else{
            searchHeadingElse();
        }
       
    }, 1100);
}

function callOriginalText( _this, text, exist, re, originalText) {
    if (text.indexOf(exist) < 0) {
        let newText = text.replace(re, `<mark>${originalText}</mark>`);
        _this.innerHTML = newText;
    }
}

function oSearchResultcall(text, exist, re, _this, searched) {
    if (text.indexOf(exist) < 0) {
        let newText = text.toLowerCase().replace(re, `<mark>${searched}</mark>`);
        _this.querySelector(".a-result__title--link").innerHTML = newText;
    }
}

function searchHeadingElse() {
    setTimeout(() => {
        const event = new KeyboardEvent('keypress', { 'keyCode': 13, 'which': 13 });
        return event;
    }, 500);
}

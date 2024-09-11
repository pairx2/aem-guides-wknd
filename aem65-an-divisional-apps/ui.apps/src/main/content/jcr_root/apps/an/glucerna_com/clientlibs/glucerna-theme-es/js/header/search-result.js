$(document).ready(function() {
    let urlParams = new URLSearchParams(window.location.search);
    let myParam = urlParams.get('q');
    let getClassNoResult = $('.o-search-res__no-results').hasClass('d-block');
    if(getClassNoResult) {
        $('.o-search-res__no-results').removeClass('d-block');
    }
    if(myParam && myParam!= null) {
        $('.o-search-res__container').css('display', 'flex');
        $('.searchresultitem').css('display','none');
    }
    else {
        $('.o-search-res__container').css('display', 'none'); 
    }
    $('.search-button button').click(function() {
        setTimeout(function() {
            urlParams = new URLSearchParams(window.location.search);
            myParam = urlParams.get('q');
           if(myParam && myParam!= null) {
               $('.o-search-res__container').css('display','flex');
           }
           let dataCount = $('.o-search-res').attr('data-results');
           if(dataCount > 0) {
               $('.o-search-res__results').css('display','block');
               $('.o-search-res__no-results').css('display','none');
               $('.searchresultitem').css('display','none');
           }
           else {
               $('.o-search-res__results').css('display','none');
               $('.searchresultitem').css('display','none');
               $('.o-search-res__no-results').css('display','block');
           }
        }, 1000);
    })
})


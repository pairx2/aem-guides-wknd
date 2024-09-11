function articlesProcess() {
    var articlesContentWrap = document.querySelector('#article-cont-wrap');
    var articlesLoginPopupTrigger = articlesContentWrap.querySelector('#articles-login-popup-trigger');
    var protectedContentPlaceholder = articlesContentWrap.querySelector('#protected-content-placeholder');
    protectedContentPlaceholder.style.display = 'none';

    if(UserLoginValidCheck()) {
        var partialArticleFilePathArray = location.pathname.split('/');
        partialArticleFilePathArray[partialArticleFilePathArray.indexOf('home')] = 'secure';    
        var secureArticleFilePath = partialArticleFilePathArray.join('/');
        $("#protected-content-placeholder").load(secureArticleFilePath + ' ' + '#articles-protected-content');
        protectedContentPlaceholder.style.display = 'block';
        articlesLoginPopupTrigger.closest('.link.a-link').style.display = 'none';
    }
    else {
        articlesLoginPopupTrigger.closest('.link.a-link').style.display = 'block';
    }
    articlesLoginPopupTrigger.addEventListener('click', function() {
        $(".loginPopupTrigger.m-popup").click();
    })
}

// Artciles link ID href index scroll position modifying by below script because fixed header hides top content
$('#articles-cont-link-index-wrap a').on('click', function (event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "" && UserLoginValidCheck()) {
        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
            scrollTop: $(hash).offset().top - 165
        }, 800);
    } // End if
});

// About us page script starts
function aboutPageProcess() {
    var aboutContentWrap = document.querySelector('#about-cont-wrap');
    var aboutSignUpLinkTrigger = aboutContentWrap.querySelector('#about-signup-link-trigger');
    (UserLoginValidCheck()) ? aboutSignUpLinkTrigger.closest('.a-link').style.display = 'none' : aboutSignUpLinkTrigger.closest('.a-link').style.display = 'inline-block';
}
// About us page script ends

$(document).ready(function () {
    if(typeof typeof Granite === 'undefined' ||  typeof Granite.author === 'undefined') {
        var articlesContentWrap = document.querySelector('#article-cont-wrap');
        if(articlesContentWrap) {
            articlesProcess();
        }
        var aboutContentWrap = document.querySelector('#about-cont-wrap');
        if(aboutContentWrap) {
            aboutPageProcess();
        }
    }  
});
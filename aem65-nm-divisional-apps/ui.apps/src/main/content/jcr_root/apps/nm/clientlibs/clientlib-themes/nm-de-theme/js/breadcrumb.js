$(document).ready(function () {
    let isHeroLight = $('.m-hero:first-child').hasClass("m-hero--light");
    if(isHeroLight && $('.a-breadcrumb')) {
        $('.a-breadcrumb').addClass('a-breadcrumb--light');
    }
    let isFirstContainer = $('#pageContent .abbott-breadcrumb + .root .container.a-container--secondary:nth-child(1)');
    if(isFirstContainer.length>0 && $('.a-breadcrumb')) {
        $('.a-breadcrumb').addClass('a-breadcrumb--light');
    }
});

$(window).on('load', function() {
    setTimeout(function() {
        var heroContainer = $('.container-hide-image-mobile .cmp-container .title:first-child').hasClass('a-title--fg-secondary');
        if(heroContainer && $('.a-breadcrumb')) {
            $('.a-breadcrumb').addClass('a-breadcrumb--light');
        }
    }, 500);
});
$(document).ready(function() {
    if($('.o-tiles-divisional').length > 0){
        $('.o-tiles-divisional').closest('.tileswithbackground')?.css("cssText", "padding-bottom: 0px !important;");
        if($('.o-tiles-divisional .o-tiles__bg')[0]){
            setTimeout(() => {
                let tilesContainer = $('.o-tiles-divisional .o-tiles__container')?.clone()[0];
                $('.o-tiles-divisional .o-tiles__container')?.remove( );
                $('.o-tiles-divisional .o-tiles__bg')[0]?.append(tilesContainer);
            },200);
        }
        let tilesbgDesktop = $('.tilesbg-desktop').attr('src');
        let tilesbgTablet = $('.tilesbg-tablet').attr('src');
        let tilesbgMobile = $('.tilesbg-mobile').attr('src');

        if($(window).width() > 1024){
            $('.o-tiles__bg').attr('style',`background-image: url(${tilesbgDesktop})`);
        }

        if($(window).width() <= 1024){
            $('.o-tiles__bg').attr('style',`background-image: url(${tilesbgTablet})`);
        }

        if($(window).width() <= 767){
            $('.o-tiles__bg').attr('style',`background-image: url(${tilesbgMobile})`);
        }
        
        if(tilesbgTablet ==undefined || tilesbgMobile ==undefined ) {
            $('.o-tiles__bg').attr('style',`background-image: url(${tilesbgDesktop})`);
        }
 	}
});
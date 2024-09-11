$(document).ready(function() {
    $(".header .languagenavigation .m-link-stack__link, .header .languagenavigation .abt-icon").click(function(){
        $(".header .languagenavigation .m-link-stack .abt-icon").toggleClass("rotate-upside");
    });
    var lists=$(".richtext .cmp-text ol li,.richtext .cmp-text ul li");
    lists.each(function () {
        if($(this).find('span:last-child').length > 0){
            $(this).addClass($(this).find('span:last').attr('class'))
            $(this).attr('style',$(this).find('span:last').attr('style'))
        }
    });
    $(".o-footer__social-media .m-social-media--icons li a").click(function(){
        window.open($(this).attr('href'),$(this).attr('target'));
    });
    var headermenu=$(".header .o-header-v2-global .navbar-collapse-wrapper .m-mega-menu__mobile-item-wrapper .navigation .m-mega-menu__mobile-item");
    headermenu.each(function(){
        if($(this).find('.m-mega-menu__mobile-item').length == 0){
            $(this).find('.m-mega-menu__mobile-header').addClass("arrowhide");
        }
    });
    $(document).on('click', function(event) {
        if ($(event.target).parent().attr('data-redirect-confirm') == 'true' || $(event.target).attr('data-redirect-confirm') == 'true') {
            if ($('#siteLeavingPopupFragmentPathModal')) {
                $('#siteLeavingPopupFragmentPathModal').css('display', 'block');
                $('.modal-backdrop').css('display', 'block');
                $('body').css({
                    'overflow-y': 'hidden',
                    'padding-right': '17px'
                });
            }
            setTimeout(() => {
                if ($('#siteLeavingPopupFragmentPathModal .button')) {
                    $(document).on('click', '#siteLeavingPopupFragmentPathModal .button', function() {
                        let getAttrVal = $('#siteLeavingPopupFragmentPathModal .button > div').attr('data-btn-type');
                        if (getAttrVal && getAttrVal == 'continue') {
                            $('#siteLeavingPopupFragmentPathModal').css('display', 'none');
                            $('.modal-backdrop').css('display', 'none');
                            $('body').css({
                                'overflow-y': 'scroll',
                                'padding-right': '0'
                            });
                        }
                    });
                }
            }, 100);
        }
    })

});
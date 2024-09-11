$(function () {
    let hero_empty_text = $(".m-hero--auto-height").find(".m-hero__content > p");
    remove_Spaceshero(hero_empty_text);
    let hero_empty_title = $(".m-hero--auto-height").find(".m-hero__content > h1");
    remove_Spaceshero(hero_empty_title);  
       
    function remove_Spaceshero(elem){
        for(const element of elem)
        {
            let val = $(element).text();
            if(!val?.trim()){
                $(element).hide();
            }
        }
    }
    $('.m-hero').each(function() {

        let heightVal = $(this).find('.no-gutters').height();
        if(($(this).hasClass('m-hero--bglight') || $(this).hasClass('m-hero--bgdark') || $(this).hasClass('m-hero--light') || $(this).hasClass('m-hero--dark') ) && $(this).hasClass('m-hero--auto-height')) {
            $(this).height(heightVal);
            $(this).find('.m-hero__media').height(heightVal);
            if($(window).width() < 1023) { 
                let marTop = parseInt($(this).find('.m-hero__content').css("margin-top").replace('px', ''));
                let marBtm = parseInt($(this).find('.m-hero__content').css("margin-bottom").replace('px', ''));
                let contentHeight = $(this).find('.m-hero__content').height();
                let padTop = parseInt($(this).find('.m-hero__content').css("padding-top").replace('px', ''));
                let padBtm = parseInt($(this).find('.m-hero__content').css("padding-bottom").replace('px', ''));
                let heightValue = marBtm + marTop + contentHeight + padTop + padBtm;
                $(this).height(heightValue);
                $(this).find('.m-hero__media').height(heightValue);
            } else {
                $(this).height(heightVal);
                $(this).find('.m-hero__media').height(heightVal);
            }
        }

        if($(window).width() < 512 && $(this).hasClass('m-hero--image-position')) {
            if($(this).hasClass('m-hero--image-position') &&  ($(this).hasClass('m-hero--medium') || $(this).hasClass('m-hero--short')))
            {
				let media_Height =  $(this).find('.m-hero__media').height();
                let content_Height = $(this).find('.m-hero__content').height();
                let cal_mediaheight = media_Height-content_Height;
				$(this).find('.m-hero__media').height(cal_mediaheight);
                $(this).find('.m-hero__media').css({'min-height': '0'});
                $(this).find('.m-hero__content').css({'margin-top': '0'});
                $(this).find('.m-hero__content').css({'margin-bottom': '0'});
                $(this).height((cal_mediaheight+content_Height))
            }
            else{
            	$(this).height(heightVal);
                $(this).find('.m-hero__content').css({'margin-top': '0'});
                $(this).find('.m-hero__content').css({'margin-bottom': '0'});
            }
        }
    });
});
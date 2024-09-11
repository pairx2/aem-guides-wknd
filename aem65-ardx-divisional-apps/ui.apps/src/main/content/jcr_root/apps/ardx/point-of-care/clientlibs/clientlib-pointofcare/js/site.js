$(document).ready(function(){

    $(".o-header-v2-group .m-link-stack").click(function(){
        $(this).find("a").toggleClass("active");
        $(this).find(".m-link-stack--title").toggleClass("title-active");
        $(this).find(".m-link-stack--content").toggleClass("d-none");
    });
    $(".o-header-v2-group .linkstack .js-collapse-icon").click(function(){
        $(this).closest(".m-link-stack").find(".m-link-stack--content").toggleClass("d-none");
    });
    $(document).mouseup(function(e) {
        let $languageMenu = $(".o-header-v2-group .linkstack:not('.myProfileLinks') .m-link-stack");
        if (!$languageMenu.is(e.target) && $languageMenu.has(e.target).length === 0 && !$languageMenu.find('.m-link-stack--content').hasClass('d-none')) 
        {
            $languageMenu.find(".m-link-stack--content").addClass("d-none");
            $languageMenu.find("a").removeClass("active");
            $languageMenu.find(".m-link-stack--title").removeClass("title-active");
        }
    });
    let headerMenu = $(".header .o-header-v2-global .navbar-collapse-wrapper .m-mega-menu__mobile-item-wrapper .navigation .m-mega-menu__mobile-item");
    headerMenu.each(function(){
        if($(this).find('.m-mega-menu__mobile-item').length == 0){
            $(this).find('.m-mega-menu__mobile-header').addClass("arrowhide");
        }
    });

    $(".breadcrumb-herobanner").closest('.columncontrol').addClass("breadcrumb-herobanner-col");
    $(".abbott-breadcrumb").closest('.container.responsivegrid').addClass("abbott-breadcrumb-container");
    $(".a-breadcrumb").closest('.columncontrol__column').addClass("a-breadcrumb-column");
    $(".a-link--icon-right").closest('.columncontrol__column').addClass("a-link--icon-right-column");
    $(".breadcrumb-herobanner").closest('.container.responsivegrid').addClass("breadcrumb-herobanner-container");
    
    $(".header").closest('.aem-Grid.aem-Grid--12.aem-Grid--default--12').addClass("header-bg-fullwidth");   
    $(".image").closest('.a-container.a-container--shadow-box').addClass("image-container");
    $(".image.image--align-right").closest('.a-container.a-container--shadow-box').addClass("imgright-container");   
    $(".video").closest('.a-container.a-container--shadow-box').addClass("video-container");
    $(".o-hero-carousel").closest('.container.a-container').addClass("o-hero-carousel-container");
    $("#hero-carousel-arrow-small").closest('.container.a-container').removeClass("o-hero-carousel-container");
    $(".imgsticky-mt-removed").closest('.imagemapwithstickymenu').addClass("mt-0");
    $("#static-countries-dropdown-options").closest('.a-container').addClass("dropdown-container");
    $('.border-box').closest('.m-card').addClass('m-card-border-box');
    $('.border-light').closest('.m-card').addClass('m-card-border-light');
    $('.hover-bg').closest('.m-card').addClass('m-card-hover-bg');
    $('.full-img').closest('.m-card').addClass('m-card-full-img');
    $('.box-bottom').closest('.m-hero').addClass('m-hero-box-bottom');
    
    let hero_text = $(".m-hero--bglight").find(".m-hero__content > p");
    removeSpaceshero(hero_text);
    let hero_title = $(".m-hero--bglight").find(".m-hero__content > h1");
    removeSpaceshero(hero_title);

    //mega menu href fix for mobile/ipad screens
	megaMenuMobile();

        //fullwidth modal popup
    $(document).on("click", ".product-techinical-button", function(){
        let dataTarget = $(this).find(".m-popup").attr('data-target');
        $(dataTarget).addClass('modal-popup--fullwidth');
    });

    $(document).on("click", ".product-sales-button", function(){
        let dataTarget_1 = $(this).find(".m-popup").attr('data-target');
        $(dataTarget_1).addClass('modal-popup--fullwidth');
    });
    $(document).on("click", "#footer-contact-us", function(){
        let dataTarget_2 = $(this).find(".m-popup").attr('data-target');
        $(dataTarget_2).addClass('modal-popup--fixedwidth');
    });
    $(document).on("click", "#container-modal-image-fixedwidth .m-popup, #section_container-modal-image-fixedwidth .m-popup", function(){
        let dataTarget_3 = $(this).attr('data-target');
        $(dataTarget_3).addClass('modal-popup--fixedwidth');
    });
	//Product title, replaces the sticky menu title for product pages.
	let productTitle = $("#product-title .cmp-title__text");
	productTitleLength(productTitle);
    
    $('.a-title--sectiontitle-dark')?.each(function(index){
        $(this).addClass('a-title--sectiontitle-'+index);
        let parentWidth = $(this).find('.cmp-title').innerWidth();
        let childrenWidth = $(this).find('.cmp-title__text').innerWidth();
        let psuedoWidth = parentWidth - childrenWidth;
        if(psuedoWidth >= 0){
            addRule(`.a-title--sectiontitle-${index} .cmp-title__text:before { width: ${psuedoWidth/2}px !important;}`);
            addRule(`.a-title--sectiontitle-${index} .cmp-title__text:after { width: ${psuedoWidth/2}px !important;}`);
        }
    })

    window.addEventListener('resize', function(event) {
           $('.a-title--sectiontitle-dark').each(function(index){
            $(this).addClass('a-title--sectiontitle-'+index);
            let parentWidth = $(this).find('.cmp-title').innerWidth();
            let childrenWidth = $(this).find('.cmp-title__text').innerWidth();
            let psuedoWidth = parentWidth - childrenWidth;
            addRule(`.a-title--sectiontitle-${index} .cmp-title__text:before { width: ${psuedoWidth/2}px !important;}`);
            addRule(`.a-title--sectiontitle-${index} .cmp-title__text:after { width: ${psuedoWidth/2}px !important;}`);
        })
    });
    
   let megaMenuAnchor = $(".megamenu .link, .megamenu .m-mega-menu__list-var").find("a");
   for(const element of megaMenuAnchor){
        let megamenu_Text = $(element).text();        
        let megamenu_Text_lowerCase = megamenu_Text.replaceAll("i-STAT","<span class='noncapitalised'>i-STAT</span>");
        $(element).html(megamenu_Text_lowerCase)
   }
   let stickymenu_title = $(".sticky-menu").find(".m-link-stack").find(".m-link-stack__list").find(".a-link__text");
    for(const element of stickymenu_title){
        let stickymenu_text = $(element).text();
		 let stickymenu_Text_lowerCase = stickymenu_text.replaceAll("i-STAT","<span class='nonCapitalised'>i-STAT</span>");
         $(element).html(stickymenu_Text_lowerCase)
    }

    SearchSetintervalMethod();
    
	  //text and image mobile text wrap
  let $textwrap =  $(".textimage.o-textimage-section__alignbottom").find('.mobile-wrap');
  if($textwrap)
  {
    $textwrap.closest('.o-textimage-section__row').addClass("mobile-wrap-text");
  }

    $('#static-countries-dropdown-options li').each(function () {
        let optionvalue = $(this).attr('data-optionvalue')?.trim();	
        $('#'+optionvalue).closest('.container').hide();

    });

    staticCountries();
    
    $(document).on("mouseover", "#static-countries-dropdown-options ul li", function(){
        $("#static-countries-dropdown-options ul li").removeClass("selected");
    });
		
    let articleTagItems = $(".article-tags a.article-tags__tag");
    $(articleTagItems).each(function() {
        $(this).on("click", function() {
            sessionStorage.setItem("sticky-tag-title-filter",$(this).data("tag-title"));
        });
    });
	
    let articleTopicItems = $("#article-detail-section .customtextlist ul li a[href^='#']");
    $(articleTopicItems).each(function() {
        $(this).on("click", function() {
			let anchorFilter = $(this).attr("href");
			let currentPagePath = $(location).attr("pathname");	  	   
			let parentPath = currentPagePath.substr(0,currentPagePath.lastIndexOf("/")) + ".html";
			//set the href to navigate to parent page url along with '#' value to filter results on sticky filter.
			$(this).attr("href", parentPath + anchorFilter);
			$(this).attr("target", "_self");
			sessionStorage.setItem("sticky-tag-title-filter",anchorFilter.replace("#",""));
        });
    });	
    
    $('.wistia-playlist__video-item').each(function(){
        $(this).on('click', function () {
            $('html, body').animate({
                'scrollTop': $(this).closest('.wistia-playlist').offset().top - $('.o-header-v2-global__sticky-section')?.height()
            }, 300);
        });
    });

    let linkStack_a = $(".o-header-v2-group .linkstack");
    linkStack_a.each(function(elem){       
        let findLinkElem = $(this).find("a");
        if(findLinkElem.length === 0){
            $(this).addClass("not-link");
         }
    });
    dataWistiaEmbed();
   
    $(document).on("mouseover", "#technical-support .a-dropdown__field ul li", function(){
        $("#technical-support .a-dropdown__field ul li").removeClass("selected").removeClass("selectedColor");
    });
    
    $(".tabs").find(".a-tabs__nav-link").click(function(){
        setTimeout(function(){
           updateAccordianTitle();
             }, 500)
    });
    $("#static-countries-dropdown-options").find(".a-dropdown__field ul li").click(function(){
        setTimeout(function(){
           updateAccordianTitle();
        }, 500)
    });
   updateAccordianTitle();
   callSlickCaruosel();
    $(document).on('click', '.table-popup-btn', function(){
        let dataTarget_4 = $(this).attr('data-target')?.replace("-modal", "");
        $(dataTarget_4).trigger('click');
    });

    let siteDiscEntry = "gpoc-site" + $("input[name='x-country-code']").val();
    const toMilliseconds = (hrs, min, sec) =>
      (hrs * 60 * 60 + min * 60 + sec) * 1000;

    let getVisitedTbib = localStorage.getItem(siteDiscEntry);

    if (getVisitedTbib == null || getVisitedTbib != siteDiscEntry) {
    let clonePopUpDiv = $("#gpoc-disclimar-pop-up").children().clone();
    $("#pageContent").after(clonePopUpDiv);
    }

    $(document).on("click", ".gpoc-disclimar-continue", function (e) {
      e.preventDefault();
      $("#pageContent").siblings(".gpoc-disclaimar-overlay").addClass("hide");
      localStorage.setItem(
        siteDiscEntry,
        siteDiscEntry,
        toMilliseconds(24, 0, 0)
      );
    });
    $(document).on("click", ".gpoc-disclimar-cancel", function (e) {
      localStorage.setItem(
        siteDiscEntry,
        siteDiscEntry,
        toMilliseconds(24, 0, 0)
      );
      $("#pageContent").siblings(".gpoc-disclaimar-overlay").addClass("hide");
    });

    setTimeout(function() {
        let jsonProductData = JSON.parse(sessionStorage.getItem("searchResult"));
        let productsResutlsObject = jsonProductData.response.results;
        defaultImgReplace(productsResutlsObject);
        $('#product-catalog .o-search-res__results--view, #relatedproducts .o-search-res__results--view').on('DOMSubtreeModified', function() {
            defaultImgReplace(productsResutlsObject);
        });
    
    },3000);
    

});
$(window).on('scroll', function(){
    let $topBar = $('.o-header-v2-global__section--utility-top');
    if($(window).scrollTop() > 5) {
        $topBar.addClass('sticky');
    }
    else {
        $topBar.removeClass('sticky');
    }
});
function productTitleLength(productTitle){
    if(productTitle.length > 0) {
		let productStickyTitle = '<div><div class="m-link-stack__title container product-title d-none"><div><h2>PRODUCT-TITLE</h2></div></div></div>';	
		if($(".stickyMenu.showHide .product-title").length > 0){
			$(".stickyMenu.showHide .product-title").parent().replaceWith(productStickyTitle.replace("PRODUCT-TITLE",productTitle.html()));
		} else {
			$(".stickyMenu.showHide").prepend(productStickyTitle.replace("PRODUCT-TITLE",productTitle.html()));
		}
	} 
}
function addRule(styles){
    let css = styles,
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');
    head.appendChild(style);
    style.setAttribute('type','text/css');
    if (style.styleSheet){
    style.styleSheet.cssText = css;
    } else {
    style.appendChild(document.createTextNode(css));
    }
}
function dataWistiaEmbed(){
    $('[data-toggle="modal"]').click(function(){
        $(".modal").each(function(){
            let wistia_embed_element = $(this).find('.wistia_embed');
            if(wistia_embed_element.length>0){
                let wistiaImgSrc = $(this).find('.wistia_embed').attr('data-img-src');
                let wistiaImgAlt = $(this).find('.wistia_embed').attr('data-img-alt');
                let wistiaAnchor = '<a href="#" class="wistia-video__has-image"><img src="'+wistiaImgSrc+'" alt="'+wistiaImgAlt+'"></a>';
                $(this).find('.wistia_embed').find(".wistia_click_to_play").empty().append(wistiaAnchor);
            }
        })

    })
}
function staticCountries(){
    $('#static-countries-dropdown-options .a-dropdown__field ul li').on('click', function () {
        let selectValue = $(this).find('span')?.text()?.trim()
        let selectedValue;
            $(this).closest('ul').find('li').each(function () {
                if ($(this).find('span')?.text()?.trim() == selectValue) {
                    selectedValue = $(this).attr('data-optionvalue')?.trim();
                    $('#'+selectedValue).closest('.container').show();
                }
                else{
                    selectedValue = $(this).attr('data-optionvalue')?.trim();
                    $('#'+selectedValue).closest('.container').hide();
                }
            });
    });
}
function megaMenuMobile(){
    if (window.innerWidth < 992) { 
		$('.m-mega-menu__mobile .navbar-nav .m-mega-menu__mobile-item-wrapper .navigation .m-mega-menu__item .nav-item').each(function(){
			let href = $(this).attr('href');
			let navItemTxt = $(this).text();
			let addEle = "<a class='mob-nav-link'></a>";
			let curEle = $(this).parent().parent().find('.m-mega-menu__mobile-item').children('.m-mega-menu__mobile-header');

			$(this).parent().parent().find('.m-mega-menu__mobile-item').children('.m-mega-menu__mobile-header').attr('href','javascript:void(0)');
			$(this).parent().parent().find('.m-mega-menu__mobile-item').children('.m-mega-menu__mobile-header').prepend(addEle);
			$(this).parent().parent().find('.m-mega-menu__mobile-item').children('.m-mega-menu__mobile-header').find('.mob-nav-link').text(navItemTxt);
			$(this).parent().parent().find('.m-mega-menu__mobile-item').children('.m-mega-menu__mobile-header').find('.mob-nav-link').attr('href',href);
			curEle.contents().filter(function () {
				return this.nodeType === 3; 
			}).remove();
		});

	}
}
function defaultImgReplace(productsResutlsObject){
    $("#product-catalog .product-card_image, #relatedproducts .product-card_image").each(function(){
        let productSrc = $(this).attr('src');
        let productTitleName = $(this).attr('title');
        let curProduct = $(this);
        if(productSrc.length == 0){
            $.each(productsResutlsObject, function(key, value) {
                let productText = value.title;
                if(productTitleName == productText){
                    if(value.pagethumbnail){
                        curProduct.attr('src', value.pagethumbnail)
                    }
                }
            });
        }
    });
}
function callSlickCaruosel(){
    if(window.innerWidth < 1024 && ($('[name="x-application-id"]').val() === "globalpointofcare")){  
        let autoPlayData = $('.cmp-carousel [data-js-component="carousel"]').attr('data-transition-autoplay');
        let autoPlayTimeData = $('.cmp-carousel [data-js-component="carousel"]').attr('data-transition-delay');
        $('.cmp-carousel [data-js-component="carousel"]').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            adaptiveHeight: true,
            autoplay: autoPlayData,
            autoplaySpeed: parseInt(autoPlayTimeData),
            prevArrow: '<button class="slick-prev slick-arrow abt-icon abt-icon-left-arrow"></button>',
            nextArrow: '<button class="slick-next slick-arrow abt-icon abt-icon-right-arrow"></button>'
        });
    }
    if(window.location.href.indexOf('viewpoints.html') >= 0 || window.location.href.indexOf('education.html') >= 0 || window.location.href.indexOf('knowledge-insights.html') >= 0) {
        $('.sticky-menu__filter').addClass('sticky-menu__colorcharcoal');
    }
}
function SearchSetintervalMethod(){
    let searchResultTitleSet = setInterval(function () {
        let searchResultTitle = $(".o-search-res__container").find(".a-card-result__title");
        let searchResultTitleLength = searchResultTitle.length;
        let searchResultTitleIndex = 0;
        for (const element of searchResultTitle) {
            searchResultTitleIndex++;
            let searchResultTitleText = $(element).html();
            let searchResultTitleTextLowerCase = searchResultTitleText.replaceAll("i-STAT", "<span class='nonCapitalised'>i-STAT</span>");
            $(element).html(searchResultTitleTextLowerCase)
            if (searchResultTitleIndex == searchResultTitleLength) {
                clearInterval(searchResultTitleSet)
            }
        }
    }, 500);

    let featuredPageTitleSet = setInterval(function () {
        let featuredPageTitle = $(".o-search-results-filter").find(".o-featured-pages__heading a");
        let featuredPageTitleLength = featuredPageTitle.length;
        let featuredPageTitleIndex = 0;
        for (const element of featuredPageTitle) {
            featuredPageTitleIndex++;
            let featuredPageTitleText = $(element).html();
            let featuredPageTitleTextLowerCase = featuredPageTitleText.replaceAll("i-STAT", "<span class='nonCapitalised'>i-STAT</span>");
            $(element).html(featuredPageTitleTextLowerCase)
            if (featuredPageTitleIndex == featuredPageTitleLength) {
                clearInterval(featuredPageTitleSet)
            }
        }
    }, 500);

    let featuredPageTitleSet_card = setInterval(function () {
        let featuredPageTitle_card = $(".o-search-results-filter .o-featured-pages__item-count--3").find(".o-featured-pages__heading");
        let featuredPageTitle_cardLength = featuredPageTitle_card.length;
        let featuredPageTitle_cardIndex = 0;
        for (const element of featuredPageTitle_card) {
            featuredPageTitle_cardIndex++;
            let featuredPageTitleText_card = $(element).html();
            let featuredPageTitleTextLowerCase_card = featuredPageTitleText_card.replaceAll("i-STAT", "<span class='nonCapitalised'>i-STAT</span>");
            $(element).html(featuredPageTitleTextLowerCase_card)
            if (featuredPageTitle_cardIndex == featuredPageTitle_cardLength) {
                clearInterval(featuredPageTitleSet_card)
            }
        }
    }, 500);
   
}
function updateAccordianTitle(){

    let accordian_lowerCase = $(".accordion").find(".m-accordion__header").find("h3, h4, h5, h6");      
    for(const element of accordian_lowerCase){
            let accordian_title_text = $(element).text();           
               let accordian_title_text_lowercase = accordian_title_text.replaceAll("i-STAT","<span style='color:unset;' class='nonCapitalised'>i-STAT</span>");
            $(element).html(accordian_title_text_lowercase)
        }

}
function removeSpaceshero(elem){
    for(const element of elem)
    {
        let val = $(element).text();
        if(!val?.trim()){
            $(element).hide();
         }
    }
}

$(document).ready(function(){
    let js = localStorage.getItem("disclaimar-popup");
    if (js=="false"){
        let clonePopUpDiv = $("#gpoc-disclimar-pop-up").children().clone();
        $("#pageContent").after(clonePopUpDiv);       
    }     
});

$(document).on("click", "#top-title-1, #top-title-2, #top-title-3, #top-title-4, #top-title-5, #top-title-6, #top-title-7, #marketo-form-modal, #table-popup-1, #table-popup-2", function(){
    let buttonId = $(this).attr('id');
    let $modalId = $('#' + buttonId + '-modal');
    let titleTxt = $modalId.find('.generic-modal__text h3').text();
    $modalId.find('.modal-header p').remove();
    $modalId.find('.modal-header').append('<p>' + titleTxt + '</p>');
});

function readMoreTextHeight($this) {
    let textHeight = $this.height();
    if(!$this.find('> p').is(":first-child")) {
        let headingHeight = $this.children(":first").height();
        let headingMargin = parseInt($this.children(":first").css('marginBottom'));
        $this.height(textHeight + headingHeight + headingMargin);
    }
}

setTimeout(function() {
    $('.a-short[data-js-component="text"]').each(function() {
        let $this = $(this);   
        readMoreTextHeight($this); 
    });    
}, 400);

$(document).on('click', '.a-read--more-less', function() {
    let $this = $(this).closest('.text').find('.a-short');
    setTimeout(function() {
        if($this.attr('aria-expanded') === "false") {
            readMoreTextHeight($this);
        }
    }, 200); 
});

$(document).ready(function(){
    setTimeout(function() { 
            if($("[data-search-type='articlesearch'] .a-card-result").length > 0){
            $("[data-search-type='articlesearch'] .o-search-res__no-results").css("display", "none");
        }
    }, 1300);
    $("[data-search-type='articlesearch'] .search-facet-container").removeAttr('hidden');
});

$(document).on('click', '#open-productdocument a', function() {
    let checkAccordion = $('#product-documents').find(".m-accordion__icon-wrapper").attr("aria-expanded");
    if(checkAccordion != 'true') {
        $('#product-documents .m-accordion__header').trigger('click');
        setTimeout(function() {
            $('html, body').animate({
                scrollTop: $("#section-helpfuldocuments").offset().top - 200,
            }, 300);        
        }, 100);    
    } else {
        setTimeout(function() {
            $('html, body').animate({
                scrollTop: $("#section-helpfuldocuments").offset().top - 200,
            }, 300);        
        }, 100);
    }
});

$(document).ready(function(){
    if ($('.apoc-tags[data-value="apoc"]').length > 0) { 
      $('#product-codes').find(".text").removeClass("text_table_no_border").addClass('with-border');
      $('#product-codes').find(".m-table-component .m-table-component__table").addClass('with-border');
      } else {
      $("#product-codes").find(".text").removeClass("with-border");
      $('#product-codes').find(".m-table-component .m-table-component__table").removeClass('with-border');
      }
  });
let currCountryCode = document.querySelector('[name="x-country-code"]').value;
$('body').delegate('.gpoc-disclimar-continue', 'click', function() {
    let siteDiscEntry = 'gpoc-site' + currCountryCode;
    setTimeout(function() {
        localStorage.removeItem(siteDiscEntry);
    }, 500);
 
    let expiryDays;
    let pathName;
    if (currCountryCode == 'IN') {
        expiryDays = 1;
        pathName = "/in/en";
    }
    if (currCountryCode == 'FR') {
        expiryDays = 90;
        pathName = "/fr/fr";
    }
    if (currCountryCode == 'JP') {
        expiryDays = 30;
        pathName = "/jp/ja";
    }
    if (currCountryCode == 'AU') {
        expiryDays = 7;
        pathName = "/au/en";
    }
    if (currCountryCode == 'MY') {
        expiryDays = 60;
        pathName = "/my/en";
    }
    if (expiryDays != undefined) {
        setCookieTime('entryPopupShown', true, expiryDays, pathName);
    }
});
 
function setCookieTime(name, value, days, pathname) {
   let expires = "";
   if (days) {
       let date = new Date();
       date.setTime(date.getTime() + (days*24*60*60*1000));
       expires = "; expires=" + date.toUTCString();
   }
    document.cookie = name + "=" + (value || "")  + expires + "; path=" + pathname;
}
 
if ((currCountryCode == "IN" || currCountryCode == "FR" || currCountryCode == "JP" || currCountryCode == "AU" || currCountryCode == "MY") && getCookie('entryPopupShown') == 'true') {
    document.querySelector('.gpoc-disclaimar-overlay').classList.add('hide');
}
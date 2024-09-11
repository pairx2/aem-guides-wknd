let xApplicationId, xCountryCode, xPreferredLanguage, wcmmodeOff;
function global_Reduce(){
	if(window.location.href.indexOf("/uk/en/") > -1 && $('.o-dynamic-card-list article').length) {
		setTimeout(function () {
			let relatedArticleHref = [];
			$('.o-dynamic-card-list article').each(function() {
				relatedArticleHref.push($(this).find('.a-chips--link').attr("href"));
			});
			if (relatedArticleHref) {
				$('.o-dynamic-card-list article').each(function(index, value) {
					$(this).wrap(`<a class="related-article-anchor" href=${relatedArticleHref[index]}></a>`);
				});
			}
		}, 500);
	}
}

function global_text(){
	$(".text").each(function(){
		$(this).find("a").each(function(){
			if(($(this).attr("href") == "#section1") && $(this).closest(".cmp-container").find(".m-hero").length) {
				$("html, body").animate({ scrollTop: document.body.scrollHeight }, "slow");
				$("html, body").animate({ scrollTop: 0 }, "slow");
			}
		});
	});	
}

function global_File(){	
	$(".download a").each(function(){
		let aHref = $(this).attr("href");
		if(aHref.substring(aHref.lastIndexOf(".")+1,aHref.length).toLowerCase() == "pdf") {
			$(this).attr("target","_blank");
		}			
	});	
}

function global_data(){
	let windowWidth = $(window).width();
	$("a").on('click',function(e) {
			if($(this).attr("href").indexOf("#") === 0 && $('[data-sticky="true"]').length && $($(this).attr("href")).length) {
				e.preventDefault();
				let secondaryNavHeight = 0;
				if($(".o-header__secondary-top-nav").length && $(".o-header__secondary-top-nav").height() > 0) {
					secondaryNavHeight = 100;
				}
				if(windowWidth > 767 && windowWidth < 993) {
					secondaryNavHeight = 75;
				}
				$('html, body').animate({
					'scrollTop' : $($(this).attr("href")).offset().top - $('[data-sticky="true"]').height() - secondaryNavHeight
				},"slow");
			}
		});
}

$(document).ready(function () {
		
    xApplicationId = $('input[name="x-application-id"]')?.val();
    xCountryCode = $('input[name="x-country-code"]')?.val();
    xPreferredLanguage = $('input[name="x-preferred-language"]')?.val();

    wcmmodeOff = $('#wcmMode')?.val() == 'true' ? false : true;
	if($(".download").length) {
		global_File();
	}
	global_Reduce();
	if(window.location.pathname.indexOf("/th/th/") > -1 && window.location.pathname.indexOf("login.html") > -1 && document.referrer.indexOf("/secure/") > -1) {
		sessionStorage.setItem('documentReferrer',document.referrer);
	}
	if($("#textSection").length) {
		global_text();
				
		global_data();
	}
});
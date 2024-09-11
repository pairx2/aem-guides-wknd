function sidepanelStylingfirstchild(){
    let firstChild = $("#sidePanel .a-link:first-child").find(".a-link__text").attr('href');
    if(firstChild == '#'){
        $("#sidePanel .a-link:first-child").css("background-color","#eee");
        $("#sidePanel .a-link:first-child").find(".a-link__text").css("color","#002a3a");
    }
}

function sidePanel_Reduce(allLinks){
    $(allLinks).each(function(){
        const desktopMediaQuery = window.matchMedia('(min-width: 662px)')
        if(desktopMediaQuery.matches){
            let length = $(this).find(".a-link__text").text().length;
                if(length>15) {
                    $(this).css({"padding-top":"23px","padding-bottom":"23px"});
                }
     
            else{
                    $(this).css({"padding-top":"32px","padding-bottom":"32px"});
            }
                }

                let href = $(this).find('.a-link__text').attr('href');
                let profileMenuText = $("#profile-menu-mobile").val() ? $("#profile-menu-mobile").val() : "PROFILE";
                if(href == '#'){
                    $(this).css("border-left" , "8px solid #009cde");
                    $(this).find('.a-link__text').css("color","#009cde");
             
                    const mobileMediaQuery = window.matchMedia('(max-width: 662px)')
                    if(mobileMediaQuery.matches){
                        if(isCountryCodeUK()) {
                            $(this).attr("onClick","window.location.reload();return false;");
                            $("#sidePanel").find(".m-link-stack--content").prepend((`<li class="a-link"><a class="a-link__text">${profileMenuText}</a></li>`));
                        } else {
                            $(this).css({"border-left" : "2px solid #009cde","padding-top":"18px","padding-bottom":"18px"});
                            $(this).find('.a-link__text').css("color","#002a3a");
                            let currentPageName = $(this).find('.a-link__text');
                            let currentPageNameText = currentPageName.text();
                            let firstChildName = $("#sidePanel .a-link:first-child").find(".a-link__text");
                            let firstChildNameText = firstChildName.text();
             
                            $(firstChildName).text(currentPageNameText);
                            $(currentPageName).text(firstChildNameText);
                            let childPageURL = currentPageName.attr("href");
                            let firstPageURL = firstChildName.attr("href");
                            $(firstChildName).attr("href",childPageURL);
                             $(currentPageName).attr("href",firstPageURL);
                        }
             
                    }
                }
                let mobileMediaQuery1 = window.matchMedia('(max-width: 662px)')
                if(mobileMediaQuery1.matches){
             
                    $(this).find(".a-link__text").click(function (){
                        $(this).parent().css("background-color","#009cde");
                        $(this).css("color","white");    
                        
                        sidepanelStylingfirstchild();
                    });
                }

    });
    
}
 
$(document).ready(function() {
    if($("#profileoverview").length > 0 && isCountryCodeUK()) {
        $(window).on('scroll', function() {
          trackScrollSidePanel();
        });
    }
 
   
    $('html, body').animate({ scrollTop: 0 }, 'fast');
   
        let allLinks = $("#sidePanel").find(".m-link-stack--content li");
        sidePanel_Reduce(allLinks);

        $("#sidePanel .a-link:first-child,.abt-icon-down-arrow").click(function () {
                   let childSidePanel = $("#sidePanel").find(".m-link-stack--content").children();
                if(childSidePanel != null && childSidePanel!= undefined ) {
                    $("#sidePanel").find(".abt-icon-down-arrow").toggleClass("abt-icon-up-arrow");
                    childSidePanel.toggleClass("showListItems");
                    const mobileMediaQuery2 = window.matchMedia('(max-width: 662px)')
                            if ((mobileMediaQuery2.matches) && (childSidePanel.hasClass("showListItems"))) {
                                $('#columndashboard #overviewTitle').css("top","-506px");
                                $('#columndashboard #consent-title').css("top","-36.5rem");         // SB HCP - profile consent title position
                            }
                           else{
                                 $('#columndashboard #overviewTitle').css("top","-164px");
                                 $('#columndashboard #consent-title').css("top","-10rem");      // SB HCP - profile consent title position
                           }
                }
 
        });
 
 
    function trackScrollSidePanel() {
        let navbar = $('#columndashboard').find('.columncontrol__column:first');
 
        if (window.scrollY >= 100) {
            navbar.addClass('stickySidePanelMobile');
            $('#sidePanel li').css('margin-left', '0');
        } else {
            navbar.removeClass('stickySidePanelMobile');
            $('#sidePanel li').css('margin-left', '2%');
        }
    }
});
let pageDomain = window.location.host;
let safeList = new Array(pageDomain,'localhost','abbott.com','abbottcareers.com','abbottnutrition.com','global.abbottnutrition.com','abbottstore.com','abbottnutritionlearningcenter.com','addthis.com','abbottnutritionhealthinstitute.org','anhi.org','bodyforlife.com','diabetescontrolforlife.com','e-abbott.com','eas.com','easacademy.org','elecare.com','e-mediaroom.com','ensure.com','feedthe485.com','glucerna.com','glucerna.ca','glucerna.net.cn','glucerna.com.hk','glucerna.com.mx','glucerna-nutrition.ru','check3.com.sg','glucerna.com.tw','images.abbottnutrition.com','juven.com','kidneysource.com','mysensiva.com','mibebesimilac.com','neosure.com','nepro.com','nightnursenation.com','nutripals.com','pedialyte.com','pediasure.com','pediasureenteral.com','prosure.ws','residentlearningcenter.com','rosslogistics.com','rpdmail.com','rpdsurveys.com','sellingcataglog.rosspediatrics.com','similac.com','similacsimplepac.com','simplepac.com','survanta.com','strongmoms.com','webnova.abbottnutrition.com','welcomeaddition.com','zoneperfect.com','zpmusictoyourmouth.com','es.glucerna.com','abbottfund.com','abbott.vo.llnwd.net','store.zoneperfect.com','similacsimplysmart.com','feedingexpert.com','static-nocdn.abbottnutrition.com','m.abbottnutrition.com','static.abbottnutrition.com','malnutrition.com','adultnutritionlearningcenter.com','anhi-program.abbottnutrition.com','abbottnutrition.advanceu.com','shmconsults.com','malnutrition.andjrnl.org','malnutrition.npjournal.org','es.similac.com','es.pedialyte.com','m.similac.com','twitter.com','facebook.com','youtube.com','sweepstakes.similac.com','sweepstakes-stage.similac.com','similac.co.il','similac.ca','similac.com.tr','abbottmama.com.cn','abbottmama.com.do','abbottmama.com.hk','abbottmama.co.id','abbottnutrition.com.my','abbottmama.com.mx','abbottmama.ru','abbott.com.sa','abbottfamily.com.sg','www.abbottmama.com.tw','abbott.co.th','iqbaby.com.vn','glucerna123challenge.com', 'teamrewards.eas.com','external-abbott-iis.idea-point.com');

$.extend($.expr[':'], {
    external: function(a, i, m) {
        if (!a.href) { return false; }
        if (a.hostname && a.hostname != window.location.hostname) {

            let fixedHostname = a.hostname.toLowerCase().replace('qa.', '').replace('stage.', '').replace('www.', '');
            
            if (jQuery.inArray(fixedHostname, safeList) >= 0) {
                return false;
            }
            if (fixedHostname.includes('javascript') > 0 || fixedHostname.includes('(') > 0) {
                return false;
            }
            
            if (a.hostname.substr(0, a.hostname.indexOf(':')) == window.location.hostname) {
                return false;
            }
            else if(a.hostname.substr(0, a.hostname.indexOf(':')) != window.location.hostname) {                
                return true;
            }
        }
        else return false;
    }
});

$(document).ready(function() {
    $("#site-entering-popup-content .m-popup-content .logo.link.button").append('<div class="popup-close"></div>');

	if($("#site-entering-popup-content").find('.m-popup-content .cmp-container').length){
        if(localStorage.getItem("popup") != "true"){
		$("#site-entering-popup-content").show();
        $('body, html').css('overflow-y','hidden');
		$('body').addClass('modal-open');
        }
	}
	
    $("#site-entering-popup-content .m-popup-content .logo.link.button .popup-close").click(function() {
        $(this).parents("#site-entering-popup-content").hide();
        $('body, html').css('overflow-y','auto');
        $('body').removeClass('modal-open');

    });
    $("#site-entering-popup-content .m-popup-content .button.link a.btn").click(function() {
		localStorage.setItem("popup","true");
        $(this).parents("#site-entering-popup-content").hide();
        $('body, html').css('overflow-y','auto');
        $('body').removeClass('modal-open'); 

    });
    $('a:external').attr('target', '_blank').click(function(e) {
        e.preventDefault();        
        $('body, html').css('overflow-y','hidden');
        $('#site-leaving-popup-content').css('display','block');
        $('body').addClass('modal-open');
        let url = $(this).attr("href");
        $("#site-leaving-popup-content .m-popup-content .button.link div[data-btn-type='continue'] a.btn").attr("href", url);
    })
	
    $("#site-leaving-popup-content .m-popup-content .button.link div[aria-label='Close'] a.btn").click(function(e) {
        e.preventDefault();
        $(this).parents("#site-leaving-popup-content").hide();
        $('body, html').css('overflow-y','auto');
        $('body').removeClass('modal-open');

    });
    $("#site-leaving-popup-content .m-popup-content .button.link div[data-btn-type='continue'] a.btn").click(function(){
            $("#site-leaving-popup-content").hide();
            $('body, html').css('overflow-y','auto');
            $('body').removeClass('modal-open');		
    });
});
/**
 * Site Custom Js
 **/

 $(document).ready(function () {
    const siteSectionFragment = $('#site-section-popup-content');

    // Check if site section disclaimer popup is authored for custom popup
    if(siteSectionFragment.length > 0){
        siteSectionFragment.css('display','block'); 

        const modalMarkup = '<div class="modal generic-modal" role="dialog" id="btnModalCustomSiteEnteringPopup-modal" data-js-component="pop-up">'+
        '<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">'+
        '<div class="modal-content generic-modal__content">'+
        '<div class="modal-header generic-modal__header">'+
        '<span class="generic-modal--close" data-dismiss="modal" aria-label="Close">'+
        '<i aria-hidden="true" class="abt-icon abt-icon-cancel"></i></span></div>'+
        '<div id="customModalContent" class="modal-body generic-modal__content-body"></div>'+
        '<div class="modal-footer generic-modal__content-footer"></div></div></div></div>'+
        '<div id="custom-modal-button" class="m-popup" data-toggle="modal" data-target="#btnModalCustomSiteEnteringPopup-modal">'+
            '<a id="btnModalCustomSiteEnteringPopup" class="btn"></a>'+
        '</div>';
        $('body').append(modalMarkup);
        $('#customModalContent').append(siteSectionFragment);
    }
    /**Custom Site entering popup - Start**/
    let customSiteEnteringBtn = document.querySelector('#redirect-buttons [id*=btnModalCustomSiteEntering]');
    if(!customSiteEnteringBtn){
        customSiteEnteringBtn = document.querySelector('#custom-modal-button [id*=btnModalCustomSiteEntering]');
    }
    const getSiteEnterinPagePath = getItemSessionStorage('siteEntering', true);
    const isSiteEnteringSession = getSiteEnterinPagePath && getSiteEnterinPagePath !== '' ? true : false;

    if(window.location.pathname.indexOf('home.html') > -1 && isSiteEnteringSession && getSiteEnterinPagePath !== '' && getSiteEnterinPagePath !== 'null' && (window.location.pathname !== getSiteEnterinPagePath)) {
        window.location.href = window.location.origin + getSiteEnterinPagePath;
    }

    window.addEventListener('load', function() {
        let getBtnId;

        if(!!customSiteEnteringBtn && !isSiteEnteringSession && isOnPublish()) {
            setTimeout(function () {
                //get id
                getBtnId = customSiteEnteringBtn.getAttribute('id');
                //show modal
                showhideModal(getBtnId, 1);
            }, 1000);
        }

        /*Set session on click of popup button*/
        $('[id*=btnModalCustomSiteEntering] .o-promo__btn .btn').on('click', function(e){
            e.preventDefault();
            let linkPath = $(this).attr('href');
            if (linkPath !== undefined && linkPath !== '') {
                setItemSessionStorage('siteEntering',linkPath,true);
                if(window.location.pathname.indexOf(linkPath) <= -1) {
                    window.location.href = window.location.origin + linkPath;
                } else {
                    //get id
                    getBtnId = customSiteEnteringBtn.getAttribute('id');
                    //hide modal
                    showhideModal(getBtnId, 0);
                }
            }
        });
    });
    
    /**Custom Site entering popup - End**/        
    
 });

 /* Handle backdrop if two popup are visible at a time */
 $(document).on('click','#siteEnteringPopupFragmentPath .generic-modal--close', function(){
    if($('[id*=btnModalCustomSiteEntering]').is(':visible')){
        $('.modal-backdrop:first').show();
        $('body').addClass('modal-open');
    }
})
$(document).on('blur','#siteEnteringPopupFragmentPath', function(){
    if($('[id*=btnModalCustomSiteEntering]').is(':visible')){
        $('body').addClass('modal-open');
    }
})
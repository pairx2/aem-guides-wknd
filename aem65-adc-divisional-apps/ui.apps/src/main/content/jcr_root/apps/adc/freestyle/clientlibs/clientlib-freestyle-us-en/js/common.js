$(function () {
    if ($('.tab-pane').length > 0) {
        $('.nav-tabs > li > a').click(function () {
            let tabPanes = $('.tab-pane');
            tabPanes.each(function () {
                $(tabPanes).css({
                    position: "absolute",
                    display: "block",
                    visibility: "hidden"
                });
                let mCard = $(tabPanes).find('.m-card');
                let maxHeight = 0;
                mCard.each(function () {
                    $(this).css('height', 'auto');
                    let mCardHeight = $(this).height();
                    maxHeight = Math.max(mCardHeight, mCardHeight);
                });
                mCard.css('height', maxHeight);
                $(tabPanes).css({
                    position: "",
                    display: "",
                    visibility: ""
                });
            });
        })
    }
    $(window).resize(function () {
        let dataColumns = $('.o-products-compare-data-col');
        dataColumns.each(function () {
            let columnHeight = $(this).find('td').outerHeight();
            $(this).find('th').attr('height', columnHeight);
        });
    });

    function addRemoveSocialText() {
        const fbShareLabel = $("#fbshare").val();
        const twShareLabel = $("#twshare").val();

        function addSocialText() {
            if ($(".user-full-story #atstbx .at-share-btn-elements").length < 1) return;
            $(".user-full-story #atstbx .at-share-btn-elements").prepend("<span class='social-custom-icon'><b>" + fbShareLabel + "</b></span>");
            $(".user-full-story #atstbx .at-share-btn-elements a").first().after("<span class='social-custom-icon twitter-social-text'><b>" + twShareLabel + "</b></span>");
            clearInterval(checkSocialMediaText);
        }

        let checkSocialMediaText = setInterval(addSocialText, 1500);
    }

    addRemoveSocialText();

    const campaningId = () => {
        let urlCampaign = window.location.href;
        let campaign = urlCampaign.includes("?") ? urlCampaign.split("?")[1]: "false";
        return campaign;
    }

    $(document).ready(function () {
        $('.page .form-container label, .page .form-container label > span').contents().filter(function () {
            return this.nodeValue && /sup|span|sub/.test(this.nodeValue) && this.nodeType === 3;
        }).replaceWith(function () {
            return this.nodeValue;
        });

        let urlId = window.location.hash;
        scrollToSection(urlId);

        $(window).on('hashchange', function () {
            let id = window.location.hash;
            scrollToSection(id);
        });

        function scrollToSection(id) {
            let target = $(id);
            if (target.length > 0) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 200
                }, 1000);
            }
        }

        // UTM Start Param 
        const campaign = campaningId();
        if (campaign && campaign.valueOf() != "false") {
            sessionStorage.campaignParameters = campaign;
        }
        sessionStorage.getItem('campaignParameters') && appendUtmPAra(sessionStorage.getItem('campaignParameters'));     

    });
    const appendUtmPAra = (utm) => {
        history.pushState({}, null, "?" + utm);
    }

});
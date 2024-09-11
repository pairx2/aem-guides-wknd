$(document).ready(function() {
    $('body').on('add-customerportal:login', function () {
        $('.m-signup').remove();
        
        let account = $("#myAccountDropdown");
        account.find('a').removeAttr('target'); // remove target _blank from dropdown
        let profile = window.getLocalStorage('profile');
        let name = profile.firstName + " " + profile.lastName;
        const escapedText = $('<div/>').text(name).html();
        let mobileAccount = account.clone();
        mobileAccount.attr('id', 'myAccountMobileDropdown');
        const linkStack = account.find(".m-link-stack__link a");
        linkStack.html("<em class=\"abt-icon abt-icon-avatar\" aria-hidden=\"true\"></em>"+escapedText);
        
        const mobileLinkStack = mobileAccount.find(".m-link-stack__link a");
        mobileLinkStack.html("<em class=\"abt-icon abt-icon-down-arrow\" aria-hidden=\"true\"></em>"+escapedText);
        
        account.appendTo('.a-link--icon-left');
        mobileAccount.appendTo('.m-mega-menu__mobile-item-wrappe');

        $('#myAccountDropdown .m-link-stack__link a').click(function(e) {
            e.preventDefault();
            $('#myAccountDropdown .js-collapsable-links-dropdown').toggleClass('d-none');
            $('#dropdown_labProfile-options').find(".a-dropdown__field").removeClass('active')
            return false;
        });

        $('#dropdown_labProfile-options .a-dropdown__field').click(function(e){
            e.preventDefault();
            $('#myAccountDropdown .js-collapsable-links-dropdown').addClass('d-none');
        })

        $('[id*="languagenavigation"] .m-link-stack__link').click(function(e){
            e.preventDefault();
            $('.country-dropdown .m-link-stack__dropdown-wrapper.js-collapsable-links-dropdown').addClass('d-none');
            $('.country-dropdown .abt-icon.abt-icon-down-arrow').removeClass("rotate-upside")
        })
        
        $('.country-dropdown .m-link-stack__link').click(function(e){
            e.preventDefault();
            $('[id*="languagenavigation"] .m-link-stack__dropdown-wrapper').addClass('d-none');
        })

        $('#myAccountMobileDropdown .m-link-stack__link a').click(function(e) {
            e.preventDefault();
            $('#myAccountMobileDropdown .js-collapsable-links-dropdown').toggleClass('d-none');
            return false;
        });
    });
});
if(typeof typeof Granite === 'undefined' ||  typeof Granite.author === 'undefined'){
    
    var loginSignUpTrigger = document.querySelector('.o-header__utility-nav #loginSignUpTrigger');
    var mobLoginSignUpTrigger = document.querySelector('.o-header__mob-options #loginSignUpTrigger');
    var auntenticationLinkCont = document.querySelector('.o-header__secondary-top-nav .o-header__utility-nav .m-link-stack--dropdown');
    var mobMyAccountWrap = document.querySelector('.o-header__mega-menu .linkstack').closest('.m-mega-menu__mobile-item-wrapper');
    var logOutTrigger = document.querySelector('.o-header__user-activity .m-link-stack--dropdown .m-link-stack__list-item:last-child');
    var mobLogoutTrigger = document.querySelector('.o-header__mega-menu .navbar .linkstack .m-link-stack--dropdown .m-link-stack__list-item:last-child');
    var myEventsMegaMenu = document.querySelector('#myEventsMenu').closest('.m-mega-menu__mobile-item-wrapper');    

    function headerAuthenticationCheck() {

        var isValidLogin = UserLoginValidCheck();

        if(isValidLogin) {
            auntenticationLinkCont.style.display = 'flex';
            mobMyAccountWrap.classList.add('mob-my-account-wrap-show');
            myEventsMegaMenu.classList.add('show-auth-link');
            myEventsMegaMenu.classList.remove('hide-auth-link');            
            loginSignUpTrigger.style.display = 'none';
            mobLoginSignUpTrigger.style.display = 'none';
        }
        else {
            auntenticationLinkCont.style.display = 'none';
            mobMyAccountWrap.classList.remove('mob-my-account-wrap-show');
            mobMyAccountWrap.classList.add('mob-my-account-wrap-hide');
            myEventsMegaMenu.classList.add('hide-auth-link');
            loginSignUpTrigger.style.display = 'flex';
            mobLoginSignUpTrigger.style.display = 'inline-block';
        }
        
    }

    logOutTrigger.addEventListener('click', function(e) {
        UserLogout();
        headerAuthenticationCheck();
        e.target.parentNode.style.width = 'auto';
        e.target.parentNode.style.display = 'inline-block';
        e.target.parentNode.insertAdjacentHTML('afterend', '<div class="logout-loader"><div class="abt-icon abt-icon-spinner"></div></div>');
    });

    mobLogoutTrigger.addEventListener('click', function(e) {
        UserLogout();
        headerAuthenticationCheck();
        e.target.parentNode.style.width = 'auto';
        e.target.parentNode.style.display = 'inline-block';
        e.target.parentNode.insertAdjacentHTML('afterend', '<div class="logout-loader"><div class="abt-icon abt-icon-spinner"></div></div>');
    });

    // Shanon my events page redirection
    myEventsMegaMenu.addEventListener('click', function(event) {
        myEventsMegaMenu.querySelector('.m-popup').removeAttribute('data-target');
        var myEventsUrlPath = document.querySelector('input[name="shanon-my-events-url-bind"]').value;
        sessionStorage.setItem('EventsShanonRedirectLink', myEventsUrlPath);
        EventsShanonRedirectionForm();
    });
   
    function headerCustomization() {
        if(document.querySelector('.o-header__utility-nav')) {
            document.querySelector('.o-header__utility-nav').querySelector('.m-link-stack__dropdown-wrapper').querySelectorAll('.m-link-stack__list-item').forEach(function(htmlDOM) { 
                htmlDOM.querySelector('.a-link__text').setAttribute('target','_self') 
            });

            document.querySelector('.o-header__mega-menu').querySelector('.m-link-stack__dropdown-wrapper').querySelectorAll('.m-link-stack__list-item').forEach(function(htmlDOM) { 
                htmlDOM.querySelector('.a-link__text').setAttribute('target','_self') 
            });
        }
    }

    $(document).ready(function () {
        headerAuthenticationCheck();
        headerCustomization();   
    });
}
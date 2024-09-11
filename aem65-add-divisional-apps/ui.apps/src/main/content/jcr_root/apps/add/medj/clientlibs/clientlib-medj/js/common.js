// function to remove unnecessary DOM that render by Abbott Platform code
function RemoveDOM(selector) {
    document.querySelectorAll(selector).forEach(function (htmlDOM) {
        htmlDOM.remove();
    });
}

// Subdomain check function
function isSubdomain() {
    var url = location.hostname.split('.');
    var subdomain = url.shift();
    var subDomainList = ['www', 'f7aya7rugada'];
    return (subdomain && subDomainList.indexOf(subdomain) < 0) ? true : false;
}

// Public pages not accessible after login
function publicPageRedirectInLogin(contentDOM, redirectPath) {
    if (UserLoginValidCheck()) {
        var contentDOMWrap = document.querySelector(contentDOM);
        if (contentDOMWrap) {
            contentDOMWrap.style.display = 'none';

            var currentUrl = location.pathname.split('/');

            if (currentUrl.indexOf('content') > -1) {
                var homeIndex = currentUrl.indexOf('home');
                if (homeIndex > -1) {
                    var hostPath = currentUrl.slice(0, homeIndex);
                }
                hostPath = hostPath && hostPath.join('/');
                location.pathname = hostPath + redirectPath;
            }
            else {
                location.pathname = redirectPath;
            }
        }
    }
}
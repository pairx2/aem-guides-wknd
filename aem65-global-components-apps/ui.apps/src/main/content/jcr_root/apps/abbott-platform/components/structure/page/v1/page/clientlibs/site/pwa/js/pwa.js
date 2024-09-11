(function (document) {
    "use strict";
    let isMobileDevice = false;
    if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {// true for mobile device
        isMobileDevice = true;
    }
    // Check that service workers are supported
    if (!("serviceWorker" in navigator)) {
        return;
    }

    if (!isMobileDevice) {
        return;
    }

    const pwaSynButtonID = "pwaSyncNowButton";
    const params = new URLSearchParams(window.location.search);
    if (params.has('pwa') && params.get('pwa') == "activate") {
        localStorage.setItem('pwa-activate', true);
    }
    if (!(navigator.onLine && isMobileDevice)) {
        hidePwaSyncNowButton();
        $('.a-search').addClass('d-none');
    }

    let newServiceWorker = null;
    const SW_PATH = "cq:sw_path";
    let toastMessage = document.getElementsByClassName("cmp-page__toastmessagehide")[0];
    const pwaSyncNowEnabled = document.querySelector('[name="pwaSyncNowEnabled"]');
    if (pwaSyncNowEnabled) {
        localStorage.setItem("pwaSyncNowEnabled", "true");
    }

    const pwaSyncNowButton = document.getElementById(pwaSynButtonID);
    const pwaMetaData = document.getElementsByName(SW_PATH)[0];
    if (!pwaMetaData) {
        return;
    }
    let serviceWorker = pwaMetaData.getAttribute("content");
    let refreshing = false;
    toastMessage.innerText = "";
    toastMessage.className = "cmp-page__toastmessagehide";

    $(document).ready(function () {
        if (pwaSyncNowButton) {
            updateSyncButtonCss();
        }
        if (isOnPublish()) {
            $('#pwaConfirmationPopupButton').hide();
        }

        if (localStorage.getItem('pwaUserConsent') == null || localStorage.getItem('pwaUserConsent') !== "1" || (localStorage.getItem('cfPathUserConsent') == null) || (localStorage.getItem('pwaSyncNowEnabled') == null)) {
            hidePwaSyncNowButton();
        }

        $('#toastmessage').html(function (index, html) {
            if (localStorage.getItem('pwa-activate') == 'true') {
                $('#toastmessage').hide();
            } else {
                let chromeImg = $('#chromeImg').val();
                return html.replace(/{{chromeIcon}}/, '<i class="' + chromeImg + '" id="chrome_icon"></i>');
            }
        });

        $('#toastmessage').html(function (index, html) {
            if (localStorage.getItem('pwa-activate') == 'true') {
                $('#toastmessage').hide();
            } else {
                let safariImg = $('#safariImg').val();
                return html.replace(/{{safariIcon}}/, '<i class="' + safariImg + '" id="safari_icon"></i>');
            }
        });


        if (params.has('pwa') && params.get('pwa') == "activate" && (navigator.onLine)) {
            let start_url = $('input[name="pwaStartURL"]').val();
            let pwaConfirmationPopupButton = $(document).find('#pwaConfirmationPopupButton');
            if (pwaConfirmationPopupButton && pwaConfirmationPopupButton.length > 0 && localStorage.getItem('pwaUserConsent') == null && isOnPublish()) {
                setTimeout(function () {
                    $('#pwaConfirmationPopupButton').parent('.m-popup').trigger('click');
                    $('body').on('click', '#pwaConfirmationPopupButton-modal .a-button--primary .btn', function (event) {
                        let contFragPath = $('#pwa_download-content').attr('href');
                        console.log('Content downloading started.');
                        sendMessage(
                            {
                                "starturl": start_url,
                                "action": "",
                                "message": "downloadPWA",
                                "servleturlpath": "/bin/pwa/cfreader",
                                "cfpath": contFragPath,
                            },
                        );
                        localStorage.setItem("pwaUserConsent", "1");
                        localStorage.setItem("cfPathUserConsent", contFragPath);
                        $('[data-js-component="pop-up"].show .generic-modal--close')[0].click();
                        event.preventDefault();
                        setTimeout(function () {
                            toastMessage.className = "cmp-page__toastmessagehide";
                        }, 20000);
                    });
                    //close up pop up while cancel button
                    $('body').on('click', 'div[data-dismiss="modal"]', function () {
                        localStorage.setItem("pwaUserConsent", "0");
                    });
                    //close up pop up while X icon
                    $('body').on('click', $('[data-js-component="pop-up"].show .generic-modal--close')[0], function () {
                        if (localStorage.getItem("pwaUserConsent") == null) {
                            localStorage.setItem("pwaUserConsent", "0");
                        }
                    });
                }, 1000);
            }
        }
    });


    toastMessage.addEventListener("click", function () {
        if (localStorage.getItem('pwaUserConsent') == "1" && isOnPublish()) {
            let cfPathUserConsent = localStorage.getItem('cfPathUserConsent');
            if (cfPathUserConsent == null || cfPathUserConsent == "")
                return;
            sendMessage(
                {
                    "starturl": "",
                    "action": "",
                    "message": "downloadPWA",
                    "servleturlpath": "/bin/pwa/cfreader",
                    "cfpath": cfPathUserConsent
                },
            );
            setTimeout(function () {
                toastMessage.className = "cmp-page__toastmessagehide";
            }, 20000);
        }

    });


    if (pwaSyncNowButton) {
        pwaSyncNowButton.addEventListener("click", function () {
            console.log('pwaSyncNowButton event from service worker');

            if (!navigator.onLine) {
                console.log('Navigator Sync button Offline event');
                $("#toastmessage").html($("#offline").html());
                $("#toastmessage").removeClass("greenBg");
                $("#toastmessage").removeClass("dangerBg");
                $("#toastmessage").addClass("warnBg");
                commonMsgController();
                return;
            }

            //If PWA consent is set to true
            if (localStorage.getItem('pwaUserConsent') == "1" && isOnPublish()) {
                let cfPathUserConsent = localStorage.getItem('cfPathUserConsent');
                if (cfPathUserConsent == null || cfPathUserConsent == "")
                    return;
                sendMessage(
                    {
                        "starturl": "",
                        "action": "",
                        "message": "downloadPWA",
                        "servleturlpath": "/bin/pwa/cfreader",
                        "cfpath": cfPathUserConsent,
                    },
                );
                setTimeout(function () {
                    toastMessage.className = "cmp-page__toastmessagehide";
                }, 20000);
            }
        });
    }


    function sendMessage(message) {
        return new Promise(function (resolve, reject) {
            const messageChannel = new MessageChannel();
            messageChannel.port1.onmessage = function (event) {
                // The response from the service worker is in event.data
                console.log('event from service worker ->' + event);
                if (event.data.error) {
                    reject(event.data.error);
                } else {
                    resolve(event.data);
                }
            };
            if (navigator.serviceWorker.controller != null)
                navigator.serviceWorker.controller.postMessage(message,
                    [messageChannel.port2]);
        });
    }


    function showUpdate() {
        if (!toastMessage) {
            return;
        }
        toastMessage.innerText = "A new version of this app is available. Click this message to reload.";
        if (window.CQ && window.CQ.I18n) {
            toastMessage.innerText = window.CQ.I18n.getMessage("A new version of this app is available. Click this message to reload.");
        }
        toastMessage.className = "cmp-page__toastmessageshow";

        // The click event on the pop up notification
        toastMessage.addEventListener("click", function () {
            newServiceWorker.postMessage({ action: "skipWaiting" });
        });
    }


    function onLoad() {
        navigator.serviceWorker.register(serviceWorker).then(function (registration) {
            registration.addEventListener("updatefound", function () {
                // An updated service worker is available
                newServiceWorker = registration.installing;
                newServiceWorker.addEventListener("statechange", function () {
                    // Has service worker state changed?
                    if ((newServiceWorker.state === "installed") && navigator.serviceWorker.controller) {
                        if (localStorage.getItem('pwaUserConsent') == "1" && isOnPublish()) {
                            let cfPathUserConsent = localStorage.getItem('cfPathUserConsent');
                            if (cfPathUserConsent != null || cfPathUserConsent != "")
                                showUpdate(); // There is a new service worker available, show the notification
                        }

                    }
                });
            });
        });

        navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);
    }


    function onControllerChange() {
        if (refreshing) {
            return;
        }

        refreshing = true;
    }


    //function to provide common messaging control
    function commonMsgController() {
        $("#toastmessage").className = "cmp-page__toastmessage";
        $("#toastmessage").show();
        $(".pwaalertmessage").show();
    }
    function showPwaSyncNowButton() {
        if ((localStorage.getItem('pwaUserConsent') == "1") && (localStorage.getItem('cfPathUserConsent') != null) && (localStorage.getItem('pwaSyncNowEnabled') != null)) {
            updateSyncButtonCss();
            $('#' + pwaSynButtonID).parent().parent().show();
        }
    }

    function hidePwaSyncNowButton() {
        $('#' + pwaSynButtonID).parent().parent().hide();
    }

    function updateSyncButtonCss() {
        $('#' + pwaSynButtonID + ' .a-link__inner-text').addClass(".megamenu #navbarCollapseWrapper .a-link__text .a-link__text--has-icon .abt-icon~.a-link__inner-text").removeClass("a-link__inner-text");
    }

    //download complete message to user once sync is done
    function downloadCompleteMessage() {
        showPwaSyncNowButton();
        $("#toastmessage").html($("#success").html());
        $("#toastmessage").removeClass("warnBg");
        $("#toastmessage").removeClass("dangerBg");
        $("#toastmessage").addClass("greenBg");
        commonMsgController();
    }


    //download failed message to user once sync is failed
    function downloadFailMessage() {
        showPwaSyncNowButton();
        $("#toastmessage").html($("#failed").html());
        $("#toastmessage").removeClass("warnBg");
        $("#toastmessage").removeClass("greenBg");
        $("#toastmessage").addClass("dangerBg");
        commonMsgController();
    }


    //receive message from child thread
    const channel = new BroadcastChannel('sw-messages');
        channel.addEventListener('message', event => {
            if (event.data === "downloadCompleted") {
                console.log('Content download completed.');
                downloadCompleteMessage();
            }
            if (event.data === "downloadFailed") {
                console.log('Content download failed.');
                downloadFailMessage();
            }
        });


    //show offline message to user 
    window.addEventListener('offline', () => {
        console.log('Window Sync button Offline event');
        hidePwaSyncNowButton();
        $('.a-search').addClass('d-none');
        $("#toastmessage").html($("#offline").html());
        $("#toastmessage").removeClass("greenBg");
        $("#toastmessage").removeClass("dangerBg");
        $("#toastmessage").addClass("warnBg");
        commonMsgController();
    });


    //show online message to user 
    window.addEventListener('online', () => {
        console.log('Window Sync button Online event');
        showPwaSyncNowButton();
        $('.a-search').removeClass('d-none');
        $("#toastmessage").html($("#online").html());
        $("#toastmessage").removeClass("warnBg");
        $("#toastmessage").removeClass("dangerBg");
        $("#toastmessage").addClass("greenBg");
        commonMsgController();

        window.location.reload();
    });


    // Use the window load event to keep the page load performant
    window.addEventListener("load", onLoad);

}(document));


//show browser message to user 
if (fnBrowserDetect() == "chrome") {
    $("#toastmessage").html($("#chrome").html());
}

if (fnBrowserDetect() == "safari") {
    $("#toastmessage").html($("#safari").html());
}


//show detect browser
function fnBrowserDetect() {
    let userAgent = navigator.userAgent;
    let browserName;
    if (userAgent.match(/chrome|chromium|crios/i)) {
        browserName = "chrome";
    } else if (userAgent.match(/firefox|fxios/i)) {
        browserName = "firefox";
    } else if (userAgent.match(/safari/i)) {
        browserName = "safari";
    } else if (userAgent.match(/opr\//i)) {
        browserName = "opera";
    } else if (userAgent.match(/edg/i)) {
        browserName = "edge";
    } else {
        browserName = "No browser detection";
    }
    return browserName;
}


$(document).on("click touchstart", '.closetoast', function () {
    $(".pwaalertmessage").hide();
});

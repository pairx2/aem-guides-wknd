import React from "react";
import swal from "sweetalert";
import moment from "moment";
import { sendFormData, getAvailableBaseURL } from "../common/api";
import "url-polyfill";

export default class LogoutPopup extends React.Component {
    constructor() {
        super();
        this.idleTimeoutHandle = null;
        this.counterHandle = null;
        this.autoSessionHandle = null;
        this.baseURL = getAvailableBaseURL();
        const pageConf = this.checkPageAndRedirect();
        const initialData = this.initialize();
        this.state = {
            ...initialData,
            ...pageConf
        }
    }

    componentWillUnmount() {
        this.idleTimeoutHandle && clearTimeout(this.idleTimeoutHandle);
        this.counterHandle && clearInterval(this.counterHandle);
        this.autoSessionHandle && clearInterval(this.autoSessionHandle);

    }

    checkPageAndRedirect = () => {
        const byID = document.getElementById.bind(document);
        const isLogin = this.checkIsLogin();
        const SP = byID("secured-page"),
            LRRP = byID("login-reg-redirect-page"),
            OLH = byID("on-login-hide"),
            SRP = byID("session-redirect-page");

        const LRRPurl = LRRP && LRRP.value && new URL(LRRP.value, this.baseURL) || "";
        const SRPurl = SRP && SRP.value && new URL(SRP.value, this.baseURL) || "";
        const isLoginHide = OLH && OLH.value && OLH.value === "true";
        const isSecurePage = SP && SP.value && SP.value === "true";

        if (isLogin) {
            if (isLoginHide && LRRPurl) {
                window.location = LRRPurl;
            }
        }
        else {
            if (isSecurePage && SRPurl) {
                window.location.replace(SRPurl);
            }
        }
        return {
            LRRPurl,
            SRPurl,
            isSecurePage,
            isLoginHide
        }
    }

    checkIsLogin = () => {
        return !!ABBOTT.cookie("x-id-token");
    }

    resetIdleTimeout = () => {
        this.idleTimeoutHandle && clearTimeout(this.idleTimeoutHandle);
        this.counterHandle && clearInterval(this.counterHandle);
        this.setIdleTime();
    }

    setAutoRenew = () => {
       
        const { autoRenewal } = this.state;
     
        this.autoSessionHandle = setInterval(() => {
            if (this.checkIsLogin()) {
               
                const { renewURL } = this.state;
                const token = ABBOTT.cookie("x-id-token");
                const config = { global: false, headers: { "x-id-token": token } };
                config["xhrFields"] = {
                    withCredentials: true
                };

                sendFormData(ABBOTT.getAemURL(renewURL), {}, config).then((data) => {
                
                }).catch(e => {
                    console.log(e);
                })
            }
        }, autoRenewal * 60 * 1000);
    
    }

    idleResetWatch = () => {
        window.jQuery(document).ajaxSend(() => {
            this.resetIdleTimeout();
        });
        
    }
  
    componentDidMount() {
        if (this.checkIsLogin()) {
            this.setIdleTime();
            this.setAutoRenew();
        }
    }

    logoutApiCall = () => {
        var cookieConfig = {
            path: '/',
            domain: 'similac.com',
            expires: -1
        };
        ABBOTT.removeCookie('x-id-token', cookieConfig);
        ABBOTT.removeCookie("profile", cookieConfig);
        ABBOTT.signOut();
    }
    extendApiCall = () => {
        if (this.checkIsLogin()) {
            this.setState(this.initialize(), () => {
                this.setIdleTime();
            });
            this.resetIdleTimeout();
        } else {
            ABBOTT.signOut();
        }

    }
    autoRenewApiCall = () => {
    }

    updateSeconds = () => {
      
        this.counterHandle = setInterval(() => {
            const time = this.displayTime();
            const {minutes,seconds} = this.timeConvet(time);
            jQuery(".session-second").html(seconds);
            jQuery(".session-minutes").html(minutes);
            if (time <= 0) {
                this.counterHandle && clearInterval(this.counterHandle);
                this.logoutApiCall();
            }
        }, 1000);
    }

    setIdleTime = () => {
        const { idleTimeout, logoutPopupDuration } = this.state;
        this.idleTimeoutHandle = setTimeout(() => {
            const { startTime } = this.state;
            if (!startTime) {
                const _startTime = new Date();
                const _endTime = moment(_startTime).add(logoutPopupDuration, "minutes");
                this.setState({ startTime: _startTime, endTime: _endTime }, () => {
                    this.showPopup();
                });
            }
        }, (idleTimeout - logoutPopupDuration) * 60 * 1000);
    }

    displayTime = () => {
        const { endTime } = this.state;
        if (!endTime) {
            return "";
        }
        const current = moment();
        return this.diffDate(endTime, current);

    }
    timeConvet = (sectime) =>{
        var minutes = Math.floor(sectime / 60);  
        var seconds = sectime % 60;
	    return {minutes,seconds}
    }

    diffDate = (now, end) => {
        var duration = now.diff(end);
        var time = Math.round(moment.duration(duration).asSeconds());
        return time;
    }

    initialize = () => {
        let {
            idleTimeout = "20",
            autoRenewal = "50",
            logoutPopupDuration = "2",
            logoutURL = "/api/private/profile/logout",
            renewURL = "/api/private/profile/extend-session",
            logoutPopupLabel: {
                heading: title = "Session auto expire notification",
                desc: content = "Session will auto expire in <b class=\"session-minutes\">1</b> minute(s) <b class=\"session-second\">30</b> second(s). Do you wish to extend the session?",
                confirm = "Extend",
                cancel = "Logout"
            } = {}
        } = window.jsonAppData || {};
        idleTimeout = +idleTimeout;
        autoRenewal = +autoRenewal;
        logoutPopupDuration = +logoutPopupDuration;

        const popup = {
            title,
            content,
            buttons: {
                cancel: {
                    text: cancel,
                    value: "logout",
                    visible: true,
                },
                confirm: {
                    text: confirm,
                    value: "extend",
                    visible: true,
                }
            }
        };

        const startTime = null;
        const endTime = null;

        return {
            startTime,
            endTime,
            logoutURL,
            renewURL,
            idleTimeout,
            autoRenewal,
            logoutPopupDuration,
            popup
        }
    }

    showPopup = () => {

        const { popup: { content: cnt = "", ...popup } = {} } = this.state;
        const content = document.createElement("div");
        content.innerHTML = cnt;
        ABBOTT.gtm.buildAndPush.formTracking('pop-up', 'load', 'logout');
        const classNameModal = this.isPWAModal();
        swal({
            ...popup,
            content,
            className: classNameModal
        }).then(value => {
            if (value === "extend") {
                ABBOTT.gtm.buildAndPush.formTracking('pop-up', 'click', 'logout_no');
                this.extendApiCall();
            }
            else if (value === "logout") {
                ABBOTT.gtm.buildAndPush.formTracking('pop-up', 'click', 'logout_yes');
                this.counterHandle && clearInterval(this.counterHandle);
                this.logoutApiCall();
            }
            else {
                
            }
            return value;
        });
        this.updateSeconds();
    }

    isPWAModal = () => {
        if (window.location.href.indexOf("/app") > -1) {
            return 'similac-modal-ExitPopup-PWA';
        }
        return 'similac-modal';
    }

    render() {
        return <div></div>;
    }
}
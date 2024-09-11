(function () {
	trustedShopsScript();
})();

function trustedShopsScript(){
	let _tsid = 'XAFE91B82DF3A7BDA6B7100264EF71F82';
    let _tsConfig = {
        'yOffset': '', /* offset from page bottom */
        'variant': 'custom', /* default, reviews, custom, custom_reviews */
        'customElementId': 'myCustomTrustedbadge', /* required for variants custom and custom_reviews */
        'trustcardDirection': '', /* for custom variants: topRight, topLeft, bottomRight, bottomLeft */
        'customBadgeWidth': '', /* for custom variants: 40 - 90 (in pixels) */
        'customBadgeHeight': '', /* for custom variants: 40 - 90 (in pixels) */
        'disableResponsive': 'true', /* deactivate responsive behaviour */
        'disableTrustbadge': 'false' /* deactivate trustbadge */
    };
    let _ts = document.createElement('script');
    _ts.type = 'text/javascript';
    _ts.charset = 'utf-8';
    _ts.async = true;
    _ts.src = '//widgets.trustedshops.com/js/' + _tsid + '.js';
    let __ts = document.getElementsByTagName('script')[0];
    __ts.parentNode.insertBefore(_ts, __ts);
}
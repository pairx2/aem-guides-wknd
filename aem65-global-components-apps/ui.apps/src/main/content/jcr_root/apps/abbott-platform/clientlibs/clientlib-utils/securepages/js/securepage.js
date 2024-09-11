/**
 * Common Script for Secure Page Redirect functionality.
 * Pages that needs to be secured for logged in users only, needs to be created under /secure/ folder within AEM site.
 * Author clientlib category name `secure-page` in divisional secure-redirect page.
 * 
 */

const currPageUrl = window.location.pathname,
	langRegex = /\/([a-z]{2})\//i,
	langRegexgeneric = /\/([a-z]{2}[/-][a-z]{2})\//i;

console.log(currPageUrl);
let result1,result2, counLang, getFinalUrl;

/*Get ContryLang from the Pathname*/
if ((result1 = langRegex.exec(currPageUrl)) !== null) {
	counLang = result1[1]; // covers the url with only contry e.g. /uk/
} else if ((result2 = langRegexgeneric.exec(currPageUrl)) !== null) {
	counLang = result2[1]; // covers the url e.g. /uk-en/ or /uk/en/
}

/*Store URL into sessionStorage*/
sessionStorage.setItem('securePageUrl', window.location.href);

/*Get Domain from the Hostname*/
const getHostname = window.location.hostname;
let getDomain = getHostname;
if (getHostname.indexOf("www") > -1 || getHostname.indexOf("dev") > -1 || getHostname.indexOf("qa") > -1 || getHostname.indexOf("staging") > -1 || getHostname.indexOf("preview") > -1 || getHostname.indexOf("uat") > -1) {
	getDomain = getHostname.substring(getHostname.indexOf(".") + 1);
}

/*Create Final URL : Domain + CountryLang*/
if (counLang && counLang !== "") {
	getFinalUrl = getDomain.toLowerCase() + '/' + counLang.toLowerCase();
} else {
	getFinalUrl = getDomain.toLowerCase();
}

document.addEventListener('DOMContentLoaded', function (event) {
	document.querySelectorAll('#secure-redirects .m-link-stack--title').forEach(function (title) {
		let getDomainFromSting = title.innerText.trim().toLowerCase();
		if (getDomainFromSting === getDomain) {
			title.closest('.m-link-stack').querySelectorAll('.a-link__text').forEach(function (
				link) {
				let getUrlFromString = link.innerText.trim().toLowerCase();
				if (getUrlFromString === getFinalUrl) {
					link.click();
				}
			});
		}
	});
});

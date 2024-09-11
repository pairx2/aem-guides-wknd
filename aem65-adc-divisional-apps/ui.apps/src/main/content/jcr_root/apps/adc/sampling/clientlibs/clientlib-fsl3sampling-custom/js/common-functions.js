/**
 * Common Functionalities
 */

//function to check if URL contains parameter
function hasUrlParameter(name) {
	let hasParam = (window.location.href.indexOf(name) > -1) ? true : false;
	return hasParam;
}

//function to get lastItem from URL
function getLastItem(thePath) {
	return thePath.substring(thePath.lastIndexOf('/') + 1);
}

//function to get URL parameter
function getUrlParameter(name) {
    name = name.replace('[', '\\[').replace(']', '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1]);
}

//function to setCookie
function setCookie(cname, cvalue, exdays) {
	let expires = "";
	if (exdays !== '') {
		let d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		expires = "expires="+ d.toUTCString();
	}
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;Secure;";
}

//function to getCookie
function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for (let c of ca) {
		let currentCookie = c;
		while (currentCookie.charAt(0) == ' ') {
			currentCookie = currentCookie.substring(1);
		}
		if (currentCookie.indexOf(name) == 0) {
			return currentCookie.substring(name.length, currentCookie.length);
		}
	}
	return '';
}

//function to get Cookies Obj
function getCookiesObj(cname) {
	let cVal = getCookie(cname);
	let cObj = (cVal && cVal !== "") ? JSON.parse(cVal) : cVal;
	return cObj;
}

//function to deleteCookie
function deleteCookie(name) {
	document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;Secure;';
}

//function to strip end-quotes from string
function stripEndQuotes(s) {
	let t = s.length;
	if (s.charAt(0) == '"') s = s.substring(1, t--);
	if (s.charAt(--t) == '"') s = s.substring(0, t);
	return s;
}

//function to retrieve radioValue
function radioValue(element) {
	
    let newArr1 = [];

    //return the input with radio option checked 
    newArr1 = $.grep(element, function(n, i) {
        return n.consentValue;
    });
   
    return newArr1[0].consentName;
}

//process ajax response
function processResponse(response) {
    if (response.status == 0) {
        return false;
    } else if (response.status && response.errorCode == 400) {
        return false;
    } else if (response.errorCode == 0) {
        return true;
    } else {
        let resReason = response.status;
        let resErr = response.errorCode;
        console.log(resReason + ": " + resErr);
    }
}

//create regex form string
function getRegExObjFromString(regexPattern) {
	let flags = /(?!^)[^\/]+$/gi.exec(regexPattern);

	if (flags && flags.length) {
		flags = flags[0];
	} else {
		flags = '';
	}
	
	regexPattern = /[^\/].+(?=\/)/.exec(regexPattern)[0];
	
	return new RegExp(regexPattern, flags);
}

//validate fields with authored regex
function matchRegex(a, b) {
	let fieldRegex = getRegExObjFromString(a);
	let validField = fieldRegex.test(b);
	if (!validField) {
	  if (b.length > 0) {
		return "error";
	  } else {
		return "empty";
	  }
	} 
  }

//sort dropdown
function sortDropdown(id) {
	let eleUl = $(id).find('.a-dropdown__menu');
	let eleLi = eleUl.children("li");

	if(eleLi && eleLi.length > 1) {
		eleLi.sort(function(a, b) {
			let A = $(a).text().trim().toUpperCase();
			let B = $(b).text().trim().toUpperCase();
			return compareText(A,B)
		}).appendTo(eleUl);
	}
	function compareText(a,b) {
		if(a>b) {
			return 1;
		} else if (a < b) {
			return -1;
		} else {
			return 0;
		}
	}
}
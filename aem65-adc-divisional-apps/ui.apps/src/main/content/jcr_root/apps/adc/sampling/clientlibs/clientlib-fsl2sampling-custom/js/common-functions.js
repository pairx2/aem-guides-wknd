/**
 * Common Functionalities
 */

//function to check if URL contains parameter
function hasUrlParameter(name) {
	var hasParam = (window.location.href.indexOf(name) > -1) ? true : false;
	return hasParam;
}

//function to get lastItem from URL
function getLastItem(thePath) {
	return thePath.substring(thePath.lastIndexOf('/') + 1);
}

//function to get URL parameter
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1]);
}

//function to setCookie
function setCookie(cname, cvalue, exdays) {
	var expires = "";
	if (exdays !== '') {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		expires = "expires="+ d.toUTCString();
	}
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;Secure;";
}

//function to getCookie
function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
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
	var t = s.length;
	if (s.charAt(0) == '"') s = s.substring(1, t--);
	if (s.charAt(--t) == '"') s = s.substring(0, t);
	return s;
}

//function to retrieve radioValue
function radioValue(element) {
	
    var newArr1 = [];

    //return the input with radio option checked 
    newArr1 = $.grep(element, function(n, i) {
        return (n.consentValue == true);
    });
   
    return newArr1[0].consentName;
}

//process ajax response
function processResponse(response) {
    if (response.status == false) {
        return false;
    } else if (response.status && response.errorCode == 400) {
        return false;
    } else if (response.errorCode == 0) {
        return true;
    } else {
        var resReason = response.status;
        var resErr = response.errorCode;
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
	var fieldRegex = getRegExObjFromString(a);
	var validField = fieldRegex.test(b);
	if (!validField) {
	  if (b.length > 0) {
		return "error";
	  } else {
		return "empty";
	  }
	} else {
	  return true;
	}
  }
    
//sort dropdown
function sortDropdown(id) {
	var eleUl = $(id).find('.a-dropdown__menu');
	var eleLi = eleUl.children("li");

	if(eleLi && eleLi.length > 1) {
		eleLi.sort(function(a, b) {
			var A = $(a).text().trim().toUpperCase();
			var B = $(b).text().trim().toUpperCase();
			return (A > B) ? 1 : ((A < B) ? -1 : 0);
		}).appendTo(eleUl);
	}
}

//push Data layer updates
function pushDataLayerUpdates(event, eventPath,pageTitle) {
    console.log("calling the data layer");
	window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
    'event': event,
    'pagePath': eventPath,
    'pageTitle': pageTitle
    });
}
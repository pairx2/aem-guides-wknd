// JavaScript Document


// set width for Android tablets
/*
// my original method
if( ( navigator.userAgent.match(/Android/i) ||	navigator.userAgent.match(/silk/i) ) && screen.width > 790) {
	document.getElementById('viewportID').setAttribute('content','width=device-width, initial-scale=1');
}
*/
// Test for mobile device (v 0.4.1)  kaimallea/isMobile
!function(a){var b=/iPhone/i,c=/iPod/i,d=/iPad/i,e=/(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,f=/Android/i,g=/(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,h=/(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,i=/Windows Phone/i,j=/(?=.*\bWindows\b)(?=.*\bARM\b)/i,k=/BlackBerry/i,l=/BB10/i,m=/Opera Mini/i,n=/(CriOS|Chrome)(?=.*\bMobile\b)/i,o=/(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,p=new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)","i"),q=function(a,b){return a.test(b)},r=function(a){var r=a||navigator.userAgent,s=r.split("[FBAN");if("undefined"!=typeof s[1]&&(r=s[0]),s=r.split("Twitter"),"undefined"!=typeof s[1]&&(r=s[0]),this.apple={phone:q(b,r),ipod:q(c,r),tablet:!q(b,r)&&q(d,r),device:q(b,r)||q(c,r)||q(d,r)},this.amazon={phone:q(g,r),tablet:!q(g,r)&&q(h,r),device:q(g,r)||q(h,r)},this.android={phone:q(g,r)||q(e,r),tablet:!q(g,r)&&!q(e,r)&&(q(h,r)||q(f,r)),device:q(g,r)||q(h,r)||q(e,r)||q(f,r)},this.windows={phone:q(i,r),tablet:q(j,r),device:q(i,r)||q(j,r)},this.other={blackberry:q(k,r),blackberry10:q(l,r),opera:q(m,r),firefox:q(o,r),chrome:q(n,r),device:q(k,r)||q(l,r)||q(m,r)||q(o,r)||q(n,r)},this.seven_inch=q(p,r),this.any=this.apple.device||this.android.device||this.windows.device||this.other.device||this.seven_inch,this.phone=this.apple.phone||this.android.phone||this.windows.phone,this.tablet=this.apple.tablet||this.android.tablet||this.windows.tablet,"undefined"==typeof window)return this},s=function(){var a=new r;return a.Class=r,a};"undefined"!=typeof module&&module.exports&&"undefined"==typeof window?module.exports=r:"undefined"!=typeof module&&module.exports&&"undefined"!=typeof window?module.exports=s():"function"==typeof define&&define.amd?define("isMobile",[],a.isMobile=s()):a.isMobile=s()}(this);

var mobile = isMobile.any;
var android = isMobile.android.device;
var phone = isMobile.phone;

// set a default height unless something different declared on page
if(typeof _panoHeight === 'undefined') {
	var	_panoHeight = 500;
}
function setPanoHeight() {
	if (document.getElementById('vtour')) {
		var panoHeight = window.innerHeight - 100;
		if (panoHeight > _panoHeight) {panoHeight = _panoHeight;}
		document.getElementById('vtour').style.height = panoHeight+'px';
	}
}
// hide URL field on the iPhone/iPod touch
//var hideCount = 0;
function hideUrlBar() {
	if (location.hash.substr(1)=="") {
		document.getElementsByTagName("body")[0].style.marginTop="1px";
		window.scrollTo(0, 1);
	} else {
		setTimeout(removeHash,1000);
	}
	setPanoHeight();
}
window.addEventListener("load", hideUrlBar);
window.addEventListener("resize", hideUrlBar);
window.addEventListener("orientationchange", hideUrlBar);

function removeHash () { 
    history.pushState("", document.title, window.location.pathname + window.location.search);
}


function hideShareThis() {
	document.getElementById('share_this').style.display = "none";
}
function showShareThis() {
	document.getElementById('share_this').style.display = "block";
}

function share() {
	window.scrollTo(0,document.body.scrollHeight);
	$('#share_this').delay(1000).effect('highlight', {color: '#ffff00'}, 3000);
}

function cleanUrl() {
	var clean_uri = location.protocol + "//" + location.host + location.pathname;
	/*
	var hash_pos = location.href.indexOf("#");
	if (hash_pos > 0) {
			var hash = location.href.substring(hash_pos, location.href.length);
			clean_uri += hash;
	}
	*/
	window.history.replaceState({}, document.title, clean_uri);
}

function getFlashVersion(){
  // ie
  try {
    try {
      // avoid fp6 minor version lookup issues
      // see: http://blog.deconcept.com/2006/01/11/getvariable-setvariable-crash-internet-explorer-flash-6/
      var axo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.6');
      try { axo.AllowScriptAccess = 'always'; }
      catch(e) { return '6,0,0'; }
    } catch(e) {}
    return new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version').replace(/\D+/g, ',').match(/^,?(.+),?$/)[1];
  // other browsers
  } catch(e) {
    try {
      if(navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin){
        return (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1];
      }
    } catch(error) {}
  }
  return '0,0,0';
}
 
var version = getFlashVersion().replace(/,/gi, ".");

// If returning from a tour, scroll page to same place.
function getReturnOffset() {
	var offset = window.pageYOffset;
	if (offset !== 0) {
		window.location.hash = offset;
	}
}

// -- Shadow Frame Code  -- //
var sframe_height ;
function show_example(name, title, sheight) {
	//height = parseInt(height);
	//console.log("height ("+sheight+") = ",+typeof sheight);
	if(mobile) {
		getReturnOffset();
		window.location.href = name;
	}else {
		if(sheight > 0) {
			sframe_height = sheight;
		} else {
			sframe_height = 520;
		}
		var _gray = document.getElementById('gray');
		_gray.onclick=function() { closeShadowFrame(); };
		var closeBtn = document.getElementById('close');
		closeBtn.onclick = function() { closeShadowFrame(); };
		var iframeSrc = '<iframe id="siframe" src="'+name+'" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>';
		//document.getElementsByTagName("body")[0].style.overflow = "hidden";
		document.getElementById('shadow').style.display = "block";
		document.getElementById('sframe_title').innerHTML = title;
		document.getElementById('sframeContent').innerHTML = iframeSrc;
		shadowresize();
	}
}


function closeShadowFrame(){
	//document.getElementById('sframeContent').innerHTML = "";
	var elem = document.getElementById('siframe');
	elem.parentNode.removeChild(elem);
	document.getElementById('shadow').style.display = "none";
	document.getElementsByTagName('body')[0].style.overflow = "auto";
}
function shadowresize() {
	if(typeof siframe == 'undefined') { return; }
	var windowHeight = window.innerHeight;
	var panoHeight = sframe_height;
	if ( (windowHeight-50) < panoHeight) {
		panoHeight = windowHeight - 50;
	}
	var _sframe = document.getElementById('sframe');
	_sframe.style.height = panoHeight+'px';
	_sframe.style.top = "50%";
	_sframe.style.marginTop = ((panoHeight/2)*-1)+"px";
}
window.addEventListener("resize", shadowresize);
window.addEventListener("orientationchange", shadowresize);
//  End Shadowbox code  //

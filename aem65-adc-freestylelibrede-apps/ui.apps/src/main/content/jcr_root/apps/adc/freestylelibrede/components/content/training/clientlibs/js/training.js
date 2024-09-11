function navActive(nav){
	if (nav.length) {
		if (jQuery(window).scrollTop() >= nav.offset().top + nav.height() || jQuery(window).scrollTop() < nav.offset().top)
			nav.removeClass('active');
		else
			nav.addClass('active');
	}
}

function splashActive(splash) {
	if (splash.length) {
		if (jQuery(window).scrollTop() >= splash.offset().top - 250 + splash.height() || jQuery(window).scrollTop() < splash.offset().top - 250)
			splash.removeClass('active');
		else
			splash.addClass('active');

	}
}
jQuery(window).scroll(function () {
	let nav = jQuery(".gettyimg-div");
	navActive(nav);
	let splash = jQuery(".water-splash");
	splashActive(splash);
	let navflow = jQuery(".water-flow");
	if (navflow.length) {

		if (jQuery(window).scrollTop() >= navflow.offset().top - 250 + navflow.height() || jQuery(window).scrollTop() < navflow.offset().top - 250)
			navflow.removeClass('active');
		else
			navflow.addClass('active');
	}
	let navimagediv = jQuery(".sensor-imagediv");
	if (navimagediv.length) {
		if (jQuery(window).scrollTop() >= navimagediv.offset().top - 250 + navimagediv.height() || jQuery(window).scrollTop() < navimagediv.offset().top - 250)
			navimagediv.removeClass('active');
		else
			navimagediv.addClass('active');
	}
});

let slider = document.querySelector('#slider');
if (slider) {
	let thumb = slider.querySelector('.thumb-img');
	if(thumb){
	thumb.onmousedown = function (event) {
		event.preventDefault(); // prevent selection start (browser action)

		let shiftX = event.clientX - thumb.getBoundingClientRect().left;
		// shiftY not needed, the thumb moves only horizontally

		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);

		function onMouseMove(eventMouseMove) {
			let newLeft = eventMouseMove.clientX - shiftX - slider.getBoundingClientRect().left;
			if (newLeft < 0) {
				newLeft = 0;

			}
			let rightEdge = 215;
			if (newLeft > rightEdge) {
				newLeft = rightEdge;
			}

			thumb.style.left = newLeft + 'px';
			let parentMoonDiv = jQuery(".moon-div");
			if (parentMoonDiv.length && newLeft > 100) {
				parentMoonDiv.removeClass('show-sun').addClass('show-moon');
			} else if (parentMoonDiv.length) {
				parentMoonDiv.removeClass('show-moon').addClass('show-sun');
			}
		}

		function onMouseUp() {
			document.removeEventListener('mouseup', onMouseUp);

			document.removeEventListener('mousemove', onMouseMove);
		}

	};

	thumb.ondragstart = function () {
		return false;
	};
  }
}

let elementsToShow = document.querySelectorAll('.show-on-scroll');

function loop() {

	Array.prototype.forEach.call(elementsToShow, function (element) {
		if (isElementInViewport(element)) {
			element.classList.add('is-visible');
		} else {
			element.classList.remove('is-visible');
		}
	});

	window.requestAnimationFrame(loop);
}

// Call the loop for the first time
loop();


function isElementInViewport(el) {
	if (typeof jQuery === "function" && el instanceof jQuery) {
		el = el[0];
	}
	
	let rect = el.getBoundingClientRect();
	if(rect){
	return (
		(rect.top <= 0 &&
			rect.bottom >= 0) ||
		(rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
			rect.top <= (window.innerHeight || document.documentElement.clientHeight)) ||
		(rect.top >= 0 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
	);
  }
}

let faqmobileview = jQuery(".questionouter-div,.question-txt"); 
if (faqmobileview && faqmobileview.is(".questionouter-div,.question-txt") && window.matchMedia("(max-width: 767px)").matches) {
    jQuery(window).scrollTop(jQuery('.questionouter-div,.question-txt').offset().top-150);
}

jQuery(".datenschutzpopup").click(function(){
       let videos = jQuery(".datenschutz-video");
       if(videos){
           jQuery.each(videos, function(index, value) {
           videos[index].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', parent.origin);
           });
       }
    });
	
jQuery(".librelink-app .nav .step-link").click(function(){
	let allStepLinks = jQuery(".librelink-app .nav .step-link");
    jQuery.each(allStepLinks, function(index, value){
        if(jQuery(value).hasClass('active')) {
			jQuery(value).removeClass('active');
        }
	});
    jQuery(this).addClass('active');
});

if(jQuery(".kontact-page #liveChat .livechat-button")){
	jQuery(".kontact-page #liveChat .livechat-button").attr('href', 'javascript:void(0)');
}

jQuery(".kontact-page #liveChat .livechat-button").click(function(){
    jQuery('.embeddedServiceHelpButton .helpButton .helpButtonEnabled').click();
});



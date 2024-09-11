/**
 * Contact Form
 **/
$(document).ready(function() {
   let contactForm = $("#contactForm");
   if (contactForm.length) {
       $("#contactOther").closest(".fields").hide();
       $("[name=subject]").closest(".a-dropdown").on('change', function() {
           if ($(this).find(".selected").data("optionvalue") === "Other") {
               $("#contactOther").closest(".fields").show();
           } else {
               $("#contactOther").closest(".fields").hide();
           }
       });
   }
    const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const cursrcVal = urlParams.get('src')	
	if(cursrcVal === "webnova"){
		let selectedVal = $("fieldset#contactSubject-options ul.a-dropdown__menu li#field_label_contactSubject_6 span").text();
		
		$("fieldset#contactSubject-options .a-dropdown__field>span").removeClass("a-dropdown__placeholder").addClass("a-dropdown-selected");
		$("fieldset#contactSubject-options .a-dropdown__field .a-dropdown-selected").text(selectedVal)
		
		$("fieldset#contactSubject-options ul.a-dropdown__menu").attr("aria-activedescendant",selectedVal)
	
		$("fieldset#contactSubject-options ul.a-dropdown__menu li").removeClass("selected").removeAttr("area-selected");
		$("fieldset#contactSubject-options ul.a-dropdown__menu li#field_label_contactSubject_6").addClass("selected").attr("area-selected","true");
	}
});
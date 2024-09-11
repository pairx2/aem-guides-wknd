/**********************************
header
**********************************/

$(document).ready(function () {
	
	$('#retiree_checkboxes-options').hide();
	$('#hidePopup-options').hide();
	$('#retiree-options li.selected').each(function(index) {
		var dataoptionVal = $(this).attr('data-optionvalue');
		if (dataoptionVal == 'YES') {
			$('#retiree_checkboxes-options').show();
			$('#hidePopup-options').hide();
		} else if (dataoptionVal == 'NO') {
			$('#hidePopup-options').show();
			$('#retiree_checkboxes-options').hide();
			
		}
	});

	$('#retiree-options li').click(function(index) {
		var dataoptionVal = $(this).attr('data-optionvalue');
		if (dataoptionVal == 'YES') {
			$('#retiree_checkboxes-options').show();
			$('#hidePopup-options').hide();
			
		} else if (dataoptionVal == 'NO') {
			$('#hidePopup-options').show();
			$('#retiree_checkboxes-options').hide();
			
		}
	});

    $('div#optinExpfragment .form-container').append('<a href="#" class="closexIcon">×</a>');
    $('.closexIcon').click(function(e){
        e.preventDefault();
        $('#section-optin-popup').hide();
        $('#section-optin-popup').parents('body').find('.abbott-wrapper').removeClass('setZindex');
    });	
  if (
    $(".header .o-header-v2-global__sticky-section").length &&
    isOnPublish()
  ) {
    const pathName = window.location.pathname;
    if (pathName !== "/") {
      $(
        ".header .o-header-v2-global__sticky-section .o-header-v2-global__section--utility-bottom .linkstack .m-link-stack--header a"
      ).each(function () {
        if (
          $(this).attr("href") === pathName ||
          $(this).attr("href").includes(pathName)
        ) {
          $(this).addClass("a-link--active");
        }
      });
    }
	// opt-in popup
	if (getCookie("retireeOption") === "NO" && localStorage.getItem('hidePopup') == null || getCookie("retireeOption") === "NO" && localStorage.getItem('hidePopup') == "false" ||
		getCookie("retireeOption") === "NO" && localStorage.getItem('hidePopup') == 'undefined') {
		$('#section-optin-popup').show();
		$('#section-optin-popup').parents('body').find('.abbott-wrapper').addClass('setZindex');
	} else if (getCookie("retireeOption") === "NO" && localStorage.getItem('hidePopup') == "true") {
		$('#section-optin-popup').hide();
		 $('#section-optin-popup').parents('body').find('.abbott-wrapper').removeClass('setZindex');
	}	
   }
  if ($(".header .linkstack").length && isOnPublish()) {
    $(".header .linkstack").each(function () {
      const linkStackContentLength = $(this).find(
        ".m-link-stack--content .a-link"
      ).length;
      if (linkStackContentLength <= 0) {
        $(this).addClass("linkstack--content-empty");
      }
    });
  }
  if ($("#teconsent a").length && isOnPublish()) {
    setTimeout(function () {
      $(".footer .linkstack ul").append(
        "<li class='a-link'><a class='a-link__text trems-use-privecy'>Your Privacy Choices</a></li>"
      );
      $(".trems-use-privecy").click(function () {
        $("#teconsent a").get(0).click();
      });
      $("#teconsent a").hide();
    }, 1000);
  }
  $('.online-retiree-directory-search ').parents('#pageContent').find('.embed').parents('.columncontrol.column-align--center').addClass('adjustmobileWidth');
});

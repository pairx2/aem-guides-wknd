var currentPagePath = window.location.href;
var emailToAddress;

function UpdateContactUsRequest(formData) {
	var formBody = formData.body;
	for (const key in formBody) {
		if (Array.isArray(formBody[key])) {
			let transFormArray = formData.body[key];
			let transFormObject = [];
			transFormArray.filter(obj => {
				if (obj.consentValue == true) {
					transFormObject.push(obj.consentName)
				}
			});
			formData.body[key] = transFormObject.toString();
		}
	}
    if (formData.body.ep === false) {
	  formData.body.ep = '';
	}
	if (formData.body.ep === true) {
	  formData.body.ep = $('input[name="ep"]').val();
	}
	if (currentPagePath) {
		formData.body.currentPageURL = currentPagePath;
	}
	if (emailToAddress) {
		formData.body.emailAddress = emailToAddress;
	}
	if (formData.body["g-recaptcha-response"]) {
		formData.body.captchaValue = formData.body["g-recaptcha-response"];
	}
}

function OnBeforeRequest() {
	if (document.querySelector("[name=CV_Forms_BranchingEmailRules]")) {
		for (let i = 0; i < ($('input[name=CV_Forms_BranchingEmailRules]').val())?.split("$$").length; i++) {
			let fieldName = ($('input[name=CV_Forms_BranchingEmailRules]').val())?.split("$$")[i]?.split("=")[0]?.split("||")[0];
			let selectedValue;
			let formatField = new RegExp(/[^\w\s]/);
			if (!formatField.test(fieldName)) {
				if (document.querySelector("[name=" + fieldName + "]")?.closest('fieldset').classList.contains('radio') || document.querySelector("[name=" + fieldName + "]")?.closest('fieldset').classList.contains('checkbox')) {
					var radios = document.querySelectorAll("[name=" + fieldName + "]");
					for (var j = 0; j < radios.length; j++) {
						if (radios[j].type === 'radio' && radios[j].checked) {
							// get value, set checked flag or do whatever you need to
							selectedValue = radios[j].value;
						}
					}
				} else if (document.querySelector("[name=" + fieldName + "]")?.closest('fieldset').classList.contains('drop-down')) {
					selectedValue = ($('[name=' + fieldName + ']').find('li.selected').find('span').text().trim())
				}
				if (selectedValue == ($('input[name=CV_Forms_BranchingEmailRules]').val())?.split("$$")[i]?.split("=")[0]?.split("||")[1]) {
					emailToAddress = ($('input[name=CV_Forms_BranchingEmailRules]').val())?.split("$$")[i]?.split("=")[1];
				}
			}
		}
	}
	loadercallback();
}
function contactusSuccessmsgCallback(){
     setTimeout(function() {
		 $(".o-form-container__buttons").find('.a-spinner').remove();
	},10);
}

function contactusFailuremsgCallback(){
    setTimeout(function() {
		$(".o-form-container__buttons").find('.a-spinner').remove();
    },10);
}
function loadercallback(){
        $(".o-form-container__buttons").append('<div class="a-spinner" style="margin:110px 0 0 15px;"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div>');
}
(function() {
	setTimeout(function() {
		$('.a-dropdown__field').find('li').each(function() {
			let dataOption = $(this).attr('data-optionvalue');
			if (dataOption) {
				$('fieldset').each(function() {
					if ($(this).find('input[type=checkbox]').attr('name') == dataOption) {
						$(this).hide();
					}
				});
			}
		});
		$("body").on('DOMSubtreeModified', '.a-dropdown__field>span', function(e) {
			var _this = $(this);
			setTimeout(function() {
				var selectedValue = _this.closest('.a-dropdown__field').find('.a-dropdown__menu').find('.selected').attr('data-optionvalue');
				if (selectedValue.length > 0) {
					_this.closest('.a-dropdown__field').find('li').each(function() {
						let dataOption = $(this).attr('data-optionvalue');
						if (dataOption) {
							$('fieldset').each(function() {
								if ($(this).find('input[type=checkbox]').attr('name') == dataOption) {
									$(this).find('input[type=checkbox]').prop('checked', false);
									var fieldName = $(this).find('input').attr('name').trim();
									if (selectedValue.indexOf(fieldName) > -1) {
										$(this).show();
									} else {
										$(this).hide();
									}
								}
							})
						}
					})
				}
			}, 10);
		});
		var disableFlag = 0;
		$('fieldset.checkbox').each(function() {
			if ($(this).find('input').attr('data-required') == 'true' && $(this).find('input').length > 1) {
				$(this).addClass('set-value-checkbox-options')
				$(this).attr('data-disabled', 'true')
			}
		})
		if ($('fieldset.set-value-checkbox-options').length > 0)  {
			$('.o-form-container__main-form+.o-form-container__buttons [type="submit"]').on('click', function(e) {
				e.preventDefault();
				if ($(this)?.closest('.o-form-container__buttons').length > 0) {
					$('fieldset.set-value-checkbox-options')?.each(function() {
						$(this).find('input').removeAttr('data-required');
						$(this).removeClass('validation-require');
					})
				}
				checkboxValidate($(this));
			})
			$('fieldset.set-value-checkbox-options input:checkbox, .o-form-container__main-form input, .o-form-container__main-form textarea').on('change', function(e) {
				e.preventDefault();
				checkboxValidate($(this));
				var _this = $(this);
				setTimeout(function() {
					_this.trigger('blur');
					_this.blur();
				}, 200);
			})
			$('fieldset.set-value-checkbox-options input:checkbox, .o-form-container__main-form input, .o-form-container__main-form textarea').on('blur', function(e) {
				e.preventDefault();
				checkboxValidate($(this));
			})
			$('.o-form-container__main-form input, .o-form-container__main-form textarea').on('input', function(e) {
				e.preventDefault();
				checkboxValidate($(this));
			})

			$("body").on('DOMSubtreeModified', '.o-form-container__main-form .a-dropdown__field>span', function(e) {
				checkboxValidate($(this));
			})
			var singleInputs, dropdownFields, checkboxFields, radioFields;

			function checkboxValidate(targetEle) {
				if (targetEle?.closest('fieldset').hasClass('set-value-checkbox-options')) {
					$('fieldset.set-value-checkbox-options').each(function() {
						if ($(this).find('input[type=checkbox]:checked').length > 0) {
							$(this).attr('data-disabled', 'false');
							
						} else {
							$(this).attr('data-disabled', 'true');
							
						}
					})
				}
				setTimeout(function() {
					if ($('[required], [data-required="true"]').length > 0) {
						singleInputs = $('.o-form-container__main-form [required]:visible').filter(function() {
							return $.trim($(this).val()).length == 0
						}).length == 0;
						dropdownFields = $('.o-form-container__main-form .a-dropdown[data-required="true"]:visible').filter(function() {
							return ($(this).find('.selected').length) == 0
						}).length == 0;
						var checkboxFlag = [];
             				$('.o-form-container__main-form fieldset.checkbox:not(.set-value-checkbox-options):visible input[data-required="true"]').each(function() {
             					if($(this).prop('checked') == false) {
									checkboxFlag.push(0);
            					 }

             					else{
                             		checkboxFlag.pop(0);
                             	}

						  })

						if (checkboxFlag.toString().indexOf('0') > -1) {
							checkboxFields = false;
            			 } else{
							checkboxFields = true;
						}
						var radioFlag = [];

             			if($('.o-form-container__main-form fieldset.radio:visible input[data-required="true"]').length > 0 ){
                             $('.o-form-container__main-form fieldset.radio:visible input[data-required="true"]').closest('fieldset').each(function(){
             					if($(this).find('input:checked').length == 0){
                               		 radioFlag.push(0);
                                 }
             				})
             			}
                         
						if (radioFlag.toString().indexOf('0') > -1) {
							radioFields = false;
						} else {
							radioFields = true;
						}
					}
				}, 10);
				$('.checkbox[data-disabled="true"]').length == 0 ? disableFlag = 1 : disableFlag = 0;
				
				setTimeout(function() {
					if (targetEle?.closest('fieldset').hasClass('set-value-checkbox-options') && targetEle?.closest('fieldset')?.find('input[type=checkbox]:checked').length > 0) {
						
						targetEle?.closest('fieldset').removeClass('validation-require');
						targetEle?.closest('fieldset').find('.checkbox--text-require').hide();
					}
				}, 20);
				if (disableFlag == 1) {
					setTimeout(function() {
						
						if (singleInputs == true && dropdownFields == true && checkboxFields == true && radioFields == true && $('.o-form-container__main-form .validation-error').length == 0 && $('.o-form-container__main-form .validation-regex').length == 0 && $('.o-form-container__main-form .validation-require').length == 0) {
							$('.o-form-container__main-form+.o-form-container__buttons [type="submit"]').removeAttr('disabled');
						}
						else{
							$('.o-form-container__main-form+.o-form-container__buttons [type="submit"]').attr('disabled', true);
						}
					}, 200);
				} else {
					
					setTimeout(function() {
						if (targetEle?.closest('fieldset').hasClass('set-value-checkbox-options') && targetEle?.closest('fieldset').attr('data-disabled') == 'true') {
							targetEle?.closest('fieldset').addClass('validation-require');
							targetEle?.closest('fieldset').find('.checkbox--text-require').show();
						}
						$('.o-form-container__main-form+.o-form-container__buttons [type="submit"]').attr('disabled', true);
					}, 10);
				}
			}
		}
		$('.o-form-container__main-form input, .o-form-container__main-form textarea').on('input', function(e) {
            e.preventDefault();
            submitButtonValidate();
        });
        $("body").on('DOMSubtreeModified', '.o-form-container__main-form .a-dropdown__field>span', function(e) {
             	submitButtonValidate();
		})
        function submitButtonValidate() {
            setTimeout(function() {
                if ($('[required], [data-required="true"]').length > 0) {
                    singleInputs = $('.o-form-container__main-form [required]:visible').filter(function() {
                        return $.trim($(this).val()).length == 0
                    }).length == 0;
                    dropdownFields = $('.o-form-container__main-form .a-dropdown[data-required="true"]:visible').filter(function() {
                        return ($(this).find('.selected').length) == 0
                    }).length == 0;
                    var checkboxFlag = [];
                         $('.o-form-container__main-form fieldset.checkbox:not(.set-value-checkbox-options):visible input[data-required="true"]').each(function() {
                             if($(this).prop('checked') == false) {
                                checkboxFlag.push(0);
                             }
        
                             else{
                                 checkboxFlag.pop(0);
                             }
        
                      })
        
                    if (checkboxFlag.toString().indexOf('0') > -1) {
                        checkboxFields = false;
                     } else{
                        checkboxFields = true;
                    }
                    var radioFlag = [];
        
                     if($('.o-form-container__main-form fieldset.radio:visible input[data-required="true"]').length > 0 ){
                         $('.o-form-container__main-form fieldset.radio:visible input[data-required="true"]').closest('fieldset').each(function(){
                             if($(this).find('input:checked').length == 0){
                                    radioFlag.push(0);
                             }
                         })
                     }
                     
                    if (radioFlag.toString().indexOf('0') > -1) {
                        radioFields = false;
                    } else {
                        radioFields = true;
                    }
                }
            }, 10);
        
            setTimeout(function() {
                if (singleInputs == true && dropdownFields == true && checkboxFields == true && radioFields == true && $('.o-form-container__main-form .validation-error').length == 0 && $('.o-form-container__main-form .validation-regex').length == 0 && $('.o-form-container__main-form .validation-require').length == 0) {
                    $('.o-form-container__main-form+.o-form-container__buttons [type="submit"]').removeAttr('disabled');
                }
                else{
                    $('.o-form-container__main-form+.o-form-container__buttons [type="submit"]').attr('disabled', true);
                }
            }, 200);
        }
	}, 1000);
})();
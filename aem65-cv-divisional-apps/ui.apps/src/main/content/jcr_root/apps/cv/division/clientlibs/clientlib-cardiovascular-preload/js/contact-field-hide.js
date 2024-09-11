(function(){
    setTimeout(function () {
        if($("[data-conditional-variable]")){
			 if($('.o-form-container__main-form [required]:not(:visible)')?.length > 0){
				 $('.o-form-container__main-form [required]:not(:visible)').addClass('set-required').removeAttr('required');
             }
			if($('.o-form-container__main-form [data-required="true"]:not(:visible)')?.length > 0){
				 $('.o-form-container__main-form [data-required="true"]:not(:visible)').addClass('set-data-required').removeAttr('data-required');
             }
            $("[data-conditional-variable]")?.each(function(){
                var fieldName =  $(this).attr('data-conditional-variable');
				var triggerField =  $('[name='+fieldName+']');
                if(triggerField?.hasClass('a-dropdown__menu')){
					triggerField.closest('.a-dropdown__field').addClass('conditional-dropdown');
            		triggerField.closest('.a-dropdown__field').find('span').on('DOMSubtreeModified', function() {
						var conditionalCaseValue = $('[data-conditional-variable='+fieldName+']').find('[data-conditional-case]').attr('data-conditional-case')?.replace('$','/');
            			if($(this)?.text()?.trim() == conditionalCaseValue){
							$('[data-conditional-variable='+fieldName+']').find('.conditional__case').find('.set-required').attr('required', true);
							$('[data-conditional-variable='+fieldName+']').find('.conditional__case').find('.set-data-required').attr('data-required', 'true');
    						$('[data-conditional-variable='+fieldName+']').find('.conditional__case').show();
                       }
                       else{
							$('[data-conditional-variable='+fieldName+']').find('.conditional__case').hide();
							$('[data-conditional-variable='+fieldName+']').find('.conditional__case').find('.set-required').removeAttr('required');
							$('[data-conditional-variable='+fieldName+']').find('.conditional__case').find('.set-data-required').removeAttr('data-required');
							$('[data-conditional-variable='+fieldName+']').find('.conditional__case').find('input[type=text]').val('');
							$('[data-conditional-variable='+fieldName+']').find('.conditional__case').find('textarea').val('');
							$('[data-conditional-variable='+fieldName+']').find('.conditional__case').find('input[type=checkbox]').prop('checked',false);
							$('[data-conditional-variable='+fieldName+']').find('.conditional__case').find('input[type=radio]').prop('checked',false);
                       }
                   });
                }
                if(triggerField?.hasClass('a-checkbox__input')){
                    triggerField.addClass('conditional-checkbox');
        		}
            	if(triggerField?.hasClass('a-radio__input')){
            		triggerField.addClass('conditional-radio');
        		}
            })
            $("body").on('change', '.conditional-radio', function() {
                var fieldName = $(this).attr('name');
                if($(this).prop('checked') == true && $(this).attr('value') == $('[data-conditional-variable='+fieldName+']').find('[data-conditional-case]').attr('data-conditional-case')){
                    $('[data-conditional-variable='+fieldName+']').find('.conditional__case').find('.set-required').attr('required', true);
                    $('[data-conditional-variable='+fieldName+']').find('.conditional__case').find('.set-data-required').attr('data-required', 'true');
                    $('[data-conditional-variable='+fieldName+']').find('.conditional__case').show();
                }else{                    
                    $('[data-conditional-variable='+fieldName+']').find('.conditional__case').hide();
                    $('[data-conditional-variable='+fieldName+']').find('.conditional__case').find('.set-required').removeAttr('required');
                    $('[data-conditional-variable='+fieldName+']').find('.conditional__case').find('.set-data-required').removeAttr('data-required');
                    $('[data-conditional-variable='+fieldName+']').find('.conditional__case').find('input[type=text]').val('');
                    $('[data-conditional-variable='+fieldName+']').find('.conditional__case').find('textarea').val('');
                    $('[data-conditional-variable='+fieldName+']').find('.conditional__case').find('input[type=checkbox]').prop('checked',false);
                    $('[data-conditional-variable='+fieldName+']').find('.conditional__case').find('input[type=radio]').prop('checked',false);
                }
				setTimeout(function(){
                    if ($('[required], [data-required="true"]').length == 0) {
                        $('.o-form-container__main-form+.o-form-container__buttons [type="submit"]').removeAttr('disabled');
                    }
                },201)
            })
            $("body").on('change', '.conditional-checkbox', function() {
                var fieldName = $(this).attr('name');
                if($(this).prop('checked') == true && $(this).attr('value') == $('[data-conditional-variable='+fieldName+']').find('[data-conditional-case]').attr('data-conditional-case')){
                    $('[data-conditional-variable='+fieldName+']').find('.conditional__case').find('.set-required').attr('required', true);
                    $('[data-conditional-variable='+fieldName+']').find('.conditional__case').find('.set-data-required').attr('data-required', 'true');
                    $('[data-conditional-variable='+fieldName+']').find('.conditional__case').show();
                }else if($(this).prop('checked') == false && $(this).attr('value') == $('[data-conditional-variable='+fieldName+']').find('[data-conditional-case]').attr('data-conditional-case')){
                    $('[data-conditional-variable='+fieldName+']').find('.conditional__case').hide();
                    $('[data-conditional-variable='+fieldName+']').find('.conditional__case').find('.set-required').removeAttr('required');
                    $('[data-conditional-variable='+fieldName+']').find('.conditional__case').find('.set-data-required').removeAttr('data-required');
                    $('[data-conditional-variable='+fieldName+']').find('.conditional__case').find('input[type=text]').val('');
                    $('[data-conditional-variable='+fieldName+']').find('.conditional__case').find('textarea').val('');
                    $('[data-conditional-variable='+fieldName+']').find('.conditional__case').find('input[type=checkbox]').prop('checked',false);
                    $('[data-conditional-variable='+fieldName+']').find('.conditional__case').find('input[type=radio]').prop('checked',false);
                }
				setTimeout(function(){
                    if ($('[required], [data-required="true"]').length == 0) {
                        $('.o-form-container__main-form+.o-form-container__buttons [type="submit"]').removeAttr('disabled');
                    }
                },201)
            })
        }
		if($('.o-form-container__main-form .a-dropdown__field')){
            $('.o-form-container__main-form .a-dropdown__field').on('click',function(e){
				e.stopPropagation();
            	$('.o-form-container__main-form .a-dropdown__field').not($(this)).removeClass('active');
            	setTimeout(() => {
						$(this).toggleClass('active');

            	}, 100);

        	})
			$('.o-form-container__main-form .a-dropdown__field .a-dropdown__menu li').on('click',function(){
				$(this).closest('.a-dropdown__menu').find('li').not($(this)).removeClass('selected').removeAttr('aria-selected');
            	setTimeout(() => {
					$(this).addClass('selected').closest('.a-dropdown__field').removeClass('active');
               		$(this).closest('.a-dropdown').find('.a-dropdown__field>span').removeClass('a-dropdown__placeholder').addClass('a-dropdown-selected');
            	}, 111);
				setTimeout(() => {
					$(this).closest('.a-dropdown').find('.a-dropdown__field>span').text($(this).find('span').text())
            	}, 211);
        	})

        }
    }, 1000);
})();
$(document).ready(function () {
    let selectedAge = "";
    let selectedPremature = "";
    let formulaUsage = "";
    let afterEffects = "";
    let immunePreference = "";
    let gmoPreference = "";
    let afterEffectsSpl = "";
    let milkPreference = "";
    let currentQuestion = 0;
    let previousQuestion = [];
    let resultsPage = $( "#ph-formula-finder .o-wizard__container input[name='redirect']").val();
    $('#ph-formula-finder').each(function() {
        $(this).find('.options').each(function(){
            $(this).on('change', '.a-radio__input', function(e) {
                $(this).parents('.o-wizard__content').find('.btn[name=next], .btn[name=NEXT]').css('pointer-events', 'auto');
            })
        });
    });
    function gotoResults(productId){
        sessionStorage.setItem('productId',productId);
        let redirectPath = resultsPage+".html";
        window.location.href = redirectPath;
    }
    $( "#ph-formula-finder .o-wizard__container").on("click", "button[name='back'],button[name='BACK']",function(event) {
       	event.preventDefault();
        event.stopImmediatePropagation();
        let previousWizard = previousQuestion.pop();
		goBack(previousWizard);
	});

    function validateAEVal(afterEffects,formulaUsage){
        if(afterEffects == "no-concerns" && formulaUsage == 'supplementing-formula'){
            gotoResults("similac-360-total-care");
        }else if(afterEffects == "fussiness-gas"){
            showHideQuestion(4,3);
        }else if(afterEffects == 'feeding-issues'){
            gotoResults("similac-pro-total-comfort");
        }else if(afterEffects == 'spit-up'){
            gotoResults("similac-for-spit-up-non-gmo");
        } else if(afterEffects == 'colic' || afterEffects == 'allergy'){
           gotoResults("similac-alimentum");
        }else if(afterEffects == "no-concerns" && formulaUsage == 'formula'){
            showHideQuestion(5,3);
        }
    }

    function validateAESval(gmoPreference,afterEffectsSpl){
        if(gmoPreference == 'nongmo' && afterEffectsSpl=='no-concerns'){
            gotoResults("go-and-grow-by-similac-non-gmo-with-2-fl-hmo-toddler-drink");
        }else if(gmoPreference == 'nongmo' && afterEffectsSpl=='fussiness-gas'){
           gotoResults("go-and-grow-by-similac-sensitive-hmo-toddler-drink");
        }else if(gmoPreference == 'no' && afterEffectsSpl=='no-concerns'){
            gotoResults("go-and-grow-by-similac-toddler-drink");
        }else if(gmoPreference == 'no' && afterEffectsSpl=='fussiness-gas'){
           gotoResults("go-and-grow-by-similac-sensitive-hmo-toddler-drink");
        }
    }

    function validateIPval(immunePreference){
        if(immunePreference == 'hmo' || immunePreference == 'advance'){
            gotoResults("similac-pro-advance");
        }else if(immunePreference == 'organic'){
           gotoResults("similac-organic");
        }
    }

	$( "#ph-formula-finder .o-wizard__container").on("click", "button[name='next'],button[name='NEXT']",function(event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        currentQuestion = parseInt($(this).parents( "fieldset[data-wizarditem]").attr("data-wizarditem"));
       	switch (currentQuestion) {
          case 0:
			selectedAge = $("fieldset[data-wizarditem='0'] input[name='answers']:checked").val();
            if(selectedAge == 'older'){
                showHideQuestion(7,0);
            }else if(selectedAge == 'first_year'){
                showHideQuestion(1,0);
            }
            break;
          case 1:
            selectedPremature = $("fieldset[data-wizarditem='1'] input[name='answers']:checked").val();
            if(selectedPremature == "premature"){
               gotoResults("similac-neosure");
            }else if(selectedPremature == 'on-time'){
                showHideQuestion(2,1);
            }
            break;
          case 2:
            formulaUsage = $("fieldset[data-wizarditem='2'] input[name='answers']:checked").val();
            if(formulaUsage == "formula" || formulaUsage == 'supplementing-formula'){
                showHideQuestion(3,2);
            }else if(formulaUsage == 'introduce-formula'){
                gotoResults("similac-360-total-care");
            }
            break;
          case 3:
            afterEffects = $("fieldset[data-wizarditem='3'] input[name='answers']:checked").val();
            validateAEVal(afterEffects,formulaUsage);
            
            break;
          case 4:
            milkPreference = $("fieldset[data-wizarditem='4'] input[name='answers']:checked").val();
            if(milkPreference == 'milk' || milkPreference == 'nongmo'){
                gotoResults("similac-pro-sensitive");
            }else if(milkPreference == 'soy'){
                gotoResults("similac-soy-isomil");
            }
            break;
          case 5:    
            immunePreference = $("fieldset[data-wizarditem='5'] input[name='answers']:checked").val();
            validateIPval(immunePreference);
            
            break;
          case 6:
            afterEffectsSpl = $("fieldset[data-wizarditem='6'] input[name='answers']:checked").val();
            validateAESval(gmoPreference,afterEffectsSpl);
            

            break;
          case 7:
            showHideQuestion(6,7);
            break;
        }

	});

    function showHideQuestion(show, hide){
        previousQuestion.push(hide);
        $( "fieldset[data-wizarditem]").hide();
		$( "fieldset[data-wizarditem='"+show+"']").show(); 
        $( "fieldset[data-wizarditem='"+show+"']").css("opacity", "1");
        $( "fieldset[data-wizarditem='"+show+"']").css("position", "relative");
        $( "fieldset[data-wizarditem='"+show+"']").css("left", "0%");
    }
    function goBack(previous){
       $( "fieldset[data-wizarditem]").hide();
		$( "fieldset[data-wizarditem='"+previous+"']").show();
        $( "fieldset[data-wizarditem='"+previous+"']").css("opacity", "1");
        $( "fieldset[data-wizarditem='"+previous+"']").css("position", "relative");
    }

});
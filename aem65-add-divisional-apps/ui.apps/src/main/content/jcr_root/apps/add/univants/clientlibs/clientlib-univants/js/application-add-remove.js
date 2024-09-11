$(document).ready(function() {

    $('#discipline-xf-options').addClass('adddropdown');
    $('.adddropdown').addClass('selectOption');
    $('#remove-discipline').hide();
    $('#discipline-description').parents('.fields.text').hide();
    $("#add-discipline").parent().parent().addClass("addDiscipline");
    $("#remove-discipline").parent().parent().addClass("removeDiscipline");

    $("#add-partner").parent().parent().addClass("addPartner");
    $("#remove-partner").parent().parent().addClass("removePartner");

    $(".addDiscipline").insertAfter(".removeDiscipline");
    $(".addPartner").insertAfter(".removePartner");

    $('#Kpis-qualifier-description0-patient').parents('.fields.text').hide();
    $('#kpi-category-description0-patient').parents('.fields.text').hide();
    $('#Kpis-qualifier-description0-clinician').parents('.fields.text').hide();
    $('#kpi-category-description0-clinician').parents('.fields.text').hide();

    $('#application-kpi-patient0').addClass('selectKpiList-patient');
    $('#application-kpi-clinician0').addClass('selectKpiList-clinician');

    $('.container #section-patient0-quantitative-measure-container').hide();
    $('.container #section-patient0-qualitative-measure-container').hide();

    $('.container #section-patient0-quantitative-measure-container').find('.a-input-field.mt-0').attr('data-required', false);
    $('.container #section-patient0-qualitative-measure-container').find('.a-input-field.mt-0').attr('data-required', false);

    $('#remove-patient-kpi').hide();
    $('#remove-clinician-kpi').hide();
    $('#remove-hospital-kpi').hide();
    $('#remove-payor-kpi').hide();
	
    $('#remove-patient-kpi').addClass('remove-patient-kpi');
    $('#add-patient-kpi').addClass('add-patient-kpi');

	$('#remove-clinician-kpi').addClass('remove-clinician-kpi');
    $('#add-clinician-kpi').addClass('add-clinician-kpi');


	$('#remove-hospital-kpi').addClass('remove-hospital-kpi');
    $('#add-hospital-kpi').addClass('add-hospital-kpi');


	$('#remove-payor-kpi').addClass('remove-payor-kpi');
    $('#add-payor-kpi').addClass('add-payor-kpi');	
	
	

     $('.remove-patient-kpi').parents('.link').addClass('removelinkSpacing');
    $('.add-patient-kpi').parents('.link').addClass('addlinkpacing');

    $('.remove-clinician-kpi').parents('.link').addClass('removelinkSpacing');
    $('.add-clinician-kpi').parents('.link').addClass('addlinkpacing');


    $('.remove-hospital-kpi').parents('.link').addClass('removelinkSpacing');
    $('.add-hospital-kpi').parents('.link').addClass('addlinkpacing');


    $('.remove-payor-kpi').parents('.link').addClass('removelinkSpacing');
    $('.add-payor-kpi').parents('.link').addClass('addlinkpacing');
	
	
    $('#patientKpis-measureOfImpact0-options').addClass('patientKpis-measureOfImpact0-options');
    $('#patient0-stakeholder-impact-rating-options').addClass('patient0-stakeholder-impact-rating-options');

    $('#Kpis-qualifier-description0-hospital').parents('.fields.text').hide();
    $('#kpi-category-description0-hospital').parents('.fields.text').hide();
    $('#application-kpi-hospital0').addClass('selectKpiList-hospital');
    $('#Kpis-qualifier-description0-payor').parents('.fields.text').hide();
    $('#kpi-category-description0-payor').parents('.fields.text').hide();
    $('#application-kpi-payor0').addClass('selectKpiList-payor');
	
	
	$('#Kpis-qualifier-description0-patient').parents('.fields.text').find('.a-input-field.mt-0').attr('data-required', false);
    $('#kpi-category-description0-patient').parents('.fields.text').find('.a-input-field.mt-0').attr('data-required', false);
    $('#Kpis-qualifier-description0-clinician').parents('.fields.text').find('.a-input-field.mt-0').attr('data-required', false);
    $('#kpi-category-description0-clinician').parents('.fields.text').find('.a-input-field.mt-0').attr('data-required', false);
        $('#Kpis-qualifier-description0-hospital').parents('.fields.text').find('.a-input-field.mt-0').attr('data-required', false);
    $('#kpi-category-description0-hospital').parents('.fields.text').find('.a-input-field.mt-0').attr('data-required', false);
        $('#Kpis-qualifier-description0-payor').parents('.fields.text').find('.a-input-field.mt-0').attr('data-required', false);
    $('#kpi-category-description0-payor').parents('.fields.text').find('.a-input-field.mt-0').attr('data-required', false);
	
	$('#Kpis-qualifier-description0-patient').removeAttr('required');
    $('#kpi-category-description0-patient').removeAttr('required');
    $('#Kpis-qualifier-description0-clinician').removeAttr('required');
    $('#kpi-category-description0-clinician').removeAttr('required');
    $('#Kpis-qualifier-description0-hospital').removeAttr('required');
    $('#kpi-category-description0-hospital').removeAttr('required');
    $('#Kpis-qualifier-description0-payor').removeAttr('required');
    $('#kpi-category-description0-payor').removeAttr('required');	


    let enableApplnSubmitbtn = $('#application-form-container').closest('body');
    enableApplnSubmitbtn.click(function() {
        
        let checkbox = $('#confirm-checkbox-options .a-checkbox__input:checked').length;
         let count = enablingSubmitButton();
        if (($('.validation-require').length == 0 && $('.validation-regex').length == 0) && (checkbox == 3) &&(count==4)) {
            $("#error-text").hide();
            $('#confirmation-tab-submit').removeAttr('disabled');
        }
        else {
            $("#error-text").show();
            $('#confirmation-tab-submit').attr('disabled', 'disabled');
        }
    });

       
    $('#application-form-container input[type="checkbox"]').on('change', function() {
        if ($('.validation-require').length > 0) {
            $('#confirmation-tab-submit').attr('disabled', 'disabled');
            $(".error-text").show();
        }

    });
    $(document).on("change", "#confirm-checkbox-options input", function (e) {
       
        let count = enablingSubmitButton();
        let checkbox = $('#confirm-checkbox-options .a-checkbox__input:checked').length;
        if ((checkbox == 3) && $('.validation-require').length == 0 && $('.validation-regex').length == 0 && (count==4)) {
    
            $("#error-text").hide();
            $('#confirmation-tab-submit').removeAttr('disabled');
            if ((Number($('.displayPercent').text()) >= 95)&&((Number($('.displayPercent').text()) < 100))){
                  $('#confirmation-tab-submit span').html('SAVE & SUBMIT APPLICATION');
            }
        }
        else {
            $('#confirmation-tab-submit').attr('disabled', 'disabled');
            $("#error-text").show();
            $('#confirmation-tab-submit span').html('SUBMIT APPLICATION');
    
        }
    });
    $(document).on("click", "#application-container-item-4-tab", function (e) {
        let checkbox = $('#confirm-checkbox-options .a-checkbox__input:checked').length;
         let count = enablingSubmitButton();
        if (($('.validation-require').length == 0 && $('.validation-regex').length == 0) && (checkbox == 3) &&(count==4)) {
            $("#error-text").hide();
            $('#confirmation-tab-submit').removeAttr('disabled');
        }
        else {
            $("#error-text").show();
            $('#confirmation-tab-submit').attr('disabled', 'disabled');
        }
    });
    $(document).on("click", "#application-btn-continue3", function (e) {
        let checkbox = $('#confirm-checkbox-options .a-checkbox__input:checked').length;
          let count = enablingSubmitButton();
        if (($('.validation-require').length == 0 && $('.validation-regex').length == 0) && (checkbox == 3)&&(count==4)) {
            $("#error-text").hide();
            $('#confirmation-tab-submit').removeAttr('disabled');
        }
        else {
            $("#error-text").show();
            $('#confirmation-tab-submit').attr('disabled', 'disabled');
        }
    });
	$(document).on("keyup", "#discipline-description", function(e) {
		let describdisciplineLength = $(this).val().length;
		if(describdisciplineLength == 0){
			$(this).parents('.form-group').addClass('validation-require');
		}
		else{
			$(this).parents('.form-group').removeClass('validation-require');
		}
	});
   $('#discipline-description').parents('.a-input-field').removeAttr('data-required');
   $('#discipline-description').removeAttr('required');	
   //TOOLTIP
     //added custom tooltip-PatientKPI
  $(document).on('mouseenter', '.selectKpiList-patient [data-toggle="tooltip"]', function () {
    let tootltipText = $(this).attr('data-original-title').replace(/(<([^>]+)>)/ig, '').trim();
    if (!($(this).closest('.selectKpiList-patient').attr('id') == 'application-kpi-patient0')) {
        $(this).after('<span class="tooltiptext">' + tootltipText + '</span>')
    }
});
$(document).on('mouseleave', '.selectKpiList-patient [data-toggle="tooltip"]', function () {
    $(this).next().remove();
});

//added custom tooltip-ClinicianKPI
    $(document).on('mouseenter', '.selectKpiList-clinician [data-toggle="tooltip"]', function () {
        let tootltipText = $(this).attr('data-original-title').replace(/(<([^>]+)>)/ig, '').trim();
        if (!($(this).closest('.selectKpiList-clinician').attr('id') == 'application-kpi-clinician0')) {
            $(this).after('<span class="tooltiptext">' + tootltipText + '</span>')
        }
    });
    $(document).on('mouseleave', '.selectKpiList-clinician [data-toggle="tooltip"]', function () {
        $(this).next().remove();
    });
//added custom tooltip-HospitalKPI
    $(document).on('mouseenter', '.selectKpiList-hospital [data-toggle="tooltip"]', function () {
        let tootltipText = $(this).attr('data-original-title').replace(/(<([^>]+)>)/ig, '').trim();
        if (!($(this).closest('.selectKpiList-hospital').attr('id') == 'application-kpi-hospital0')) {
            $(this).after('<span class="tooltiptext">' + tootltipText + '</span>')
        }
    });
    $(document).on('mouseleave', '.selectKpiList-hospital [data-toggle="tooltip"]', function () {
        $(this).next().remove();
    });
    
//added custom tooltip -PayorKPI 
$(document).on('mouseenter', '.selectKpiList-payor [data-toggle="tooltip"]', function () {
        let tootltipText = $(this).attr('data-original-title').replace(/(<([^>]+)>)/ig, '').trim();
        if (!($(this).closest('.selectKpiList-payor').attr('id') == 'application-kpi-payor0')) {
            $(this).after('<span class="tooltiptext">' + tootltipText + '</span>')
        }
    });
    $(document).on('mouseleave', '.selectKpiList-payor [data-toggle="tooltip"]', function () {
        $(this).next().remove();
    });
//KPI's character limit	
$('.character-count').parents('.title').prev().find('textarea').addClass('kpiCharactercount');

 $('.character-count').each(function() {
    let a = $(this).clone().removeClass('character-count').addClass('maxCount').hide();
     $(this).text(a.text());
     a.insertAfter($(this));
 });
 $('.kpiCharactercount').parents('.fields').addClass('textarea-count');

 $(document).on("keyup", ".kpiCharactercount", function(e) {
     let maxcount = $(this).parents('.text').next().find('.maxCount').text();
     let textlen = this.value.length;
     if (textlen > maxcount) {
         this.value = this.value.substring(0, maxcount);
     } else {
         $(this).parents('.text').next().find('.character-count').text(maxcount - textlen)

     }
 });


});
//select and QUALIFIER
$(document).ready(function()
    {
        /* Patient select KPI */
   	$(document).on("click", ".selectKpiList-patient #kpi-category0-patient-options .a-dropdown__field", function(e) {
		if ($(this).find('.dropdowncategorySelected').length <= 0) {
            $(this).parents('.a-dropdown').addClass('validation-require');
    
        } else {
            $(this).parents('.a-dropdown').removeClass('validation-require');
        }
	});

	$(document).on("click", ".selectKpiList-patient #kpi-category0-patient-options .a-dropdown__field ul li", function(e) {
		$('.selectKpiList-patient #kpi-category0-patient-options .a-dropdown__field ul li').removeClass('dropdowncategorySelected');
		$(this).addClass('dropdowncategorySelected');
		if ($('.dropdowncategorySelected').length > 0) {
			$(this).parents('.a-dropdown').removeClass('validation-require');

		} else {
			$(this).parents('.a-dropdown').addClass('validation-require');
		}
	});

	/* Patient select qualifier */
	$(document).on("click", ".selectKpiList-patient #Kpis-qualifier0-patient-options .a-dropdown__field", function(e) {
		if ($(this).find('.dropdownqualifierSelected').length <= 0) {
			$(this).parents('.a-dropdown').addClass('validation-require');

		} else {
			$(this).parents('.a-dropdown').removeClass('validation-require');
		}
	});

	$(document).on("click", ".selectKpiList-patient #Kpis-qualifier0-patient-options .a-dropdown__field ul li", function(e) {
		$('.selectKpiList-patient #Kpis-qualifier0-patient-options .a-dropdown__field ul li').removeClass('dropdownqualifierSelected');
		$(this).addClass('dropdownqualifierSelected');
		if ($('.dropdownqualifierSelected').length > 0) {
			$(this).parents('.a-dropdown').removeClass('validation-require');

		} else {
			$(this).parents('.a-dropdown').addClass('validation-require');
		}
	});

	/* Clinician select KPI */
	$(document).on("click", ".selectKpiList-clinician #kpi-category0-clinician-options .a-dropdown__field", function(e) {
		if ($(this).find('.dropdowncategoryclinicianSelected').length <= 0) {
			$(this).parents('.a-dropdown').addClass('validation-require');

		} else {
			$(this).parents('.a-dropdown').removeClass('validation-require');
		}
	});

	$(document).on("click", ".selectKpiList-clinician #kpi-category0-clinician-options .a-dropdown__field ul li", function(e) {
		$('.selectKpiList-clinician #kpi-category0-clinician-options .a-dropdown__field ul li').removeClass('dropdowncategoryclinicianSelected');
		$(this).addClass('dropdowncategoryclinicianSelected');
		if ($('.dropdowncategoryclinicianSelected').length > 0) {
			$(this).parents('.a-dropdown').removeClass('validation-require');

		} else {
			$(this).parents('.a-dropdown').addClass('validation-require');
		}
	});
	/* Clinician select qualifier */
	$(document).on("click", ".selectKpiList-clinician #Kpis-qualifier0-clinician-options .a-dropdown__field", function(e) {
		if ($(this).find('.dropdownqualifierclinicianSelected').length <= 0) {
			$(this).parents('.a-dropdown').addClass('validation-require');

		} else {
			$(this).parents('.a-dropdown').removeClass('validation-require');
		}
	});

	$(document).on("click", ".selectKpiList-clinician #Kpis-qualifier0-clinician-options .a-dropdown__field ul li", function(e) {
		$('.selectKpiList-clinician #Kpis-qualifier0-clinician-options .a-dropdown__field ul li').removeClass('dropdownqualifierclinicianSelected');
		$(this).addClass('dropdownqualifierclinicianSelected');
		if ($('.dropdownqualifierclinicianSelected').length > 0) {
			$(this).parents('.a-dropdown').removeClass('validation-require');

		} else {
			$(this).parents('.a-dropdown').addClass('validation-require');
		}
	});

	/* Hospital select KPI */
	$(document).on("click", ".selectKpiList-hospital #kpi-category0-hospital-options .a-dropdown__field", function(e) {
		if ($(this).find('.dropdowncategoryhospitalSelected').length <= 0) {
			$(this).parents('.a-dropdown').addClass('validation-require');

		} else {
			$(this).parents('.a-dropdown').removeClass('validation-require');
		}
	});

	$(document).on("click", ".selectKpiList-hospital #kpi-category0-hospital-options .a-dropdown__field ul li", function(e) {
		$('.selectKpiList-hospital #kpi-category0-hospital-options .a-dropdown__field ul li').removeClass('dropdowncategoryhospitalSelected');
		$(this).addClass('dropdowncategoryhospitalSelected');
		if ($('.dropdowncategoryhospitalSelected').length > 0) {
			$(this).parents('.a-dropdown').removeClass('validation-require');

		} else {
			$(this).parents('.a-dropdown').addClass('validation-require');
		}
	});
	/* Hospital select qualifier */
	$(document).on("click", ".selectKpiList-hospital #Kpis-qualifier0-hospital-options .a-dropdown__field", function(e) {
		if ($(this).find('.dropdownqualifierhospitalSelected').length <= 0) {
			$(this).parents('.a-dropdown').addClass('validation-require');

		} else {
			$(this).parents('.a-dropdown').removeClass('validation-require');
		}
	});

	$(document).on("click", ".selectKpiList-hospital #Kpis-qualifier0-hospital-options .a-dropdown__field ul li", function(e) {
		$('.selectKpiList-hospital #Kpis-qualifier0-hospital-options .a-dropdown__field ul li').removeClass('dropdownqualifierhospitalSelected');
		$(this).addClass('dropdownqualifierhospitalSelected');
		if ($('.dropdownqualifierhospitalSelected').length > 0) {
			$(this).parents('.a-dropdown').removeClass('validation-require');

		} else {
			$(this).parents('.a-dropdown').addClass('validation-require');
		}
	});

	/* Payor select KPI */
	$(document).on("click", ".selectKpiList-payor #kpi-category0-payor-options .a-dropdown__field", function(e) {
		if ($(this).find('.dropdowncategorypayorSelected').length <= 0) {
			$(this).parents('.a-dropdown').addClass('validation-require');

		} else {
			$(this).parents('.a-dropdown').removeClass('validation-require');
		}
	});

	$(document).on("click", ".selectKpiList-payor #kpi-category0-payor-options .a-dropdown__field ul li", function(e) {
		$('.selectKpiList-payor #kpi-category0-payor-options .a-dropdown__field ul li').removeClass('dropdowncategorypayorSelected');
		$(this).addClass('dropdowncategorypayorSelected');
		if ($('.dropdowncategorypayorSelected').length > 0) {
			$(this).parents('.a-dropdown').removeClass('validation-require');

		} else {
			$(this).parents('.a-dropdown').addClass('validation-require');
		}
	});
	/* Payor select qualifier */
	$(document).on("click", ".selectKpiList-payor #Kpis-qualifier0-payor-options .a-dropdown__field", function(e) {
		if ($(this).find('.dropdownqualifierpayorSelected').length <= 0) {
			$(this).parents('.a-dropdown').addClass('validation-require');

		} else {
			$(this).parents('.a-dropdown').removeClass('validation-require');
		}
	});

	$(document).on("click", ".selectKpiList-payor #Kpis-qualifier0-payor-options .a-dropdown__field ul li", function(e) {
		$('.selectKpiList-payor #Kpis-qualifier0-payor-options .a-dropdown__field ul li').removeClass('dropdownqualifierpayorSelected');
		$(this).addClass('dropdownqualifierpayorSelected');
		if ($('.dropdownqualifierpayorSelected').length > 0) {
			$(this).parents('.a-dropdown').removeClass('validation-require');

		} else {
			$(this).parents('.a-dropdown').addClass('validation-require');
		}
	});

})

//adding Discipline-description-Validation
$(document).ready(function()
{
    $(document).on("keyup", "#discipline-description", function(e) {
		let describdisciplineLength = $(this).val().length;
		if(describdisciplineLength == 0){
			$(this).parents('.form-group').addClass('validation-require');
		}
		else{
			$(this).parents('.form-group').removeClass('validation-require');
		}
	});

		$(document).on("focus", "#discipline-description", function(e) {
		let describdisciplineLength = $(this).val().length;
		if(describdisciplineLength == 0){
			$(this).parents('.form-group').addClass('validation-require');
		}
		else{
			$(this).parents('.form-group').removeClass('validation-require');
		}
	});
})

function checkboxSelection(checkbox) {
    if ((checkbox == 3) && $('.validation-require').length == 0 && $('.validation-regex').length == 0) {

        $("#error-text").hide();
        if ((Number($('.displayPercent').text()) >= 95) && ((Number($('.displayPercent').text()) < 100))) {
            $('#confirmation-tab-submit span').html('SAVE & SUBMIT APPLICATION');
        }
    }
    else {
        $('#confirmation-tab-submit').attr('disabled', 'disabled');
        $("#error-text").show();
        $('#confirmation-tab-submit span').html('SUBMIT APPLICATION');

    }
}
/* textarea and input validations for measurable impact tab */
$(document).ready(function()
{
    $(document).on("keyup", "#application-container-item-2 .form-group input[type='text'], #application-container-item-2 .form-group textarea", function(e) {
        let textandinput = $(this).val().length;
        if (textandinput == 0) {
            $(this).parents('.form-group').addClass('validation-require');
        } else {
            $(this).parents('.form-group').removeClass('validation-require');
        }
    });
    
    $(document).on("focus", "#application-container-item-2 .form-group input[type='text'], #application-container-item-2 .form-group textarea", function(e) {
    let textandinputlength = $(this).val().length;
    if (textandinputlength == 0) {
        $(this).parents('.form-group').addClass('validation-require');
    } else {
        $(this).parents('.form-group').removeClass('validation-require');
    }
    });
})

//Discipline
$(document).ready(function()
{
 //ADD Discipline
 $(document).on("click", "#add-discipline", function(e) {
    let eventClone;
    let count;
    count = $('.adddropdown:visible').length + 1;
    $('#remove-discipline').show();
    if (count <= 19) {
        eventClone = $('.adddropdown:eq(0)').clone().addClass('selectOption');
        eventClone.find(".fields.text").remove();
        eventClone.find('.a-dropdown-selected').removeClass().addClass('a-dropdown__placeholder').text('PLEASE CHOOSE A DISCIPLINE');
        eventClone.insertAfter('.adddropdown:last');
    }
    if(count > 1){
        $(".removeDiscipline").show();
    }
});

//Remove Discipline
$('#remove-discipline').click(function(e) {
    let removeCount = $('.adddropdown:visible').length;
    if (removeCount > 1) {
        $('.adddropdown:last').remove();
        removeCount = removeCount - 1;
    }
    if (removeCount == 1) {
        $('#remove-discipline').hide();
    }
});

//Discipline On change
$(document).on("click", ".adddropdown  ul li", function(e) {
    let onselectdiscipline = $(this).attr("data-optionvalue");
    if (onselectdiscipline == "CLINICAL_DEPARTMENT" || onselectdiscipline == "OTHER") {
        if (($(this).parents('.a-dropdown').next('.fields.text').length) == 0) {
            $('#discipline-description').closest('.fields').clone().insertAfter($(this).parents('.a-dropdown'));
            $(this).parents('.a-dropdown').next('.fields.text').show().addClass('pleaseDescribe');
            $(this).parents('.a-dropdown').next('.fields.text').find('input#discipline-description').show().addClass("reqFieldClass");
            $(this).parents('.a-dropdown').next('.fields.text').find('input#discipline-description').val('');
            $(this).parents('.a-dropdown').next('.fields.text').find('input#discipline-description').prop('required',true);
            $(this).parents('.a-dropdown').next('.fields.text').find('input#discipline-description').parents('.a-input-field').attr('data-required', true);
            

        } else {
            $(this).parents('.a-dropdown').next('.fields.text').show().addClass('pleaseDescribe');
            $(this).parents('.a-dropdown').next('.fields.text').find('input#discipline-description').show().addClass("reqFieldClass");
            $(this).parents('.a-dropdown').next('.fields.text').find('input#discipline-description').val('');
            $(this).parents('.a-dropdown').next('.fields.text').find('input#discipline-description').prop('required',true);
            $(this).parents('.a-dropdown').next('.fields.text').find('input#discipline-description').parents('.a-input-field').attr('data-required', true);				
            
        }
    } else {
        $(this).parents('.a-dropdown').next('.fields.text').find('#discipline-description').hide().removeClass('reqFieldClass');
        $(this).parents('.a-dropdown').next('.fields.text').find('input#discipline-description').prop('required',false);
        $(this).parents('.a-dropdown').next('.fields.text').find('input#discipline-description').parents('.a-input-field').attr('data-required', false);
         $(this).parents('.a-dropdown').next('.fields.text').find('#discipline-description').parents('.form-group ').removeClass('validation-require');
    }

});
})

//Patient  
$(document).ready(function()
{
//ADD Patient KPI
let forradibuttons = 0;
$(document).on("click", "#add-patient-kpi", function(e) {
    let eventpatientClone;
    let countpatient;
    countpatient = $('.selectKpiList-patient:visible').length + 1;

    if (countpatient <= 10) {
        eventpatientClone = $('.selectKpiList-patient:eq(0)').clone().addClass('selectKpiList-patient');
        //commit
        $(this).hide();
        $(this).parents('.selectKpiList-patient').find('.remove-patient-kpi').show();
        eventpatientClone.find('#remove-patient-kpi').show();
         eventpatientClone.find('#add-patient-kpi').show();
        let newIDattr = $('.selectKpiList-patient:eq(0)').attr('id');
        let Idreplaced = newIDattr.slice(0, -1) + (countpatient-1);
        eventpatientClone.attr('id', Idreplaced);
        let str = eventpatientClone.find('#application-kpi-title-patient p').text();
        let lastIndex = str.lastIndexOf(" ");
        let addIndex = countpatient;
        str = str.substring(0, lastIndex) + " " + addIndex;
        eventpatientClone.find('#application-kpi-title-patient p').text(str);
        eventpatientClone.find('.options #kpi-category0-patient-options .a-dropdown-selected').removeClass().addClass('a-dropdown__placeholder').text('PLEASE CHOOSE A KPI');
        eventpatientClone.find('.options #Kpis-qualifier0-patient-options .a-dropdown-selected').removeClass().addClass('a-dropdown__placeholder').text('PLEASE CHOOSE A QUALIFIER');
        eventpatientClone.find('ul li').removeClass('selected');
        eventpatientClone.find('input[type="radio"]').prop('checked', false)
        let forattr = 0;
        eventpatientClone.find('#Kpis-measureOfImpact0-patient-options input').attr('name', 'Kpis-measureOfImpact0Patient' + countpatient);
        eventpatientClone.find('#Kpis-measureOfImpact0-patient-options input').each(function() {
            $(this).attr('checked', false);
            $(this).next('span').attr('aria-checked', 'false');
            $(this).removeClass('selected');
            $(this).closest('label').attr("for", 'Kpis-measureOfImpact0Patient' + countpatient + forattr+forradibuttons);
            $(this).attr("id", 'Kpis-measureOfImpact0Patient' + countpatient + forattr+forradibuttons);
            forattr = forattr + 1;
        });
        eventpatientClone.find('#stakeholder-impact-rating0-patient-options input').attr('name', 'stakeholder-impact-rating0Patient' + countpatient);
        eventpatientClone.find('#stakeholder-impact-rating0-patient-options input').each(function() {
            $(this).attr('checked', false);
            $(this).next('span').attr('aria-checked', 'false');
            $(this).removeClass('selected');
            $(this).closest('label').attr("for", 'stakeholder-impact-rating0Patient' + countpatient + forattr+forradibuttons);
            $(this).attr("id", 'stakeholder-impact-rating0Patient' + countpatient + forattr+forradibuttons);
            forattr = forattr + 1;
        });
        eventpatientClone.find('#section-patient0-qualitative-measure-container').hide();
        eventpatientClone.find('#section-patient0-quantitative-measure-container').hide();
        eventpatientClone.find('#section-patient0-quantitative-measure-container #Kpis0-quantitativeDescription').val('');
        eventpatientClone.find('#section-patient0-qualitative-measure-container #Kpi0-directquote').val('');
        eventpatientClone.find('#section-patient0-qualitative-measure-container #Kpis0-sourceName').val('');
        eventpatientClone.find('#section-patient0-qualitative-measure-container #Kpis0-sourceTitle').val('');
        eventpatientClone.find('#stakeholder-impact0-patient').val('').attr("style",'');
        eventpatientClone.find('#Kpis0-quantitativeDescription-patient').val('').attr("style",''); 
        eventpatientClone.find("#Kpi0-directquote-patient").val('').attr("style",''); 
        eventpatientClone.find("#stakeholder-impact0-patient").val('').attr("style",'');
        eventpatientClone.find('#stakeholder-impact0-patient').parents('.text').next().find('.character-count').text('1000');
        eventpatientClone.find('.pleaseDescribe').hide();
        eventpatientClone.find('.pleaseDescribe input').val('');
        eventpatientClone.find('.validation-require').removeClass('validation-require');
        eventpatientClone.find('.dropdownqualifierSelected').removeClass('dropdownqualifierSelected');
        eventpatientClone.find('.dropdowncategorySelected').removeClass('dropdowncategorySelected');

        eventpatientClone.insertAfter('.selectKpiList-patient:last');
        forradibuttons++;
    }
    if(countpatient == '10'){
        $('.selectKpiList-patient:last').find('#add-patient-kpi').hide();
    }		

});


//Remove PatientKPI
let titleLastword;    
$(document).on("click", "#remove-patient-kpi", function(e) {
 $('.selectKpiList-patient').removeClass('kpiPatientlist');
    titleLastword = $(this).parents('.selectKpiList-patient').find('#application-kpi-title-patient p').text().split(" ").pop(); 
  $(this).parents('.selectKpiList-patient').nextAll().addClass('kpiPatientlist');
     $('.kpiPatientlist').each(function(){
        let titlestr = $(this).find('#application-kpi-title-patient p').text()
        let titlelastIndex = titlestr.lastIndexOf(" ");
        let titleaddIndex = titleLastword;
        titlestr = titlestr.substring(0, titlelastIndex) + " " + titleaddIndex;
       $(this).find('#application-kpi-title-patient p').text(titlestr);
         titleLastword++;
   });

   $(this).parents('.selectKpiList-patient').remove();
    let removePatientCount = $('.selectKpiList-patient:visible').length;
    if (removePatientCount < 2) {
       $('.selectKpiList-patient:eq(0)').find('#remove-patient-kpi').hide();
        $('.selectKpiList-patient:eq(0)').find('#add-patient-kpi').show();
    } 
    let showAdd = removePatientCount -1;
    $('.selectKpiList-patient:eq('+showAdd+')').find('#add-patient-kpi').show();
});



//select patient qualifier dropdown
$(document).on("click", "ul[name='Kpis-qualifier0-patient'] li", function(e) {
    let onselectqualifier = $(this).attr("data-optionvalue");
    if (onselectqualifier == "OTHER") {
        if (($(this).parents('.options').next('.fields.text:visible').length) == 0) {
             $(this).parents('.options').next('.fields.text').addClass('pleaseDescribe');
             $(this).parents('.options').next('.fields.text').show();
            $(this).parents('.options').next('.fields.text').find('.a-input-field.mt-0').attr('data-required', true);
            $(this).parents('.options').next('.fields.text').find('input#Kpis-qualifier-description0-patient').val('').attr('required', true).addClass("reqFieldClass");
          }  

    } 
    else {
         $(this).parents('.options').next('.fields.text').hide();             
         $(this).parents('.options').next('.fields.text').find('#Kpis-qualifier-description0-patient').val('');
         $(this).parents('.options').next('.fields.text').find('.a-input-field.mt-0').attr('data-required', false);
         $(this).parents('.options').next('.fields.text').find('input#Kpis-qualifier-description0-patient').attr('required', false).removeClass("reqFieldClass");					 

    }


});

//select patient KPI dropdown
$(document).on("click", "ul[name='kpi-category0-patient'] li", function(e) {
    let onselectKPI = $(this).attr("data-optionvalue");
    if (onselectKPI == "OTHER_PATIENT" || onselectKPI == "OTHER") {
        if (($(this).parents('.options').next('.fields.text:visible').length) == 0) {
             $(this).parents('.options').next('.fields.text').addClass('pleaseDescribe');
             $(this).parents('.options').next('.fields.text').show();
            $(this).parents('.options').next('.fields.text').find('.a-input-field.mt-0').attr('data-required', true);
            $(this).parents('.options').next('.fields.text').find('input#kpi-category-description0-patient').val('').attr('required', true).addClass("reqFieldClass");
          }  

    } 
    else {
         $(this).parents('.options').next('.fields.text').hide();
         $(this).parents('.options').next('.fields.text').find('#kpi-category-description0-patient').val('');
         $(this).parents('.options').next('.fields.text').find('.a-input-field.mt-0').attr('data-required', false);
         $(this).parents('.options').next('.fields.text').find('input#kpi-category-description0-patient').attr('required', false).removeClass("reqFieldClass");					 

    }


});

//Patient Quantitative and Qualitative on change
$(document).on("click", "#Kpis-measureOfImpact0-patient-options input", function(e) {
    let radiomeasureValue = $(this).val();
    if (radiomeasureValue == 'quantitative') {
        $(this).addClass('selected');
        $(this).attr('checked', true);
        $(this).next('span').attr('aria-checked', 'true');
        $(this).parents('#Kpis-measureOfImpact0-patient-options').find('input:eq(1)').attr('checked', false);
        $(this).parents('#Kpis-measureOfImpact0-patient-options').find('input:eq(1)').removeClass('selected');
        $(this).parents('#Kpis-measureOfImpact0-patient-options').find('input:eq(1)').next('span').attr('aria-checked', 'false');
        if ($(this).parents('#helpful-hint-entry-point').find('#section-patient0-quantitative-measure-container:visible').length < 1) {
            $(this).parents('#helpful-hint-entry-point').find('#section-patient0-quantitative-measure-container').show();
            $(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container').hide();
            $(this).parents('#helpful-hint-entry-point').find('#section-patient0-quantitative-measure-container #Kpis0-quantitativeDescription-patient').val('');
            $(this).parents('#helpful-hint-entry-point').find('#section-patient0-quantitative-measure-container .character-count').text('1000');
            $(this).parents('#helpful-hint-entry-point').find('#section-patient0-quantitative-measure-container .a-input-field.mt-0').attr('data-required', true);
            $(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container .a-input-field.mt-0').attr('data-required', false);
        }

    } else if (radiomeasureValue == 'qualitative') {
        $(this).addClass('selected');
        $(this).attr('checked', true);
        $(this).next('span').attr('aria-checked', 'true');
        $(this).parents('#Kpis-measureOfImpact0-patient-options').find('input:eq(0)').attr('checked', false);
        $(this).parents('#Kpis-measureOfImpact0-patient-options').find('input:eq(0)').removeClass('selected');
        $(this).parents('#Kpis-measureOfImpact0-patient-options').find('input:eq(0)').next('span').attr('aria-checked', 'false');

        if ($(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container:visible').length < 1) {
            $(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container').show();
            $(this).parents('#helpful-hint-entry-point').find('#section-patient0-quantitative-measure-container').hide();
            $(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container #Kpi0-directquote-patient').val('');
            $(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container #Kpis0-sourceName-patient').val('');
            $(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container #Kpis0-sourceTitle-patient').val('');
            $(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container #Kpi0-directquote-patient').parents('.text').next().find('.character-count').text('1000');
            $(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container #Kpi0-sourceName-patient').parents('.text').next().find('.character-count').text('255');                
            $(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container #Kpi0-sourceTitle-patient').parents('.text').next().find('.character-count').text('255'); 
            $(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container .a-input-field.mt-0').attr('data-required', true);
            $(this).parents('#helpful-hint-entry-point').find('#section-patient0-quantitative-measure-container .a-input-field.mt-0').attr('data-required', false);
        }

    }
});


//patient impact rating on change
$(document).on("click", "#stakeholder-impact-rating0-patient-options input", function(e) {
    $(this).parents('#stakeholder-impact-rating0-patient-options').find(' input').removeClass('selected');
    $(this).addClass('selected')
    $(this).attr('checked', true);
    $(this).next('span').attr('aria-checked', 'true');

});

})

//Clinican  
$(document).ready(function()
{
    //select clinician qualifier dropdown
    $(document).on("click", "ul[name='Kpis-qualifier0-clinician'] li", function(e) {
        let onselectqualifier = $(this).attr("data-optionvalue");
        if (onselectqualifier == "OTHER") {
            if (($(this).parents('.options').next('.fields.text:visible').length) == 0) {
                 $(this).parents('.options').next('.fields.text').addClass('pleaseDescribe');
                 $(this).parents('.options').next('.fields.text').show();
                $(this).parents('.options').next('.fields.text').find('.a-input-field.mt-0').attr('data-required', true);
				$(this).parents('.options').next('.fields.text').find('input#Kpis-qualifier-description0-clinician').val('').attr('required', true).addClass("reqFieldClass");
              }  

        } 
        else {
             $(this).parents('.options').next('.fields.text').hide();             
             $(this).parents('.options').next('.fields.text').find('#Kpis-qualifier-description0-clinician').val('');
             $(this).parents('.options').next('.fields.text').find('.a-input-field.mt-0').attr('data-required', false);
			 $(this).parents('.options').next('.fields.text').find('input#Kpis-qualifier-description0-clinician').attr('required', false).removeClass("reqFieldClass");			 

        }

    });

    //select Clinician KPI dropdown
    $(document).on("click", "ul[name='kpi-category0-clinician'] li", function(e) {
        let onselectKPI = $(this).attr("data-optionvalue");
        if (onselectKPI == "OTHER_CLINICIAN" || onselectKPI == "OTHER") {
            if (($(this).parents('.options').next('.fields.text:visible').length) == 0) {
                 $(this).parents('.options').next('.fields.text').addClass('pleaseDescribe');
                 $(this).parents('.options').next('.fields.text').show();
                $(this).parents('.options').next('.fields.text').find('.a-input-field.mt-0').attr('data-required', true);
				$(this).parents('.options').next('.fields.text').find('input#kpi-category-description0-clinician').val('').attr('required', true).addClass("reqFieldClass");
              }  

        } 
        else {
             $(this).parents('.options').next('.fields.text').hide();             
             $(this).parents('.options').next('.fields.text').find('#kpi-category-description0-clinician').val('');
             $(this).parents('.options').next('.fields.text').find('.a-input-field.mt-0').attr('data-required', false);
			 $(this).parents('.options').next('.fields.text').find('input#kpi-category-description0-clinician').attr('required', false).removeClass("reqFieldClass");					 

        }

    });


    //Clinician Quantitative and Qualitative on change
    $(document).on("click", "#Kpis-measureOfImpact0-clinician-options input", function(e) {
        let radiomeasureValue = $(this).val();
        if (radiomeasureValue == 'quantitative') {
            $(this).addClass('selected');
            $(this).attr('checked', true);
            $(this).next('span').attr('aria-checked', 'true');
            $(this).parents('#Kpis-measureOfImpact0-clinician-options').find('input:eq(1)').attr('checked', false);
            $(this).parents('#Kpis-measureOfImpact0-clinician-options').find('input:eq(1)').removeClass('selected');
            $(this).parents('#Kpis-measureOfImpact0-clinician-options').find('input:eq(1)').next('span').attr('aria-checked', 'false');
            if ($(this).parents('#helpful-hint-entry-point').find('#section-patient0-quantitative-measure-container:visible').length < 1) {
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-quantitative-measure-container').show();
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container').hide();
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-quantitative-measure-container #Kpis0-quantitativeDescription-clinician').val('');
				$(this).parents('#helpful-hint-entry-point').find('#section-patient0-quantitative-measure-container .character-count').text('1000');
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-quantitative-measure-container .a-input-field.mt-0').attr('data-required', true);
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container .a-input-field.mt-0').attr('data-required', false);

            }

        } else if (radiomeasureValue == 'qualitative') {
            $(this).addClass('selected');
            $(this).attr('checked', true);
            $(this).next('span').attr('aria-checked', 'true');
            $(this).parents('#Kpis-measureOfImpact0-clinician-options').find('input:eq(0)').attr('checked', false);
            $(this).parents('#Kpis-measureOfImpact0-clinician-options').find('input:eq(0)').removeClass('selected');
            $(this).parents('#Kpis-measureOfImpact0-clinician-options').find('input:eq(0)').next('span').attr('aria-checked', 'false');
            if ($(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container:visible').length < 1) {
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container').show();
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-quantitative-measure-container').hide();
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container #Kpi0-directquote-clinician').val('');
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container #Kpis0-sourceName-clinician').val('');
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container #Kpis0-sourceTitle-clinician').val('');
				$(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container #Kpi0-directquote-clinician').parents('.text').next().find('.character-count').text('1000');
				$(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container #Kpis0-sourceName-clinician').parents('.text').next().find('.character-count').text('255');                
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container #Kpis0-sourceTitle-clinician').parents('.text').next().find('.character-count').text('255'); 
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container .a-input-field.mt-0').attr('data-required', true);
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-quantitative-measure-container .a-input-field.mt-0').attr('data-required', false);

            }

        }



    });

    //clinician impact rating on change
    $(document).on("click", "#stakeholder-impact-rating0-clinician-options input", function(e) {
        $(this).parents('#stakeholder-impact-rating0-clinician-options').find(' input').removeClass('selected');
        $(this).addClass('selected')
        $(this).attr('checked', true);
        $(this).next('span').attr('aria-checked', 'true');

    });


    //ADD Clinicain KPI
      let forclinicianradibuttons = 0;
    $(document).on("click", "#add-clinician-kpi", function(e) {
        let eventclinicianClone;
        let countpatient;
        countpatient = $('.selectKpiList-clinician:visible').length + 1;
        $('#remove-clinician-kpi').show();
        if (countpatient <= 10) {
            eventclinicianClone = $('.selectKpiList-clinician:eq(0)').clone().addClass('selectKpiList-clinician');
              $(this).hide();
            $(this).parents('.selectKpiList-clinician').find('.remove-clinician-kpi').show();
            eventclinicianClone.find('#remove-clinician-kpi').show();
             eventclinicianClone.find('#add-clinician-kpi').show();            
            let newIDattr = $('.selectKpiList-clinician:eq(0)').attr('id');
            let Idreplaced = newIDattr.slice(0, -1) + (countpatient-1);
            eventclinicianClone.attr('id', Idreplaced);
            let str = eventclinicianClone.find('#application-kpi-title-clinician p').text();
            let lastIndex = str.lastIndexOf(" ");
            let addIndex = countpatient;
            str = str.substring(0, lastIndex) + " " + addIndex;
            eventclinicianClone.find('#application-kpi-title-clinician p').text(str);
            eventclinicianClone.find('.options #kpi-category0-clinician-options .a-dropdown-selected').removeClass().addClass('a-dropdown__placeholder').text('PLEASE CHOOSE A KPI');
            eventclinicianClone.find('.options #Kpis-qualifier0-clinician-options .a-dropdown-selected').removeClass().addClass('a-dropdown__placeholder').text('PLEASE CHOOSE A QUALIFIER');
            eventclinicianClone.find('ul li').removeClass('selected');
            eventclinicianClone.find('input[type="radio"]').prop('checked', false)
            let forattr = 0;
            eventclinicianClone.find('#Kpis-measureOfImpact0-clinician-options input').attr('name', 'Kpis-measureOfImpact0Clinician' + countpatient);
            eventclinicianClone.find('#Kpis-measureOfImpact0-clinician-options input').each(function() {
                $(this).attr('checked', false);
                $(this).next('span').attr('aria-checked', 'false');
                $(this).removeClass('selected');
                $(this).closest('label').attr("for", 'Kpis-measureOfImpact0Clinician' + countpatient + forattr+forclinicianradibuttons);
                $(this).attr("id", 'Kpis-measureOfImpact0Clinician' + countpatient + forattr+forclinicianradibuttons);
                forattr = forattr + 1;
            });
            eventclinicianClone.find('#stakeholder-impact-rating0-clinician-options input').attr('name', 'stakeholder-impact-rating0Clinician' + countpatient);
            eventclinicianClone.find('#stakeholder-impact-rating0-clinician-options input').each(function() {
                $(this).attr('checked', false);
                $(this).next('span').attr('aria-checked', 'false');
                $(this).removeClass('selected');
                $(this).closest('label').attr("for", 'stakeholder-impact-rating0Clinician' + countpatient + forattr+forclinicianradibuttons);
                $(this).attr("id", 'stakeholder-impact-rating0Clinician' + countpatient + forattr+forclinicianradibuttons);
                forattr = forattr + 1;
            });
            eventclinicianClone.find('#section-patient0-qualitative-measure-container').hide();
            eventclinicianClone.find('#section-patient0-quantitative-measure-container').hide();
            eventclinicianClone.find('#section-patient0-quantitative-measure-container #Kpis0-quantitativeDescription').val('');
            eventclinicianClone.find('#section-patient0-qualitative-measure-container #Kpi0-directquote').val('');
            eventclinicianClone.find('#section-patient0-qualitative-measure-container #Kpis0-sourceName').val('');
            eventclinicianClone.find('#section-patient0-qualitative-measure-container #Kpis0-sourceTitle').val('');
            eventclinicianClone.find('#stakeholder-impact0-clinician').val('').attr("style",'');
			eventclinicianClone.find('#stakeholder-impact0-clinician').parents('.text').next().find('.character-count').text('1000');           
            eventclinicianClone.find('.pleaseDescribe').hide();
            eventclinicianClone.find('.pleaseDescribe input').val('');
            eventclinicianClone.find('.validation-require').removeClass('validation-require');
            eventclinicianClone.find('.dropdownqualifierclinicianSelected').removeClass('dropdownqualifierclinicianSelected');
            eventclinicianClone.find('.dropdowncategoryclinicianSelected').removeClass('dropdowncategoryclinicianSelected');            
			eventclinicianClone.insertAfter('.selectKpiList-clinician:last');
            eventclinicianClone.find("#Kpi0-directquote-clinician").val('').attr("style",'');
            eventclinicianClone.find("#stakeholder-impact0-clinician").val('').attr("style",'');
            eventclinicianClone.find("#Kpis0-quantitativeDescription-clinician").val('').attr("style",'');
        }
        if(countpatient == '10'){
          $('.selectKpiList-clinician:last').find('#add-clinician-kpi').hide();
        }		

    });

    //REmove Clinician KPI
   let titleLastwordc;
   $(document).on("click", "#remove-clinician-kpi", function(e) {
     $('.selectKpiList-clinician').removeClass('kpiClinicianlist');
        titleLastwordc = $(this).parents('.selectKpiList-clinician').find('#application-kpi-title-clinician p').text().split(" ").pop(); 
      $(this).parents('.selectKpiList-clinician').nextAll().addClass('kpiClinicianlist');
         $('.kpiClinicianlist').each(function(){
            let titlestrc = $(this).find('#application-kpi-title-clinician p').text()
            let titlelastIndexc = titlestrc.lastIndexOf(" ");
            let titleaddIndexc = titleLastwordc;
            titlestrc = titlestrc.substring(0, titlelastIndexc) + " " + titleaddIndexc;
           $(this).find('#application-kpi-title-clinician p').text(titlestrc);
             titleLastwordc++;
       });

       $(this).parents('.selectKpiList-clinician').remove();
        let removePatientCount = $('.selectKpiList-clinician:visible').length;
        if (removePatientCount < 2) {
           $('.selectKpiList-clinician:eq(0)').find('#remove-clinician-kpi').hide();
            $('.selectKpiList-clinician:eq(0)').find('#add-clinician-kpi').show();
        } 
        let showAdd = removePatientCount -1;
        $('.selectKpiList-clinician:eq('+showAdd+')').find('#add-clinician-kpi').show();
    });
    
})  

//Health System
$(document).ready(function()
{
    //ADD Health KPI
    let forhospitalradibuttons = 0;
    $(document).on("click", "#add-hospital-kpi", function(e) {
        let eventhospitalClone;
        let countpatient;
        countpatient = $('.selectKpiList-hospital:visible').length + 1;
        $('#remove-hospital-kpi').show();
        if (countpatient <= 10) {
            eventhospitalClone = $('.selectKpiList-hospital:eq(0)').clone().addClass('selectKpiList-hospital');
              $(this).hide();
            $(this).parents('.selectKpiList-hospital').find('.remove-hospital-kpi').show();
            eventhospitalClone.find('#remove-hospital-kpi').show();
             eventhospitalClone.find('#add-hospital-kpi').show();            
            let newIDattr = $('.selectKpiList-hospital:eq(0)').attr('id');
            let Idreplaced = newIDattr.slice(0, -1) + (countpatient-1);
            eventhospitalClone.attr('id', Idreplaced);
            let str = eventhospitalClone.find('#application-kpi-title-hospital p').text();
            let lastIndex = str.lastIndexOf(" ");
            let addIndex = countpatient;
            str = str.substring(0, lastIndex) + " " + addIndex;
            eventhospitalClone.find('#application-kpi-title-hospital p').text(str);
            eventhospitalClone.find('.options #kpi-category0-hospital-options .a-dropdown-selected').removeClass().addClass('a-dropdown__placeholder').text('PLEASE CHOOSE A KPI');
            eventhospitalClone.find('.options #Kpis-qualifier0-hospital-options .a-dropdown-selected').removeClass().addClass('a-dropdown__placeholder').text('PLEASE CHOOSE A QUALIFIER');
            eventhospitalClone.find('ul li').removeClass('selected');
            eventhospitalClone.find('input[type="radio"]').prop('checked', false)
            let forattr = 0;
            eventhospitalClone.find('#Kpis-measureOfImpact0-hospital-options input').attr('name', 'Kpis-measureOfImpact0Hospital' + countpatient);
            eventhospitalClone.find('#Kpis-measureOfImpact0-hospital-options input').each(function() {
                $(this).attr('checked', false);
                $(this).next('span').attr('aria-checked', 'false');
                $(this).removeClass('selected');
                $(this).closest('label').attr("for", 'Kpis-measureOfImpact0Hospital' + countpatient + forattr+forhospitalradibuttons);
                $(this).attr("id", 'Kpis-measureOfImpact0Hospital' + countpatient + forattr+forhospitalradibuttons);
                forattr = forattr + 1;
            });
            eventhospitalClone.find('#stakeholder-impact-rating0-hospital-options input').attr('name', 'stakeholder-impact-rating0Hospital' + countpatient);
            eventhospitalClone.find('#stakeholder-impact-rating0-hospital-options input').each(function() {
                $(this).attr('checked', false);
                $(this).next('span').attr('aria-checked', 'false');
                $(this).removeClass('selected');
                $(this).closest('label').attr("for", 'stakeholder-impact-rating0Hospital' + countpatient + forattr+forhospitalradibuttons);
                $(this).attr("id", 'stakeholder-impact-rating0Hospital' + countpatient + forattr+forhospitalradibuttons);
                forattr = forattr + 1;
            });
            eventhospitalClone.find('#section-patient0-qualitative-measure-container').hide();
            eventhospitalClone.find('#section-patient0-quantitative-measure-container').hide();
            eventhospitalClone.find('#section-patient0-quantitative-measure-container #Kpis0-quantitativeDescription').val('');
            eventhospitalClone.find('#section-patient0-qualitative-measure-container #Kpi0-directquote').val('');
            eventhospitalClone.find('#section-patient0-qualitative-measure-container #Kpis0-sourceName').val('');
            eventhospitalClone.find('#section-patient0-qualitative-measure-container #Kpis0-sourceTitle').val('');
            eventhospitalClone.find('#stakeholder-impact0-hospital').val('').attr("style",'');
			eventhospitalClone.find('#stakeholder-impact0-hospital').parents('.text').next().find('.character-count').text('1000');
            eventhospitalClone.find('.pleaseDescribe').hide();
            eventhospitalClone.find('.pleaseDescribe input').val('');
           eventhospitalClone.find('.validation-require').removeClass('validation-require');
            eventhospitalClone.find('.dropdownqualifierhospitalSelected').removeClass('dropdownqualifierhospitalSelected');
            eventhospitalClone.find('.dropdowncategoryhospitalSelected').removeClass('dropdowncategoryhospitalSelected'); 
           eventhospitalClone.insertAfter('.selectKpiList-hospital:last');
           eventhospitalClone.find("#Kpis0-quantitativeDescription-hospital").val('').attr("style",'');
           eventhospitalClone.find("#Kpi0-directquote-hospital").val('').attr("style",'');
           eventhospitalClone.find("#stakeholder-impact0-hospital").val('').attr("style",'');
        }
        if(countpatient == '10'){
           $('.selectKpiList-hospital:last').find('#add-hospital-kpi').hide();
        }
    });

    //REmove Health KPI
   let titleLastwordh;
   $(document).on("click", "#remove-hospital-kpi", function(e) {
     $('.selectKpiList-hospital').removeClass('kpiHospitallist');
        titleLastwordh = $(this).parents('.selectKpiList-hospital').find('#application-kpi-title-hospital p').text().split(" ").pop(); 
      $(this).parents('.selectKpiList-hospital').nextAll().addClass('kpiHospitallist');
         $('.kpiHospitallist').each(function(){
            let titlestrh = $(this).find('#application-kpi-title-hospital p').text()
            let titlelastIndexh = titlestrh.lastIndexOf(" ");
            let titleaddIndexh = titleLastwordh;
            titlestrh = titlestrh.substring(0, titlelastIndexh) + " " + titleaddIndexh;
           $(this).find('#application-kpi-title-hospital p').text(titlestrh);
             titleLastwordh++;
       });

       $(this).parents('.selectKpiList-hospital').remove();
        let removePatientCount = $('.selectKpiList-hospital:visible').length;
        if (removePatientCount < 2) {
           $('.selectKpiList-hospital:eq(0)').find('#remove-hospital-kpi').hide();
            $('.selectKpiList-hospital:eq(0)').find('#add-hospital-kpi').show();
        } 
        let showAdd = removePatientCount -1;
        $('.selectKpiList-hospital:eq('+showAdd+')').find('#add-hospital-kpi').show();
    });
    
    //select Health qualifier dropdown
    $(document).on("click", "ul[name='Kpis-qualifier0-hospital'] li", function(e) {
        let onselectqualifier = $(this).attr("data-optionvalue");
        if (onselectqualifier == "OTHER") {
             if (($(this).parents('.options').next('.fields.text:visible').length) == 0) {
                 $(this).parents('.options').next('.fields.text').addClass('pleaseDescribe');
                 $(this).parents('.options').next('.fields.text').show();
                $(this).parents('.options').next('.fields.text').find('.a-input-field.mt-0').attr('data-required', true);
				$(this).parents('.options').next('.fields.text').find('input#Kpis-qualifier-description0-hospital').val('').attr('required', true).addClass("reqFieldClass");
              }  

        } 
        else {
             $(this).parents('.options').next('.fields.text').hide();             
             $(this).parents('.options').next('.fields.text').find('#Kpis-qualifier-description0-hospital').val('');
             $(this).parents('.options').next('.fields.text').find('.a-input-field.mt-0').attr('data-required', false);
			$(this).parents('.options').next('.fields.text').find('input#Kpis-qualifier-description0-hospital').attr('required', false).removeClass("reqFieldClass");
			 

        }


    });

    //select Health KPI dropdown
    $(document).on("click", "ul[name='kpi-category0-hospital'] li", function(e) {
        let onselectKPI = $(this).attr("data-optionvalue");
        if (onselectKPI == "OTHER_HOSPITAL" || onselectKPI == "OTHER") {
            if (($(this).parents('.options').next('.fields.text:visible').length) == 0) {
                 $(this).parents('.options').next('.fields.text').addClass('pleaseDescribe');
                 $(this).parents('.options').next('.fields.text').show();
                $(this).parents('.options').next('.fields.text').find('.a-input-field.mt-0').attr('data-required', true);
				$(this).parents('.options').next('.fields.text').find('input#kpi-category-description0-hospital').val('').attr('required', true).addClass("reqFieldClass");
              }  

        } 
        else {
             $(this).parents('.options').next('.fields.text').hide();             
             $(this).parents('.options').next('.fields.text').find('#kpi-category-description0-hospital').val('');
             $(this).parents('.options').next('.fields.text').find('.a-input-field.mt-0').attr('data-required', false);
			 $(this).parents('.options').next('.fields.text').find('input#kpi-category-description0-hospital').attr('required', false).removeClass("reqFieldClass");					 

        }

    });

    //Health Quantitative and Qualitative on change
    $(document).on("click", "#Kpis-measureOfImpact0-hospital-options input", function(e) {
        let radiomeasureValue = $(this).val();
        if (radiomeasureValue == 'quantitative') {
            $(this).addClass('selected');
            $(this).attr('checked', true);
            $(this).next('span').attr('aria-checked', 'true');
            $(this).parents('#Kpis-measureOfImpact0-hospital-options').find('input:eq(1)').attr('checked', false);
            $(this).parents('#Kpis-measureOfImpact0-hospital-options').find('input:eq(1)').removeClass('selected');
            $(this).parents('#Kpis-measureOfImpact0-hospital-options').find('input:eq(1)').next('span').attr('aria-checked', 'false');
            if ($(this).parents('#helpful-hint-entry-point').find('#section-patient0-quantitative-measure-container:visible').length < 1) {
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-quantitative-measure-container').show();
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container').hide();
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-quantitative-measure-container #Kpis0-quantitativeDescription-hospital').val('');
				$(this).parents('#helpful-hint-entry-point').find('#section-patient0-quantitative-measure-container .character-count').text('1000');                
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-quantitative-measure-container .a-input-field.mt-0').attr('data-required', true);
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container .a-input-field.mt-0').attr('data-required', false);

            }

        } else if (radiomeasureValue == 'qualitative') {
            $(this).addClass('selected');
            $(this).attr('checked', true);
            $(this).next('span').attr('aria-checked', 'true');
            $(this).parents('#Kpis-measureOfImpact0-hospital-options').find('input:eq(0)').attr('checked', false);
            $(this).parents('#Kpis-measureOfImpact0-hospital-options').find('input:eq(0)').removeClass('selected');
            $(this).parents('#Kpis-measureOfImpact0-hospital-options').find('input:eq(0)').next('span').attr('aria-checked', 'false');
            if ($(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container:visible').length < 1) {
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container').show();
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-quantitative-measure-container').hide();
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container #Kpi0-directquote-hospital').val('');
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container #Kpis0-sourceName-hospital').val('');
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container #Kpis0-sourceTitle-hospital').val('');
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container #Kpi0-directquote-hospital').parents('.text').next().find('.character-count').text('1000');
				$(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container #Kpis0-sourceName-hospital').parents('.text').next().find('.character-count').text('255');                
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container #Kpis0-sourceTitle-hospital').parents('.text').next().find('.character-count').text('255'); 
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container .a-input-field.mt-0').attr('data-required', true);
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-quantitative-measure-container .a-input-field.mt-0').attr('data-required', false);

            }

        }
    });


    //Health impact rating on change
    $(document).on("click", "#stakeholder-impact-rating0-hospital-options input", function(e) {
        $(this).parents('#stakeholder-impact-rating0-hospital-options').find(' input').removeClass('selected');
        $(this).addClass('selected')
        $(this).attr('checked', true);
        $(this).next('span').attr('aria-checked', 'true');

    });

})

//payor System
$(document).ready(function()
{
    //ADD payor KPI
    let forradiobuttonspayor=0;
    $(document).on("click", "#add-payor-kpi", function(e) {
        let eventpayorClone;
        let countpatient;
        countpatient = $('.selectKpiList-payor:visible').length + 1;
        $('#remove-payor-kpi').show();
        if (countpatient <= 10) {
            eventpayorClone = $('.selectKpiList-payor:eq(0)').clone().addClass('selectKpiList-payor');
            $(this).hide();
            $(this).parents('.selectKpiList-payor').find('.remove-payor-kpi').show();
            eventpayorClone.find('#remove-payor-kpi').show();
             eventpayorClone.find('#add-payor-kpi').show();            
            let newIDattr = $('.selectKpiList-payor:eq(0)').attr('id');
            let Idreplaced = newIDattr.slice(0, -1) + (countpatient-1);
            eventpayorClone.attr('id', Idreplaced);
            let str = eventpayorClone.find('#application-kpi-title-payor p').text();
            let lastIndex = str.lastIndexOf(" ");
            let addIndex = countpatient;
            str = str.substring(0, lastIndex) + " " + addIndex;
            eventpayorClone.find('#application-kpi-title-payor p').text(str);
            eventpayorClone.find('.options #kpi-category0-payor-options .a-dropdown-selected').removeClass().addClass('a-dropdown__placeholder').text('PLEASE CHOOSE A KPI');
            eventpayorClone.find('.options #Kpis-qualifier0-payor-options .a-dropdown-selected').removeClass().addClass('a-dropdown__placeholder').text('PLEASE CHOOSE A QUALIFIER');
            eventpayorClone.find('ul li').removeClass('selected');
            eventpayorClone.find('input[type="radio"]').prop('checked', false)
            let forattr = 0;
            eventpayorClone.find('#Kpis-measureOfImpact0-payor-options input').attr('name', 'Kpis-measureOfImpact0Payor' + countpatient);
            eventpayorClone.find('#Kpis-measureOfImpact0-payor-options input').each(function() {
                $(this).attr('checked', false);
                $(this).next('span').attr('aria-checked', 'false');
                $(this).removeClass('selected');
                $(this).closest('label').attr("for", 'Kpis-measureOfImpact0' + countpatient + forattr+forradiobuttonspayor);
                $(this).attr("id", 'Kpis-measureOfImpact0' + countpatient + forattr+forradiobuttonspayor);
                forattr = forattr + 1;
            });
            eventpayorClone.find('#stakeholder-impact-rating0-payor-options input').attr('name', 'stakeholder-impact-rating0Payor' + countpatient);
            eventpayorClone.find('#stakeholder-impact-rating0-payor-options input').each(function() {
                $(this).attr('checked', false);
                $(this).next('span').attr('aria-checked', 'false');
                $(this).removeClass('selected');
                $(this).closest('label').attr("for", 'stakeholder-impact-rating0Payor' + countpatient + forattr+forradiobuttonspayor);
                $(this).attr("id", 'stakeholder-impact-rating0Payor' + countpatient + forattr+forradiobuttonspayor);
                forattr = forattr + 1;
            });
            eventpayorClone.find('#section-patient0-qualitative-measure-container').hide();
            eventpayorClone.find('#section-patient0-quantitative-measure-container').hide();
            eventpayorClone.find('#section-patient0-quantitative-measure-container #Kpis0-quantitativeDescription').val('');
            eventpayorClone.find('#section-patient0-qualitative-measure-container #Kpi0-directquote').val('');
            eventpayorClone.find('#section-patient0-qualitative-measure-container #Kpis0-sourceName').val('');
            eventpayorClone.find('#section-patient0-qualitative-measure-container #Kpis0-sourceTitle').val('');
            eventpayorClone.find('#stakeholder-impact0-payor').val('').attr("style",'');
            eventpayorClone.find('#stakeholder-impact0-payor').parents('.text').next().find('.character-count').text('1000');
			eventpayorClone.find('.pleaseDescribe').hide();
            eventpayorClone.find('.pleaseDescribe input').val('');
           eventpayorClone.find('.validation-require').removeClass('validation-require');
            eventpayorClone.find('.dropdownqualifierpayorSelected').removeClass('dropdownqualifierpayorSelected');
            eventpayorClone.find('.dropdowncategorypayorSelected').removeClass('dropdowncategorypayorSelected')
            eventpayorClone.insertAfter('.selectKpiList-payor:last');
            eventpayorClone.find("#Kpis0-quantitativeDescription-payor").val('').attr("style",'');
            eventpayorClone.find("#Kpi0-directquote-payor").val('').attr("style",'');
            eventpayorClone.find("#stakeholder-impact0-payor").val('').attr("style",'');
        }
        if(countpatient == '10'){
             $('.selectKpiList-payor:last').find('#add-payor-kpi').hide();
        }
    });

    //Remove payor
   let titleLastwordp;
   $(document).on("click", "#remove-payor-kpi", function(e) {
     $('.selectKpiList-payor').removeClass('kpiPayorlist');
        titleLastwordp = $(this).parents('.selectKpiList-payor').find('#application-kpi-title-payor p').text().split(" ").pop(); 
      $(this).parents('.selectKpiList-payor').nextAll().addClass('kpiPayorlist');
         $('.kpiPayorlist').each(function(){
            let titlestrp = $(this).find('#application-kpi-title-payor p').text()
            let titlelastIndexp = titlestrp.lastIndexOf(" ");
            let titleaddIndexp = titleLastwordp;
            titlestrp = titlestrp.substring(0, titlelastIndexp) + " " + titleaddIndexp;
           $(this).find('#application-kpi-title-payor p').text(titlestrp);
             titleLastwordp++;
       });

       $(this).parents('.selectKpiList-payor').remove();
        let removePatientCount = $('.selectKpiList-payor:visible').length;
        if (removePatientCount < 2) {
           $('.selectKpiList-payor:eq(0)').find('#remove-payor-kpi').hide();
            $('.selectKpiList-payor:eq(0)').find('#add-payor-kpi').show();
        } 
        let showAdd = removePatientCount -1;
        $('.selectKpiList-payor:eq('+showAdd+')').find('#add-payor-kpi').show();
    });

    
    //select payor qualifier dropdown
    $(document).on("click", "ul[name='Kpis-qualifier0-payor'] li", function(e) {
        let onselectqualifier = $(this).attr("data-optionvalue");
        if (onselectqualifier == "OTHER") {
             if (($(this).parents('.options').next('.fields.text:visible').length) == 0) {
                 $(this).parents('.options').next('.fields.text').addClass('pleaseDescribe');
                 $(this).parents('.options').next('.fields.text').show();
                $(this).parents('.options').next('.fields.text').find('.a-input-field.mt-0').attr('data-required', true);
				$(this).parents('.options').next('.fields.text').find('input#Kpis-qualifier-description0-payor').val('').attr('required', true).addClass("reqFieldClass");
              }  

        } 
        else {
             $(this).parents('.options').next('.fields.text').hide();             
             $(this).parents('.options').next('.fields.text').find('#Kpis-qualifier-description0-payor').val('');
             $(this).parents('.options').next('.fields.text').find('.a-input-field.mt-0').attr('data-required', false);
			 $(this).parents('.options').next('.fields.text').find('input#Kpis-qualifier-description0-payor').attr('required', false).removeClass("reqFieldClass");

        }


    });

    //select payor KPI dropdown
    $(document).on("click", "ul[name='kpi-category0-payor'] li", function(e) {
        let onselectKPI = $(this).attr("data-optionvalue");
        if (onselectKPI == "OTHER_PAYOR" || onselectKPI == "OTHER") {
            if (($(this).parents('.options').next('.fields.text:visible').length) == 0) {
                 $(this).parents('.options').next('.fields.text').addClass('pleaseDescribe');
                 $(this).parents('.options').next('.fields.text').show();
                $(this).parents('.options').next('.fields.text').find('.a-input-field.mt-0').attr('data-required', true);
				$(this).parents('.options').next('.fields.text').find('input#kpi-category-description0-payor').val('').attr('required', true).addClass("reqFieldClass");
              }  

        } 
        else {
             $(this).parents('.options').next('.fields.text').hide();             
             $(this).parents('.options').next('.fields.text').find('#kpi-category-description0-payor').val('');
             $(this).parents('.options').next('.fields.text').find('.a-input-field.mt-0').attr('data-required', false);
			 $(this).parents('.options').next('.fields.text').find('input#kpi-category-description0-payor').attr('required', false).removeClass("reqFieldClass");					 

        }

    });

    //payor Quantitative and Qualitative on change
    $(document).on("click", "#Kpis-measureOfImpact0-payor-options input", function(e) {
        let radiomeasureValue = $(this).val();
        if (radiomeasureValue == 'quantitative') {
            $(this).addClass('selected');
            $(this).attr('checked', true);
            $(this).next('span').attr('aria-checked', 'true');
            $(this).parents('#Kpis-measureOfImpact0-payor-options').find('input:eq(1)').attr("checked", false);
            $(this).parents('#Kpis-measureOfImpact0-payor-options').find('input:eq(1)').removeClass('selected');
            $(this).parents('#Kpis-measureOfImpact0-payor-options').find('input:eq(1)').next('span').attr('aria-checked', 'false');
            if ($(this).parents('#helpful-hint-entry-point').find('#section-patient0-quantitative-measure-container:visible').length < 1) {
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-quantitative-measure-container').show();
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container').hide();
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-quantitative-measure-container #Kpis0-quantitativeDescription-payor').val('');
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-quantitative-measure-container .character-count').text('1000');                
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-quantitative-measure-container .a-input-field.mt-0').attr('data-required', true);
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container .a-input-field.mt-0').attr('data-required', false);

            }

        } else if (radiomeasureValue == 'qualitative') {
            $(this).addClass('selected');
            $(this).attr('checked', true);
            $(this).next('span').attr('aria-checked', 'true');
            $(this).parents('#Kpis-measureOfImpact0-payor-options').find('input:eq(0)').attr("checked", false);
            $(this).parents('#Kpis-measureOfImpact0-payor-options').find('input:eq(0)').removeClass('selected');
            $(this).parents('#Kpis-measureOfImpact0-payor-options').find('input:eq(0)').next('span').attr('aria-checked', 'false');
            if ($(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container:visible').length < 1) {
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container').show();
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-quantitative-measure-container').hide();
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container #Kpi0-directquote-payor').val('');
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container #Kpis0-sourceName-payor').val('');
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container #Kpis0-sourceTitle-payor').val('');
				$(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container #Kpi0-directquote-payor').parents('.text').next().find('.character-count').text('1000');
				$(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container #Kpi0-sourceName-payor').parents('.text').next().find('.character-count').text('255');                
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container #Kpi0-sourceTitle-payor').parents('.text').next().find('.character-count').text('255'); 
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container .a-input-field.mt-0').attr('data-required', true);
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-quantitative-measure-container .a-input-field.mt-0').attr('data-required', false);

            }

        }
    });


    //payor impact rating on change
    $(document).on("click", "#stakeholder-impact-rating0-payor-options input", function(e) {
        $(this).parents('#stakeholder-impact-rating0-payor-options').find(' input').removeClass('selected');
        $(this).addClass('selected')
        $(this).attr('checked', true);
        $(this).next('span').attr('aria-checked', 'true');

    });
})

$(document).ready(function()
{
    if ($('#section-key-partner4:visible').length == 0) {
        $('#section-key-partner4').find('.a-input-field.mt-0').attr('data-required', false);
        $('#section-key-partner4').find('.a-dropdown.a-input-field.mt-0').attr('data-required', false);
    } else {
        $('#section-key-partner4').find('.a-input-field.mt-0').attr('data-required', true);
        $('#section-key-partner4').find('.a-dropdown.a-input-field.mt-0').attr('data-required', true);

    }

    if ($('#section-key-partner5:visible').length == 0) {
        $('#section-key-partner5').find('.a-input-field.mt-0').attr('data-required', false);
        $('#section-key-partner5').find('.a-dropdown.a-input-field.mt-0').attr('data-required', false);
    } else {
        $('#section-key-partner5').find('.a-input-field.mt-0').attr('data-required', true);
        $('#section-key-partner5').find('.a-dropdown.a-input-field.mt-0').attr('data-required', true);

    }


});




function enablingSubmitButton()
{
     let arr = ["#application-container-item-0-tab","#application-container-item-1-tab","#application-container-item-2-tab", "#application-container-item-3-tab"];
        let count=0;
        arr.forEach(el => {
                if($(el).hasClass('verified'))
                count++;
            });
    return count;
}
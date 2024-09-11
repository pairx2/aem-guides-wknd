let resetBtn;
    let mainScreen;
    let resultScreen;
	let muscleAgeId;
	let age,time;

function getMuscleAgeJsonData() {
    let jsonPath = $('[name="muscle-age-result-json-path"]').val();

    $.getJSON(jsonPath, {
        format: 'json'
    })
    .done (function(data) {
        if (data.data.length > 0) {
            sessionStorage.setItem('muscleAgeResults', JSON.stringify(data.data));
        }
    })
}

function getValueMin(value){
	let minVal = (value.Min == "") ? 0 : parseFloat(value.Min);
	return minVal;
}

function getValueMax(value){
	let maxVal = value.Max == "" ? 0 : parseFloat(value.Max);
	return maxVal;
}

function getCheckCondition(minTime,minTimeSym,maxTime,maxTimeSym,time,data){
	let moreThanSign = data[2].moreThan;
	let moreThanEqualSign = data[2].moreThanEqual; 	
	let condition;
	condition = ((minTime == 0 && maxTimeSym == moreThanSign && time < maxTime) || 
                (minTime == 0 && maxTimeSym == moreThanEqualSign && time <= maxTime) || 
                (minTimeSym == moreThanSign && time > minTime && maxTimeSym == moreThanSign && time < maxTime) ||
                (minTimeSym == moreThanEqualSign && time >= minTime && maxTimeSym == moreThanEqualSign && time <= maxTime) ||
                (minTimeSym == moreThanEqualSign && time >= minTime && maxTimeSym == moreThanSign && time < maxTime) ||
                (minTimeSym == moreThanSign && time > minTime && maxTimeSym == moreThanEqualSign && time <= maxTime) ||
                (maxTime == 0 && minTimeSym == moreThanSign && time > minTime) || 
                (maxTime == 0 && minTimeSym == moreThanEqualSign && time >= minTime));
				return condition;
}

function filterResults(data, ageGroup, time, gender) {
    if (data) {
        let minTime, maxTime, minTimeSym, maxTimeSym;
        let output, result;
		let checkCondition;

        if ($('html').attr('lang') == "en-AU") {
            output = data.filter(g => g.gender == gender);
            output = output[0].output;
            output = output.filter(a => a.AgeRange == ageGroup);
            
            
            $.each(output, function(key, value) {
                minTime = getValueMin(value);
                minTimeSym = value.MinSymbol;
                maxTime = getValueMax(value);
                maxTimeSym = value.MaxSymbol;
				checkCondition = getCheckCondition(minTime,minTimeSym,maxTime,maxTimeSym,time,data);
				
                if(checkCondition) {
                    result = output[key]; 
                    return false;
                }
            });

            return result
        } else {
            minTime = 4.5;
            maxTime = 13.5;

            if (time < minTime) {
                result = data.filter(i => i.AgeRange == ageGroup);
                return result[0];
        
            } else if (time > maxTime) {
                result = data.filter(j => j.AgeRange == ageGroup);
                return result[result.length - 1];
        
            } else {
                result = data.filter(y =>  y.AgeRange == ageGroup && y.SitToStandTime == time);
                return result[0];
            }
        }
    }
}

function getValues(){
	muscleAgeId = $('#ph-muscle-age').length ? $('#ph-muscle-age') : $('#ph-muscle-age-mac');
	resetBtn = $('#ph-muscle-age--reset').length ? $('#ph-muscle-age--reset') : $('#ph-muscle-age-mac--reset');
	mainScreen = $('#ph-muscle-age--inputs').length ? $('#ph-muscle-age--inputs') : $('#ph-muscle-age-mac--inputs');
	resultScreen = $('#ph-muscle-age--result').length ? $('#ph-muscle-age--result') : $('#ph-muscle-age-mac--result');
}

function setResults(gender, ageGroup, time){
	let timeRounded = Math.round(time * 10) / 10;
	let results = JSON.parse(sessionStorage.getItem('muscleAgeResults'));
	let result = filterResults(results, ageGroup, timeRounded, gender);

	if (result) {
		if ($('html').attr('lang') == "en-AU") {
			let responseLine2 = $('#ph-muscle-age--responseLine2').val();
			$('#ph-muscle-age--responseLine2-3 .cmp-title__text').text(responseLine2 + " " + result.MuscleAge);
			$('#ph-muscle-age--responseLine1 p strong').text(result.ResponseLine);
		} else {
			$('#ph-muscle-age--responseLine2-3 .cmp-title__text').text(result.ResponseLine2 + " " + result.ResponseLine3);
			$('#ph-muscle-age--responseLine1 p strong').text(result.ResponseLine1);
			$('#ph-muscle-age--responseLine4 p').text(result.ResponseLine4);
		}
		mainScreen.hide();
		resultScreen.addClass('active');
	}
}

function setAgeTime(){
	let uriParameters = location.search.substring(1).split('&');
	let pLength = 0;
	for (let uriParameter of uriParameters) {
		let parameter = uriParameter.split('=');
		if(parameter[0] === "age") {
			age = decodeURIComponent(parameter[1]);
			pLength++;
		}
		else if(parameter[0] === "time") {
			time = decodeURIComponent(parameter[1]);
			pLength++;
		}
	}
	return pLength;
}

function updateLocation(){
	if(window.location.href.indexOf("%26")>-1) {
		location.href = location.href.replaceAll("%26","&");
	}
}

function updateResultScreen(result){
	if (result) {
		$('#ph-muscle-age-mac--responseLine2-3 .cmp-title__text').text(result.ResponseLine2 + " " + result.ResponseLine3);
		$('#ph-muscle-age-mac--responseLine1 p strong').text(result.ResponseLine1);
		result.ResponseLine4.indexOf("<br/>")>-1 ?  $('#ph-muscle-age-mac--responseLine4 p').html(result.ResponseLine4) : $('#ph-muscle-age-mac--responseLine4 p').text(result.ResponseLine4);
		result.ResponseLine5.indexOf("<br/>")>-1 ?  $('#ph-muscle-age-mac--responseLine5 p').html(result.ResponseLine5) : $('#ph-muscle-age-mac--responseLine5 p').text(result.ResponseLine5);
		resultScreen.addClass('active');
	}
}

function getMuscleAgeInputs() {
	
	getValues();
    let submitBtn = muscleAgeId.find('button[name="submit"]');
    let agePlaceholder = muscleAgeId.find('.a-dropdown__menu[name="age"]').parent().find('.a-dropdown__placeholder').text();
    let genderPlaceholder = muscleAgeId.find('.a-dropdown__menu[name="gender"]').parent().find('.a-dropdown__placeholder').text();

	submitBtn.on('click', function(e) {
		e.preventDefault();
		let ageGroup = muscleAgeId.find('.a-dropdown__menu[name="age"] li.selected').attr('data-optionvalue');
		let gender = muscleAgeId.find('.a-dropdown__menu[name="gender"] li.selected').attr('data-optionvalue');
		let time = muscleAgeId.find('input[name="time"]').val();
		if($(this).is("#muscle-age-submit-mac")) {
			let resultPageUrl = $('.muscle-strength-result').attr("href");
			let resultPageUrlParam = resultPageUrl+"?age="+ageGroup+"&time="+time+"&gender="+gender;
			$('.muscle-strength-result').attr("href",resultPageUrlParam);
			$('.muscle-strength-result')[0].click();
		}
		else {
			setResults(gender, ageGroup, time);
		}
    })

	if($("#ph-muscle-age-mac--result").length) {
		setTimeout(function() {
			let paramLength = setAgeTime();
			if(paramLength == 2) {
				let timeRounded = Math.round(time * 10) / 10;
				let results = JSON.parse(sessionStorage.getItem('muscleAgeResults'));
				let result = filterResults(results, age, timeRounded);
				updateResultScreen(result);
			}
			if($(".mac-share").length) {
				$(".mac-share a:not(:last-child)").each(function() {
					let pageUrl = window.location.href.replaceAll("&","%26");
					$(this).attr("href",$(this).attr("href")+pageUrl);
				});
			}
		}, 500);
		updateLocation();
	}

    resetBtn.on('click', function(e) {
		e.preventDefault();
        $('#ph-muscle-age .a-dropdown__menu[name="age"]').parent().find('.a-dropdown-selected').removeClass('a-dropdown-selected').addClass('a-dropdown__placeholder').text(agePlaceholder);
        $('#ph-muscle-age .a-dropdown__menu[name="gender"]').parent().find('.a-dropdown-selected').removeClass('a-dropdown-selected').addClass('a-dropdown__placeholder').text(genderPlaceholder);
		$('#ph-muscle-age input[name="time"]').val('');
        resultScreen.removeClass('active');
        mainScreen.show();
    })
}

function initMuscleAgeTool() {
	getMuscleAgeJsonData();
    getMuscleAgeInputs();
}

function backdropshow() {
	if(!$(".modal-backdrop").length) {
		$("body").append('<div class="modal-backdrop show"></div>');
	}
	else {
		$(".modal-backdrop").show();
	}
}

function addClickEvent(){
	$(document).on('click','#siteLeavingPopupFragmentPathModal [data-dismiss="modal"], #siteLeavingPopupFragmentPathModal [data-btn-type="continue"] a',function() {
		if($(this).closest("[data-js-component='pop-up']").hasClass("show")) {
			backdropshow();
			$("#siteLeavingPopupFragmentPathModal").removeClass('show').removeAttr("aria-modal").hide();
			if($(this).parent().attr("data-btn-type")) {
				$("#retail-modal").parent().click();
			}
		}
	});
}

$(document).ready(function () {
    initMuscleAgeTool();
	if($("#sample-request-mac").length && $("#sample-request-mac").find("form").length) {
		$("#sample-request-mac").find("form").closest('[data-js-component="formcontainer"]').hide();
		$('[name="sample-request-mac"]').on( "change", function() {
			if($(this).val() == "yes") {
				$("#sample-request-mac").find("form").closest('[data-js-component="formcontainer"]').show();
			}
			else if($(this).val() == "no") {
				$("#sample-request-mac").find("form").closest('[data-js-component="formcontainer"]').hide();
				if($("#sample-request-no-mac").length && $("#sample-request-no-mac").attr("href") != "") {
					$("#sample-request-no-mac")[0].click();
				}
			}
		});
	}
	if($("#retail-modal").length) {
		$(document).on('click','#retail-modal',function() {
			backdropshow();
		});
		$(document).on('click','#mac-online-distributor a',function(e) {
			if($(this).attr("href").indexOf("http") == 0) {
				e.preventDefault();
				$("#siteLeavingPopupFragmentPathModal [data-btn-type='continue'] a").attr("href",$(this).attr("href"));
				backdropshow();
				$("#siteLeavingPopupFragmentPathModal").css("padding-right","17px").addClass('show').attr("aria-modal","true").show();
			}
		});
		addClickEvent();
		
	}
});
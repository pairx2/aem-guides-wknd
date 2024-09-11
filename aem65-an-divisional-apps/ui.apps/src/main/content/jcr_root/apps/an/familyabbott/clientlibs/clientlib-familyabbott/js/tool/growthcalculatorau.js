/* Growth Calculator */
let id_au,country,checkYearVal,childHeight,childGender;
let childDOB,totalMonth,offsetScrollHeight;
let dataGender, heightType, genderImg, onTrackPercentValue='',onTrackPercentMinValue='',onTrackPercentMaxValue='', growthReadMore = 'growth';
let childInputTotalMonths, childInputMonths, childInputYears, resultVN,childMedianTotalMonths, childMedianMonths,childMedianYears,childDiffMonths,normal_diff;
let dataWeightGender, weightType, weightTotalMonth, weightSelectorId, weightBehindMonths;
let selectorId, behindMonths = 0;
let childWeightMedianTotalMonths, childWeightMedianMonths,childWeightMedianYears,childWeightDiffMonths;

function getHWVal(genderHW,results){
	let genderText, heightGender, weightGender;
	if(genderHW == "male") {
		genderText = "boy";
		heightGender = results.height_boy;
		weightGender = results.weight_boy;
	} else {
		genderText = "girl";
		heightGender = results.height_girl;
		weightGender = results.weight_girl;
	}
	return {
		genderText :genderText,
		heightGender :heightGender,
		weightGender :weightGender
	}
}

function childdobvalidation() {
	if($('[name="childBirthMonth"] li.selected').data("optionvalue") != undefined && $('[name="childBirthYear"] li.selected').data("optionvalue") != undefined) {
		let childBirthMonth = parseInt($('[name="childBirthMonth"] li.selected').data("optionvalue"));
		let childBirthYear = parseInt($('[name="childBirthYear"] li.selected').data("optionvalue"));
		let todayDate = new Date();
		childDOB = new Date(childBirthYear,childBirthMonth-1,1);
		totalMonth = (todayDate.getFullYear() - childDOB.getFullYear()) * 12;
		totalMonth -= (+childDOB.getMonth() + 1);
		totalMonth += (+todayDate.getMonth() + 1);
		if ($(".childAgeError").length) {
			if (totalMonth < checkYearVal) {
				$(".childAgeError").removeClass("d-none");
				$('[name="childBirthMonth"],[name="childBirthYear"]').closest(".a-dropdown__field").css("border-color", "var(--dropdown-error-border-color)");
				disabledSubmitBtn();
			}
			else {
				$(".childAgeError").addClass("d-none");
				$('[name="childBirthMonth"],[name="childBirthYear"]').closest(".a-dropdown__field").css("border-color", "");
				checkInput();
			}
		}
	}
}

function getheightType(totalMonth){
	if (childHeight < dataGender[totalMonth].risk) {
		heightType = 'stunted';
	}
	else if (childHeight < dataGender[totalMonth].normal && childHeight >= dataGender[totalMonth].risk) {
		heightType = 'risk';
	}
	else if (childHeight >= dataGender[totalMonth].normal) {
		heightType = 'normal';
	}
	return heightType;
}

function getOTPOnNormalCase(key, value){
	if(key !== 'age'){
		if (childHeight == value) {
			onTrackPercentValue = key;
			heightType = 'Normal';
		}
		else if (childHeight < value && onTrackPercentMaxValue.length == 0 && onTrackPercentValue.length == 0) {
			onTrackPercentMaxValue = key;
		}
		else if (childHeight > value && onTrackPercentValue.length == 0) {
			onTrackPercentMinValue = key; 
		}
	}
}

function getOTPValue(){
	if (childHeight < dataGender[totalMonth]['3']) {
		onTrackPercentValue = dataGender[totalMonth]['3'];
		heightType = 'TooShort';
	}
	else if (childHeight > dataGender[totalMonth]['97']) {
		onTrackPercentValue = dataGender[totalMonth]['97'];
		heightType = 'TooTall';
	}
	else {
		for (const [key, value] of Object.entries(dataGender[totalMonth])) {getOTPOnNormalCase(key,value);}
	}
}

function updateStuntedCase(normal_diff, results){
	if(resultVN) {
		$("#growth-calculator-results .growth-calculator-result-height-container .text .bmi-stunted p:nth-child(2) strong:first-child").text($("#growth-calculator-results .growth-calculator-result-height-container .text .bmi-stunted p:nth-child(2) strong:first-child").text().replace('xx',childInputYears).replace('xy',childInputMonths));
		$("#growth-calculator-results .growth-calculator-result-height-container .text .bmi-stunted p:nth-child(2) strong:nth-child(2)").text($("#growth-calculator-results .growth-calculator-result-height-container .text .bmi-stunted p:nth-child(2) strong:nth-child(2)").text().replace('xx',childMedianYears).replace('xy',childMedianMonths));
		$("#growth-calculator-results .growth-calculator-result-height-container .text .bmi-stunted p:nth-child(2) strong:nth-child(3)").text($("#growth-calculator-results .growth-calculator-result-height-container .text .bmi-stunted p:nth-child(2) strong:nth-child(3)").text().replace('xy',childDiffMonths));
		$("#growth-calculator-results .growth-calculator-result-height-container .text .bmi-stunted, .growth-calculator-result-height-container .growth-actual-result .bmi-stunted, #growth-calculator-results .growth-calculator-result-height-container .growth-title-stunted, #growth-calculator-results .growth-hw-footnote .growth-height-stunted").removeClass("d-none");
		$(".growth-calculator-result-height-container .growth-actual-result p").addClass("alert-danger");
	}
	else {
		$("#growth-calculator-results .text .bmi-stunted p strong").wrap("<span></span>");
		$("#growth-calculator-results .text .bmi-stunted p span").find('strong').contents().unwrap();
		$("#growth-calculator-results .text .bmi-stunted p span").text($("#growth-calculator-results .text .bmi-stunted p span").text().replace('x',behindMonths));
		$("#growth-calculator-results .text .bmi-stunted, .growth-actual-result > ."+genderImg+", .growth-actual-result > ."+genderImg+" .bmi-stunted, #growth-calculator-results .growth-title-stunted, #growth-calculator-results .growth-desc-stunted, #growth-calculator-results .growth-faq-stunted").removeClass("d-none");
		if($("#growth-calculator-results").closest('[data-js-component="container"]').parent().next().find('[data-js-component="container"]').hasClass('growth-calculator-results')) {
			$("#growth-calculator-results .growth-faq-stunted").addClass("d-none");
			$(".growth-calculator-results .growth-faq-stunted").removeClass("d-none");
		}
		if($(".growth-height-percentile-result-container").length && (results.percentile.stunted != undefined)) {
			$(".growth-height-percentile-result-container .growth-height-percentile-result-stunted .centimeter-diff strong").text($(".growth-height-percentile-result-container .growth-height-percentile-result-stunted .centimeter-diff strong").text().replace('x',normal_diff));
			$(".growth-height-percentile-result-container .growth-height-percentile-result-stunted .percentile-diff strong").text($(".growth-height-percentile-result-container .growth-height-percentile-result-stunted .percentile-diff strong").text().replace('x',results.percentile.stunted));
			$(".growth-height-percentile-result-container .growth-height-percentile-result-stunted").removeClass("d-none");
		}
		$(".growth-actual-result p").addClass("alert-danger");
	}
}

function updateRiskCase(normal_diff, results){
	if(resultVN) {
		$("#growth-calculator-results .growth-calculator-result-height-container .text .bmi-risk p:nth-child(2) strong:first-child").text($("#growth-calculator-results .growth-calculator-result-height-container .text .bmi-risk p:nth-child(2) strong:first-child").text().replace('xx',childInputYears).replace('xy',childInputMonths));
		$("#growth-calculator-results .growth-calculator-result-height-container .text .bmi-risk p:nth-child(2) strong:nth-child(2)").text($("#growth-calculator-results .growth-calculator-result-height-container .text .bmi-risk p:nth-child(2) strong:nth-child(2)").text().replace('xx',childMedianYears).replace('xy',childMedianMonths));
		$("#growth-calculator-results .growth-calculator-result-height-container .text .bmi-risk p:nth-child(2) strong:nth-child(3)").text($("#growth-calculator-results .growth-calculator-result-height-container .text .bmi-risk p:nth-child(2) strong:nth-child(3)").text().replace('xy',childDiffMonths));
		$("#growth-calculator-results .growth-calculator-result-height-container .text .bmi-risk, .growth-calculator-result-height-container .growth-actual-result .bmi-risk, #growth-calculator-results .growth-calculator-result-height-container .growth-title-risk, #growth-calculator-results .growth-hw-footnote .growth-height-risk").removeClass("d-none");
		$(".growth-calculator-result-height-container .growth-actual-result p").addClass("alert-warning");
	}
	else {
		$("#growth-calculator-results .text .bmi-risk p strong").wrap("<span></span>");
		$("#growth-calculator-results .text .bmi-risk p span").find('strong').contents().unwrap();
		$("#growth-calculator-results .text .bmi-risk p span").text($("#growth-calculator-results .text .bmi-risk p span").text().replace('x',behindMonths));
		$("#growth-calculator-results .text .bmi-risk, .growth-actual-result ."+genderImg+", .growth-actual-result > ."+genderImg+" .bmi-risk, #growth-calculator-results .growth-title-risk, #growth-calculator-results .growth-desc-risk, #growth-calculator-results .growth-faq-risk").removeClass("d-none");
		if($("#growth-calculator-results").closest('[data-js-component="container"]').parent().next().find('[data-js-component="container"]').hasClass('growth-calculator-results')) {
			$("#growth-calculator-results .growth-faq-risk").addClass("d-none");
			$(".growth-calculator-results .growth-faq-risk").removeClass("d-none");
		}
		if($(".growth-height-percentile-result-container").length && (results.percentile.risk != undefined)) {
			$(".growth-height-percentile-result-container .growth-height-percentile-result-risk .centimeter-diff strong").text($(".growth-height-percentile-result-container .growth-height-percentile-result-risk .centimeter-diff strong").text().replace('x',normal_diff));
			$(".growth-height-percentile-result-container .growth-height-percentile-result-risk .percentile-diff strong").text($(".growth-height-percentile-result-container .growth-height-percentile-result-risk .percentile-diff strong").text().replace('x',results.percentile.risk));
			$(".growth-height-percentile-result-container .growth-height-percentile-result-risk").removeClass("d-none");
		}
		$(".growth-actual-result p").addClass("alert-warning");
	}
}

function updateNormalDiffCase(normal_diff, results){
	if(resultVN) {
		$("#growth-calculator-results .growth-calculator-result-height-container .text .bmi-normal-diff p strong").text($("#growth-calculator-results .growth-calculator-result-height-container .text .bmi-normal-diff p strong").text().replace('x',normal_diff));
		$("#growth-calculator-results .growth-calculator-result-height-container .text .bmi-normal-diff, .growth-calculator-result-height-container .growth-actual-result .bmi-normal-diff, #growth-calculator-results .growth-calculator-result-height-container .growth-title-normal-diff, #growth-calculator-results .growth-hw-footnote .growth-height-normal-diff").removeClass("d-none");
		$(".growth-calculator-result-height-container .growth-actual-result p").addClass("alert-blue");
	}
	else {
		$("#growth-calculator-results .text .bmi-normal-diff p strong").wrap("<span></span>");
		$("#growth-calculator-results .text .bmi-normal-diff p span").find('strong').contents().unwrap();
		$("#growth-calculator-results .text .bmi-normal-diff p span").text($("#growth-calculator-results .text .bmi-normal-diff p span").text().replace('x',normal_diff));
		$("#growth-calculator-results .text .bmi-normal-diff, .growth-actual-result ."+genderImg+", .growth-actual-result > ."+genderImg+" .bmi-normal-diff, #growth-calculator-results .growth-title-normal-diff, #growth-calculator-results .growth-desc-normal-diff, #growth-calculator-results .growth-faq-normal-diff").removeClass("d-none");
		if($("#growth-calculator-results").closest('[data-js-component="container"]').parent().next().find('[data-js-component="container"]').hasClass('growth-calculator-results')) {
			$("#growth-calculator-results .growth-faq-normal-diff").addClass("d-none");
			$(".growth-calculator-results .growth-faq-normal-diff").removeClass("d-none");
		}
		if($(".growth-height-percentile-result-container").length && (results.percentile.normal != undefined)) {
			$(".growth-height-percentile-result-container .growth-height-percentile-result-normal-diff .centimeter-diff strong").text($(".growth-height-percentile-result-container .growth-height-percentile-result-normal-diff .centimeter-diff strong").text().replace('x',behindMonths));
			$(".growth-height-percentile-result-container .growth-height-percentile-result-normal-diff .percentile-diff strong").text($(".growth-height-percentile-result-container .growth-height-percentile-result-normal-diff .percentile-diff strong").text().replace('x',results.percentile.normal));
			$(".growth-height-percentile-result-container .growth-height-percentile-result-normal-diff").removeClass("d-none");
		}
		$(".growth-actual-result p").addClass("alert-blue");
	}
}

function updateNormalCase(normal_diff, results){
	if(resultVN) {
		$("#growth-calculator-results .growth-calculator-result-height-container .text .bmi-normal, .growth-calculator-result-height-container .growth-actual-result .bmi-normal, #growth-calculator-results .growth-calculator-result-height-container .growth-title-normal, #growth-calculator-results .growth-hw-footnote .growth-height-normal").removeClass("d-none");
		$(".growth-calculator-result-height-container .growth-actual-result p").addClass("alert-success");
	}
	else {
		$("#growth-calculator-results .text .bmi-normal, .growth-actual-result ."+genderImg+", .growth-actual-result > ."+genderImg+" .bmi-normal, #growth-calculator-results .growth-title-normal, #growth-calculator-results .growth-desc-normal, #growth-calculator-results .growth-faq-normal").removeClass("d-none");
		if($("#growth-calculator-results").closest('[data-js-component="container"]').parent().next().find('[data-js-component="container"]').hasClass('growth-calculator-results')) {
			$("#growth-calculator-results .growth-faq-normal").addClass("d-none");
			$(".growth-calculator-results .growth-faq-normal").removeClass("d-none");
		}
		if($(".growth-height-percentile-result-container").length && (results.percentile.median != undefined)) {
			normal_diff = (normal_diff < 0) ? Math.abs(normal_diff) : normal_diff;
			$(".growth-height-percentile-result-container .growth-height-percentile-result-normal .centimeter-diff strong").text($(".growth-height-percentile-result-container .growth-height-percentile-result-normal .centimeter-diff strong").text().replace('x',normal_diff));
			$(".growth-height-percentile-result-container .growth-height-percentile-result-normal .percentile-diff strong").text($(".growth-height-percentile-result-container .growth-height-percentile-result-normal .percentile-diff strong").text().replace('x',results.percentile.median));
			$(".growth-height-percentile-result-container .growth-height-percentile-result-normal").removeClass("d-none");
		}
		$(".growth-actual-result p").addClass("alert-success");
	}
}

function checkNormalCase(normal_diff, results){
	if($('#growth-calculator-results .alert-blue').length && (childHeight < dataGender[totalMonth].median)) {
		updateNormalDiffCase(normal_diff, results);
	}
	else {
		updateNormalCase(normal_diff, results);
	}
}

function getDataWeightGender(results){
	if(childGender == "boy") {
		dataWeightGender = results.data_weight.data_boy;
	} else {
		dataWeightGender = results.data_weight.data_girl;
	}
	return dataWeightGender;
}

function getWeightType(childWeight){
	if(childWeight < dataWeightGender[weightTotalMonth].stunted) {
		weightType = 'stunted';
	}
	else if(childWeight < dataWeightGender[weightTotalMonth].risk && childWeight >= dataWeightGender[weightTotalMonth].stunted) {
		weightType = 'risk';
	}
	else if(childWeight < dataWeightGender[weightTotalMonth].normal && childWeight >= dataWeightGender[weightTotalMonth].risk) {
		weightType = 'normal';
	}
	else if(childWeight >= dataWeightGender[weightTotalMonth].normal) {
		weightType = 'obese';
	}
	return weightType;
}

function behindMonthsZero(totalMonth, behindMonths) {
	if (behindMonths == 0 && childHeight < dataGender[behindMonths].median) {
		if (totalMonth <= 0) {
			if (heightType === 'risk' || heightType === 'stunted') {
				behindMonths = ">" + 1;
				if ($('[name="childMoreText"]').length && $('[name="childMoreText"]').val() != '') {
					behindMonths = $('[name="childMoreText"]').val();
				}
			}
			else {
				behindMonths = 1;
			}
		} else {
			behindMonths = totalMonth;
		}
	}
	return behindMonths;
}
function getBehindMonthsVal(totalMonth, monthStart){
	let selectorId, behindMonths = 0, behindMonthsCount = 0;
	for (let i = totalMonth; i >= 0; i--) {
		if((childHeight >= dataGender[i].median) && behindMonthsCount == 0) {
			selectorId = (monthStart != undefined && monthStart == 0) ? i : i + 1;
			behindMonths = totalMonth - selectorId;
			behindMonthsCount++;
		}
	}
	return behindMonthsZero(totalMonth, behindMonths);
}

function checkAbnormalCase(normal_diff, results){
	childMedianTotalMonths = childInputTotalMonths - behindMonths;
	childMedianMonths = childMedianTotalMonths % 12;
	childMedianYears = Math.floor(childMedianTotalMonths / 12);
	childDiffMonths = childInputTotalMonths - childMedianTotalMonths;

	if (heightType === 'stunted') {
		updateStuntedCase(normal_diff, results);
	}
	else if (heightType === 'risk') {
		updateRiskCase(normal_diff, results);
	}
}

function refreshOnWeightType(){
	if(weightType === 'stunted') {
		$("#growth-calculator-results .growth-calculator-result-weight-container .text .bmi-stunted p:nth-child(2) strong:first-child").text($("#growth-calculator-results .growth-calculator-result-weight-container .text .bmi-stunted p:nth-child(2) strong:first-child").text().replace('xx',childInputYears).replace('xy',childInputMonths));
		$("#growth-calculator-results .growth-calculator-result-weight-container .text .bmi-stunted p:nth-child(2) strong:nth-child(2)").text($("#growth-calculator-results .growth-calculator-result-weight-container .text .bmi-stunted p:nth-child(2) strong:nth-child(2)").text().replace('xx',childWeightMedianYears).replace('xy',childWeightMedianMonths));
		$("#growth-calculator-results .growth-calculator-result-weight-container .text .bmi-stunted p:nth-child(2) strong:nth-child(3)").text($("#growth-calculator-results .growth-calculator-result-weight-container .text .bmi-stunted p:nth-child(2) strong:nth-child(3)").text().replace('xy',childWeightDiffMonths));
		$("#growth-calculator-results .growth-calculator-result-weight-container .text .bmi-stunted, .growth-calculator-result-weight-container .growth-actual-result .bmi-stunted, #growth-calculator-results .growth-calculator-result-weight-container .growth-title-stunted, #growth-calculator-results .growth-hw-footnote .growth-weight-stunted").removeClass("d-none");
		$(".growth-calculator-result-weight-container .growth-actual-result p").addClass("alert-danger");
	}
	else if(weightType === 'risk') {
		$("#growth-calculator-results .growth-calculator-result-weight-container .text .bmi-risk p:nth-child(2) strong:first-child").text($("#growth-calculator-results .growth-calculator-result-weight-container .text .bmi-risk p:nth-child(2) strong:first-child").text().replace('xx',childInputYears).replace('xy',childInputMonths));
		$("#growth-calculator-results .growth-calculator-result-weight-container .text .bmi-risk p:nth-child(2) strong:nth-child(2)").text($("#growth-calculator-results .growth-calculator-result-weight-container .text .bmi-risk p:nth-child(2) strong:nth-child(2)").text().replace('xx',childWeightMedianYears).replace('xy',childWeightMedianMonths));
		$("#growth-calculator-results .growth-calculator-result-weight-container .text .bmi-risk p:nth-child(2) strong:nth-child(3)").text($("#growth-calculator-results .growth-calculator-result-weight-container .text .bmi-risk p:nth-child(2) strong:nth-child(3)").text().replace('xy',childWeightDiffMonths));
		$("#growth-calculator-results .growth-calculator-result-weight-container .text .bmi-risk, .growth-calculator-result-weight-container .growth-actual-result .bmi-risk, #growth-calculator-results .growth-calculator-result-weight-container .growth-title-risk, #growth-calculator-results .growth-hw-footnote .growth-weight-risk").removeClass("d-none");
		$(".growth-calculator-result-weight-container .growth-actual-result p").addClass("alert-warning");
	}
	else if(weightType === 'obese') {
		let weightObeseDiff = childWeight - dataWeightGender[weightTotalMonth].median;
		weightObeseDiff = Math.round(weightObeseDiff*10)/10;
		$("#growth-calculator-results .growth-calculator-result-weight-container .text .bmi-obese p:nth-child(2) strong").text($("#growth-calculator-results .growth-calculator-result-weight-container .text .bmi-obese p:nth-child(2) strong").text().replace('xx',weightObeseDiff));
		$("#growth-calculator-results .growth-calculator-result-weight-container .text .bmi-obese, .growth-calculator-result-weight-container .growth-actual-result .bmi-obese, #growth-calculator-results .growth-calculator-result-weight-container .growth-title-obese, #growth-calculator-results .growth-hw-footnote .growth-weight-obese").removeClass("d-none");
		$(".growth-calculator-result-weight-container .growth-actual-result p").addClass("alert-danger");
	}
}

function refreshOnResultVN(totalMonth) {
	if(resultVN) {
		$(".growth-calculator-result-height-container .growth-actual-result .current-growth-height").html(childHeight+"cm");
		$(".growth-calculator-result-height-container .growth-result-median .median-growth-height").html(dataGender[totalMonth].median+"cm");
		if($("#growth-calculator-results .growth-hw-footnote ."+growthReadMore).length) {
			$("#growth-calculator-results .growth-hw-footnote ."+growthReadMore).removeClass("d-none");
		}
	}
	else {
		$(".growth-actual-result .current-growth-height").html(childHeight+"cm");
		$(".growth-result-median .median-growth-height").html(dataGender[totalMonth].median+"cm");
		$(".growth-result-median ."+genderImg).removeClass("d-none");
	}
}

function getWeightBehindMonths(childWeight){
	let weightBehindMonthsCount = 0;
	for(let j = weightTotalMonth; j >= 0; j--) {
		if((childWeight >= dataWeightGender[j].median) && weightBehindMonthsCount == 0) {
			weightSelectorId = j;
			weightBehindMonths = weightTotalMonth - weightSelectorId;
			weightBehindMonthsCount++;
		}
	}
	return weightBehindMonths;
}

function processData_SG(totalMonth){
	if (country === 'SG') {
		let medianVal = dataGender[totalMonth]['50'];
		getOTPValue();		

		if (heightType === 'TooShort') {
			$("#growth-calculator-results-sg .text .bmi-stunted p strong").wrap("<span></span>");
			$("#growth-calculator-results-sg .text .bmi-stunted, .growth-actual-result > ." + genderImg + ", .growth-actual-result > ." + genderImg + " .bmi-stunted, #growth-calculator-results-sg .growth-title-stunted, #growth-calculator-results-sg .growth-desc-stunted, #growth-calculator-results-sg .growth-faq-stunted").removeClass("d-none");
			$(".growth-actual-result p").addClass("alert-danger");
			$("#growth-calculator-results-sg .text .bmi-stunted p .actualSHeightValue")[0].innerHTML = "3rd";
			$("#growth-calculator-results-sg .text .bmi-stunted p .sPercentValue")[0].innerHTML = "97";
		}
		else if (heightType === 'TooTall') {
			$("#growth-calculator-results-sg .text .bmi-risk p strong").wrap("<span></span>");
			$("#growth-calculator-results-sg .text .bmi-risk, .growth-actual-result > ." + genderImg + ", .growth-actual-result > ." + genderImg + " .bmi-risk, #growth-calculator-results-sg .growth-title-risk, #growth-calculator-results-sg .growth-desc-risk, #growth-calculator-results-sg .growth-faq-risk").removeClass("d-none");
			$(".growth-actual-result p").addClass("alert-warning");
			$("#growth-calculator-results-sg .text .bmi-risk p .actualTHeightValue")[0].innerHTML = "97th";
			$("#growth-calculator-results-sg .text .bmi-risk p .tPercentValue")[0].innerHTML = "3";
		}
		else if (heightType === 'Normal'){
			$("#growth-calculator-results-sg .text .bmi-normal, .growth-actual-result ." + genderImg + ", .growth-actual-result > ." + genderImg + " .bmi-normal, #growth-calculator-results-sg .growth-title-normal, #growth-calculator-results-sg .growth-desc-normal, #growth-calculator-results-sg .growth-faq-normal").removeClass("d-none");
			$(".growth-actual-result p").addClass("alert-success");
			$("#growth-calculator-results-sg .text .bmi-normal p .actualNHeightValue")[0].innerHTML = Math.round(+onTrackPercentValue) + '<sup>'+'th'+'</sup>';
			$("#growth-calculator-results-sg .text .bmi-normal p .nPercentValue")[0].innerHTML = Math.round(100 - parseFloat(+onTrackPercentValue));
			
			switch (onTrackPercentValue) {
				case "3":
					$("#growth-calculator-results-sg .growth-actual-result > ." + genderImg + " .bmi-normal").addClass("three_percentile");
					$("#growth-calculator-results-sg .text .bmi-normal p .actualNHeightValue")[0].innerHTML = Math.round(+onTrackPercentValue) + '<sup>'+'rd'+'</sup>';
					break;
				case "10":
					$("#growth-calculator-results-sg .growth-actual-result > ." + genderImg + " .bmi-normal").addClass("onezero_percentile");
					break;
				case "25":
					$("#growth-calculator-results-sg .growth-actual-result > ." + genderImg + " .bmi-normal").addClass("twofive_percentile");
					break;
				case "75":
					$("#growth-calculator-results-sg .growth-actual-result > ." + genderImg + " .bmi-normal").addClass("sevenfive_percentile");
					break;
				case "90":
					$("#growth-calculator-results-sg .growth-actual-result > ." + genderImg + " .bmi-normal").addClass("ninezero_percentile");
					break;
				case "97":
					$("#growth-calculator-results-sg .growth-actual-result > ." + genderImg + " .bmi-normal").addClass("nineseven_percentile");
					break;
				default:
					$("#growth-calculator-results-sg .growth-actual-result > ." + genderImg + " .bmi-normal").addClass("fivezero_percentile");
					break;
			}
		}
		else {
			$("#growth-calculator-results-sg .text .bmi-normal-between, .growth-actual-result ." + genderImg + ", .growth-actual-result > ." + genderImg + " .bmi-normal, #growth-calculator-results-sg .growth-title-normal, #growth-calculator-results-sg .growth-desc-normal, #growth-calculator-results-sg .growth-faq-normal").removeClass("d-none");
			$(".growth-actual-result p").addClass("alert-success");
			$("#growth-calculator-results-sg .text .bmi-normal-between p .actualNminHeightValue")[0].innerHTML = Math.round(+onTrackPercentMinValue) + '<sup>'+'th'+'</sup>';
			$("#growth-calculator-results-sg .text .bmi-normal-between p .actualNmaxHeightValue")[0].innerHTML = Math.round(+onTrackPercentMaxValue) + '<sup>'+'th'+'</sup>';
			$("#growth-calculator-results-sg .text .bmi-normal-between p .nminPercentValue")[0].innerHTML = Math.round(100 - parseFloat(onTrackPercentMaxValue));
			$("#growth-calculator-results-sg .text .bmi-normal-between p .nmaxPercentValue")[0].innerHTML = Math.round(100 - parseFloat(onTrackPercentMinValue));

			switch (onTrackPercentMinValue) {
				case "3":
					$("#growth-calculator-results-sg .growth-actual-result > ." + genderImg + " .bmi-normal").addClass("three_ten_percentile");
					$("#growth-calculator-results-sg .text .bmi-normal-between p .actualNminHeightValue")[0].innerHTML = Math.round(+onTrackPercentMinValue) + '<sup>'+'rd'+'</sup>';
					break;
				case "10":
					$("#growth-calculator-results-sg .growth-actual-result > ." + genderImg + " .bmi-normal").addClass("onezero_percentile");
					break;
				case "25":
					$("#growth-calculator-results-sg .growth-actual-result > ." + genderImg + " .bmi-normal").addClass("twofive_percentile");
					break;
				case "75":
					$("#growth-calculator-results-sg .growth-actual-result > ." + genderImg + " .bmi-normal").addClass("sevenfive_percentile");
					break;
				case "90":
					$("#growth-calculator-results-sg .growth-actual-result > ." + genderImg + " .bmi-normal").addClass("ninezero_percentile");
					break;
				case "97":
					$("#growth-calculator-results-sg .growth-actual-result > ." + genderImg + " .bmi-normal").addClass("nineseven_percentile");
					break;
				default:
					$("#growth-calculator-results-sg .growth-actual-result > ." + genderImg + " .bmi-normal").addClass("fivezero_sevenfive_percentile");
					break;
			}
		}
		$(".growth-actual-result .current-growth-height strong").html(childHeight);
		$(".growth-result-median .median-growth-height strong").html(medianVal);
		$("#growth-calculator-columns,#growth-calculator-sg-pf").addClass("d-none");
		$("#section-growth-calculator-results-sg, #section-growth-calculator-results-sg-button,#growth-calculator-sg-results-pf, .growth-result-median ." + genderImg).removeClass("d-none");
	}
}

function processData_NonSG(totalMonth, results, monthStart){
	if (country !== 'SG') {

		heightType = getheightType(totalMonth);
		growthReadMore += '_' + heightType;
		
		behindMonths = getBehindMonthsVal(totalMonth, monthStart);
		
		let normal_diff = dataGender[totalMonth].median - childHeight;
		normal_diff = Math.round(normal_diff*100)/100;
		
		if (heightType !== 'normal') {
			checkAbnormalCase(normal_diff, results);
		}
		else {
			checkNormalCase(normal_diff, results);
		}
		
		if($('[name="child-weight"]').length && $(".growth-calculator-result-weight-container").length) {
			let childWeight = id_au.find('[name="child-weight"]').val();
			
			dataWeightGender = getDataWeightGender(results);

			weightTotalMonth = totalMonth;
			weightType = getWeightType(childWeight);

			growthReadMore += '_' + weightType;
			if(weightType !== 'normal') {

				weightBehindMonths = getWeightBehindMonths(childWeight);
	
				childWeightMedianTotalMonths = dataWeightGender[weightTotalMonth].month - weightBehindMonths;
				childWeightMedianMonths = childWeightMedianTotalMonths % 12;
				childWeightMedianYears = Math.floor(childWeightMedianTotalMonths / 12);
				childWeightDiffMonths = dataWeightGender[weightTotalMonth].month - childWeightMedianTotalMonths;
				
				refreshOnWeightType();
			}
			else {
				$("#growth-calculator-results .growth-calculator-result-weight-container .text .bmi-normal, .growth-calculator-result-weight-container .growth-actual-result .bmi-normal, #growth-calculator-results .growth-calculator-result-weight-container .growth-title-normal, #growth-calculator-results .growth-hw-footnote .growth-weight-normal").removeClass("d-none");
				$(".growth-calculator-result-weight-container .growth-actual-result p").addClass("alert-success");
			}
			
			$(".growth-calculator-result-weight-container .growth-actual-result .current-growth-height").text($(".growth-calculator-result-weight-container .growth-actual-result .current-growth-height").text().replace("xx",childWeight));
			$(".growth-calculator-result-weight-container .growth-result-median .median-growth-height").text($(".growth-calculator-result-weight-container .growth-result-median .median-growth-height").text().replace("xx",dataWeightGender[weightTotalMonth].median));
			$(".growth-calculator-result-weight-container .growth-result-median ."+genderImg).removeClass("d-none");
		}

		refreshOnResultVN(totalMonth);

		$("#growth-calculator-columns").addClass("d-none");
		$("#section-growth-calculator-results, #section-growth-calculator-results-button").removeClass("d-none");
		if($("#growth-calculator-results").closest('[data-js-component="container"]').parent().next().find('[data-js-component="container"]').hasClass('growth-calculator-results')) {
			$(".growth-calculator-results").removeClass("d-none");
		}
	}
}

function setOffsetScrollHeight(){
	if (country === "SG") {
		offsetScrollHeight = $('#growth-calculator-results-sg').offset().top - $('[data-sticky="true"]').height();
	}
	else {
		offsetScrollHeight = $('#growth-calculator-results').offset().top - $('[data-sticky="true"]').height();
	}

	if ($(window).width() > 991.98) {
		if ($('[data-sticky="true"]').hasClass("sticky")) {
			offsetScrollHeight = offsetScrollHeight - 25;
		}
		else {
			offsetScrollHeight = offsetScrollHeight - 140;
		}
	}
	else {
		if ($('[data-sticky="true"]').hasClass("sticky")) {
			offsetScrollHeight = offsetScrollHeight - 25;
		}
		else {
			offsetScrollHeight = offsetScrollHeight - 90;
		}
	}
}

function growthHeightPercentileResult() {
	if($(".growth-height-percentile-result").length && $(".growth-height-percentile-result-container").length) {
		$(".growth-height-percentile-result").on('click',function(){
			if($(".growth-height-percentile-result-container").hasClass("d-none")) {
				$(".growth-height-percentile-result-container").hide().removeClass("d-none").toggle('slow');
			}
		});
	}
}

function initNewGrowthCalculator() {
	country = document.getElementById('country')?.value || "Generic";
	
	function getGrowthCalcDataSet() {
		let path = $('[name="growth-height-json-path"]').val();
		$.getJSON(path, {
			format: 'json'
		}).done(function (data) {
			if (data) {
				sessionStorage.setItem('newGrowthDataSet', JSON.stringify(data));
			}
		});
	}

	function checkInput() {
		if ($('[name="childBirthMonth"] li.selected').data("optionvalue") != undefined && $('[name="childBirthYear"] li.selected').data("optionvalue") != undefined && $(".childAgeError").hasClass("d-none") && $('[name="child-height"]').val() != '' && $('[name="child-height"]').val() >= parseFloat($('[name="child-min-height"]').val()) && $('[name="child-height"]').val() <= parseFloat($('[name="child-max-height"]').val())) {
			if($('[name="child-weight"]').length) {
				if($('[name="child-weight"]').val() != '') {
					enabledSubmitBtn();
				}
				else {
					disabledSubmitBtn();
				}
			}
			else {
				enabledSubmitBtn();
			}
		} else {
			disabledSubmitBtn();
		}
	}

	function enabledSubmitBtn() {
		if($('[name="validator"]').length) {
			$('[name="validator"]').parents('.a-input-field').attr('data-required',false);
		}
		$('button[name="calculate"]').attr('disabled', false);
	}

	function disabledSubmitBtn() {
		if($('[name="validator"]').length) {
			$('[name="validator"]').parents('.a-input-field').attr('data-required',true);
		}
		$('button[name="calculate"]').attr('disabled', true);
	}

	function getGrowthInputs() {
		id_au = $('#growth-calculator');
		checkYearVal = (country === 'SG') ? 24 : 12;
		let submitBtn = id_au.find('button[name="calculate"]');

		$('[type="number"], [type="text"]').bind("change paste keyup", function () {
			setTimeout(function () {
				checkInput();
			}, 0);
		});

		$('[name="childBirthMonth"] li, [name="childBirthYear"] li').on('click', function () {
			setTimeout(function () {
				childdobvalidation();
			}, 250);
		});

		$('[name="gender"]').on("change", function () {
			$('[name="gender"]').closest(".a-radio").toggleClass("a-radio--selected");
			setTimeout(function() {
				checkInput();
			}, 0);
		});

		submitBtn.on('click', function (e) {
			e.preventDefault();
			childGender = id_au.find('[name="gender"]:checked').val().toLowerCase();
			childHeight = id_au.find('[name="child-height"]').val();
			let results = JSON.parse(sessionStorage.getItem('newGrowthDataSet'));
			

			if (childGender == "boy") {
				dataGender = results.data_boy;
				genderImg = "data-boy";
			} else {
				dataGender = results.data_girl;
				genderImg = "data-girl";
			}
			
			let childBirthMonth = parseInt($('[name="childBirthMonth"] li.selected').data("optionvalue"));
			let childBirthYear = parseInt($('[name="childBirthYear"] li.selected').data("optionvalue"));
			let todayDate = new Date();
			let childDOB = new Date(childBirthYear, childBirthMonth - 1,1);
			let totalMonth = (todayDate.getFullYear() - childDOB.getFullYear()) * 12;
			totalMonth -= (+childDOB.getMonth() + 1);
			totalMonth += (+todayDate.getMonth() + 1);
			childInputTotalMonths = totalMonth;
			childInputMonths = totalMonth % 12;
			childInputYears = Math.floor(totalMonth / 12);
			
			resultVN = $("#growth-calculator-results").closest("section").hasClass("growth-calc-result-hw-vi-new");
			let monthStart = dataGender[0].month;
			if(monthStart != 0 && monthStart == undefined) {
				totalMonth = (country === 'SG') ? totalMonth : totalMonth - 12;
			}

			processData_SG(totalMonth);
			processData_NonSG(totalMonth, results, monthStart);
			setOffsetScrollHeight();
			
			$("html, body").animate({
				scrollTop: offsetScrollHeight
			}, 500);
        });
		
		$("#growth-result-pdf-download").on('click',function(){
			const elementG = $("#growth-calculator-results")[0];
			const options = {
				filename: 'growth-result.pdf',
				margin: [5, 10, -10, 10],
				image: { type: 'jpeg', quality: 0.98 },
				html2canvas: { scale: 2 },
				jsPDF: {
					unit: 'mm', format: 'a4', orientation: 'portrait'
				}
			};
			html2pdf().set(options).from(elementG).save();
		});
		
		if($(".growth-height").length && $(".growth-height .input-group input").attr("placeholder") != undefined) {
			let growth_label_height = $(".growth-height .input-group input").attr("placeholder");
			$(".growth-height .input-group input").attr("placeholder",growth_label_height.split("(")[0]);
			$(".growth-height .form-group .input-group").after('<label class="growth-input-label">'+growth_label_height.split("(")[1].split(")")[0]+'</label>');
		}
		if($(".growth-weight").length && $(".growth-weight .input-group input").attr("placeholder") != undefined) {
			let growth_label_weight = $(".growth-weight .input-group input").attr("placeholder");
			$(".growth-weight .input-group input").attr("placeholder",growth_label_weight.split("(")[0]);
			$(".growth-weight .form-group .input-group").after('<label class="growth-input-label">'+growth_label_weight.split("(")[1].split(")")[0]+'</label>');
		}
		
		growthHeightPercentileResult();
    }
    
	getGrowthCalcDataSet();
	getGrowthInputs();
}

function toggleCalcBtn(){
	if ($('[name="childDateOfBirth"]').val() != "" && $('[data-name="child-height"] input').val() > 0 && $('[data-name="child-weight"] input').val() > 0) {
		$('[name="validator"]').parents('.a-input-field').attr('data-required',false);
		$('button[name="calculate"]').attr('disabled', false);
	} else {
		$('button[name="calculate"]').attr('disabled', true);
	}
}

let id_hw;

function addHWSessionStorage(data) {
    if (data) {
        sessionStorage.setItem('growthHWDataSet', JSON.stringify(data));
    }
}

function getResultData(BMIHW,resultBMI){
	let resultTextBMI , weightHWResult;
	if(Number(BMIHW) < Number(resultBMI.stunted.toFixed(2))) {
		resultTextBMI = "malnutrition";
		weightHWResult = $('[name="growthWeightResultText"]').val().split(",")[0];
	}
	else if (Number(BMIHW) >= Number(resultBMI.stunted.toFixed(2)) && Number(BMIHW) < Number(resultBMI.risk.toFixed(2))) {
		resultTextBMI = "malnourish";
		weightHWResult = $('[name="growthWeightResultText"]').val().split(",")[1];
	}
	else if (Number(BMIHW) >= Number(resultBMI.risk.toFixed(2)) && Number(BMIHW) <= Number(resultBMI.normal.toFixed(2))) {
		resultTextBMI = "ideal";
		weightHWResult = $('[name="growthWeightResultText"]').val().split(",")[2];
	}
	else if (Number(BMIHW) > Number(resultBMI.normal.toFixed(2)) && Number(BMIHW) <= Number(resultBMI.normal_risk.toFixed(2))) {
		resultTextBMI = "at_risk";
		weightHWResult = $('[name="growthWeightResultText"]').val().split(",")[3];
	}
	else if (Number(BMIHW) > Number(resultBMI.normal_risk.toFixed(2)) && Number(BMIHW) <= Number(resultBMI.overweight.toFixed(2))) {
		resultTextBMI = "overweight";
		weightHWResult = $('[name="growthWeightResultText"]').val().split(",")[4];
	}
	else if (Number(BMIHW) > Number(resultBMI.overweight.toFixed(2))) {
		resultTextBMI = "obese";
		weightHWResult = $('[name="growthWeightResultText"]').val().split(",")[5];
	}
	return {
		resultTextBMI : resultTextBMI,
		weightHWResult : weightHWResult
	}
}

function addClassWithStatus(status){
	if (status == "severly_stunted") {
		$('.growth-calculator-hw-results__marker-low').addClass("alert-red");
	}
	else if (status == "stunted") {
		$(".growth-calculator-hw-results__marker-low").addClass("alert-orange");
	}
	else if (status == "normal") {
		$(".growth-calculator-hw-results__marker-low").addClass("alert-yellow");
	}
	else if (status == "normal_height") {
		$(".growth-calculator-hw-results__marker-low").addClass("alert-light-green");
	}
	else if (status == "normal_high") {
		$(".growth-calculator-hw-results__marker-low").addClass("alert-green");
	}
}

function enabledSubmitBtn() {
	$('[name="validator"]').parents('.a-input-field').attr('data-required', false);
	$('button[name="calculate"]').attr('disabled', false);
}

function disabledSubmitBtn() {
	$('button[name="calculate"]').attr('disabled', true);
}

function toggleSubmitBtn(){
	if ($('[name="childDateOfBirth"]').val() != "" && $('[data-name="child-height"] input').val() > 0 && $('[data-name="child-weight"] input').val() > 0) {
		enabledSubmitBtn();
	} else {
		disabledSubmitBtn();
	}
}

function getHeightImgData(childHeight,result,genderText) {
	let heightHWResult, heightResultImagePath, status;
	if(Number(childHeight) < result.severly_stunted) {
		status = "severly_stunted";
		heightHWResult = $('[name="growthHeightResultText"]').val().split(",")[0];
		heightResultImagePath = $('#growth-calculator-hw-results__' + genderText + '-abnormal').attr('data-asset');
		$("#growth-calculator-hw-results__status").addClass("alert-red");
	}
	else if (Number(childHeight) >= result.severly_stunted && Number(childHeight) < result.stunted) {
		status = "stunted";
		heightHWResult = $('[name="growthHeightResultText"]').val().split(",")[1];
		heightResultImagePath = $('#growth-calculator-hw-results__' + genderText + '-stunted').attr('data-asset');
		$("#growth-calculator-hw-results__status").addClass("alert-orange");
	}
	else if (Number(childHeight) >= result.stunted && Number(childHeight) <= result.normal) {
		status = "normal";
		heightHWResult = $('[name="growthHeightResultText"]').val().split(",")[2];
		heightResultImagePath = $('#growth-calculator-hw-results__' + genderText + '-healthy').attr('data-asset');
		$("#growth-calculator-hw-results__status").addClass("alert-yellow");
	}
	else if (Number(childHeight) > result.normal && Number(childHeight) <= result.normal_height) {
		status = "normal_height";
		heightHWResult = $('[name="growthHeightResultText"]').val().split(",")[3];
		heightResultImagePath = $('#growth-calculator-hw-results__' + genderText + '-risk').attr('data-asset');
		$("#growth-calculator-hw-results__status").addClass("alert-light-green");
	}
	else if (Number(childHeight) > result.normal_height) {
		status = "normal_high";
		heightHWResult = $('[name="growthHeightResultText"]').val().split(",")[4];
		heightResultImagePath = $('#growth-calculator-hw-results__' + genderText + '-high-risk').attr('data-asset');
		$("#growth-calculator-hw-results__status").addClass("alert-green");
	}
	return {
		heightHWResult : heightHWResult, 
		heightResultImagePath : heightResultImagePath,
		status : status
	}
}

function getResults(behindMonths,childHeight,heightGender,selectorMedian){
	let selectorAge, result_age_month, result_age_year;
	if (behindMonths == 0 && childHeight < heightGender[behindMonths].median) {
		result_age_year = "<" + 1;
		result_age_month = 0;
		if ($('[name="childMoreText"]').length && $('[name="childMoreText"]').val() != '') {
			result_age_year = $('[name="childMoreText"]').val();
		}
	}
	else {
		selectorAge = heightGender[selectorMedian].age_per_months;
		result_age_year = selectorAge / 12;
		result_age_year = result_age_year.toString().split(".")[0];
		result_age_month = selectorAge % 12;
	}
	return{
		result_age_month : result_age_month,
		result_age_year : result_age_year
	}
}

function getlabelVal(gender,bmiLabelWithValue,bmiAvgLabelWithValue){
	let bmiLabel, avgLabel;
	if(gender == "boy") {
		bmiLabel = `<div class="bmi-label male">${bmiLabelWithValue}</div>`;
		avgLabel = `<div class="bmi-label male">${bmiAvgLabelWithValue}</div>`;
	}
	else {
		bmiLabel = `<div class="bmi-label">${bmiLabelWithValue}</div>`;
		avgLabel = `<div class="bmi-label">${bmiAvgLabelWithValue}</div>`;
	}
	return {
		bmiLabel : bmiLabel,
		avgLabel : avgLabel
	}
}

let selectorMedian, silhouetteBehindMonths = 0;

function getSelectorMedianVal(totalMonths,childHeight,heightGender){
	for (let i = totalMonths; i >= 0; i--) {
		if((childHeight >= heightGender[i].median) && silhouetteBehindMonths == 0) {
			selectorId = i + 1;
			behindMonths = totalMonths - selectorId;
			selectorMedian = i;
			silhouetteBehindMonths++;
		}
	}

	if (behindMonths < 0) {
		let silhouetteHeightBehindMonths = 0;
		for (let j = totalMonths; j < heightGender.length; j++) {
			if((heightGender[j].median >= childHeight) && silhouetteHeightBehindMonths == 0) {
				selectorMedian = j;
				silhouetteHeightBehindMonths++;
			}
		}
	}
	return selectorMedian;
}

function initHWGrowthCalculator() {
    function getHWGrowthDataSet() {
        let path = $('[name="growth-height-json-path"]').val();
        $.getJSON(path, {
            format: 'json'
        })
        .done (function(data) {
            addHWSessionStorage(data);
        });
    }
	
	function getAgeHW(date) {
        let mdate = date;
        let yearThen = parseInt(mdate.substring(6,10), 10);
        let monthThen = parseInt(mdate.substring(3,5), 10);
        let dayThen = parseInt(mdate.substring(0,4), 10);
        let today = new Date();
        let birthday = new Date(yearThen, monthThen-1, dayThen);
        let differenceInMilisecond = today.valueOf() - birthday.valueOf();
        let year_age = Math.floor(differenceInMilisecond / 31536000000);
        let day_age = Math.floor((differenceInMilisecond % 31536000000) / 86400000);
        let month_age = Math.floor(day_age/30);
        let age_Per_Months = (year_age * 12) + month_age;
        return age_Per_Months;
    }
	
	function createHWBMILabel(BMI, avgBMI, gender) {
        let bmiLabelText = $('#growth-calculator-hw-results__bmi-label p').text();
        let bmiAvgLabelText = $('#growth-calculator-hw-results__bmi-avg-label p').text();
        let bmiLabelWithValue = bmiLabelText.replace('0', BMI).replace('=', '<br/>=');
        let bmiAvgLabelWithValue = bmiAvgLabelText.replace('0', avgBMI).replace('=', '<br/>=');

		let {bmiLabel, avgLabel} = getlabelVal(gender,bmiLabelWithValue,bmiAvgLabelWithValue);
		let container = $('#growth-calculator-hw-results__bmi-container');

		container.find('.columncontrol.active .columncontrol__column:first-child').prepend(bmiLabel);
		container.find('.columncontrol.active .columncontrol__column:last-child').prepend(avgLabel);
	}

	function createHWSilhouetteData(status, height, result, resultimg, resultmedian) {
		$('.growth-calculator-hw-results__silhouette').remove();
		let label = $('#growth-calculator-hw-results__label p').text();
        let labelAvg = $('#growth-calculator-hw-results__average-label p').text();
        let labelWithHeight = label.replace('0', height), 
			labelAvgWithHeight = labelAvg.replace('0', result.median);
		let finalSilhouette, finalSilhouetteAvg, finalHeight, finalAverage, ruler;
		
		finalSilhouette = resultimg;
		finalSilhouetteAvg = resultmedian;
		
		let silhouette = `
            <div class='growth-calculator-hw-results__silhouette'>
                <div class='growth-calculator-hw-results__silhouette-inner'>
                    <div class='growth-calculator-hw-results__silhouette-current text-right'>
                        <div class="growth-calculator-hw-results__label text-center">${labelWithHeight}</div>
                        <img src="${finalSilhouette}" alt="silhouette"/>
                    </div>
                    <div class='growth-calculator-hw-results__silhouette-avg text-center'>
                        <div class="growth-calculator-hw-results__label-avg">${labelAvgWithHeight}</div>
                        <img src="${finalSilhouetteAvg}" alt="silhouette"/>
                    </div>
                </div>
                <div class='growth-calculator-hw-results__marker-low'></div>
                <div class='growth-calculator-hw-results__marker-high'></div>
            </div>`;

		$('#growth-calculator-hw-results__growth .cmp-image').append(silhouette);

		addClassWithStatus(status);

		if (height > 120 || result.median > 120) {
			$('#growth-calculator-hw-results__ruler-150').hide();
			$('#growth-calculator-hw-results__ruler-200').show();

			ruler = 0.545;
			finalHeight = (height * ruler) + "%";
			finalAverage = (result.median * ruler) + "%";

			$('.growth-calculator-hw-results__silhouette-current').css('height', finalHeight);
			$('.growth-calculator-hw-results__silhouette-avg').css('height', finalAverage);
			$('.growth-calculator-hw-results__marker-low').css('bottom', finalHeight);
			$('.growth-calculator-hw-results__marker-high').css('bottom', finalAverage);

		} else {
			$('#growth-calculator-hw-results__ruler-150').show();
			$('#growth-calculator-hw-results__ruler-200').hide();

			ruler = 0.72;
			finalHeight = (height * ruler) + "%";
			finalAverage = (result.median * ruler) + "%";

			$('.growth-calculator-hw-results__silhouette-current').css('height', finalHeight);
			$('.growth-calculator-hw-results__silhouette-avg').css('height', finalAverage);
			$('.growth-calculator-hw-results__marker-low').css('bottom', finalHeight);
			$('.growth-calculator-hw-results__marker-high').css('bottom', finalAverage);
		}
	}

	function getHWGrowthInputs() {
		id_hw = $('#growth-calculator-hw');
		let submitBtn = id_hw.find('button[name="calculate"]');
        let inputScreen = $('#growth-calculator-hw-columns');
        let resultScreen = $('#growth-calculator-hw-results');
		
		let formPopup = $('#growth-calculator-hw-form');
        let formPopupClose = formPopup.find('#ph-popup-close');

		

		$('[type="range"], [type="text"], [type="number"]').bind("change paste keyup", function () {
			toggleSubmitBtn();
		});

		submitBtn.on('click', function (e) {
			e.preventDefault();
			let genderHW = id_hw.find('[name="gender"]:checked').val();
            let dob = id_hw.find('[name="childDateOfBirth"]').val();
            let childHeight = id_hw.find('[data-name="child-height"] input').val();
            let childWeight = id_hw.find('[data-name="child-weight"] input[type="number"]').val();
			let ageHW = getAgeHW(dob);
            let results = JSON.parse(sessionStorage.getItem('growthHWDataSet'));
			
			let {heightGender, weightGender, genderText} = getHWVal(genderHW,results);

			
			let totalMonths = ageHW;
			let result = heightGender[totalMonths];
			let totalMonthsWeight = ageHW - 12;
			
			let heightInMeter = childHeight/100;
            let bmiValue = childWeight/(heightInMeter * heightInMeter);
			
			let resultBMI = weightGender[totalMonthsWeight];
			let BMIHW = Number(childWeight).toFixed(2);
			let avgBMIHW = resultBMI.median.toFixed(2);

			let {resultTextBMI, weightHWResult} = getResultData(BMIHW,resultBMI);
			
			$('#growth-calculator-hw-results__bmi-' + genderText + '-average').parent().show();
			$('#growth-calculator-hw-results__bmi-' + genderText + '-average').parents('.columncontrol').addClass('active');
			$('#growth-calculator-hw-results__bmi-' + genderText + '-' + resultTextBMI).parent().show();
			$('#growth-calculator-hw-results__bmi-' + resultTextBMI + '-text').parent().show();
			$('#growth-calculator-hw-results__bmi-container').height($('#growth-calculator-hw-results__bmi-' + genderText + '-average').parents('.columncontrol.active').height() + 100);
			createHWBMILabel(childWeight, avgBMIHW, genderText);
		
			let heightMedianImagePath = $('#growth-calculator-hw-results__'+genderText+'-average').attr('data-asset');
		
			let {heightHWResult, heightResultImagePath, status} = getHeightImgData(childHeight,result,genderText);

			selectorMedian = getSelectorMedianVal(totalMonths,childHeight,heightGender);			
			
			let {result_age_month, result_age_year} = getResults(behindMonths,childHeight,heightGender,selectorMedian);

			
			$('#growth-calculator-hw-results__emoji--' + status + '-text .growth_median_height_years_months').text($('#growth-calculator-hw-results__emoji--' + status + '-text .growth_median_height_years_months').text().replace('year', result_age_year).replace('month', result_age_month));
			$('#growth-calculator-hw-results__emoji--' + status + '-text').parents('.text').show();
			$('#growth-calculator-hw__box--height-' + status).parents('.text').show();

			formPopup.addClass('active');
			$('body').addClass('popup-overlay');

			formPopupClose.on('click', function () {
				formPopup.removeClass('active');
				$('body').removeClass('popup-overlay');
			});

			$('#growth-calculator-hw-identifier').on('click', function () {
				formPopup.removeClass('active');
				$('body').removeClass('popup-overlay');
				getProcess();
			});

			let parts = dob.split('/');
			let newDob = parts[2] + '-' + parts[1] + '-' + parts[0];

			$('[name="chidlDateOfBirth"]').val(newDob);
			$('[name="childGender"]').val(genderHW);
			$('[name="childHeight"]').val(childHeight);
			$('[name="childWeight"]').val(childWeight);
			$('[name="childHeightResult"]').val(heightHWResult);
			$('[name="childWeightResult"]').val(weightHWResult);
			$('[name="bmiResult"]').val(bmiValue.toFixed(2));

			function getProcess() {
				createHWSilhouetteData(status, childHeight, result, heightResultImagePath, heightMedianImagePath);

				inputScreen.hide();
				resultScreen.addClass('active');
				$("html, body").animate({ scrollTop: 0 }, 600);
			}
		});
	}
	getHWGrowthDataSet();
	getHWGrowthInputs();

	if ($('#growth-calculator-hw-form').length > 0) {
		document.body.appendChild(document.getElementById('growth-calculator-hw-form'));
	}
}

function getYearVal(){
	let maxYear = 0, minYear = 100;
	if ($('[name="childDOB-maxYear"]').length) {
		maxYear = parseInt($('[name="childDOB-maxYear"]').val());
	}
	if ($('[name="childDOB-minYear"]').length) {
		minYear = parseInt($('[name="childDOB-maxYear"]').val()) + parseInt($('[name="childDOB-minYear"]').val());
	}
	return {
		maxYear : maxYear,
		minYear : minYear
	}
}

$(document).ready(function () {
	/*AU Growth Calculator*/
	if ($("#growth-calculator").length) {
		initNewGrowthCalculator();
	}
	/*ID Growth Calculator*/
	if ($("#growth-calculator-hw").length) {
		initHWGrowthCalculator();
	}
	if ($("#datepicker-max10").length) {
		setTimeout(function () {
			if ($('.litepicker').length) {
				$('.litepicker').remove();

				let {maxYear,minYear} = getYearVal();
				
				let dateLitepicker = new Litepicker({
					element: document.getElementById('datepicker-max10'),
					dropdowns: {
						minYear: new Date().getFullYear() - minYear,
						maxYear: new Date().getFullYear() - maxYear,
						months: true,
						years: true
					},
					minDate: new Date(new Date().getFullYear() - minYear, new Date().getMonth(), new Date().getDate()),
					maxDate: new Date(new Date().getFullYear() - maxYear, new Date().getMonth(), new Date().getDate()),
					allowRepick: true,
					autoApply: true,
					singleMode: true,
					format: $("#datepicker-max10").closest('[data-js-component="date-picker"]').attr('data-date-format'),
					lang: $('html')[0].lang,
					onSelect: function () {
						$("#datepicker-max10").closest('[data-js-component="date-picker"]').find('.a-input-field .form-group').removeClass("validation-require");
						toggleCalcBtn();
					}
				});
				window.addEventListener("load", function () {
					document.getElementById("datepicker-max10").closest('[data-js-component="date-picker"]').querySelector('.icon').addEventListener("click", function (e) {
						e.stopPropagation();
						dateLitepicker.show();
					});
				});
			}
		}, 250);
	}
});
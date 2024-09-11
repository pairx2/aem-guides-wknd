const bmiageInputId = {
    min : 18,
    max : 85,
    input : 'bmi_rangeInput_age',
    output : 'bmi_output_age',
}

const bmiweightInputId = {
    min : 25,
    max : 150,
    input : 'bmi_rangeInput_weight',
    output : 'bmi_output_weight'
}

const bmiheightInputId = {
    min : 100,
    max : 200,
    input : 'bmi_rangeInput_height',
    output : 'bmi_output_height'
}

function bmigetRangeInputId(id) {
    switch (id) {
        case 'ph-bmi-calculator-tool--age' :
            return bmiageInputId;
        case 'ph-bmi-calculator-tool--weight' :
            return bmiweightInputId;
        case 'ph-bmi-calculator-tool--height' :
            return bmiheightInputId;
    }
}

function bmigetRangeInputHTML(id) {
	return '<input type="range" step="1" min="'+id.min+'" max="'+id.max+'" value="'+id.min+'" id="'+id.input+'" oninput="'+id.output+'.value = '+id.input+'.value" >'
}

function bmigetRangeOutputHTML(id) {
    return '<output id="'+id.output+'" for="'+id.input+'">'+id.min+'</output>'
}

function bmisetRangeInputEl() {
    let container = $('#ph-bmi-calculator-tool .ph-range-input-container');

    container.each(function() {
    	let id = $(this).attr('id');
        let rangeInputId = bmigetRangeInputId(id);
        let rangeInputHTML = bmigetRangeInputHTML(rangeInputId);
        let rangeOutputHTML = bmigetRangeOutputHTML(rangeInputId);

        $(this).prepend(rangeInputHTML);
        $(this).find('.ph-output-container').prepend(rangeOutputHTML);
	})
}

function round(value, precision) {
    let multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

function initBMICalculator() {
    let formPopup = $('#ph-bmi-calculator-form');
    let formPopupClose = formPopup.find('#ph-popup-close');
    let popupFormBtn = $('#ph-bmi-calculator-tool #ph-calculate');
    let bmiCalc = $('#ph-bmi-calculator');
    let resultText = $("#ph-bmi-calculator-tool--result #ph-bmi-calculator-result-number").find('p').text();

    popupFormBtn.on('click', function(e) {
        e.preventDefault();

        if (!sessionStorage.getItem('bmiResult')) {
            $("#ph-bmi-calculator-tool--result").css("display","none");
            formPopup.addClass('active');
            $('body').addClass('popup-overlay');
        }

        let bmi_height = bmiCalc.find("#bmi_output_height").val();
        let bmi_weight = bmiCalc.find("#bmi_output_weight").val();
        let bmi_gender = bmiCalc.find("#ph-bmi-calculator-tool--gender-options .a-radio__input:checked").val();
        let bmi = bmi_weight / (bmi_height / 100 * bmi_height / 100);
        bmi = round(bmi, 1)
        let bmi_result = 0;
        let bmi_result_SFDC = "Stunted";

        if(bmi >= 18 && bmi <= 22.9) {
            bmi_result = "normal";
        } else if(bmi >= 23 && bmi <= 24.9) {
            bmi_result = "overweight";
        } else if(bmi >= 25) {
            bmi_result = "obese";
        } else {
            bmi_result = "malnourished";
        }

        if (bmi_result == "normal") {
            bmi_result_SFDC = "Normal"
        }

        let BMIResultText = resultText.replace('-', bmi);

        $("#ph-bmi-calculator-tool--result #ph-bmi-calculator-result").find('.cmp-title__text').text(bmi_result);
        $("#ph-bmi-calculator-tool--result #ph-bmi-calculator-result-number").find('p').text(BMIResultText);

        $('[name="weight"]').val(bmi_weight);
        $('[name="height"]').val(bmi_height);
        $('[name="bmiResult"]').val(bmi_result_SFDC);
        $('[name="gender"]').val(bmi_gender);

    });

    formPopupClose.on('click', function() {
        formPopup.removeClass('active');
        $('body').removeClass('popup-overlay');
    });

    if (formPopup.length > 0) {
        document.body.appendChild(document.getElementById('ph-bmi-calculator-form'));
    }

    formPopup.find('button[name="submit"], button[name="SUBMIT"]').click(function() {
        submit();
    });

    function submit() {
        $("#ph-bmi-calculator-tool--result").css("display","block");
    }
}

$(document).ready(function () {
    bmisetRangeInputEl();
	initBMICalculator();
});
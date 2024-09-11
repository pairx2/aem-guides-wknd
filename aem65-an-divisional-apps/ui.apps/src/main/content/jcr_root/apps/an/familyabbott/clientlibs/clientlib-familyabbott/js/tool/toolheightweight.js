const months_0_12 = {
    minAge : 0,
    maxAge : 12,
    labelAge : 'months',
    minWeight : 2,
    maxWeight : 14,
    minHeight : 40,
    maxHeight : 90,
    minHead : 30,
    maxHead : 40
}

const years_1_3 = {
    minAge : 13,
    maxAge : 36,
    labelAge : 'months',
    minWeight : 6,
    maxWeight : 20,
    minHeight : 70,
    maxHeight : 110,
}

const years_3_6 = {
    minAge : 3,
    maxAge : 5,
    minWeight : 10,
    maxWeight : 25,
    minHeight : 80,
    maxHeight : 120,
}

const years_6_10 = {
    minAge : 6,
    maxAge : 10,
    minWeight : 15,
    maxWeight : 55,
    minHeight : 70,
    maxHeight : 160,
}

const ageInputId = {
    input : 'rangeInput_age',
    output : 'output_age'
}

const weightInputId = {
    input : 'rangeInput_weight',
    output : 'output_weight'
}

const heightInputId = {
    input : 'rangeInput_height',
    output : 'output_height'
}

const headInputId = {
    input : 'rangeInput_head',
    output : 'output_head'
}

function getRangeInputId(id) {
    switch (id) {
        case 'range-input--age' :
            return ageInputId;
        case 'range-input--weight' :
            return weightInputId;
        case 'range-input--height' :
            return heightInputId;
        case 'range-input--head' :
            return headInputId;
    }
}

function getDynamicRangeInputVal(value) {
    switch(value) {
        case '0-12m':
            return months_0_12;
        case '1-3y':
            return years_1_3;
        case '3-6y':
            return years_3_6;
        case '6-10y':
            return years_6_10;
    }
}

function getRangeInputHTML(id) {
	return '<input type="range" step="1" min="0" max="10" value="0" id="'+id.input+'" oninput="'+id.output+'.value = '+id.input+'.value" >'
}

function getRangeOutputHTML(id) {
	return '<output id="'+id.output+'" for="'+id.input+'">0</output>'
}

function setRangeInputEl() {
    let container = $('#ph-tool-hw .range-input-container');

    container.each(function() {
    	let id = $(this).attr('id');
        let rangeInputId = getRangeInputId(id);
        let rangeInputHTML = getRangeInputHTML(rangeInputId);
        let rangeOutputHTML = getRangeOutputHTML(rangeInputId);

        $(this).prepend(rangeInputHTML);
        $(this).find('.output-container').prepend(rangeOutputHTML);
	})
}


function setDefaultImage(radio) {
    if (radio) {
		setImage(radio);
    } else {
        let defaultRadio = $('#ph-tool-hw-stage-options .a-radio.a-radio--selected');
		let defaultRadioVal = defaultRadio.find('.a-radio__input').val();

        if (defaultRadioVal) {
        	setImage(defaultRadioVal);
        	setLatestRangeInputVal(getDynamicRangeInputVal(defaultRadioVal));
        }
    }

    function setImage(value) {
        let imageEl = $('#ph-tool-hw .image');

        imageEl.each(function() {
            let image = $(this).find('.cmp-image');

            if (image.attr('id').includes(value)) {
				$(this).addClass('active');
            } else {
				$(this).removeClass('active');
            }
        })
    }
}

function setLatestRangeInputVal(value) {
    let ageInput = "#" + ageInputId.input;
    let weightInput = "#" + weightInputId.input;
    let heightInput = "#" + heightInputId.input;
    let headInput = "#" + headInputId.input;

    let ageOutput = "#" + ageInputId.output;
    let weightOutput = "#" + weightInputId.output;
    let heightOutput = "#" + heightInputId.output;
    let headOutput = "#" + headInputId.output;

    if (value) {
        $(ageInput).attr({min: value.minAge, max: value.maxAge, value: value.minAge}).val(0);
        $(weightInput).attr({min: value.minWeight, max: value.maxWeight, value: value.minWeight}).val(0);
        $(heightInput).attr({min: value.minHeight, max: value.maxHeight, value: value.minHeight}).val(0);

        $(ageOutput).val(value.minAge);
        $(weightOutput).val(value.minWeight);
		$(heightOutput).val(value.minHeight);
    }

    if (value.labelAge) {
		$('#range-input--age').find('#years').hide();
        $('#range-input--age').find('#months').show();
    } else {
        $('#range-input--age').find('#months').hide();
		$('#range-input--age').find('#years').show();
    }

    if (value.minHead) {
		$(headInput).attr({min: value.minHead, max: value.maxHead, value: value.minHead}).val(0);
        $(headOutput).val(value.minHead);
        $('#range-input--head').show();
        $('#range-input--head').parents('.embed').prev().show();
    } else {
		$('#range-input--head').hide();
        $('#range-input--head').parents('.embed').prev().hide();
    }

}

function selectRadioOption() {
	let radio = $('#ph-tool-hw-stage-options .a-radio');
    radio.on('click', function() {
        let radioInput = $(this).find('.a-radio__input');
        if (radioInput.is(':checked')) {
            let value = radioInput.val();
            let rangeInputGroupVal = getDynamicRangeInputVal(value);

            setDefaultImage(value);
			setLatestRangeInputVal(rangeInputGroupVal);
        }
    })
}

function formReset() {
	let radio = $('#ph-tool-hw .a-radio--selected');
    let resetBtn = $('#ph-tool-hw .o-form-container__buttons .a-button--secondary');

    radio.each(function(){
		$(this).find('.a-radio__input').prop('checked',true);
        $(this).find('.a-radio__input').click();
    });

    resetBtn.on('click', function() {
        radio.each(function() {
			let radioVal = $(this).find('.a-radio__input').val();
            let resetVal = getDynamicRangeInputVal(radioVal);
            $(this).find('.a-radio__input').prop('checked',true);

            if (resetVal) {
                setDefaultImage(radioVal);
 				setLatestRangeInputVal(resetVal);
            }
        })

        sessionStorage.removeItem('tool_HW_Data');
    })
}

function convertYearsToMonths(stage, age) {
    if (stage === '3-6y' || stage === '6-10y') {
		return age * 12;
    }
    return age;
}

function formSubmit() {
    let submitBtn = $('#ph-tool-hw .o-form-container__buttons .a-button--primary');
    let jsonPath = $('#ph-tool-hw-json-path').val();
    let resultPage = $('[name="thankyouPage"]').val();

    submitBtn.on('click', function(){
        let gender = $('#ph-tool-hw-sex-options .a-radio .a-radio__input:checked').val();
        let stage = $('#ph-tool-hw-stage-options .a-radio .a-radio__input:checked').val();
        let age = convertYearsToMonths(stage, $("#" + ageInputId.input).val());
        let height = $("#" + heightInputId.input).val();
        let weight = $("#" + weightInputId.input).val();
        let head = $("#" + headInputId.input).is(':visible') ? $("#" + headInputId.input).val() : 0;

        let tool_HW_Data = new Object();
        tool_HW_Data.gender = gender;
        tool_HW_Data.stage = stage;
        tool_HW_Data.age = age;
        tool_HW_Data.height = height;
        tool_HW_Data.weight = weight;
        tool_HW_Data.head = head;

        sessionStorage.setItem('tool_HW_Data', JSON.stringify(tool_HW_Data));
        sessionStorage.setItem('tool_HW_Json_Path', jsonPath);

        if(!resultPage.endsWith('.html')) {
            resultPage = resultPage + ".html";
        }
		window.location.href = resultPage;
    })
}

$(document).ready(function () {
    setRangeInputEl();
    setDefaultImage();
    selectRadioOption();
    formSubmit();

    setTimeout(function() {
    	formReset();
    },500);
});
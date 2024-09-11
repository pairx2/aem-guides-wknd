let toleranceEl = $('#ph-tolerance-tool');
let options =  toleranceEl.find('.options');
let questions = toleranceEl.find('.a-radio');
let submitBtn =  toleranceEl.find('button[type="submit"]');
let multipleOptions = toleranceEl.find('[id="ph-tolerance-tool--multiple-options-options"]');
let isValid = true;
let stc_page = $('[name="STC_page"]').val();
let isomil_page = $('[name="Isomil_page"]').val();
let q5_answer = $('[name="q5"]:checked').val();
let result_page = "";

function checkMultipleOpts(thisEle){
    if (thisEle.hasClass('selected')) {
        let currentSelected = thisEle.find('input[type="radio"]:checked');
        let groupSelected = thisEle.parents('#ph-tolerance-tool--multiple-options-options').find('input[type="radio"]:checked');
        if (groupSelected.length > 1) {
            currentSelected.prop('checked', false);
            thisEle.removeClass('selected');
        }
    } else {
        thisEle.addClass('selected');
        thisEle.find('[type="radio"]').prop('checked', true);
    }
}

function checkSubmitBtn(isValid){
    if (isValid) {
        setTimeout(function() {
            submitBtn.attr('disabled', false);
        }, 300);
    }
}

function getIsValid(radio){
    if (radio.length < 1) {
        isValid = false; 
    }
}

function initToleranceTool() {

    if (toleranceEl.length < 1) {
        return;
    }

    multipleOptions.each(function() {
        $(this).find('.a-radio').addClass('multi-radio');

        let input = $(this).find('.a-radio__input');
		let name = input.attr('name');

        $('[name="'+name+'"]').each(function(index) {
            let new_name = name + "_" + (index + 1);
            $(this).attr('name', new_name);
        })
    })

    questions.on('click', function(e) {
		isValid = true;
        if($(this).hasClass('multi-radio')) {
            checkMultipleOpts($(this));
            e.preventDefault();
        }
        options.each(function() {
            let radio = $(this).find('[type="radio"]:checked');
            getIsValid(radio);
        });
        checkSubmitBtn(isValid);
    });

    submitBtn.on('click', function(e) {
        e.preventDefault();
        const stack = [];
        const counts = {};

        $('#ph-tolerance-tool .a-radio .a-radio__input:checked').each(function() {
            let answer = $(this).val();
            stack.push(answer);
        });

        stack.forEach(function(x) {
			counts[x] = (counts[x] || 0) + 1;
        });

       	let stc = counts.STC;
        let isomil = counts.Isomil;

        if (stc > isomil) {
			result_page = stc_page;

        } else if (isomil > stc) {
            result_page = isomil_page;

        } else {
            if(q5_answer == "STC") 
            { result_page = stc_page; }
            else {result_page = isomil_page;}
        }

        if(!result_page.endsWith('.html')) {
            result_page = result_page + ".html";
        }

		window.location.href = result_page;
    })
}

$(document).ready(function () {
    initToleranceTool();
});
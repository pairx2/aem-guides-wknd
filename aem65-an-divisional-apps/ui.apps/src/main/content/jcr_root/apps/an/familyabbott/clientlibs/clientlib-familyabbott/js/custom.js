function wrapTextTable() {
    let textTable = $('.text table');
	textTable.wrap('<div id="ph-text-table"><div class="table-wrapper"></div></div>');
}

function customFooterCareline() {
    let carelineEl = $('#ph-footer-careline');
    let newsLetterSignUp = $('#ph-footer-newsletter-signup');
    let breadcrumb = $('.a-breadcrumb');

    if (carelineEl.length > 0) {
        if (newsLetterSignUp.length > 0) {
            newsLetterSignUp.find('.o-form-container__element').attr('style','border-bottom: none !important;');
        } else {
        	breadcrumb.attr('style','border-bottom: none !important;');
        }

        let link = carelineEl.find('.btn').attr('href');
        if (!link) { return; }
        if (link.indexOf('https://tel:') == 0 || link.indexOf('http://tel:') == 0) {
            carelineEl.find('.btn').attr('href', link.split('//')[1]);
        }
    }
}

function triggerExitPopup() {
    $('#ph-online-distributor a, #ph-exit-link a').each(function() {
        if ($(this).attr('target') == "_blank") {
			$(this).attr('data-redirect-confirm', true);
        }
    })
}

function modifyDuplicateId() {
    let element = $('.header .a-link__text');
    let idArr = [];
    if ($(element).length > 0) {
        $(element).each(function() {
            if (!idArr.includes($(this).attr('id'))) {
				idArr.push($(this).attr('id'));
            } else {
				$(this).attr('id', 'clone-' + $(this).attr('id'));
            }
        })
    }
}

function createRangeInput() {
    let element = $('.range-input-container.shared');

    const rangeInput = {
        input : 'rangeInput_input',
        output : 'rangeInput_output'
    }

    function getRangeInputId(id) {
        if (id == "range-input") {
            return rangeInput;
        }
    }

    element.each(function(index) {
    	let id = $(this).attr('id');
        let min = $(this).attr('data-min');
        let max = $(this).attr('data-max');
        let step = $(this).attr('data-step') || 1;
        let inputEnable = $(this).hasClass('input-enabled');

        rangeInput.input = rangeInput.input + index;
        rangeInput.output = rangeInput.output + index;

        let rangeInputId = getRangeInputId(id);
        let rangeInputHTML = getRangeInputHTML(rangeInputId, min, max, step, inputEnable);
        let rangeOutputHTML = getRangeOutputHTML(rangeInputId, min, max, step, inputEnable);

        $(this).prepend(rangeInputHTML);
        $(this).find('.output-container').prepend(rangeOutputHTML);

        let getInputRange = $(this).find('[type=range]');
        let getInputNumber = $(this).find('[type=number]');
        let bubble = $(this).find('.output');

        if (inputEnable) {
            getInputRange.on("input change", function() {
                setBubble(getInputRange, bubble);
            });
            getInputNumber.on("input change", function() {
                setBubble(getInputRange, bubble);
            });
            setBubble(getInputRange, bubble);
        }
        
	})

    function setBubble(range, bubble) {
        const val = range.val();
        const min = range.prop('min');
        const max = range.prop('max');
        const newVal = Number(((val - min) * 100) / (max - min));
        bubble.text(val);

        bubble.css('left', `calc(${newVal}% + (${8 - newVal * 0.15}px))`);
    }

    function getRangeInputHTML(id, min, max, step, inputEnable) {
        let elementHTML = '<input type="range" step="1" min="'+min+'" max="'+max+'" value="0" id="'+id.input+'" oninput="'+id.output+'.value = '+id.input+'.value" >';

        if (inputEnable) {
            elementHTML = '<div style="width: 100%;position: relative"><input type="range" step="'+step+'" min="'+min+'" max="'+max+'" value="0" id="'+id.input+'" oninput="'+id.output+'.value = '+id.input+'.value" ><span class="output"></span></div>'
        }

        return elementHTML;
    }
    
    function getRangeOutputHTML(id, min, max, step, inputEnable) {
        let elementHTML = '<output id="'+id.output+'" for="'+id.input+'">0</output>'

        if (inputEnable) {
            elementHTML = `<input type="number" id=${id.output} min=${min} max=${max} value=${min} for=${id.input} oninput="${id.input}.value = ${id.output}.value" class="form-control" style="padding-right: 0;text-align:center;margin: 0;" step=${step}>`
        }
        return elementHTML;
    }
        
}

function familyAbbottLogoFooter() {
    let logoFooter = $('#ph-footer-family-abbott');
    if (logoFooter.length > 0) {
        $('.footer').find('.o-footer__copyright').css('margin-bottom', 0);
    }
}

function stateCodeToText() {
    let hiddenState = $('input[name="stateCode"]');
    let stateList = $('ul[name="stateCode"]');

    if (hiddenState.length > 0) {
        stateList.on('click', function() {
            setTimeout(function() {
                let state = $('ul[name="stateCode"] li.selected span').text().trim();

                hiddenState.val(state);
            }, 1000)
        })
    }
}

function stateCityCodeToText() {
    let hiddenState = $('input[name="stateCode"]'); 
    let hiddenCity = $('input[name="cityCode"]');
    let cityList = $('ul[name="cityCode"]');

    if (hiddenState.length > 0 && hiddenCity.length > 0) {
        cityList.on('click', function() {
            setTimeout(function() {
                let state = $('ul[name="stateCode"] li.selected span').text().trim();
                let city = $('ul[name="cityCode"] li.selected span').text().trim();

                hiddenState.val(state)
                hiddenCity.val(city);
            }, 1000)
        })
    }
}
function initFormBeforeSendPopup(){
	let formBeforePopup = $('#form-submit-before-popup');
	if(formBeforePopup.length > 0) {
		document.body.appendChild(document.getElementById('form-submit-before-popup'));
	}
	if($('#infoPopupShow-options').length) {
		$('#infoPopupShow-options li').on('click',function(){
			setTimeout(function() {
				submitPrePopup();
			},500);
		});
	}
}

$(document).ready(function () {
    wrapTextTable();
    customFooterCareline();
    triggerExitPopup();
    createRangeInput();
    familyAbbottLogoFooter();
    stateCityCodeToText();
    stateCodeToText();
	initFormBeforeSendPopup();
});
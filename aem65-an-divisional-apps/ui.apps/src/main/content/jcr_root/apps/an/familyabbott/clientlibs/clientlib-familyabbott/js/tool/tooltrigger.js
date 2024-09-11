
let triggerTool = $('#ph-trigger-tool');
let triggetToolQuestions = triggerTool.find('.formcontainer');
let triggetToolResult = $('#ph-trigger-tool--result');
let answersToBinary = "";
let formPopup = $('#ph-growth-form');
let formPopupClose = formPopup.find('#ph-popup-close');
let popupFormBtn = $('[name="freeNutritionCounselling"]');

function convertDtoC(val) {
    let data = "FALSE";
    
    if (val == 0 || val == "0") {
        data = "TRUE"
    }

    return data; 
}

function getAnswer() {
    triggerTool.find('button[name="next"], button[name="NEXT"], button[name="submit"], button[name="SUBMIT"]').click(function() {
        let value = $(this).parents('.o-wizard__content').find('.a-radio .a-radio__input:checked').val();
        let type = $(this).attr('name');
        answersToBinary += value.toString();

        if (type === "submit" || type === "SUBMIT") {
            submit();
        }
    });
}

function getMatchData(ans) {
    let dataSet = JSON.parse(sessionStorage.getItem('triggerDataSet'));
   let result;

   if (answersToBinary.length > 0) {
      result = dataSet.scenario.filter(t => t.answersToBinary == ans);
      return result[0];
   }

   return false;
}

function submit() {
    let finalData = getMatchData(answersToBinary);
    let message = ""; 
    let isData = false;
    if (finalData != isData) {
        if (finalData.message.length > 0) {
            for (let msg of finalData.message) {
                message += "<span>";
                message += msg;
                message += "</span>";
            }
        }

        $('#ph-trigger-tool--message p').html(message);
        $('#ph-trigger-tool--conclusion .cmp-title__text').html(finalData.conclusion);
        $('#ph-trigger-tool--solution p').html(finalData.solution);

        triggetToolQuestions.addClass('hidden');
        triggetToolResult.parents('.a-container').addClass('active');
        $("html, body").animate({ scrollTop: 0 }, 600);
    }
}

function initTriggerTool() { 
    popupFormBtn.on('click', function(e) {
        e.preventDefault();

        formPopup.addClass('active');
        $('body').addClass('popup-overlay');

        let ans_childFussy = triggerTool.find('[data-wizarditem="0"]').find('.a-radio .a-radio__input:checked').val();
        let ans_childFallSick = triggerTool.find('[data-wizarditem="1"]').find('.a-radio .a-radio__input:checked').val();
        let ans_childShorter = triggerTool.find('[data-wizarditem="2"]').find('.a-radio .a-radio__input:checked').val();
        let ans_childUnderWeight = triggerTool.find('[data-wizarditem="3"]').find('.a-radio .a-radio__input:checked').val();

        $('[name="childFussyEater"]').val(convertDtoC(ans_childFussy));
        $('[name="childFallSick"]').val(convertDtoC(ans_childFallSick));
        $('[name="childShorter"]').val(convertDtoC(ans_childShorter));
        $('[name="childUnderWeight"]').val(convertDtoC(ans_childUnderWeight));
            
        convertDtoC(val);
    });
    
    formPopupClose.on('click', function() {
        formPopup.removeClass('active');
        $('body').removeClass('popup-overlay');
    });


    if ($('#ph-growth-form').length > 0) {
        document.body.appendChild(document.getElementById('ph-growth-form')); 
    }

    function nextBtn() {
        triggerTool.find('.a-radio .a-radio__custom').click(function() {
         	$(this).parents('.o-wizard__content').find('button[name="next"], button[name="NEXT"], button[name="submit"], button[name="SUBMIT"]').attr('disabled', false);
        });
    }

    function backBtn() {
        triggerTool.find('button[name="back"], button[name="BACK"]').click(function() {
         	answersToBinary = answersToBinary.slice(0, -1);
        });
    } 
    
    function getTriggerDataSet() {
        let triggerToolJsonPath = $('[name="trigger-tool-json-path"]').val();
        
        $.getJSON(triggerToolJsonPath, {
            format: 'json'
        })
        .done (function(data) {
            if (data) {
                sessionStorage.setItem('triggerDataSet', JSON.stringify(data));
            }
        })
    }    

    getTriggerDataSet();
    nextBtn();
    backBtn();
    getAnswer();
}

function initPreScreen() {
	let preScreen = $('#ph-trigger-tool--pre-screen');
    let questions = $('#ph-trigger-tool--questions');
    let startBtn = $('#ph-trigger-tool--start-button');

    if (preScreen.length > 0) {
        startBtn.on('click', function(e) {
            e.preventDefault();
			preScreen.parents('#section-ph-trigger-tool--pre-screen').parent().hide();
            questions.parent().show();
            $("html, body").animate({ scrollTop: 0 }, 600);
        })
    }
}

$(document).ready(function () {
    initPreScreen();
    initTriggerTool();
});
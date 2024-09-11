const calorieageInputId = {
    min : 18,
    max : 85,
    input : 'calorie_rangeInput_age',
    output : 'calorie_output_age',
}

const calorieweightInputId = {
    min : 25,
    max : 150,
    input : 'calorie_rangeInput_weight',
    output : 'calorie_output_weight'
}

const calorieheightInputId = {
    min : 100,
    max : 200,
    input : 'calorie_rangeInput_height',
    output : 'calorie_output_height'
}

function caloriegetRangeInputId(id) {
    switch (id) {
        case 'ph-calorie-tool--age' :
            return calorieageInputId;
        case 'ph-calorie-tool--weight' :
            return calorieweightInputId;
        case 'ph-calorie-tool--height' :
            return calorieheightInputId;
    }
}

function caloriegetRangeInputHTML(id) {
	return '<input type="range" step="1" min="'+id.min+'" max="'+id.max+'" value="'+id.min+'" id="'+id.input+'" oninput="'+id.output+'.value = '+id.input+'.value" >'
}

function caloriegetRangeOutputHTML(id) {
    return '<output id="'+id.output+'" for="'+id.input+'">'+id.min+'</output>'
}

function caloriesetRangeInputEl() {
    let container = $('#ph-calorie-tool .ph-range-input-container');

    container.each(function() {
    	let id = $(this).attr('id');
        let rangeInputId = caloriegetRangeInputId(id);
        let rangeInputHTML = caloriegetRangeInputHTML(rangeInputId);
        let rangeOutputHTML = caloriegetRangeOutputHTML(rangeInputId);

        $(this).prepend(rangeInputHTML);
        $(this).find('.ph-output-container').prepend(rangeOutputHTML);
	})
}

function calorieformSubmit() {
    let submitBtn = $('#ph-calorie-tool #ph-calculate');

    submitBtn.on('click', function(){
        let calorie_height = $("#calorie_output_height").val();
        let calorie_weight = $("#calorie_output_weight").val();
        let calorie_age = $("#calorie_output_age").val();
        let calorie = 0;
        let factor = 0;
        let goal = 0;
        let lang = $('html').attr('lang');

        let calorie_exercise = $("#ph-calorie-tool--exercise-options .a-dropdown__menu li.selected");
        let calorie_goal = $("#ph-calorie-tool--goal-options .a-dropdown__menu li.selected");
        let calorie_exercise_value = calorie_exercise.attr('data-optionvalue');
        let calorie_goal_value = calorie_goal.attr('data-optionvalue');

        if(lang == "en-AU") {
            if ($("#ph-calorie-tool--gender-options .a-radio__input[value=male]").is(":checked"))
                calorie = 66.4730 + (13.7516 * calorie_weight) + (5.0033 * calorie_height) - (6.7550 * calorie_age);
            else
                calorie = 655.0955 + (9.5634 * calorie_weight) + (1.8496 * calorie_height) - (4.6756 * calorie_age);

            switch (calorie_exercise_value) {
                case "bed-rest":
                    factor = 1.2;
                    break;
                case "very-sedentary":
                    factor = 1.4;
                    break;
                case "light-active":
                    factor = 1.6;
                    break;
                case "moderately-active":
                    factor = 1.8;
                    break;
                case "heavy-activity":
                    factor = 2.0;
                    break;
                case "vigorous-activity":
                    factor = 2.2;
                    break;
            }
        } else {
            if ($("#ph-calorie-tool--gender-options .a-radio__input[value=male]").is(":checked"))
                calorie = (66.5 + 13.75 * calorie_weight + 5.003 * calorie_height - 6.775 * calorie_age);
            else
                calorie = (655.1 + 9.563 * calorie_weight + 1.85 * calorie_height - 4.676 * calorie_age);

            switch (calorie_exercise_value) {
                case "sedentary":
                    factor = 1.2;
                    break;
                case "light-activity":
                    factor = 1.375;
                    break;
                case "moderate-activity":
                    factor = 1.55;
                    break;
                case "very-active":
                    factor = 1.725;
                    break;
                default:
                    factor = 1.725
            }
        }

        switch (calorie_goal_value) {
            case "gain":
                goal = 500;
                break;
            case "lose":
                goal = -calorie * factor * .25;
                break;
            default:
        }

        let calorie_result = parseInt(calorie * factor + goal);
        $("#ph-calorie-tool--result #ph-calorie-result").find('.cmp-title__text').text(calorie_result);
        $("#ph-calorie-tool--result").css("display","block");
    })
}

$(document).ready(function () {
    caloriesetRangeInputEl();
	calorieformSubmit();
});
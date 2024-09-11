const epAgeInputId = {
    min : 20,
    max : 100,
    input : 'ep_rangeInput_age',
    output : 'ep_output_age',
}

const epWeightInputId = {
    min : 40,
    max : 180,
    input : 'ep_rangeInput_weight',
    output : 'ep_output_weight'
}

const epHeightInputId = {
    min : 140,
    max : 200,
    input : 'ep_rangeInput_height',
    output : 'ep_output_height'
}

function epGetRangeInputId(id) {
    switch (id) {
        case 'ph-exercise-planner--age' :
            return epAgeInputId;
        case 'ph-exercise-planner--weight' :
            return epWeightInputId;
        case 'ph-exercise-planner--height' :
            return epHeightInputId;
    }
}

function epGetRangeInputHTML(id) {
	return '<input type="range" step="1" min="'+id.min+'" max="'+id.max+'" value="'+id.min+'" id="'+id.input+'" oninput="'+id.output+'.value = '+id.input+'.value" >'
}

function epGetRangeOutputHTML(id) {
    return '<output id="'+id.output+'" for="'+id.input+'">'+id.min+'</output>'
}

function epSetRangeInputEl() {
    let container = $('#ph-exercise-planner .ph-range-input-container');
    container.each(function() {
    	let id = $(this).attr('id');
        let rangeInputId = epGetRangeInputId(id);
        let rangeInputHTML = epGetRangeInputHTML(rangeInputId);
        let rangeOutputHTML = epGetRangeOutputHTML(rangeInputId);

        $(this).prepend(rangeInputHTML);
        $(this).find('.ph-output-container').prepend(rangeOutputHTML);
	})
}

function epGetFormula(gender, age, weight, height) {
    let formula;
    if (gender == "male")
        formula = 665.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age);
    else
        formula = 66.47 + (13.75 * weight) + (5.003 * height) - (6.755 * age);
    return formula;
}

function epGetExerciseText(activityValue) {
    let exerciseText;
    if (activityValue == "sedentary" || activityValue == "lightly-active") {
        exerciseText = "Low";
    } else if (activityValue == "moderately-active") {
        exerciseText = "Moderate";
    } else if (activityValue == "very-active" || activityValue == "extra-active") {
        exerciseText = "Vigorous";
    }
    return exerciseText;
}

function epGetCalorie(activityValue, formula) {
    let calorieValue;
    if (activityValue == "sedentary") {
        calorieValue = (formula * 1.2) - 500;
    } else if (activityValue == "lightly-active") {
        calorieValue = (formula * 1.375) - 500;
    } else if (activityValue == "moderately-active") {
        calorieValue = (formula * 1.55) - 500;
    } else if (activityValue == "very-active") {
        calorieValue = (formula * 1.725) - 500;
    } else if (activityValue == "extra-active") {
        calorieValue = (formula * 1.9) - 500;
    }
    return calorieValue;
}

function epGetCalorieText(calorieValue) {
    let calorieText;
    if (calorieValue >= 0 && calorieValue <= 1350) {
        calorieText = "1200";
    } else if (calorieValue >= 1351 && calorieValue <= 1650) {
        calorieText = "1500";
    } else if (calorieValue >= 1651 && calorieValue <= 1900) {
       	calorieText = "1800";
    } else if (calorieValue >= 1901 && calorieValue <= 2100) {
      	calorieText = "2000";
    } else if (calorieValue > 2101) {
      	calorieText = "2200";
    }
    return calorieText;
}

function epGetSampleMeal(calorieText) {
    let mealId;
    if (calorieText == "1200") {
        mealId = "#ph-exercise-planner--meal-1200";
    } else if (calorieText == "1500") {
       	mealId = "#ph-exercise-planner--meal-1500";
    } else if (calorieText == "1800") {
       mealId = "#ph-exercise-planner--meal-1800";
    } else if (calorieText == "2000") {
       mealId = "#ph-exercise-planner--meal-2000";
    } else if (calorieText == "2200") {
       mealId = "#ph-exercise-planner--meal-2200";
    }
    return mealId;
}

function epGetSampleExercise(exerciseText) {
    let exerciseId;
    if (exerciseText == "Low") {
        exerciseId = "#ph-exercise-planner--plan-low";
    } else if (exerciseText == "Moderate") {
       	exerciseId = "#ph-exercise-planner--plan-moderate";
    } else if (exerciseText == "Vigorous") {
       exerciseId = "#ph-exercise-planner--plan-vigorous";
    }
    return exerciseId;
}

function epCalculate() {
    let calculateBtn = $('#ph-exercise-planner #ph-calculate');
	sessionStorage.setItem('labelBMI', $('#ph-exercise-planner--bmi').find('.cmp-title__text').text());

    calculateBtn.on('click', function() {
        let gender = $('#ph-exercise-planner--gender-options .a-radio .a-radio__input:checked').val();
        let age = $("#ep_output_age").val();
        let weight = $("#ep_output_weight").val();
        let height = $("#ep_output_height").val();
        let activity = $('#ph-exercise-planner--activity-options .a-dropdown__menu li.selected');
        let activityValue = activity.attr('data-optionvalue');
		let heightInMeter = height/100;
        let bmiValue = weight/(heightInMeter * heightInMeter);
        let formula = epGetFormula(gender, age, weight, height);
        let exerciseText = epGetExerciseText(activityValue);
        let calorieValue = epGetCalorie(activityValue, formula);
		let calorieText = epGetCalorieText(calorieValue);
        let sampleMeal = epGetSampleMeal(calorieText);
        let sampleExercise = epGetSampleExercise(exerciseText);
		let labelBMI = sessionStorage.getItem('labelBMI');
        let textBMI = (labelBMI + "<span></span>" + bmiValue.toFixed(2));

        $('#ph-exercise-planner--underweight, #ph-exercise-planner--normal, #ph-exercise-planner--overweight, #ph-exercise-planner--obese').removeClass('active');

        if (bmiValue.toFixed(2) < 18.5) {
			$('#ph-exercise-planner--underweight').addClass('active');
        } else if (bmiValue.toFixed(2) >= 18.5 && bmiValue.toFixed(2) <= 22.9) {
			$('#ph-exercise-planner--normal').addClass('active');
        } else if (bmiValue.toFixed(2) >= 23  && bmiValue.toFixed(2) <= 27.4) {
            $('#ph-exercise-planner--overweight').addClass('active');
        } else {
            $('#ph-exercise-planner--obese').addClass('active');
        }

        $('#ph-exercise-planner--bmi').find('.cmp-title__text').html(textBMI);
        $('#ph-exercise-planner--calorie').find('.cmp-title__text').text(calorieText);
        if($('#ph-exercise-planner--plan-exercise-'+exerciseText).length){
            $('#ph-exercise-planner--results div[id^="ph-exercise-planner--plan-exercise-"]').hide();
        	exerciseText = $('#ph-exercise-planner--plan-exercise-'+exerciseText).text();
        }
        $('#ph-exercise-planner--plan').find('.cmp-title__text').text(exerciseText);
        $('#ph-exercise-planner--results-container').addClass('active');

        $(sampleMeal).parent().siblings().find('.container').removeClass('active');
        $(sampleExercise).parent().siblings().find('.container').removeClass('active');
        $(sampleMeal).addClass('active');
        $(sampleExercise).addClass('active');
    })
}

if($('input[name=exercise-meal-popup-text]').val()== "true"){
	$('#ph-exercise-planner--meal-1200, #ph-exercise-planner--meal-1500,#ph-exercise-planner--meal-1800,#ph-exercise-planner--meal-2000,#ph-exercise-planner--meal-2200').css("padding","0 20px 0 20px");
	$('#ph-exercise-planner--plan-low, #ph-exercise-planner--plan-moderate, #ph-exercise-planner--plan-vigorous').css("padding","0 20px 0 20px");
}

$(document).ready(function () {
    epSetRangeInputEl();
    epCalculate();
});
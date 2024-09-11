function getAgeRangeScore(ageRange) {
    switch (ageRange) {
        case '34-39' :
            return 0;
        case '40-44' :
            return 0;
        case '45-49' :
            return 1;
        case '50AndAbove' :
            return 2;
    }
}
function getGenderScore(gender) {
    switch (gender) {
        case 'women' :
            return 0;
        case 'men' :
            return 2;
    }
}
function getBodyMassScore(bmi) {
    if(bmi < 23)
        return 0;
    else if(bmi >= 23 && bmi <27.5)
        return 3;
    else if(bmi >= 27.5)
        return 5;
}
function getWaistlineScore(waist, gender) {
    if((gender==="men" && waist<90) || (gender==="women" && waist<80)){
        return 0;
    }
    else if((gender==="men" && waist>=90) || (gender==="women" && waist>=80)){
        return 2;
    }
}

function getBPScore(bp) {
    switch (bp) {
        case 'no' :
            return 0;
        case 'yes' :
            return 2;
    }
}
function getDiabetesHistoryScore(history) {
    switch (history) {
        case 'no' :
            return 0;
        case 'yes' :
            return 4;
    }
}

function getCalculateRiskLevel(sumScore){
	if(sumScore <=2)
	    return "Little";
	else if(sumScore >= 3 && sumScore <= 5)
	    return "Moderate";
	else if(sumScore >=6 && sumScore <=8)
	    return "High Risk";
	else if(sumScore >8)
	    return "Very High Risk";

}
function diabetesRiskResults(data, riskLevel){
    if (data) {
        let result = data.filter(i =>  i.RiskLevel == riskLevel);
             return result[0];
    }
}

function getDiabetesRiskDataSet() {
        let path = $('[name="diabetes-risk-json-path"]').val();

        $.getJSON(path, {
            format: 'json'
        })
        .done (function(data) {
            if (data) {
                sessionStorage.setItem('diabetesRiskDataSet', JSON.stringify(data));
            }
        })
}

function calculateDiabetesRisk() {
            let id = $('#ph-diabetes-risk');
            let submitBtn = id.find('button[name="submit"]');
            let inputScreen = $('#ph-diabetes-risk-columns');
            let resultScreen = $('#ph-diabetes-risk-results');

            submitBtn.on('click', function(e) {
                e.preventDefault();
                let gender = id.find('[name="gender"]:checked').val();
                let ageRange = id.find('[name="ageRange"]:checked').val();
                let weight = id.find('[name="weight"]').val();
                let height = id.find('[name="height"]').val();
                let waist = id.find('[name="waist"]').val();
                let bloodPressure = id.find('[name="bloodPressure"]:checked').val();
                let diabetesHistory = id.find('[name="diabetesHistory"]:checked').val();

                let bmi = weight / (height / 100 * height / 100);
                bmi = round(bmi, 1);

                let ageScore = getAgeRangeScore(ageRange);
                let genderScore = getGenderScore(gender);
                let bmiScore = getBodyMassScore(bmi);
                let waistlineScore = getWaistlineScore(waist, gender);
                let bpScore = getBPScore(bloodPressure);
                let historyScore = getDiabetesHistoryScore(diabetesHistory);

                let totalScore = ageScore + genderScore + bmiScore + waistlineScore + bpScore +historyScore;
                let riskLevel = getCalculateRiskLevel(totalScore);
                let results = JSON.parse(sessionStorage.getItem('diabetesRiskDataSet'));
                let result = diabetesRiskResults(results, riskLevel);
                if (result) {
                            $('#ph-risk-diabetes-percentage').text(result.RiskofDiabetesIn12Years);
                            $('#ph-diabetes-risk-level').text(result.RiskLevelLang);
                            $('#ph-diabetes-risk-recommend').text(result.Recommend);
                            $('#ph-diabetes-opportunity').text(result.OpportunityDiabetes);

                       	 	inputScreen.hide();
                            resultScreen.show();
                    		$('#ph-diabetes-bmi-text').hide();
                    		$('body,html').animate({scrollTop: 0},1000);

                        }
            })
        }

$(document).ready(function () {
    getDiabetesRiskDataSet();
	calculateDiabetesRisk();
});

$('#ph-diabetes-height, #ph-diabetes-weight' ).on( "blur", function() {
    let height = $("#ph-diabetes-height").val().trim();
    let weight = $("#ph-diabetes-weight").val().trim();
    if(height != null && height != "" && weight != null && weight!= "" )
    {
        let bmi = weight/(height /100 * height/100);
        let bmitext;
        if(bmi < 23)
            bmitext = $("#ph-diabetes-bmi-text-low").text()
        else if(bmi >= 23 && bmi <27.5)
            bmitext =$("#ph-diabetes-bmi-text-mid").text();
        else if(bmi >= 27.5)
            bmitext = $("#ph-diabetes-bmi-text-high").text();
       $('#ph-diabetes-bmi-text').text(bmitext);
       $('#ph-diabetes-bmi-text').show();
    }
    else{
        $('#ph-diabetes-bmi-text').hide();
    }
});

$( '#ph-diabetes-weight, #ph-diabetes-height').on( "keyup", function() {
    if($("#ph-diabetes-weight").val() == "" || $("#ph-diabetes-height").val() == ""){
  		$('#ph-diabetes-bmi-text').hide();
    }
});


$(document).ready(function () {
    
    let idMY = $('#ph-diabetes-risk');
    let resultScreenMY = $('#ph-diabetes-risk-results');
    let inputScreenMY = $('#ph-diabetes-risk-columns');

    $('[name="waistFemale"]').closest('.options').hide();
    let bmiVal, height, weight, genderMY;
    $('#ph-diabetes-height, #ph-diabetes-weight' ).on( "blur", function() {
        height = $("#ph-diabetes-height").val().trim();
        weight = $("#ph-diabetes-weight").val().trim();
        if(height != null && height != "" && weight != null && weight!= "" )
        {
            let bmi = weight/(height /100 * height/100);
            if(bmi < 23)
                bmiVal = 0;
            else if(bmi >= 23 && bmi < 27.5)
                bmiVal = 1;
            else if(bmi >= 27.5 && bmi < 35)
                bmiVal = 2;
            else if(bmi > 35)
                bmiVal = 4;
        }
        else{
            $('#ph-diabetes-bmi-text').hide();
        }
    });
    $('[name="gender"]').on('change', function(e) {
        genderMY = $('[name="gender"]:checked').val();
        if(genderMY == "men") {
            $('[name="waistFemale"]').closest('.options').hide();
            $('[name="waistMale"]').closest('.options').show();
        } else if (genderMY == "women"){
            $('[name="waistMale"]').closest('.options').hide();
            $('[name="waistFemale"]').closest('.options').show();
        }
    });
    $('#calculateRisk').on('click', function(e) {
        e.preventDefault();
        let ageRangeMY = idMY.find('[name="ageRange"]:checked').val();
        let hyperTensionMY = idMY.find('[name="hyperTension"]:checked').val();
        let softDrinksMY = idMY.find('[name="softDrinks"]:checked').val();
        let diabetesHistoryMY = idMY.find('[name="diabetesHistory"]:checked').val();
        let exerciseMY = idMY.find('[name="exercise"]:checked').val();
        let waistMY;
        if(genderMY == "men") {
            waistMY = idMY.find('[name="waistMale"]:checked').val();
        } else {
            waistMY = idMY.find('[name="waistFemale"]:checked').val();
        }
        let totalScoreMY = parseInt(ageRangeMY) + parseInt(hyperTensionMY) + parseInt(softDrinksMY) + 
            parseInt(diabetesHistoryMY) + parseInt(exerciseMY) + parseInt(waistMY) + parseInt(bmiVal);
            $('#diabetes-risk-assessment-tool').hide();
            inputScreenMY.hide();
            resultScreenMY.show();            
            $('body,html').animate({scrollTop: 0},1000);
        if(totalScoreMY < 4) {
            resultScreenMY.find('#ph-diabetes-risk-recommend-low').show();
            resultScreenMY.find('#ph-diabetes-risk-recommend-medium').hide();
            resultScreenMY.find('#ph-diabetes-risk-recommend-high').hide();
        }
        if(totalScoreMY >= 4 && totalScoreMY <=6 ) {
            resultScreenMY.find('#ph-diabetes-risk-recommend-low').hide();
            resultScreenMY.find('#ph-diabetes-risk-recommend-medium').show();
            resultScreenMY.find('#ph-diabetes-risk-recommend-high').hide();
        }
        if(totalScoreMY >= 7) {
            resultScreenMY.find('#ph-diabetes-risk-recommend-low').hide();
            resultScreenMY.find('#ph-diabetes-risk-recommend-medium').hide();
            resultScreenMY.find('#ph-diabetes-risk-recommend-high').show();
        }
    });
});
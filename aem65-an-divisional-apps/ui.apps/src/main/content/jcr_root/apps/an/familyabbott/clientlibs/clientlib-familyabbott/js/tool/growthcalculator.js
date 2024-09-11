let _lang = $('html').attr('lang');
let _id,_gender, _dob,_childHeight,_childWeight,_fatherHeight,_motherHeight,_age,_heightInMeter,_bmiValue,_label,_role,_roleSplited,_formPopup,_formPopupClose;

function getAge(date) {
    let mdate = date;
    let yearThen = parseInt(mdate.substring(6, 10), 10);
    let monthThen = parseInt(mdate.substring(3, 5), 10);
    let dayThen = parseInt(mdate.substring(0, 4), 10);
    let today = new Date();
    let birthday = new Date(yearThen, monthThen - 1, dayThen);
    let differenceInMilisecond = today.valueOf() - birthday.valueOf();
    let year_age = Math.floor(differenceInMilisecond / 31536000000);
    let day_age = Math.floor((differenceInMilisecond % 31536000000) / 86400000);
    let month_age = Math.floor(day_age / 30);
    let age_Per_Months = (year_age * 12) + month_age;
    return age_Per_Months;
}

function getUserInputs(){
    _gender = _id.find('[name="gender"]:checked').val();
     _dob = _id.find('[name="childDateOfBirth"]').val();
     _childHeight = _id.find('[data-name="child-height"] input').val();
     _childWeight = _id.find('[data-name="child-weight"] input').val();
     _fatherHeight = _id.find('[data-name="father-height"] input').val();
     _motherHeight = _id.find('[data-name="mother-height"] input').val();
    _age = getAge(_dob);
    _heightInMeter = _childHeight / 100;
    _bmiValue = _childWeight / (_heightInMeter * _heightInMeter);
}

let _maleHeightRange, _femaleHeightRange;
function getHeightRange(_role,_roleSplited){
    if (_role) {
        _maleHeightRange = _roleSplited[0].split('=')[1];
        _femaleHeightRange = _roleSplited[1].split('=')[1];
    }
}

const genderText = {
    male: "male",
    female: "female"
}

const bmiTextIN = {
    underweight: "Underweight",
    normal: "Normal",
    average: "Average",
    overweight: "Overweight",
    obese: "Obese",
}

const heightStatusText = {
    stunted: "Stunted",
    risk: "Risk",
    abnormal: "Abnormal",
    healthy: "Healthy",
}

function addSessionStorage(data) {
    if (data) {
        sessionStorage.setItem('growthDataSet', JSON.stringify(data));
    }
}
function getSilhoutteBoy(_gender , status) {
    let boyAbnormalSilhouette = $('#ph-growth-results__boy-abnormal');
    let boyStundedSilhouette = $('#ph-growth-results__boy-stunted');
    let boyRiskSilhouette = $('#ph-growth-results__boy-risk');
    let boyhealthySilhouette = $('#ph-growth-results__boy-healthy');
    let boyAvgSilhouette = $('#ph-growth-results__boy-average');
    let finalSilhouette, finalSilhouetteAvg;

    if (_gender == genderText.male && status == heightStatusText.stunted) {
        finalSilhouette = boyStundedSilhouette.attr('data-asset');
        finalSilhouetteAvg = boyAvgSilhouette.attr('data-asset');

    } else if (_gender == genderText.male && status == heightStatusText.risk) {
        finalSilhouette = boyRiskSilhouette.attr('data-asset');
        finalSilhouetteAvg = boyAvgSilhouette.attr('data-asset');

    } else if (_gender == genderText.male && status == heightStatusText.healthy) {
        finalSilhouette = boyhealthySilhouette.attr('data-asset');
        finalSilhouetteAvg = boyAvgSilhouette.attr('data-asset');

    } else if (_gender == genderText.male && status == heightStatusText.abnormal) {
        finalSilhouette = boyAbnormalSilhouette.attr('data-asset');
        finalSilhouetteAvg = boyAvgSilhouette.attr('data-asset');

    }

    return {
        finalSilhouette: finalSilhouette,
        finalSilhouetteAvg: finalSilhouetteAvg
    }
}
function getSilhoutteGirl(_gender , status) {

    let girlAbnormalSilhouette = $('#ph-growth-results__girl-abnormal');
    let girlStundedSilhouette = $('#ph-growth-results__girl-stunted');
    let girlRiskSilhouette = $('#ph-growth-results__girl-risk');
    let girlhealthySilhouette = $('#ph-growth-results__girl-healthy');
    let girlAvgSilhouette = $('#ph-growth-results__girl-average');
    let finalSilhouette, finalSilhouetteAvg;

    if (_gender == genderText.female && status == heightStatusText.stunted) {
        finalSilhouette = girlStundedSilhouette.attr('data-asset');
        finalSilhouetteAvg = girlAvgSilhouette.attr('data-asset');

    } else if (_gender == genderText.female && status == heightStatusText.risk) {
        finalSilhouette = girlRiskSilhouette.attr('data-asset');
        finalSilhouetteAvg = girlAvgSilhouette.attr('data-asset');

    } else if (_gender == genderText.female && status == heightStatusText.healthy) {
        finalSilhouette = girlhealthySilhouette.attr('data-asset');
        finalSilhouetteAvg = girlAvgSilhouette.attr('data-asset');
    }

    else if (_gender == genderText.female && status == heightStatusText.abnormal) {
        finalSilhouette = girlAbnormalSilhouette.attr('data-asset');
        finalSilhouetteAvg = girlAvgSilhouette.attr('data-asset');
    }

    return {
        finalSilhouette: finalSilhouette,
        finalSilhouetteAvg: finalSilhouetteAvg
    }
}
function getlabelData(_label, labelAvg, height, result) {
    let labelWithHeight, labelAvgWithHeight;
    if ($('html').attr('lang') == "in-ID") {
        labelWithHeight = _label.replace('0', height);
        labelAvgWithHeight = labelAvg.replace('0', result.Average);

    } else {
        labelWithHeight = _label.replace('-', height);
        labelAvgWithHeight = labelAvg.replace('-', result.Average);
    }
    return {
        labelWithHeight: labelWithHeight,
        labelAvgWithHeight: labelAvgWithHeight
    }
}

let ruler, markerLow, markerHigh, markerInch, markerBottomLow, markerBottomHigh;

function updateClass(status, result) {
    if (status == heightStatusText.stunted) {
        markerLow = (result.Risk_High - result.Risk_Low) * markerInch;
        markerHigh = (result.Standard_High - result.Standard_Low) * markerInch;
        markerBottomLow = (result.Risk_Low * ruler);
        markerBottomHigh = (result.Standard_Low * ruler);

        $('.ph-growth-results__marker-low').addClass('status-risk').css({ 'height': markerLow + "%", 'bottom': markerBottomLow + "%" });
        $('.ph-growth-results__marker-high').addClass('status-healthy').css({ 'height': markerHigh + "%", 'bottom': markerBottomHigh + "%" });

    } else if (status == heightStatusText.risk) {
        markerLow = (result.Stunted_High - result.Stunted_Low) * markerInch;
        markerHigh = (result.Standard_High - result.Standard_Low) * markerInch;
        markerBottomLow = (result.Stunted_Low * ruler);
        markerBottomHigh = (result.Standard_Low * ruler);

        $('.ph-growth-results__marker-low').addClass('status-stunted').css({ 'height': markerLow + "%", 'bottom': markerBottomLow + "%" });
        $('.ph-growth-results__marker-high').addClass('status-healthy').css({ 'height': markerHigh + "%", 'bottom': markerBottomHigh + "%" });

    } else if (status == heightStatusText.healthy) {
        markerLow = (result.Stunted_High - result.Stunted_Low) * markerInch;
        markerHigh = (result.Risk_High - result.Risk_Low) * markerInch;
        markerBottomLow = (result.Stunted_Low * ruler);
        markerBottomHigh = (result.Risk_Low * ruler);

        $('.ph-growth-results__marker-low').addClass('status-stunted').css({ 'height': markerLow + "%", 'bottom': markerBottomLow + "%" });
        $('.ph-growth-results__marker-high').addClass('status-risk').css({ 'height': markerHigh + "%", 'bottom': markerBottomHigh + "%" });
    }
}

function case1() {
    if ($('[name="childDateOfBirth"]').val() != "" && $('[data-name="child-height"] input').val() > 0 && $('[data-name="child-weight"] input').val() > 0) {
        enabledSubmitBtn();
    } else {
        disabledSubmitBtn();
    }
}

function case2() {
    if ($('[name="childDateOfBirth"]').val() != "" && $('[data-name="child-height"] input').val() > 0 && $('[data-name="father-height"] input').val() > 0 && $('[data-name="mother-height"] input').val() > 0) {
        enabledSubmitBtn();
    } else {
        disabledSubmitBtn();
    }
}

function case3() {
    if ($('[name="childDateOfBirth"]').val() != "" && $('[data-name="child-height"] input').val() > 0) {
        enabledSubmitBtn();
    } else {
        disabledSubmitBtn();
    }
}

function case4() {
    if ($('[name="childDateOfBirth"]').val() != "" && $('[data-name="child-height"] input').val() > 0 && $('[data-name="child-weight"] input').val() > 0 && $('[data-name="father-height"] input').val() > 0 && $('[data-name="mother-height"] input').val() > 0) {
        enabledSubmitBtn();
    } else {
        disabledSubmitBtn();
    }
}

function enabledSubmitBtn() {
    $('[name="validator"]').parents('.a-input-field').attr('data-required', false);
    $('button[name="calculate"]').attr('disabled', false);
}

function disabledSubmitBtn() {
    $('button[name="calculate"]').attr('disabled', true);
}

function filterBMIDataSet(data, _gender , _age) {
    let result;
    if (_gender == genderText.male) {
        result = data.Boy_BMI.filter(b => b.Age_Per_Months == _age);
    } else {
        result = data.Girl_BMI.filter(g => g.Age_Per_Months == _age);
    }
    return result[0];
}

function heightCheck_IN(result, _childHeight) {

    // "heightIssue" defination
    // standard = 0
    // Risk/Stunted = 1

    let heightIssue;

    if (_childHeight < result.Risk_High || _childHeight > result.Standard_High) {
        heightIssue = 1;
    } else {
        heightIssue = 0;
    }
    return heightIssue;
}

function weightCheck_IN(data, _bmiValue) {

    // "weightIssue" defination
    // Healthy = 0
    // Underweight = 1
    // Overweight = 2

    let weightIssue;
    let BMI = _bmiValue.toFixed(2);

    if (BMI <= data.Stunted_High) {
        weightIssue = 1;

    } else if (BMI >= data.Standard_Low && BMI <= data.Standard_High) {
        weightIssue = 0;

    } else if (BMI >= data.Risk_Low && BMI <= data.Risk_High) {
        weightIssue = 1;

    } else if (BMI > data.Risk_High) {
        weightIssue = 2;
    }
    return weightIssue;
}

function processBMI_IN_boy(BMI, data, status) {
    if (BMI <= data.Stunted_High.toFixed(2)) {
        $('#ph-growth-results__bmi-boy-under').parent().show();
        $('#ph-growth-results__bmi-under-text').parent().show();
        status = bmiTextIN.underweight;

    } else if (BMI >= data.Standard_Low.toFixed(2) && BMI <= data.Standard_High.toFixed(2)) {
        $('#ph-growth-results__bmi-boy-normal').parent().show();
        $('#ph-growth-results__bmi-normal-text').parent().show();
        status = bmiTextIN.normal;

    } else if (BMI >= data.Risk_Low.toFixed(2) && BMI < data.Risk_High.toFixed(2)) {
        $('#ph-growth-results__bmi-boy-riskover').parent().show();
        $('#ph-growth-results__bmi-riskover-text').parent().show();
        status = bmiTextIN.average;

    } else if (BMI >= data.Risk_High.toFixed(2) && BMI < data.Obese.toFixed(2)) {
        $('#ph-growth-results__bmi-boy-over').parent().show();
        $('#ph-growth-results__bmi-over-text').parent().show();
        status = bmiTextIN.overweight;

    } else if (BMI >= data.Obese.toFixed(2)) {
        $('#ph-growth-results__bmi-boy-obese').parent().show();
        $('#ph-growth-results__bmi-obese-text').parent().show();
        status = bmiTextIN.obese;
    }
    return status;
}

function processBMI_IN_girl(BMI, data, status) {
    if (BMI <= data.Stunted_High.toFixed(2)) {
        $('#ph-growth-results__bmi-girl-under').parent().show();
        $('#ph-growth-results__bmi-under-text').parent().show();
        status = bmiTextIN.underweight;

    } else if (BMI >= data.Standard_Low.toFixed(2) && BMI <= data.Standard_High.toFixed(2)) {
        $('#ph-growth-results__bmi-girl-normal').parent().show();
        $('#ph-growth-results__bmi-normal-text').parent().show();
        status = bmiTextIN.normal;

    } else if (BMI >= data.Risk_Low.toFixed(2) && BMI < data.Risk_High.toFixed(2)) {
        $('#ph-growth-results__bmi-girl-riskover').parent().show();
        $('#ph-growth-results__bmi-riskover--text').parent().show();
        status = bmiTextIN.average;

    } else if (BMI >= data.Risk_High.toFixed(2) && BMI < data.Obese.toFixed(2)) {
        $('#ph-growth-results__bmi-girl-over').parent().show();
        $('#ph-growth-results__bmi-over-text').parent().show();
        status = bmiTextIN.overweight;

    } else if (BMI >= data.Obese.toFixed(2)) {
        $('#ph-growth-results__bmi-girl-obese').parent().show();
        $('#ph-growth-results__bmi-obese-text').parent().show();
        status = bmiTextIN.obese;
    }
    return status;
}

function processBMI_IN(data, _bmiValue, _gender ) {
    let BMI = Number(_bmiValue.toFixed(2));
    let avgBMI = data.Average.toFixed(2);
    let status;

    if (_gender == genderText.male) {
        $('#ph-growth-results__bmi-boy-average').parent().show();
        $('#ph-growth-results__bmi-boy-average').parents('.columncontrol').addClass('active');

        status = processBMI_IN_boy(BMI, data, status);

    } else {

        $('#ph-growth-results__bmi-girl-average').parent().show();
        $('#ph-growth-results__bmi-girl-average').parents('.columncontrol').addClass('active');

        status = processBMI_IN_girl(BMI, data, status);
    }

    createBMILabel(BMI, avgBMI);
    return status;
}

function createBMILabel(BMI, avgBMI) {
    let bmiLabelText = $('#ph-growth-results__bmi-label p').text();
    let bmiAvgLabelText = $('#ph-growth-results__bmi-avg-label p').text();
    let bmiLabelWithValue = bmiLabelText.replace('0', BMI).replace('=', '<br/>=');
    let bmiAvgLabelWithValue = bmiAvgLabelText.replace('0', avgBMI).replace('=', '<br/>=');

    let bmiLabel = `<div class="bmi-label">${bmiLabelWithValue}</div>`;
    let avgLabel = `<div class="bmi-label">${bmiAvgLabelWithValue}</div>`;
    let container = $('#ph-growth-results__bmi-container');

    container.find('.columncontrol.active .columncontrol__column:first-child').prepend(bmiLabel);
    container.find('.columncontrol.active .columncontrol__column:last-child').prepend(avgLabel);
}

function processStatus_default(result, _childHeight) {
    let status;

    if (_childHeight < result.Stunted_High) {
        $('#ph-growth-results__emoji--risk').parents('.columncontrol__column').hide();
        $('#ph-growth-results__emoji--healthy').parents('.columncontrol__column').hide();
        $('#ph-growth-results__emoji--stunted').parents('.columncontrol__column').show();

        $('#ph-growth-results__emoji--risk-title').parents('.title').hide();
        $('#ph-growth-results__emoji--healthy-title').parents('.title').hide();
        $('#ph-growth-results__emoji--stunted-title').parents('.title').show();

        $('#ph-growth-results__emoji--risk-text').parents('.text').hide();
        $('#ph-growth-results__emoji--healthy-text').parents('.text').hide();
        $('#ph-growth-results__emoji--stunted-text').parents('.text').show();
        status = heightStatusText.stunted;

    } else if (_childHeight < result.Risk_High) {
        $('#ph-growth-results__emoji--stunted').parents('.columncontrol__column').hide();
        $('#ph-growth-results__emoji--healthy').parents('.columncontrol__column').hide();
        $('#ph-growth-results__emoji--risk').parents('.columncontrol__column').show();

        $('#ph-growth-results__emoji--stunted-title').parents('.title').hide();
        $('#ph-growth-results__emoji--healthy-title').parents('.title').hide();
        $('#ph-growth-results__emoji--risk-title').parents('.title').show();

        $('#ph-growth-results__emoji--stunted-text').parents('.text').hide();
        $('#ph-growth-results__emoji--healthy-text').parents('.text').hide();
        $('#ph-growth-results__emoji--risk-text').parents('.text').show();
        status = heightStatusText.risk;

    } else {
        $('#ph-growth-results__emoji--risk').parents('.columncontrol__column').hide();
        $('#ph-growth-results__emoji--stunted').parents('.columncontrol__column').hide();
        $('#ph-growth-results__emoji--healthy').parents('.columncontrol__column').show();

        $('#ph-growth-results__emoji--risk-title').parents('.title').hide();
        $('#ph-growth-results__emoji--stunted-title').parents('.title').hide();
        $('#ph-growth-results__emoji--healthy-title').parents('.title').show();

        $('#ph-growth-results__emoji--risk-text').parents('.text').hide();
        $('#ph-growth-results__emoji--stunted-text').parents('.text').hide();
        $('#ph-growth-results__emoji--healthy-text').parents('.text').show();
        status = heightStatusText.healthy;
    }

    return status;
}

function processStatus_IN(weightIssue, heightIssue, result, _childHeight) {
    let status;

    if (weightIssue == 0 && heightIssue == 0) {
        $('#ph-growth-results__emoji--growth-issue').parents('.columncontrol__column').hide();
        $('#ph-growth-results__emoji--weight-issue').parents('.columncontrol__column').hide();
        $('#ph-growth-results__emoji--height-issue').parents('.columncontrol__column').hide();
        $('#ph-growth-results__emoji--healthy').parents('.columncontrol__column').show();

        $('#ph-growth-results__emoji--growth-issue-title').parents('.title').hide();
        $('#ph-growth-results__emoji--weight-issue-title').parents('.title').hide();
        $('#ph-growth-results__emoji--height-issue-title').parents('.title').hide();
        $('#ph-growth-results__emoji--healthy-title').parents('.title').show();

        $('#ph-growth-results__emoji--growth-issue-text').parents('.text').hide();
        $('#ph-growth-results__emoji--weight-issue-text').parents('.text').hide();
        $('#ph-growth-results__emoji--height-issue-text').parents('.text').hide();
        $('#ph-growth-results__emoji--healthy-text').parents('.text').show();

    } else if ((weightIssue == 1 || weightIssue == 2) && heightIssue == 0) {
        $('#ph-growth-results__emoji--growth-issue').parents('.columncontrol__column').hide();
        $('#ph-growth-results__emoji--height-issue').parents('.columncontrol__column').hide();
        $('#ph-growth-results__emoji--healthy').parents('.columncontrol__column').hide();
        $('#ph-growth-results__emoji--weight-issue').parents('.columncontrol__column').show();

        $('#ph-growth-results__emoji--growth-issue-title').parents('.title').hide();
        $('#ph-growth-results__emoji--height-issue-title').parents('.title').hide();
        $('#ph-growth-results__emoji--healthy-title').parents('.title').hide();
        $('#ph-growth-results__emoji--weight-issue-title').parents('.title').show();

        $('#ph-growth-results__emoji--growth-issue-text').parents('.text').hide();
        $('#ph-growth-results__emoji--height-issue-text').parents('.text').hide();
        $('#ph-growth-results__emoji--healthy-text').parents('.text').hide();
        $('#ph-growth-results__emoji--weight-issue-text').parents('.text').show();

    } else if (weightIssue == 0 && heightIssue == 1) {
        $('#ph-growth-results__emoji--growth-issue').parents('.columncontrol__column').hide();
        $('#ph-growth-results__emoji--weight-issue').parents('.columncontrol__column').hide();
        $('#ph-growth-results__emoji--healthy').parents('.columncontrol__column').hide();
        $('#ph-growth-results__emoji--height-issue').parents('.columncontrol__column').show();

        $('#ph-growth-results__emoji--growth-issue-title').parents('.title').hide();
        $('#ph-growth-results__emoji--weight-issue-title').parents('.title').hide();
        $('#ph-growth-results__emoji--healthy-title').parents('.title').hide();
        $('#ph-growth-results__emoji--height-issue-title').parents('.title').show();

        $('#ph-growth-results__emoji--growth-issue-text').parents('.text').hide();
        $('#ph-growth-results__emoji--weight-issue-text').parents('.text').hide();
        $('#ph-growth-results__emoji--healthy-text').parents('.text').hide();
        $('#ph-growth-results__emoji--height-issue-text').parents('.text').show();

    } else {
        $('#ph-growth-results__emoji--height-issue').parents('.columncontrol__column').hide();
        $('#ph-growth-results__emoji--weight-issue').parents('.columncontrol__column').hide();
        $('#ph-growth-results__emoji--healthy').parents('.columncontrol__column').hide();
        $('#ph-growth-results__emoji--growth-issue').parents('.columncontrol__column').show();

        $('#ph-growth-results__emoji--height-issue-title').parents('.title').hide();
        $('#ph-growth-results__emoji--weight-issue-title').parents('.title').hide();
        $('#ph-growth-results__emoji--healthy-title').parents('.title').hide();
        $('#ph-growth-results__emoji--growth-issue-title').parents('.title').show();

        $('#ph-growth-results__emoji--height-issue-text').parents('.text').hide();
        $('#ph-growth-results__emoji--weight-issue-text').parents('.text').hide();
        $('#ph-growth-results__emoji--healthy-text').parents('.text').hide();
        $('#ph-growth-results__emoji--growth-issue-text').parents('.text').show();
    }

    if (_childHeight < result.Stunted_High) {
        $('#ph-growth__box--height-risk').parents('.text').hide();
        $('#ph-growth__box--height-healthy').parents('.text').hide();
        $('#ph-growth__box--height-abnormal').parents('.text').hide();
        $('#ph-growth__box--height-stunted').parents('.text').show();
        status = heightStatusText.stunted;


    } else if (_childHeight < result.Risk_High) {
        $('#ph-growth__box--height-stunted').parents('.text').hide();
        $('#ph-growth__box--height-healthy').parents('.text').hide();
        $('#ph-growth__box--height-abnormal').parents('.text').hide();
        $('#ph-growth__box--height-risk').parents('.text').show();
        status = heightStatusText.risk;

    } else if (_childHeight > result.Standard_High) {
        $('#ph-growth__box--height-stunted').parents('.text').hide();
        $('#ph-growth__box--height-healthy').parents('.text').hide();
        $('#ph-growth__box--height-risk').parents('.text').hide();
        $('#ph-growth__box--height-abnormal').parents('.text').show();
        status = heightStatusText.abnormal;

    } else {
        $('#ph-growth__box--height-stunted').parents('.text').hide();
        $('#ph-growth__box--height-risk').parents('.text').hide();
        $('#ph-growth__box--height-abnormal').parents('.text').hide();
        $('#ph-growth__box--height-healthy').parents('.text').show();
        status = heightStatusText.healthy;
    }

    return status;
}

function processBMI_default(_bmiValue) {
    let BMI = _bmiValue.toFixed(2);

    if (BMI < 18.5) {
        $('#ph-growth-results__bmi-under').parent().show();
        $('#ph-growth-results__bmi').addClass('status-blue');

    } else if (BMI >= 18.5 && BMI <= 24.9) {
        $('#ph-growth-results__bmi-normal').parent().show();
        $('#ph-growth-results__bmi').addClass('status-green');

    } else if (BMI >= 25 && BMI <= 29.9) {
        $('#ph-growth-results__bmi-over').parent().show();
        $('#ph-growth-results__bmi').addClass('status-yellow');

    } else if (BMI >= 30 && BMI <= 34.9) {
        $('#ph-growth-results__bmi-obese').parent().show();
        $('#ph-growth-results__bmi').addClass('status-orange');

    } else {
        $('#ph-growth-results__bmi-extremely-obese').parent().show();
        $('#ph-growth-results__bmi').addClass('status-red');
    }
}

function filterGrowthDataSet(data, _gender , _age) {
    let result;
    if (_gender == genderText.male) {
        result = data.Boy.filter(b => b.Age_Per_Months == _age);
    } else {
        result = data.Girl.filter(g => g.Age_Per_Months == _age);
    }
    return result[0];
}

function createSilhouetteData(_gender , status, height, result) {
    $('.ph-growth-results__silhouette').remove();

    let label = $('#ph-growth-results__label p').text();
    let labelAvg = $('#ph-growth-results__average-label p').text();
    let { labelWithHeight, labelAvgWithHeight } = getlabelData(label, labelAvg, height, result);

    let finalHeight, finalAverage;

    let { finalSilhouette, finalSilhouetteAvg } = (_gender === "male")
        ? getSilhoutteBoy(_gender , status)
        : getSilhoutteGirl(_gender , status);

    let silhouette = `
        <div class='ph-growth-results__silhouette'>
            <div class='ph-growth-results__silhouette-inner'>
                <div class='ph-growth-results__silhouette-current'>
                    <div class="ph-growth-results__label">${labelWithHeight}</div>
                    <img src="${finalSilhouette}" alt="silhouette"/>
                </div>
                <div class='ph-growth-results__silhouette-avg'>
                    <div class="ph-growth-results__label-avg">${labelAvgWithHeight}</div>
                    <img src="${finalSilhouetteAvg}" alt="silhouette"/>
                </div>
            </div>
            <div class='ph-growth-results__marker-low'></div>
            <div class='ph-growth-results__marker-high'></div>
        </div>`;

    $('#ph-growth-results__growth .cmp-image').append(silhouette);

    if (_gender == genderText.female) {
        $('.ph-growth-results__label').addClass('female');
        $('.ph-growth-results__label-avg').addClass('female');
    }

    if (height > 130 || result.Average > 130) {
        $('#ph-growth-results__ruler-150').hide();
        $('#ph-growth-results__ruler-200').show();

        ruler = 0.5;
        markerInch = 0.55;
        finalHeight = (height * ruler) + "%";
        finalAverage = (result.Average * ruler) + "%";

        $('.ph-growth-results__silhouette-current').css('height', finalHeight);
        $('.ph-growth-results__silhouette-avg').css('height', finalAverage);

    } else {
        $('#ph-growth-results__ruler-150').show();
        $('#ph-growth-results__ruler-200').hide();

        ruler = 0.67;
        markerInch = 0.75;
        finalHeight = (height * ruler) + "%";
        finalAverage = (result.Average * ruler) + "%";

        $('.ph-growth-results__silhouette-current').css('height', finalHeight);
        $('.ph-growth-results__silhouette-avg').css('height', finalAverage);
    }
    updateClass(status, result);

}

function inputsCases(_label) {
    if (_label == "remove-height-predictor") {
        case1();
    } else if (_label == "remove-bmi") {
        case2();
    } else if (_label == "remove-bmi-height-predictor") {
        case3();
    } else {
        case4();
    }
}

function getPotentialHeight(text) {
    let values, value;

    if (text.includes('+')) {
        values = text.split('+');
        value = parseFloat(values[0]) + parseFloat(values[1]);

    } else if (text.includes('-')) {
        values = text.split('-');
        value = parseFloat(values[0]) - parseFloat(values[1]);
    }

    return value;
}

function getHeightData(_gender ,_fatherHeight, _motherHeight) {
    let heightPredicted, heightPotential;
    if (_gender == genderText.male) {
        heightPredicted = (Number(_fatherHeight) + Number(_motherHeight) + 13) / 2;
        heightPotential = getPotentialHeight(heightPredicted.toString().concat(_maleHeightRange));

    } else {
        $('.bmi-label').addClass('female');
        heightPredicted = (Number(_fatherHeight) + Number(_motherHeight) - 13) / 2;
        heightPotential = getPotentialHeight(heightPredicted.toString().concat(_femaleHeightRange));
    }
    return {
        heightPredicted: heightPredicted,
        heightPotential: heightPotential
    }
}

function toggleFormPopUp() {
    if (_lang == "in-ID") {
        _formPopup.addClass('active');
        $('body').addClass('popup-overlay');

        _formPopupClose.on('click', function () {
            _formPopup.removeClass('active');
            $('body').removeClass('popup-overlay');
        });
    }
}

function updateUserData(resultTextBMI) {
    let resultTextBMI_SFDC = heightStatusText.stunted;
    let childHeightResult_SFDC = heightStatusText.stunted;

    if (resultTextBMI == heightStatusText.normal) {
        resultTextBMI_SFDC = heightStatusText.normal;
    }

    if (childHeightResult_SFDC == heightStatusText.healthy) {
        resultTextBMI_SFDC = bmiTextIN.normal;
    }

    if (_lang == "en-IN") {
        $('[name="childBmiResult"]').val(resultTextBMI_SFDC);
        $('[name="childDOB"]').val(_dob);
        $('[name="childGender"]').val(_gender );
        $('[name="childHeight"]').val(_childHeight);
        $('[name="childHeightResult"]').val(childHeightResult_SFDC);
        $('[name="childWeight"]').val(_childWeight);
    }

}

function initGrowthCalculator() {
    function getGrowthDataSet() {
        let path = $('[name="growth-height-json-path"]').val();

        $.getJSON(path, {
            format: 'json'
        })
            .done(function (data) {
                addSessionStorage(data);
            })
    }

    function getInputs() {

        _id = $('#ph-growth');
        let submitBtn = _id.find('button[name="calculate"]');
        let inputScreen = $('#ph-growth-columns');
        let resultScreen = $('#ph-growth-results');
        let childYears = $('[name="childYears"]');
        let childMonths = $('[name="childMonths"]');
         _label = _id.attr('aria-label');
         _role = _id.attr('role');
         _roleSplited =_role.split(',');
         _formPopup = $('#ph-growth-form');
        _formPopupClose = _formPopup.find('#ph-popup-close');
        
        getHeightRange(_role,_roleSplited);

        childYears.find('li').on('click', function () {
            setTimeout(function () {
                inputsCases(_label);
            }, 500)
        })

        childMonths.find('li').on('click', function () {
            setTimeout(function () {
                inputsCases(_label);
            }, 500)
        })

        $('[type="range"], [type="text"], [type="number"]').bind("change paste keyup", function () {
            inputsCases(_label);
        })

        submitBtn.on('click', function (e) {
            e.preventDefault();
            $('#ph-growth-results__bmi .text').hide();
            getUserInputs();
            
            let results = JSON.parse(sessionStorage.getItem('growthDataSet'));
            let result = filterGrowthDataSet(results, _gender , _age);
            let status;

            $('#ph-growth-results__bmi-value').find('.cmp-title__text').text(_bmiValue.toFixed(2));

            $("#nutrition-counselling-form").click(function () {
                _formPopup.addClass('active');
                $('body').addClass('popup-overlay');
                _formPopupClose.on('click', function () {
                    _formPopup.removeClass('active');
                    $('body').removeClass('popup-overlay');
                });
            });


            if (_lang == "en-IN" || _lang == "in-ID") {
                let resultBMI = filterBMIDataSet(results, _gender , _age);
                let weightIssue = weightCheck_IN(resultBMI, _bmiValue);
                let heightIssue = heightCheck_IN(result, _childHeight);

                let resultTextBMI = processBMI_IN(resultBMI, _bmiValue, _gender );
                status = processStatus_IN(weightIssue, heightIssue, result, _childHeight);

                toggleFormPopUp();

                if (_lang == "en-IN") {
                    getProcess();
                }

                $('#ph-growth-identifier').on('click', function () {
                    _formPopup.removeClass('active');
                    $('body').removeClass('popup-overlay');
                    getProcess();
                });

                updateUserData(resultTextBMI);

                if (_lang == "in-ID") {
                    let originalDate = _dob;
                    let parts = originalDate.split('/');
                    let newDob = parts[2] + '-' + parts[1] + '-' + parts[0];

                    $('[name="chidlDateOfBirth"]').val(newDob);
                    $('[name="childGender"]').val(_gender );
                    $('[name="childHeight"]').val(_childHeight);
                    $('[name="childWeight"]').val(_childWeight);
                    $('[name="childHeightResult"]').val(status);
                    $('[name="childWeightResult"]').val(resultTextBMI);
                    $('[name="bmiResult"]').val(_bmiValue.toFixed(2));
                }

            } else {
                status = processStatus_default(result, _childHeight);
                processBMI_default(_bmiValue);
                getProcess();
            }


            function getProcess() {
                createSilhouetteData(_gender , status, _childHeight, result);

                let { heightPredicted, heightPotential } = getHeightData(_gender ,_fatherHeight, _motherHeight);

                let finalHeightPredicted = $('#ph-growth-results__height-predicted').find('.cmp-title__text').text();
                let finalHeightPotential = $('#ph-growth-results__height-potential').find('.cmp-title__text').text();
                let htmlHeightPredicted = `${heightPredicted.toFixed(2)}<label>${finalHeightPredicted.replace('-', '')}</label>`;
                let htmlHeightPotential = `${heightPotential.toFixed(2)}<label>${finalHeightPotential.replace('-', '')}</label>`;

                $('#ph-growth-results__height-predicted').find('.cmp-title__text').html(htmlHeightPredicted);
                $('#ph-growth-results__height-potential').find('.cmp-title__text').html(htmlHeightPotential);

                inputScreen.hide();
                resultScreen.addClass('active');
                $("html, body").animate({ scrollTop: 0 }, 600);
            }
        })
    }
    if ($('#ph-growth').length > 0) {
        getGrowthDataSet();
        getInputs();
    }

    if ($('#ph-growth-form').length > 0) {
        document.body.appendChild(document.getElementById('ph-growth-form'));
    }
}

function editableRangeInput() {
    let element = $(".range-input-container.shared.editable");

    element.each(function () {
        let outContainer = $(this).find(".output-container output");

        if ($(this).find("[type=number]").length) {
            return;
        }

        let rangeOutputHTML = getRangeOutputHTML(outContainer, this);
        outContainer.remove();
        generateContainer(this);

        $(this).find(".output-container").prepend(rangeOutputHTML);

        let getInputRange = $(this).find("[type=range]");
        let getInputNumber = $(this).find("[type=number]");
        let bubble = $(this).find(".output");

        getInputRange.on("input change", function () {
            setBubble(getInputRange, bubble);
        });
        getInputNumber.on("input change", function () {
            setBubble(getInputRange, bubble);
        });
        setBubble(getInputRange, bubble);
    });

    function generateContainer(range) {
        let inputRange = $(range).find("[type=range]");
        inputRange.wrap(`<div style="width: 100%; position: relative"></div>`);
        inputRange.after(`<span class="output"></span>`);
    }

    function getRangeOutputHTML(el, thisEL) {
        let idEL = el.attr("id");
        let forEl = el.attr("for");
        let rangeMax = $(thisEL).find("[type=range]").prop("max");
        let rangeMin = $(thisEL).find("[type=range]").prop("min");
        return `<input type="number" id=${idEL} min=${rangeMin} max=${rangeMax} value=${rangeMin} for=${forEl} oninput="${forEl}.value = ${idEL}.value" class="form-control" style="padding-right: 0;text-align:center;margin: 0;" step="0.1">`;
    }

    function setBubble(range, bubble) {
        const val = range.val();
        const min = range.prop("min");
        const max = range.prop("max");
        const newVal = Number(((val - min) * 100) / (max - min));
        bubble.text(val);
        bubble.css("left", `calc(${newVal}% + (${8 - newVal * 0.15}px))`);
    }
}

$(document).ready(function () {
    editableRangeInput();
    initGrowthCalculator();
});
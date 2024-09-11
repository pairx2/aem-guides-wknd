let id_sg, gender_sg, dob_sg, height_sg, weight_sg, fatherHeight_sg, motherHeight_sg, ttlMonth, heightInMeter_sg, bmiValue_sg, heightOnTrack, formPopup_sg, formPopupClose_sg;
let results, weightPercentileArray, heightPercentileArray, barChart, lineChart;
let weightPercentile, heightPercentile, dsWeight, dsHeight, weightGrade, heightGrade, predictedHeightGrade;

function getAgeSG(date) {
    let mdate = date;
    let yearThen = parseInt(mdate.substring(6, 10), 10);
    let monthThen = parseInt(mdate.substring(3, 5), 10);
    let dayThen = parseInt(mdate.substring(0, 4), 10);
    let today = new Date();
    let birthday = new Date(yearThen, monthThen - 1, dayThen);

    // calc total months
    let age = (today.getFullYear() - birthday.getFullYear()) * 12;
    age -= (+birthday.getMonth() + 1);
    age += (+today.getMonth() + 1);
    age += (birthday.getDate() >= today.getDate() ? 1 : 0);
    return age;
}

function getUserInputs_SG() {

    gender_sg = id_sg.find('[name="gender"]:checked').val();
    dob_sg = id_sg.find('[name="childDateOfBirth"]').val();
    if (!id_sg.find('.pediasure-gc-sg')) {
        height_sg = +id_sg.find('[data-name="child-height"] input').val();
        weight_sg = +id_sg.find('[data-name="child-weight"] input').val();
        fatherHeight_sg = +id_sg.find('[data-name="father-height"] input').val();
        motherHeight_sg = +id_sg.find('[data-name="mother-height"] input').val();
    }
    else {
        height_sg = +id_sg.find('#ph-child-height').val();
        weight_sg = +id_sg.find('#ph-child-weight').val();
        fatherHeight_sg = +id_sg.find('#ph-father-height').val();
        motherHeight_sg = +id_sg.find('#ph-mother-height').val();
    }
    ttlMonth = getAgeSG(dob_sg);
    // BMI Calculation
    heightInMeter_sg = height_sg / 100;
    bmiValue_sg = weight_sg / (heightInMeter_sg * heightInMeter_sg);
}

function getgender() {
    if (gender_sg == "boy" || gender_sg == "BOY") {
        gender_sg = "Male";
    } else {
        gender_sg = "Female";
    }
}

function getHeightOnTrack(role_sg) {
    if (role_sg) {
        heightOnTrack = Number(role_sg.split('=')[1]);
    } else {
        heightOnTrack = 8.5;
    }
    return heightOnTrack
}

function addSessionStorage_sg(data) {
    if (data) {
        sessionStorage.setItem('growthDataSetSG', JSON.stringify(data));
    }
}

function checkInput() {
    if ($('[name="childDateOfBirth"]').val() != "" && $('[data-name="child-height"] input').val() > 0 && $('[data-name="child-weight"] input').val() > 0 && $('[data-name="father-height"] input').val() > 0 && $('[data-name="mother-height"] input').val() > 0) {
        enabledSubmitBtnSG();
    }else if ($('[name="childDateOfBirth"]').val() != "" && $('[name="child-height"]').val() > 0 && $('[name="child-weight"]').val() > 0 && $('[name="father-height"]').val() > 0 && $('[name="mother-height"]').val() > 0) {
        enabledSubmitBtnSG();
    } else {
        disabledSubmitBtnSG();
    }
}

function enabledSubmitBtnSG() {
    $('[name="validator"]').parents('.a-input-field').attr('data-required', false);
    $('button[name="calculate"]').attr('disabled', false);
}

function disabledSubmitBtnSG() {
    $('button[name="calculate"]').attr('disabled', true);
}

function updateScreens(inputScreen, resultScreen, results) {
    if ($('#ph-growth-form-popup').length > 0) {
        formPopup_sg.addClass('active');
        $('body').addClass('popup-overlay');
        processData(results);

        formPopupClose_sg.on('click', function () {
            formPopup_sg.removeClass('active');
            $('body').removeClass('popup-overlay');
        });

        $('#ph-growth-identifier').on('click', function () {
            formPopup_sg.removeClass('active');
            $('body').removeClass('popup-overlay');

            inputScreen.hide();
            resultScreen.addClass('active');
        });

        let childHeightPercentile = $('#ph-growth-sg-results__height-percentile').find('.cmp-title__text').text()
        let childWeightPercentile = $('#ph-growth-sg-results__weight-percentile').find('.cmp-title__text').text();

        // Data Transformation for SFDC
        getGender();

        let originalDate = dob_sg;
        let parts = originalDate.split('/');
        let newDob = parts[2] + '-' + parts[1] + '-' + parts[0];

        $('[name="chidlDateOfBirth"]').val(newDob);
        $('[name="childGender"]').val(gender_sg);
        $('[name="childHeight"]').val(height_sg);
        $('[name="childWeight"]').val(weight_sg);
        $('[name="childHeightResult"]').val(childHeightPercentile);
        $('[name="childWeightResult"]').val(childWeightPercentile);
        $('[name="bmiResult"]').val(bmiValue_sg.toFixed(2));

    }
    else {
        processData(results);
        inputScreen.hide();
        resultScreen.addClass('active');
    }
}

function getExpectedWeight(aw, weightPercentileDataNum) {
    let expWeight;
    if (aw == ttlMonth) { expWeight = weightPercentileDataNum; }
    return expWeight;
}

function getExpectedHeight(ah, heightPercentileDataNum) {
    let expHeight;
    if (ah == ttlMonth) { expHeight = heightPercentileDataNum; }
    return expHeight;
}

function getHPAVal(ah) {
    let value;
    value = ah % 12 == 0 ? heightPercentileArray.point[0] : heightPercentileArray.point[1]
    return value;
}

function prepareWeightData() {
    for (let iw = 0, jw = weightPercentile.length; iw < jw; iw++) {
        let weightPercentileData = weightPercentile[iw].data, expectedWeight = 0;
        for (let aw = 0, b = weightPercentileData.length; aw < b; aw++) {
            let currDataWeight = dsWeight[aw];
            let weightPercentileDataNum = Number(weightPercentileData[aw]);
            if (currDataWeight == undefined) {
                currDataWeight = [];
                dsWeight.push(currDataWeight);
                currDataWeight.push(aw / 12);
                currDataWeight.push(null);
                currDataWeight.push(null);
                currDataWeight.push('');
            }
            currDataWeight.push(weightPercentileDataNum);
            currDataWeight.push(aw % 12 == 0 ? weightPercentileArray.point[0] : weightPercentileArray.point[1]);
            currDataWeight.push(weightPercentileArray.currData[0] + parseInt(aw / 12) + weightPercentileArray.currData[1] + (aw % 12 > 0 ? weightPercentileArray.currData[2] + (aw % 12) + weightPercentileArray.currData[3] : "") + weightPercentileArray.currData[4] + weightPercentileDataNum + weightPercentileArray.currData[5]);

            expectedWeight = getExpectedWeight();
        }
        if (weight_sg > expectedWeight) { weightGrade++; }
    }
    dsWeight.push([ttlMonth / 12, +weight_sg, null, weightPercentileArray.dsWeight[0] + parseInt(ttlMonth / 12) + weightPercentileArray.dsWeight[1] + (ttlMonth % 12 > 0 ? weightPercentileArray.dsWeight[2] + (ttlMonth % 12) + weightPercentileArray.dsWeight[3] : "") + weightPercentileArray.dsWeight[4] + weight_sg + weightPercentileArray.dsWeight[5], null, null, "", null, null, "", null, null, "", null, null, "", null, null, "", null, null, "", null, null, ""]);

}

function prepareHeightData() {
    for (let ih = 0, jh = heightPercentile.length; ih < jh; ih++) {
        let heightPercentileData = heightPercentile[ih].data, expectedHeight = 0;
        for (let ah = 0, bh = heightPercentileData.length; ah < bh; ah++) {
            let currDataHeight = dsHeight[ah];
            let heightPercentileDataNum = Number(heightPercentileData[ah]);
            let hpaVal;

            if (currDataHeight == undefined) {
                currDataHeight = [];
                dsHeight.push(currDataHeight);
                currDataHeight.push(ah / 12);
                currDataHeight.push(null);
                currDataHeight.push(null);
                currDataHeight.push('');
            }

            hpaVal = getHPAVal();
            currDataHeight.push(heightPercentileDataNum);
            currDataHeight.push(hpaVal);
            currDataHeight.push(heightPercentileArray.currData[0] + parseInt(ah / 12) + heightPercentileArray.currData[1] + (ah % 12 > 0 ? heightPercentileArray.currData[2] + (ah % 12) + heightPercentileArray.currData[3] : "") + heightPercentileArray.currData[4] + heightPercentileDataNum + heightPercentileArray.currData[5]);
            expectedHeight = getExpectedHeight(ah, heightPercentileDataNum);

        }

        if (height_sg > expectedHeight) {
            heightGrade++;
            predictedHeightGrade++;
        }
    }

    if (height_sg % 1 != 0) {
        height_sg = +height_sg.toFixed(1);
    }
    dsHeight.push([ttlMonth / 12, +height_sg, null, heightPercentileArray.dsHeight[0] + parseInt(ttlMonth / 12) + heightPercentileArray.dsHeight[1] + (ttlMonth % 12 > 0 ? heightPercentileArray.dsHeight[2] + (ttlMonth % 12) + heightPercentileArray.dsHeight[3] : "") + heightPercentileArray.dsHeight[4] + height_sg + heightPercentileArray.dsHeight[5], null, null, "", null, null, "", null, null, "", null, null, "", null, null, "", null, null, "", null, null, ""]);

}

function processData(results) {
    // retrieve weight/height percentile data

    let percentileResult = results.percentileResult, geneticHeight = 0;
    if (gender_sg == "boy") {
        weightPercentile = results.weightPercentileBoy;
        heightPercentile = results.heightPercentileBoy;
        geneticHeight = ((Number(motherHeight_sg) + 13) + Number(fatherHeight_sg)) / 2;
        $('#ph-growth-sg-results__weight-boy').show();
        $('#ph-growth-sg-results__height-boy').show();
    } else {
        weightPercentile = results.weightPercentileGirl;
        heightPercentile = results.heightPercentileGirl;
        geneticHeight = ((Number(fatherHeight_sg) - 13) + Number(motherHeight_sg)) / 2;
        $('#ph-growth-sg-results__weight-girl').show();
        $('#ph-growth-sg-results__height-girl').show();
    }

    // prepare weight data set
    dsWeight = [];
    weightGrade = 0;
    prepareWeightData();

    // prepare height data set
    dsHeight = [];
    heightGrade = 0;
    predictedHeightGrade = 0;
    prepareHeightData();

    if (predictedHeightGrade >= heightPercentile.length) { predictedHeightGrade = heightPercentile.length - 1; }
    let predictedHeightPercentile = heightPercentile[predictedHeightGrade],
        heightData = predictedHeightPercentile.data,
        predictedHeight = heightData[heightData.length - 1];

    if (geneticHeight % 1 != 0) {
        geneticHeight = +geneticHeight.toFixed(1);
    }
    if (predictedHeight % 1 != 0) {
        predictedHeight = +Number(predictedHeight).toFixed(1);
    }

    let predictedHeightPercentileName = predictedHeightPercentile.name

    let finalGeneticHeight = $('#ph-growth-sg-results__height-potential').find('.cmp-title__text').text();
    let htmlGeneticHeight = `${geneticHeight}<label>${finalGeneticHeight.replace('-', '')}</label>`;
    let finalPredictedHeight = $('#ph-growth-sg-results__height-predicted').find('.cmp-title__text').text();
    let htmlPredictedHeight = `${predictedHeight}<label>${finalPredictedHeight.replace('-', '')}</label>`;
    let finalPredictedGrade = $('#ph-growth-sg-results__height-predicted-percentile').find('p').text();
    let htmlPredictedGrade = `${finalPredictedGrade.replace('-', predictedHeightPercentileName)}`;

    $('#ph-growth-sg-results__height-potential').find('.cmp-title__text').html(htmlGeneticHeight);
    $('#ph-growth-sg-results__height-predicted').find('.cmp-title__text').html(htmlPredictedHeight);
    $('#ph-growth-sg-results__height-predicted-percentile').find('p').html(htmlPredictedGrade);

    let notOnTrack = $('#ph-growth-sg-results__fail, #ph-growth-sg-results__fail-track');
    let onTrack = $('#ph-growth-sg-results__congrat, #ph-growth-sg-results__congrat-track');
    let isOnTrack = predictedHeight >= (+geneticHeight - heightOnTrack) ? true : false;
    if (!isOnTrack) {
        notOnTrack.show();
        onTrack.hide();
        onTrack.parent().hide();
    }

    let index = String(heightGrade) + String(weightGrade);
    let bmiHeightMsgID = $('#ph-growth-sg-results__height-report').find('p');
    let bmiWeightMsgID = $('#ph-growth-sg-results__weight-report').find('p');
    let bmiHeightPercentileID = $('#ph-growth-sg-results__height-percentile').find('.cmp-title__text');
    let bmiWeightPercentileID = $('#ph-growth-sg-results__weight-percentile').find('.cmp-title__text');
    let bmiResultHeight = bmiHeightMsgID.text();
    let bmiResultWeight = bmiWeightMsgID.text();
    let bmiResultHeightPercentile = bmiHeightPercentileID.text();
    let bmiResultWeightPercentile = bmiWeightPercentileID.text();
    let htmlBMIResultHeight, htmlBMIResultWeight, htmlBMIResultHeightPercentile, htmlBMIResultWeightPercentile;

    for (let i = 0, j = percentileResult.length; i < j; i++) {
        if (index === percentileResult[i].index) {
            htmlBMIResultHeight = `${bmiResultHeight.replace('-', percentileResult[i].messageHeight)}`;
            htmlBMIResultWeight = `${bmiResultWeight.replace('-', percentileResult[i].messageWeight)}`;
            htmlBMIResultHeightPercentile = `${percentileResult[i].heightPercentile}<label>${bmiResultHeightPercentile.replace('-', ' ')}</label>`;
            htmlBMIResultWeightPercentile = `${percentileResult[i].weightPercentile}<label>${bmiResultWeightPercentile.replace('-', ' ')}</label>`;
            bmiHeightMsgID.html(htmlBMIResultHeight);
            bmiWeightMsgID.html(htmlBMIResultWeight);
            bmiHeightPercentileID.html(htmlBMIResultHeightPercentile);
            bmiWeightPercentileID.html(htmlBMIResultWeightPercentile);
            break;
        }
    }

    // draw barchart
    google.charts.setOnLoadCallback(function () {
        drawBarChart(+height_sg, barChart, +geneticHeight, +predictedHeight, ttlMonth)
    });

    // draw line chart
    google.charts.setOnLoadCallback(function () {
        drawLineChart(dsWeight, lineChart, 'ph-growth-sg-results__line-chart-weight', true, resultScreen)
    });

    google.charts.setOnLoadCallback(function () {
        drawLineChart(dsHeight, lineChart, 'ph-growth-sg-results__line-chart-height', false, resultScreen)
    });

    let callLineChart = window.setInterval(function () {
        if ($('#ph-growth-sg-results__line-chart').is(":visible")) {
            // draw line chart
            google.charts.setOnLoadCallback(function () {
                drawLineChart(dsWeight, lineChart, 'ph-growth-sg-results__line-chart-weight', true, resultScreen)
            });

            google.charts.setOnLoadCallback(function () {
                drawLineChart(dsHeight, lineChart, 'ph-growth-sg-results__line-chart-height_sg', false, resultScreen)
            });

            clearInterval(callLineChart);
        }
    }, 1000);

    $(window).resize(function () {
        google.charts.setOnLoadCallback(function () {
            drawBarChart(+height_sg, barChart, +geneticHeight, +predictedHeight, ttlMonth)
        });

        google.charts.setOnLoadCallback(function () {
            drawLineChart(dsWeight, lineChart, 'ph-growth-sg-results__line-chart-weight', true, resultScreen)
        });

        google.charts.setOnLoadCallback(function () {
            drawLineChart(dsHeight, lineChart, 'ph-growth-sg-results__line-chart-height', false, resultScreen)
        });
    });

    $("html, body").animate({ scrollTop: 0 }, 600);

}

function getInputsSG() {
    id_sg = $('#ph-growth-sg');
    let submitBtn = id_sg.find('button[name="calculate"]');
    let inputScreen = $('#ph-growth-sg-columns');
    let resultScreen = $('#ph-growth-sg-results');
    let role_sg = id_sg.attr('role');
    // Pop-up form
    formPopup_sg = $('#ph-growth-form');
    formPopupClose_sg = formPopup_sg.find('#ph-popup-close');

    heightOnTrack = getHeightOnTrack(role_sg);

    google.charts.load('current', { 'packages': ['corechart'] });

    $('[type="range"], [type="text"], [type="number"]').bind("change paste keyup", function() {
        checkInput()
    })

    submitBtn.on('click', function (e) {
        e.preventDefault();

        getUserInputs_SG()
        results = JSON.parse(sessionStorage.getItem('growthDataSetSG'));
        weightPercentileArray = results.weightPercentileArray;
        heightPercentileArray = results.heightPercentileArray;
        barChart = results.barChart;
        lineChart = results.lineChart;

        updateScreens(inputScreen, resultScreen, results);

    })
}

function drawBarChart(h, d, gh, ph, tm) {
    let data = new google.visualization.DataTable(),
        vTitle = d.vTitle,
        innerWidth = $(window).innerWidth();
    let w = innerWidth - 30;
    let dvAxis = d.vAxis;

    data.addColumn('string', d.age);
    data.addColumn('number', 'gh');
    data.addColumn({ type: 'string', role: 'annotation' });
    data.addColumn('number', 'current');
    data.addColumn({ type: 'string', role: 'annotation' });
    data.addColumn('number', 'ph');
    data.addColumn({ type: 'string', role: 'annotation' });
    data.addRows([
        [parseInt(tm / 12) + d.addRowsCurrent[0] + (tm % 12 > 0 ? d.addRowsCurrent[1] + (tm % 12) + d.addRowsCurrent[2] : ""), 0, '', h, d.addRowsCurrent[3] + h + d.addRowsCurrent[4], 0, ''],
        [d.addRowsPotential[0], gh, d.addRowsPotential[1] + gh + d.addRowsPotential[2], 0, '', ph, d.addRowsPotential[3] + ph + d.addRowsPotential[4]],
    ]);
    let fontSize = d.fontSize[0], gWidth = d.gWidth[0], wChartArea = d.wChartArea[0], hChartArea = d.hChartArea[0];
    if (w >= 650 && w < 768) {
        fontSize = d.fontSize[1];
        gWidth = d.gWidth[1];
        wChartArea = d.wChartArea[1];
    } else if (w >= 768) {
        fontSize = d.fontSize[2];
        hChartArea = d.hChartArea[1];
    }
    let options = {
        width: d.width,
        height: d.height,
        backgroundColor: d.backgroundColor,
        legend: 'none',
        seriesType: 'bars',
        series: {
            0: { color: d.seriesColor[0] },
            1: { color: d.seriesColor[1] },
            2: { color: d.seriesColor[2] }
        },
        tooltip: {
            trigger: 'none'
        },
        annotations: {
            textStyle: {
                fontSize: fontSize,
                color: d.textStyle
            }
        },
        bar: { groupWidth: gWidth },
        enableInteractivity: false,
        vAxis: { title: vTitle, titleTextStyle: { color: dvAxis.color, italic: dvAxis.italic, fontSize: dvAxis.fontSize }, gridlines: { color: dvAxis.gridlinesColor }, minorGridlines: { color: dvAxis.minorGridlinesColor }, baselineColor: dvAxis.baselineColor },
        chartArea: { top: d.chartAreaTop, width: wChartArea, height: hChartArea }
    };
    let container = document.getElementById('ph-growth-sg-results__barchart'),
        barchart = new google.visualization.ComboChart(container);
    setTimeout(function () {
        barchart.draw(data, options);
    }, 1000);
}

function drawLineChart(d, dJson, id_sg, isWeight, base) {
    let data = new google.visualization.DataTable(),
        vTitle = isWeight ? dJson.vTitleWeight : dJson.vTitleHeight,
        hTitle = dJson.hTitle,
        con = base.find('#ph-growth-sg-accordion'),
        conWidth = con.width();

    let w = conWidth - 66;
    let dvAxis = dJson.vAxis;
    let dhAxis = dJson.hAxis;

    data.addColumn({ type: 'number', role: 'domain' }, dJson.age);
    data.addColumn('number', dJson.childInfo);
    data.addColumn({ type: 'string', role: 'style' }, 'point');
    data.addColumn({ type: 'string', role: 'tooltip', p: { html: true } });
    data.addColumn('number', dJson.percentile[0]);
    data.addColumn({ type: 'string', role: 'style' }, 'point');
    data.addColumn({ type: 'string', role: 'tooltip', p: { html: true } });
    data.addColumn('number', dJson.percentile[1]);
    data.addColumn({ type: 'string', role: 'style' }, 'point');
    data.addColumn({ type: 'string', role: 'tooltip', p: { html: true } });
    data.addColumn('number', dJson.percentile[2]);
    data.addColumn({ type: 'string', role: 'style' }, 'point');
    data.addColumn({ type: 'string', role: 'tooltip', p: { html: true } });
    data.addColumn('number', dJson.percentile[3]);
    data.addColumn({ type: 'string', role: 'style' }, 'point');
    data.addColumn({ type: 'string', role: 'tooltip', p: { html: true } });
    data.addColumn('number', dJson.percentile[4]);
    data.addColumn({ type: 'string', role: 'style' }, 'point');
    data.addColumn({ type: 'string', role: 'tooltip', p: { html: true } });
    data.addColumn('number', dJson.percentile[5]);
    data.addColumn({ type: 'string', role: 'style' }, 'point');
    data.addColumn({ type: 'string', role: 'tooltip', p: { html: true } });
    data.addColumn('number', dJson.percentile[6]);
    data.addColumn({ type: 'string', role: 'style' }, 'point');
    data.addColumn({ type: 'string', role: 'tooltip', p: { html: true } });
    data.addRows(d);

    let mobileInterval = [0, 3, 6],
        desktopInterval = [0, 2, 4],
        options = {
            seriesType: "line",
            legend: 'none',
            interpolateNulls: true,
            width: w,
            height: (w < 690 ? w * 0.75 : w * 0.7),
            pointSize: 2,
            tooltip: { isHtml: true },
            backgroundColor: dJson.backgroundColor,
            series: {
                0: dJson.series0,
                1: { color: dJson.seriesColor[0], tooltip: false },
                2: { color: dJson.seriesColor[1], tooltip: false },
                3: { color: dJson.seriesColor[2], tooltip: false },
                4: { color: dJson.seriesColor[3], tooltip: false },
                5: { color: dJson.seriesColor[4], tooltip: false },
                6: { color: dJson.seriesColor[5], tooltip: false },
                7: { color: dJson.seriesColor[6], tooltip: false },
            },
            vAxis: { title: vTitle, titleTextStyle: { color: dvAxis.color, italic: dvAxis.italic, fontSize: dvAxis.fontSize }, gridlines: { color: dvAxis.gridlinesColor }, minorGridlines: { color: dvAxis.minorGridlinesColor } },
            hAxis: { title: hTitle, allowContainerBoundaryTextCutoff: dhAxis.allowContainerBoundaryTextCutoff, titleTextStyle: { color: dhAxis.color, italic: dhAxis.italic, fontSize: dhAxis.fontSize }, gridlines: { interval: (w < 690 ? mobileInterval : desktopInterval), minSpacing: dhAxis.minSpacing, color: dhAxis.gridlinesColor }, minorGridlines: { color: dhAxis.minorGridlinesColor }, baselineColor: dhAxis.baselineColor },
            chartArea: { height: w * 0.6, top: 20 }
        };

    let chart = new google.visualization.LineChart(document.getElementById(id_sg));
    setTimeout(function () {
        chart.draw(data, options);
    }, 1000);
}

function initGrowthCalculatorSG() {
    function getGrowthDataSetSG() {
        let path = $('[name="growth-height-json-path"]').val();

        $.getJSON(path, {
            format: 'json'
        })
            .done(function (data) {
                addSessionStorage_sg(data);
            })
    }

    if ($('#ph-growth-sg').length > 0) {
        getGrowthDataSetSG();
        getInputsSG();
    }

}

$(document).ready(function () {
    initGrowthCalculatorSG();
});

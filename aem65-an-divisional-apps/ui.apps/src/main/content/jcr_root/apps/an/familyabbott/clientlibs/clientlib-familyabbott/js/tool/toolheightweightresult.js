const chartId = {
    weight: 'LineChart_Weight_div',
    height: 'LineChart_Height_div',
    head: 'LineChart_Head_div'
}

function initChart() {
    let toolEl = $('#ph-tool-hw-result');

    if ($(toolEl).is(':visible')) {
        google.load("visualization", "1.0", {
        packages: ["corechart"],
        'language': 'vi'
        });
    	google.setOnLoadCallback(getChartJSON);
    }
}

function getChartJSON() {
    let url = sessionStorage.getItem('tool_HW_Json_Path');
    $.getJSON(url, {
        format: 'json'
    })
    .done (function(data) {
		verifyDrawChartFlow(data);
    })
}

function verifyDrawChartFlow(data) {
    let submittedData = JSON.parse(sessionStorage.getItem('tool_HW_Data'));
    let headTabEl = $('#ph-tool-hw-result .cmp-tabs__tab:last-child');

    if (submittedData) {
        let gender = submittedData.gender; 
        let labels = data.labels; 
        let head = submittedData.head;

        if (head == 0) {
            headTabEl.hide();
        } else {
			headTabEl.show();
        }

        switch(gender) {
            case "male" :
                setDrawChart(labels, data.data.male, submittedData);
                break;
            case "female" :
                setDrawChart(labels, data.data.female, submittedData);
                break;
        }
    }
}

function setDrawChart(labels, data, submittedData) {
    $.each(chartId, function(_key, valueObj) {
        let elementId = valueObj;

        switch(elementId) {
            case "LineChart_Weight_div": 
                drawChart(elementId, labels, labels.weightyaxis, data.weightData, submittedData.weight, submittedData);
                break;
            case "LineChart_Height_div": 
                drawChart(elementId, labels, labels.heightyaxis, data.heightData, submittedData.height, submittedData);
                break;
            case "LineChart_Head_div": 
                drawChart(elementId, labels, labels.headyaxis, data.headData, submittedData.head, submittedData);
                break;
        }
    })
}

function getStageRange(stage) {
    let stageByMonths = {
        min : 0,
        max : 0
    }

    switch(stage) {
        case "0-12m": 
            stageByMonths.min = 0;
            stageByMonths.max = 12;
            break;
        case "1-3y": 
            stageByMonths.min = 13;
       		stageByMonths.max = 36;
            break;
        case "3-6y": 
            stageByMonths.min = 36;
       		stageByMonths.max = 60;
            break;
        case "6-10y": 
            stageByMonths.min = 72;
       		stageByMonths.max = 120;
            break;
    } 

	return stageByMonths;
}

function getChartWidth() {
    let width = 900; 
    if ($(window).width() < 992) {
		width = 400;
    }
    return width;
}

function getChartHeight() {
    let height = 490; 
    if ($(window).width() < 992) {
		height = 250;
    }
    return height;
}

function drawChart(elementId, labels, title, data, currentData, submittedData) {
    let age = submittedData.age;
    let stageRange = getStageRange(submittedData.stage);
    let dataChart = new google.visualization.DataTable();
    let chartWidth = getChartWidth();
    let chartHeight = getChartHeight();

    dataChart.addColumn('number', labels.age);
    dataChart.addColumn('number', labels.sd2n);
    dataChart.addColumn('number', labels.sd1n);
    dataChart.addColumn('number', labels.median);
    dataChart.addColumn('number', labels.sd1);
    dataChart.addColumn('number', labels.sd2);
    dataChart.addColumn('number', labels.current);

    for (let key in data) {
        if (parseInt(data[key].month) >= stageRange.min && parseInt(data[key].month) <= stageRange.max) {
            dataChart.addRow([
                parseInt(data[key].month), 
                parseFloat(data[key].sd2n), 
                parseFloat(data[key].sd1n), 
                parseFloat(data[key].median), 
                parseFloat(data[key].sd1), 
                parseFloat(data[key].sd2), 
                (parseInt(data[key].month) == age) ? parseFloat(currentData) : null
            ]);
        }
    }

    let chartEl = new google.visualization.LineChart(document.getElementById(elementId));
    
    chartEl.draw(dataChart, {
        curveType: 'function',
        width: chartWidth,
        height: chartHeight,
        vAxis: {
            maxValue: 10,
            titleTextStyle: {
                color: '#FF0000',
                fontSize: '14'
            },
            title: title
        },
        legend: {
            position: 'none'
        },
        series: {
            5: {
                color: 'black',
                visibleInLegend: false,
                pointSize: 10
            }
        },
        hAxis: {
            title: labels.agexaxis,
            titleTextStyle: {
                color: '#FF0000',
                fontSize: '14'
            },
            gridlines: {
                count: 9
            }
        },
        chartArea: {
            top: 15,
            height: '80%'
        }
    });
}

$(document).ready(function () {
    initChart();
});


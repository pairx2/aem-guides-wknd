let question1, question2, question3, question4, question5, question6, question7, question8, eUri, queryString;

function getQueryStrq1(queryString){
    switch(question1) {
        case '1_1':
            queryString += eUri('1A');
            break;
        case '1_2':
            queryString += eUri('1B');
            break;
        case '1_3':
            queryString += eUri('1C');
            break;
        case '1_4':
            queryString += eUri('1D');
            break;
        default:
            queryString += eUri('1E');
            break;
    }
    return queryString;
}

function getQueryStrq2(queryString){
    switch(question2) {
        case '2_1':
            queryString += eUri('2A');
            break;
        case '2_2':
            queryString += eUri('2B');
            break;
        default:
            queryString += eUri('2C');
            break;
    }
    return queryString;
}

function getQueryStrq3(queryString){
    if (question3 === "3_1"){
        queryString = getQueryStrq3_1(queryString);
        
    }else if (question3 === "3_2") {
        queryString += eUri("3BNR");
    }else if (question3 === "3_3"){
        queryString = getQueryStrq3_3(queryString);
        
    }

    return queryString;
}

function checkCondition_3_1_1(){
    return (question1 === "1_1" || question1 === "1_2" || question1 === "1_3");
}

function checkCondition_3_1_2(){
    return (question1 === "1_4" || question1 === "1_5");
}

function getQueryStrq3_1(queryString){
    if (question2 === "2_3" && checkCondition_3_1_1()) {
        queryString += eUri("3A123F");
    } else if (question2 === "2_3" && checkCondition_3_1_2()) {
        queryString += eUri("3A45F");
    } else if ((question2 === "2_1" || question2 === "2_2") && (question1 === "1_1" || question1 === "1_2")) {
        queryString += eUri("3A12SB");
    }
    else if ((question2 === "2_1" || question2 === "2_2") && (question1 === "1_3")) {
        queryString += eUri("3A3SB");
    }
    else if ((question2 === "2_1" || question2 === "2_2") && (question1 === "1_4" || question1 === "1_5")) {
        queryString += eUri("3A45SB");
    }
    return queryString;
}

function checkCondition_3_3_1(){
    return (question1 === "1_1" || question1 === "1_2");
}

function getQueryStrq3_3(queryString){
    if (question2 === "2_3" && checkCondition_3_3_1()) {
        queryString += eUri("3C12F");
    }else if ( question2 === "2_3" && (question1 === "1_3")) {
        queryString += eUri("3C3F");
    }else if ( question2 === "2_3" && (question1 === "1_4" || question1 === "1_5")){
        queryString += eUri("3C45F");
    }else if ((question2 === "2_1" || question2 === "2_2") && (question1 === "1_1" || question1 === "1_2" || question1 === "1_3")){
        queryString += eUri("3C123SB");
    }else if ((question2 === "2_1" || question2 === "2_2") && (question1 === "1_4" || question1 === "1_5")){
        queryString += eUri("3C45SB");
    }
    return queryString;
}

function getQueryStrq4(queryString){
    if(question4 === "4_1" ){
        queryString = getQueryStrq4_1(queryString);
    }
    else if(question4 === "4_2"){
        queryString = getQueryStrq4_2(queryString);
            
    }else{
        queryString += eUri( "4CNR");
    }
    return queryString;
}

function getQueryStrq4_1(queryString){
    if(question2 === "2_3"){
        if(question1 === "1_1"){
           queryString += eUri("4A1F");
        }
        else{
          queryString += eUri("4A2345F");
        }
    }else if(question2 === "2_2"){
        if(question1 === "1_1"){
            queryString += eUri("4A1S");                
        }else if(question1 === "1_2" || question1 === "1_3"){
            queryString += eUri("4A23S");               
        }else{
            queryString += eUri("4A45S");
        }	
    }else if(question1 === "1_1"){
        queryString += eUri("4A1B");
    }else if(question1 === "1_2" || question1 === "1_3"){
        queryString += eUri("4A23B");
    }else{
        queryString += eUri("4A45B");
    }

    return queryString;
}

function getQueryStrq4_2(queryString){
    if(question2 === "2_3"){
        if(question1 === "1_1"){
            queryString += eUri("4B1F");
        }
        else{
            queryString += eUri("4B2345F");
        }
    }else if(question2 === "2_2"){
        if(question1 === "1_1"){
            queryString += eUri("4B1S");
        }else if(question1 === "1_2" || question1 === "1_3"){
            queryString += eUri("4B23S");
        }else{
            queryString += eUri("4B45S");
        }
    }else if(question1 === "1_1"){
        queryString += eUri("4B1B");
    }
    else if(question1 === "1_2" || question1 === "1_3"){
        queryString += eUri("4B23B")
    }else{
        queryString += eUri("4B45B");
    }
    return queryString;
}

function getQueryStrq5(queryString){
    if(question5 === "5_1"){
        if(question2 === "2_1"){
            if(question1 === "1_4" || question1 === "1_5"){
                queryString += eUri("5A45B");
            }else{
                queryString += eUri("5A123B");
            }
        }else if(question1 === "1_1"){
            queryString += eUri("5A1FS");
        }else if(question1 === "1_2" || question1 === "1_3"){
            queryString += eUri("5A23FS");
        }else{
            queryString += eUri("5A45FS");
        }
    }else if(question5 === "5_2"){
        queryString = getQueryStrq5_2(queryString);
        
    }else{
        queryString += eUri("5CNR");
    }
    return queryString;
}

function getQueryStrq5_2(queryString){
    if(question2 === "2_1"){
        if(question1 === "1_1" || question1 === "1_2"){
            queryString += eUri("5B12B");
        }else{
            queryString += eUri("5B345B");
        }
    }else if(question2 === "2_2"){
        if(question1 === "1_1" || question1 === "1_2"){
            queryString += eUri("5B12S");
        }else if(question1 === "1_3"){
            queryString += eUri("5B3S");
        }else{
            queryString += eUri("5B45S");
        }
    }else if(question1 === "1_1" || question1 === "1_2"){
        queryString += eUri("5B12F");
    }else if(question1 === "1_3"){
        queryString += eUri("5B3F");
    }else{
        queryString += eUri("5B45F");
    }
    return queryString;
}

function getQueryStrq6(queryString){
    queryString += eUri(question6 === "6_1" ? "6ANR" : "6BNR");
    return queryString;
}

function getQueryStrq7(queryString){
    if(question7 === "7_1"){
        queryString = getQueryStrq7_1(queryString);
        
    }else if(question7 === "7_2"){
        if(question2 === "2_3"){
            if(question1 === "1_1"){
                queryString += eUri("7B1F");
            }else{
                queryString += eUri("7B2345F");
            }
        }else if(question1 === "1_1"){
            queryString += eUri("7B1SB");
        }else{
            queryString += eUri("7B2345SB"); 
        }
    }else{
        queryString += eUri("7CNR"); 
    }
    return queryString;
}

function getQueryStrq7_1(queryString){
    if(question2 === "2_3"){
        queryString += eUri("7AF");
    }else if(question2 === "2_2" ){
        if(question1 === "1_1"){
            queryString += eUri("7A1S");
        }else if(question1 === "1_3" || question1 === "1_2"){
            queryString += eUri("7A23S");
        }else{
            queryString += eUri("7A45S");
        }
    }else if(question1 === "1_1"){
        queryString += eUri("7A1B");
    }else if(question1 === "1_3" || question1 === "1_2"){
        queryString += eUri("7A23B");
    }else{
        queryString += eUri("7A45B");
    }
    return queryString;
}

function getQueryStrq8(queryString){
    if(question8 === "8_1"){
        if(question2 === "2_1"){
            queryString += eUri("8AB");
        }else if(question2 === "2_2"){
            queryString += eUri("8AS");
        }else{
            queryString += eUri("8AF");
        }
    } else{
        queryString += eUri("8BNR");
    }
    return queryString;
}

$(document).ready(function () {
    $('#ph-tummy-trouble').each(function() {
        let lastQues = $(this).find('.a-wizard__steps .wizard-step:last-child').data('wizard') + 1;

        $(this).find('.o-wizard__btn').each(function(){
            let thisQues = $(this).parents('.o-wizard__content').data('wizarditem') + 1;

            $(this).append("<div class='o-wizard__step'> Question " + thisQues + " of " + lastQues + "</div>");
        })

        $(this).find('.options').each(function(){
            $(this).on('change', '.a-radio__input', function(e) {
                $(this).parents('.o-wizard__content').find('.btn[name=next], .btn[name=NEXT], #ph-tummy-trouble-submit').css('pointer-events', 'auto');
            })
        });

        $(this).find('.o-wizard__btn').on('click', '.btn[name=next], .btn[name=NEXT]', function(e) {
            let selectedVal = $(this).parents('.o-wizard__content').find('.a-radio__input:checked').val();
            console.log(selectedVal)
        });

        function produceResults(e) {
            let ele = $(e);

            question1 = ele.find("input[name='ques1']:checked").val();
            question2 = ele.find("input[name='ques2']:checked").val();
            question3 = ele.find("input[name='ques3']:checked").val();
            question4 = ele.find("input[name='ques4']:checked").val();
            question5 = ele.find("input[name='ques5']:checked").val();
            question6 = ele.find("input[name='ques6']:checked").val();
            question7 = ele.find("input[name='ques7']:checked").val();
            question8 = ele.find("input[name='ques8']:checked").val();
            q1();
            q2();
            q3();
            q4();
            q5();
            q6();
            q7();
            q8();
            
            sessionStorage.setItem('phTummyTroubleTool', queryString)
        }

        eUri = encodeURIComponent;

        function q1() {
            queryString = "q1\x3d";
            queryString = getQueryStrq1(queryString);
        }
        function q2() {
            queryString += "\x26q2\x3d";
            queryString = getQueryStrq2(queryString);
        }
        function q3() {
            queryString += "\x26q3\x3d";
            queryString = getQueryStrq3(queryString);
        }
        function q4() {
            queryString += "\x26q4\x3d";
            queryString = getQueryStrq4(queryString);
        }
        function q5() {
            queryString += "\x26q5\x3d";
            queryString = getQueryStrq5(queryString);
         }
        function q6() {
            queryString += "\x26q6\x3d";
            queryString = getQueryStrq6(queryString);
        }
        function q7() {
            queryString += "\x26q7\x3d";
            queryString = getQueryStrq7(queryString);
        }
        function q8() {
            queryString += "\x26q8\x3d";   
            queryString = getQueryStrq8(queryString);
        }

        $(this).find('#ph-tummy-trouble-submit').on('click', function(e){
            let thisParents = $(this).parents('.o-wizard__container');

            produceResults(thisParents);
        });
    });
});
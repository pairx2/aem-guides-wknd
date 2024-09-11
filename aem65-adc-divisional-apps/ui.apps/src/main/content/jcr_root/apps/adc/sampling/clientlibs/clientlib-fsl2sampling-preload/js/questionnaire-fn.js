/** Questionnaire -- starts**/
function updateRequestQuestionnaire(data) {
    
    delete data.body['g-recaptcha-response'];
    delete data.body['requestType'];
    delete data.body['node'];

    //remove the data of consentsObj
    /*var consentObj = JSON.parse(getCookie('consentObj'));
    if (consentObj && consentObj !== '') {
        $.each(consentObj, function(key, val) {
            delete data.body[key];
        });
    }*/
    delete data.body['accessCode'];
    delete data.body['consentDataPrivacy'];
    delete data.body['consentTermsAndConditions'];

    var accessCode = $('input[name="accessCode"]')?.val();
    var surveyId = $('input[name="surveyId"]')?.val();
	var answers = [];

    // console.log('initial boby = '+JSON.stringify(data['body']));

    //create ansers array with all the values
    $.each( data['body'], function( key, value ) {
        //obj set of single question and answer
		var newObj = {
			'SURVEY_QUESTION': key,
			'SURVEY_ANSWER': ''
		};

        //check if value is array
        if(Array.isArray(value)) {
            var newArr = [];
            //return the input with radio option checked 
            newArr = $.grep(value, function (n, i) {
                return (n.consentValue == true);
            });
            newObj['SURVEY_ANSWER'] = newArr[0].consentName;
        } else {
            newObj['SURVEY_ANSWER'] = value;
        }
        //push the object into main answers array
        answers.push(newObj);
    });

    // console.log('answers array = '+JSON.stringify(answers));

    //filter and update answer array for values as "others"
    var othersArr = $.grep(answers, function(n, i) {
        let ques = n.SURVEY_QUESTION;
        let quesOther = ques.lastIndexOf(("::others"));
        return (quesOther > -1 );
    });

    // console.log('othersArr: '+JSON.stringify(othersArr));

    $.each(othersArr, function (key, val) {
        
        var newQues = val.SURVEY_QUESTION.split('::')[0];
        var newObj = {
			'SURVEY_QUESTION': newQues,
			'SURVEY_ANSWER': val.SURVEY_ANSWER
		};

        //get index of existing question and answer obj from answers array.
        let index = answers.findIndex(function (element) {
            if(element) {
                return element['SURVEY_QUESTION'] === newQues;
            }
        });
        //replace the question and answer obj with newObj.
        answers[index] = newObj;


        //get index of existing question and answer obj with value as "others"
        let removeIndex = answers.findIndex(function (element) {
            if(element) {
                return element['SURVEY_QUESTION'] === val.SURVEY_QUESTION;
            }
        });
        // remove the question
        answers.splice(removeIndex,1);

    });

    // console.log('updated answers array = '+JSON.stringify(answers));

    //update the data body with new data
    data['body'] = {
        "accessCode": accessCode,
        "surveyId": surveyId,
        "answers": answers
    };

    // console.log('final boby = '+JSON.stringify(data['body']));
    
    return data;
}

function onBeforeQuestionnaire() {
    $('#page-spinner').css('display', 'block');
    $('#questionsWaitMsg').css('display', 'block');
}

function onSuccessQuestionnaire(data) {
    // console.log('onSuccessQuestionnaire');

    if(data.errorCode == 0) {
        //hide all errors
        $('#apierror, #apierror_400').hide();
        
        $('#page-spinner').hide();
        $('#questionsWaitMsg').hide();

        var acsCodeStatus = {
            "statusReason": "QuestionnaireCompleted",
            "allowUser": "true"
        }

        setCookie('accessCodeStatus', JSON.stringify(acsCodeStatus), '');
    } else {
        onErrorQuestionnaire(data);
    }
    
}

function onErrorQuestionnaire(error) {
    // console.log('onErrorQuestionnaire');
    $('#page-spinner').hide();
    $('#questionsWaitMsg').hide();

    // $('.o-wizard__container .o-wizard__btn button[type="submit"]').prop('disabled', true);

    showHideApiError(error);
}
/** Questionnaire -- end**/
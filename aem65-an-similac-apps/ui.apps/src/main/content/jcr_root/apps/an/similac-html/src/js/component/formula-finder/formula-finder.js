(function (win) {

      var ChildAge = {
        premature: 0,
        first_year: 1,
        older: 2
    };
    var AfterFeeding = {
        no_concerns: 0,
        fussiness_gas: 1,
        spit_up: 2,
        colic: 3,
        allergy: 4,
        diarrhea: 5,
        feeding_issues: 6
    };
    var FormulaType = {
        milk: 0,
        soy: 1,
        advance: 2,
        organic: 3,
        nongmo: 4,
        hmo: 5,
        imported:6,
        import_eu:7
    };
    var FormulaUse = {
        exclusivly: 0,
        supplementing: 1,
        solids: 2
    };
    var PREV_QUESTION = "#previous-question";
    var NEXT_QUESTION = "#next-question";

    var _currentQuestion = 0, _age = ChildAge.first_year, _feeding = AfterFeeding.no_concerns;
    var _formula = FormulaType.milk, _formulaUse = FormulaUse.exclusivly, _answers = Array(5), _formulaFinderXML;

    if (!win.ABBOTT) {
        win.ABBOTT = {};
    }
    function GetFFXML() {
        var FFXmlS = document.getElementById("formulaFinderJSON");
        var ajaxConfig = {
            url: FFXmlS && FFXmlS.value,
            type: "GET"
        }

        ABBOTT.http.makeAjaxCall(ajaxConfig).then(function (n) {
            _formulaFinderXML = n;
            StartFinder();
        });
    }
    function StartFinder() {
        for (var n = 0; n < _answers.length; n++){
            _answers[n] = -1;}
        _feeding = AfterFeeding.no_concerns;
        _formula = FormulaType.milk;
        _formulaUse = FormulaUse.exclusivly;
        _currentQuestion = 0;
        $(NEXT_QUESTION).show();
        MoveToQuestion(0);
        $("#ff-navigation").show();
        $("#formula-finder-contents label").click(function () {
            var yen = $(this).attr("data-forvalue");
            $('#formula-finder-contents input[value="' + yen + '"]').attr("checked", !0)
        })
    }
    function MoveToQuestion(n) {
        var t = n > _currentQuestion;
        (SaveState() || !t) && ShowQuestion(n)
    }

    win.ABBOTT.MoveToQuestion = MoveToQuestion;

    function SaveState() {
        var n = GetSelectedQuestionID();
        return n !== -1 ? (_answers[_currentQuestion] = n,
            !0) : !1
    }
    function ShowQuestion(n) {
        var t, i, r, u;
        if (!MoveToAnswer(n)) {
            t = _currentQuestion > n;
            switch (_currentQuestion) {
                case 0:
                    _age === ChildAge.older && (n = 6);
                    break;
                case 1:
                    t && (n = 0);
                    break;
                case 2:
                    t && (n = 1);
                    break;
                case 3:
                    t ? n = 2 : (_feeding === AfterFeeding.no_concerns || _feeding === AfterFeeding.colic || _feeding === AfterFeeding.allergy) && (n = 5);
                    break;
                case 4:
                    t ? n = 3 : _age === ChildAge.older && (n = 6);
                    break;
                case 5:
                    t && (n = 3);
                    break;
                case 6:
                    t && (n = 0);    
                    break;
                case 7:
                    n = t ? 0 : 6;
                    break;
                case 8:
                    t && (n = 6)
            }
            PopulateQuestionContent(n);
            r = Number(n) - Number(1);
            u = Number(n) + Number(1);
            if(n === 0){
                $("#next-question a").attr("href", "javascript:ABBOTT.MoveToQuestion(1);");
            }
            else{
                $("#previous-question a").attr("href", "javascript:ABBOTT.MoveToQuestion(" + r + ");")
                $("#next-question a").attr("href", "javascript:ABBOTT.MoveToQuestion(" + u + ");");
            }
            i = _answers[n];
            i !== -1 && $($('#formula-finder-contents input[name="answers"]')[i]).attr("checked", !0);
            _currentQuestion = n
        }
    }
    function PopulateQuestionContent(n) {
        var q = _formulaFinderXML.questions || [];
        var footNote = _formulaFinderXML.footNote;
        var currentQuestions = q.filter(function (_q) {
            return _q['@number'] === String(n);
        })
        var t, r;
        jQuery.each(currentQuestions, function (_index, _q) {
            var _text = _q.text || "";
            t = "<p>" + _text + "<\/p>";
            t += '<div class="row">';
            var answers = _q.answers || [];
            jQuery.each(answers, function (__index, _ans) {
                t = t + '<div class="col-12 col-md-4">' +
                    '<label class="ff-radio radio-button-wrapper">' +
                    ' <input class="radio-input" type="radio" value="' + _ans.value + '" name="answers">' +
                    '<span class="radio-label">' +
                    _ans.text +
                    '<\/span>' +
                    '<\/label>' +
                    '<\/div>';
            })
            t += '<\/div>';

        });
        (n === 4 || n === 7) && (t += "<div class ='footnote'>" + footNote + "</div>");
        $("#formula-finder-contents").html(t);
        n === 3 && _answers[0] === 0 && _answers[1] === 1 && _answers[2] === 3 && $("#formula-finder-contents .ff-radio").eq(0).css("display", "none");
        n === 4 && _answers[0] === 0 && _answers[1] === 1 && _answers[2] === 3 && _answers[3] === 1 && $("#formula-finder-contents .ff-radio").eq(0).css("display", "none");
        n === 0 ? $(PREV_QUESTION).hide() : $(PREV_QUESTION).show();

    }

    function getCurrentURL(i, answerKey) {
        var questions = _formulaFinderXML.questions || [];
        var answers = questions[i] && questions[i].answers || null;
        if (answers) {
            var finalUrl = answers.filter(function (_url) {
                return _url.value === answerKey;
            });
            return finalUrl[0] && finalUrl[0].redirectURL;
        }
        return null;
    }

    var NO_CONCERNS = "no-concerns";
    var FUSSINESS_GAS = "fussiness-gas";
    function MoveToAnswer(n) {
        var r = n > _currentQuestion, t, i;
        if (r) {
            t = ""; i = GetSelectedQuestionValue();
            if (_currentQuestion === 0){
                switch (i) {
                    case "first_year":
                        _age = ChildAge.first_year;
                        break;
                    case "older":
                        _age = ChildAge.older
                }
            }
            else if (_currentQuestion === 1){
                if(i === "premature" ){
                    _age = ChildAge.premature;
                    t = getCurrentURL(1, "premature");
                }

            }
            else if (_currentQuestion === 2){
                switch (i) {
                    case "introduce-formula":
                        t = getCurrentURL(2, "introduce-formula");
                        break;
                    case "supplementing-formula":
                        _formulaUse = FormulaUse.supplementing;
                        break;
                    case "formula":
                        _formulaUse = FormulaUse.exclusivly;
                        break;
                    case "solids-and-formula":
                        _formulaUse = FormulaUse.solids
                }
            }
            else if (_currentQuestion === 3){
                switch (i) {
                    case NO_CONCERNS:
                        _feeding = AfterFeeding.no_concerns;
                        if (_formulaUse === FormulaUse.supplementing || _formulaUse === FormulaUse.exclusivly) {
                            t = getCurrentURL(3, NO_CONCERNS);
                            break
                        } else if (_formulaUse === FormulaUse.solids) {
                            t = "similac-advance-stage2";
                            break
                        }
                        break;
                    case FUSSINESS_GAS:
                        _feeding = AfterFeeding.fussiness_gas;
                        break;
                    case "spit-up":
                        _feeding = AfterFeeding.spit_up;
                        t = getCurrentURL(3, "spit-up");
                        break;
                    case "diarrhea":
                        _feeding = AfterFeeding.diarrhea;
                        t = getCurrentURL(3, "diarrhea");
                        break;
                    case "feeding-issues":
                        _feeding = AfterFeeding.feeding_issues;
                        t = getCurrentURL(3, "feeding-issues")
                        break;
                    case "colic":
                        _feeding = AfterFeeding.colic;
						t = getCurrentURL(3, "colic");
						break;
                    case "allergy":
                        _feeding = AfterFeeding.allergy;
						t = getCurrentURL(3, "allergy");
						break;
                }
            }
            else if (_currentQuestion === 4){
                switch (i) {
                    case "milk":
                        _formula = FormulaType.milk;
                        _age === ChildAge.first_year && (t = _feeding === AfterFeeding.fussiness_gas && _formulaUse === FormulaUse.solids ? "similac-sensitive-stage-2" : getCurrentURL(4, "milk"));
                        break;
                    case "soy":
                        _formula = FormulaType.soy;
                        _age === ChildAge.older ? t = "similac-go-and-grow-soy" : _age === ChildAge.first_year && _feeding === AfterFeeding.fussiness_gas && (t = getCurrentURL(4, "soy"));
                        break;
                    case "nongmo":
                        _formula = FormulaType.nongmo;
                        t = getCurrentURL(4, "nongmo")
                }
            }
            else if (_currentQuestion === 5){
                switch (i) {
                    case "hmo":
                        _formula = FormulaType.hmo;
						 if (_feeding === AfterFeeding.colic){
							t = getCurrentURL(3, "colic");
                        }else if(_feeding === AfterFeeding.allergy){
							t = getCurrentURL(3, "allergy");
                        }else{
                        t = getCurrentURL(5, "hmo");
						}
                        break;
                    case "advance":
                        _formula = FormulaType.advance;
                        if (_feeding === AfterFeeding.colic){
							t = getCurrentURL(3, "colic");
                        }else if(_feeding === AfterFeeding.allergy){
							t = getCurrentURL(3, "allergy");
                        }else{
                            t = getCurrentURL(5, "advance");
                        }
                        break;
                    case "organic":
                        _formula = FormulaType.organic;
                        if (_feeding === AfterFeeding.colic){
							t = getCurrentURL(3, "colic");
                        }else if(_feeding === AfterFeeding.allergy){
							t = getCurrentURL(3, "allergy");
                        }else{
                            t = getCurrentURL(5, "organic");
                        }
                        break;
                    case "imported":
                        _formula = FormulaType.imported;
                        if (_feeding === AfterFeeding.colic){
                            t = getCurrentURL(3, "colic");
                        }else if(_feeding === AfterFeeding.allergy){
                            t = getCurrentURL(3, "allergy");
                        }else{
                            t = getCurrentURL(5, "imported");
                        }
                        break;       
                }
            }
            else if (_currentQuestion === 6){
                switch (i) {
                    case NO_CONCERNS:
                        if (_age === ChildAge.older) {
                            t = getCurrentURL(6, NO_CONCERNS);
                            break;
                        } 
                        break;
                    case FUSSINESS_GAS:
                        t = getCurrentURL(6, FUSSINESS_GAS)
                }
            }
            else if (_currentQuestion === 7){
                switch (i) {
                    case "nongmo":
                        _formula = FormulaType.nongmo;
                        break;
                    case "import_eu":
                        _formula = FormulaType.import_eu;
                }
            }
            else if (_currentQuestion === 8){
                switch (i) {
                    case "unflavored":
                        t = getCurrentURL(8, "unflavored");
                        break;
                    case "vanilla":
                        t = getCurrentURL(8, "vanilla");
                }
            }
            if (t !== "") {
                ShowAnswer(t);
                return !0
            }
        }
        return !1
    }
    function ShowAnswer(n) {
        window.location = n
    }
    function GetSelectedQuestionID() {
        return $("#formula-finder-contents input").index($('input[name="answers"]:checked'))
    }
    function GetSelectedQuestionValue() {
        return $("#formula-finder-contents").find('input[name="answers"]:checked').val()
    }
    $(document).ready(GetFFXML);
})(window);
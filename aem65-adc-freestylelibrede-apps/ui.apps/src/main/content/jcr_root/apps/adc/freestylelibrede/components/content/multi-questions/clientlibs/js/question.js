	   let allAnswers = jQuery(".questionset .form-check-input");
       jQuery.each(allAnswers, function(index, value){
		   jQuery(this).attr("id", "form-check-inputId"+index);
           jQuery(this).next().attr("for", "form-check-inputId"+index);
	   });

 	   let allAnswerSets = jQuery(".questionset");
	   jQuery.each(allAnswerSets, function(index, value){
           jQuery(this).find(".form-check-input").attr("name", "form-check-inputName"+index);
	   });

      let form_count = 1;
      let score_forms = jQuery(".questionset").length; 
      let number = jQuery(".form-question__elem");
      let score_number = jQuery(".form-question__elem1");
      let current_count = 1;
      score_number.html(current_count + "/" +score_forms);
      jQuery(".form-question--number").show();
      jQuery(".multilque-pre-btn").hide();
      jQuery(".multilque-submit-btn").hide();
      jQuery(".multilque-submittext").hide();
      jQuery(".multilque-submit-btn").attr("disabled", true);
      jQuery(".multilque-next-btn").attr("disabled", true);

      jQuery(".form-check-input, .form-check-label").click(function(){
          let ratgeberradio = (jQuery(this).hasClass("form-check-input")) ? jQuery(this) : jQuery(this).prev();
          if(ratgeberradio.is(':checked')){
              if(ratgeberradio.parent().parent().is(':last-child')){
				ratgeberradio.parent().parent().find(".multilque-submit-btn").removeAttr('disabled');
              } else {
				ratgeberradio.parent().parent().find(".multilque-next-btn").removeAttr('disabled');
              }
          }

	  });

      jQuery(".multilque-next-btn").click(function(){
        let form_count_form = jQuery(this).closest(".questionset");
        let next_form = jQuery(this).closest(".questionset").next();
        next_form.show();
        next_form.find(".multilque-pre-btn").show();
        form_count_form.hide();
        setProgressBar(++form_count);

        if(form_count == score_forms){
          next_form.find(".multilque-next-btn").hide();
          next_form.find(".multilque-submit-btn").show();
        }
        current_count++;
        number.html(current_count);
        score_number.html(current_count + "/" +score_forms);
      });  

      jQuery(".multilque-pre-btn").click(function(){
        let form_count_form = jQuery(this).closest(".questionset");
        let next_form = jQuery(this).closest(".questionset").prev();
        next_form.show();
        form_count_form.hide();
        setProgressBar(--form_count);
        current_count--;
        number.html(current_count);
        score_number.html(current_count + "/" +score_forms);
      });

      setProgressBar(form_count); 

      function setProgressBar(curStep){
        let percent = parseFloat(100 / score_forms) * curStep;
        percent = percent.toFixed();
        jQuery(".progress-bar").css("width",percent+"%");  
      }

     jQuery('.multilque-submit-btn').on('click', function() {
        jQuery(".questionset").hide();
        jQuery(".multilque-submittext").show();
        let score = 0;
        let percentage = 0;
        calculatePercentage();
        jQuery('.value-div--score').html(percentage + "%");

        function addScore(element, index, array) {
            if (element.checked){
                score += +element.value;
            }
            return score;
        }

        function calculatePercentage() {
           let radiovalue = Array.prototype.slice.call(document.getElementsByTagName('input'));
            radiovalue.forEach(addScore);

            if (score >= 0 && score < 7)
            {
              percentage = 1;
              jQuery('.value-div--number').css("left", 11.5 + "%");
            }
            else if (score >= 7 && score <= 11)
            {
              percentage = 4;
              jQuery('.value-div--number').css("left", 28 + "%");
            }
            else if (score >= 12 && score <= 14)
            {
              percentage = 17; 
              jQuery('.value-div--number').css("left", 62.5 + "%");
            }
            else if (score >= 15 && score <= 20)
            {
             percentage = 33; 
             jQuery('.value-div--number').css("left", 73.3 + "%");
            }
            else if (score > 20)
            {
               percentage = 50; 
               jQuery('.value-div--number').css("left", 81 + "%");
            }
        }
        
      });

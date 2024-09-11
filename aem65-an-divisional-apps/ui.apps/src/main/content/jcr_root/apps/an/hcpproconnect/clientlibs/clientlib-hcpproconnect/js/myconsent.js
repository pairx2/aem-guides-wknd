
$( document ).ready(function() {

    let clicked = true;

    $(".a-badges").click(function() {

           if(clicked) {

            $(this).css('background-color' ,'#002A3A');

           $(this).find('.a-badges--text').css( 'color' ,'#FFFFFF');
			$(this).find('.a-badges--text').addClass('checked');
            clicked = false;
            }

        else {
			$(this).css('background-color' ,'#FFFFFF');
            $(this).find('.a-badges--text').css( 'color' ,'#63666A');
			$(this).find('.a-badges--text').removeClass('checked');

            clicked = true;
       }

  });
function dataFinder(marketingCheckboxes, medicalCheckboxes,data){
    
    for(let i of marketingCheckboxes)
    {
        if($(i).attr('value').includes("phoneOptIn"))
        {
            $(i).prop('checked', $(data) .is(':checked'))
        }

    }
   for(let i of medicalCheckboxes)
    {
        if($(i).attr('value').includes("phoneOptIn"))
        {
            $(i).prop('checked', $(data) .is(':checked'))
        }


    }
}

    /* Prefereed Time data container hiding when Phone is not clicked*/
      
      let checkboxdatafinder = $('#socialmediareach-options').find('.a-checkbox');
      let marketingCheckboxes = $('#marketingsocialmediareach-options .a-checkbox').find('.a-checkbox__input');
   	  let medicalCheckboxes = $('#educationconsent-options .a-checkbox').find('.a-checkbox__input');

          $(checkboxdatafinder).click(function(){


              let checkeddata = "phoneOptIn";
              let data = ($(this).find('.a-checkbox__input'));


              if($(data).val() === checkeddata ) {

                  if($(data) .is(':checked'))
                  {

              			$("#preferredtimedata").show();                    	

               	  }
                  else {

                    $("#preferredtimedata").hide();
                  }

                      dataFinder(marketingCheckboxes, medicalCheckboxes, data); 

             }
              else if($(data).val() === "emailOptIn") {
					for(let i of marketingCheckboxes)
                        {

                           if($(i).attr('value').includes("emailOptIn"))
                            {
                                $(i).prop('checked', $(data) .is(':checked'))
                            }

                        }
                       for(let i of medicalCheckboxes)
                        {
							if($(i).attr('value').includes("emailOptIn"))
                            {
                                $(i).prop('checked', $(data) .is(':checked'))
                            }

                        }

               }
   });


    /* Display Text  when tou click on checkbox for APAC(India,TH and Spain)*/ 

            let socialText = $('#socialmediareach-options').find('.a-checkbox');

  			$(socialText.find('.a-checkbox__input')).click(function() {

 			let filterText = $(this).siblings('.a-checkbox__text').text();

			if ($(this).is(':checked')) {


                $("#accordiangeneralcontainer").find(".m-accordion__title-wrapper").append(`<p class = "socialtext">${filterText}</p>`);                           

            } 

                else {

					$("#accordiangeneralcontainer").find('.socialtext').remove(":contains('" + filterText + "')");

               }

             });

      /* Display Text  when tou click on checkbox for UK*/

    let uksocialText = $('#socialmediareach-options').find('.a-checkbox');

  			$(uksocialText.find('.a-checkbox__input')).click(function() {

 			let ukfilterText = $(this).siblings('.a-checkbox__text').text();

			if ($(this).is(':checked')) {


                $("#socialmediatext").append(`<p class = "socialtext">${ukfilterText}</p>`);                           

            } 

                else {

					$("#socialmediatext").find('.socialtext').remove(":contains('" + ukfilterText + "')");

               }

             });




         let marketingText = $('#marketingsocialmediareach-options').find('.a-checkbox');

  			$(marketingText.find('.a-checkbox__input')).click(function() {

 			let filterMarketingText = $(this).siblings('.a-checkbox__text').text();

			if ($(this).is(':checked')) {

                $("#marketingsocialmediatext").append(`<p class = "marketingsocialdatacontainer">${filterMarketingText}`);

            } 

                else {

					$("#marketingsocialmediatext").find('.marketingsocialdatacontainer').remove(":contains('" + filterMarketingText + "')");

               }



             });

           let educationalText = $('#educationconsent-options').find('.a-checkbox');

  			$(educationalText.find('.a-checkbox__input')).click(function() {

 			let filterEducatioalText = $(this).siblings('.a-checkbox__text').text();

			if ($(this).is(':checked')) {

                $("#educationalsocialmediatext").append(`<p class = "educationalsocialdatacontainer">${filterEducatioalText}`);

            } 

                else {

					$("#educationalsocialmediatext").find('.educationalsocialdatacontainer').remove(":contains('" + filterEducatioalText + "')");

               }


             });

});
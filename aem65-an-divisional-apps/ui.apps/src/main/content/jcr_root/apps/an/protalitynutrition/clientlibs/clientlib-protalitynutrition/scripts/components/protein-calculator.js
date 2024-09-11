$(document).ready(function () {    
    $("#section-protienCalc_container").parent().addClass("proteinCalc_container");
    
    //to disable result button
    $("#showResult").addClass("disabled-btn");
    $("#showResult").parent().attr("data-toggle", "");

    let getweightVal = $("input#weight-field").val();
    let getageRange =  $("#dropdown_label_ageSelection").text();    
    
    disableShowResult(getweightVal,getageRange);
    //PDF New update   
    
    //PDF style for mobile view and tablet view 
    $("#protein-intake-pdf .container").css({padding:"0"});
    $("#section-protein-intake-pdf").parent().css({padding:"0"});
    $("#section-pdf-content").parent().css({padding:"0"});
    $("#section-protality-bottle-pdf-image").parent().css({padding:"0"});
    $("#section-protein-intake-pdf").css({width:"1140px",margin:"0 auto"});
    $("#section-pdf-content .a-container__content").css({
        height:'auto'        
    });			
    $("#section-pdf-content #pdf-content").css({
        height:'590px'        
    });
    $("#section-protality-bottle-pdf-image .a-container__content").css({
        height: 'auto'       
    });
    $("#section-protality-bottle-pdf-image #protality-bottle-pdf-image").css({
        height: '850px'       
    });
    $("#section-pdf-content .a-container__media .a-container__image .cmp-image").attr("style","height: inherit;object-fit: contain !important;");
    
    $("#section-protality-bottle-pdf-image .a-container__media .a-container__image .cmp-image").attr("style","height: inherit;object-fit: contain !important;");
    
    $("#protein-intake-pdf #pdf-title h1.cmp-title__text").attr("style","padding-top:205px !important; margin-bottom:18px");
    $("#protein-intake-pdf #pdf-title h1.cmp-title__text div").attr("style","font-weight: bold !important;padding-top: 0 !important;font-size: 45px !important;word-spacing: 20px");
    $("#protein-intake-pdf #pdf-description p").attr("style","padding-bottom: 30px;font-weight: 600;width: 54%;");
    $("#protein-intake-pdf #resultSection").css({
        "margin-top": "39px",				
        padding: '33px 20px'
    });		
    $("#protein-intake-pdf #resultSection p").css({
        "font-size": "65px",
        "padding-right": "0px"
    });			
    
    if(screen.width < 768){
        $("#protein-intake-pdf .container").css({padding:"0"});
        $("#section-protein-intake-pdf").parent().css({padding:"0"});
        $("#section-pdf-content").parent().css({padding:"0"});
        $("#section-protality-bottle-pdf-image").parent().css({padding:"0"});
        $("#section-protein-intake-pdf").css({width:"430px",margin:"0 auto"});

        $("#section-pdf-content .a-container__content").css({
            height:'auto'        
        });	
        $("#section-pdf-content #pdf-content").css({
            height:'248px'        
        });
        $("#section-protality-bottle-pdf-image .a-container__content").css({
            height: 'auto'       
        });
        $("#section-protality-bottle-pdf-image #protality-bottle-pdf-image").css({
            height: '290px'       
        });
        $("#protein-intake-pdf #pdf-title h1.cmp-title__text").attr("style","font-size: 16px !important;line-height: 20px !important;padding-top:0 !important;margin-bottom:0;");   
        
        
        $("#protein-intake-pdf .a-container__media .a-container__image").attr("style","display: block !important");
        $("#protein-intake-pdf #pdf-title h1.cmp-title__text").attr("style","font-size: 16px !important;line-height: 20px !important;padding-top:0 !important");
       
        $("#protein-intake-pdf #pdf-title h1.cmp-title__text div").attr("style","letter-spacing: 1px !important;font-weight:bold !important;font-size:16px !important;line-height:20px !important;padding-top:0");
        $("#pdf-description p").attr("style","font-size:8px !important;width:63%;padding-top:5px;padding-bottom: 0;");	
        
        $("#pdf-description p span").attr("style","font-weight:bolder;color:rgb(255, 255, 255) !important;font-size:8px !important");	
        $("#protein-intake-pdf #pdf-content .title:nth-child(1)").css({
            "padding-top": "80px"
        });
        $("#protein-intake-pdf #pdf-content .title:nth-child(3)").css({
            "margin-bottom": "0"
        });
        $("#protein-intake-pdf #recommended-text h3.daily-text").css({
            "font-size": "14px"
        });
        $("#protein-intake-pdf #recommended-text h3.protein-text").css({
            "font-size": "14px"
        });
        $("#pdf-content .container").css({
            "padding-top":"0"
        });
        $("#protein-intake-pdf #resultSection").css({
            padding: "5px 0 5px 0",
            "margin-top": "4px"
        });
    
        $("#protein-intake-pdf #resultSection p").css({
            "font-size": "24px"
        })

    }  
    if(screen.width >=768 && screen.width<=1024){
        $("#protein-intake-pdf .container").css({padding:"0","max-width":"100%"});
        $("#section-protein-intake-pdf").css({width:"1007px",margin:"0 auto"});
        $("#section-pdf-content .a-container__content").css({
            height:'auto'        
        });	
        $("#section-pdf-content #pdf-content").css({
            height:'583px'        
        });
        $("#section-protality-bottle-pdf-image .a-container__content").css({
            height: 'auto'       
        });
        $("#section-protality-bottle-pdf-image #protality-bottle-pdf-image").css({
            height: '690px'       
        });
        $("#protein-intake-pdf #pdf-title h1.cmp-title__text").attr("style","padding-top:210px !important;margin-bottom:initial;");
        $("#protein-intake-pdf #pdf-description p").attr("style","padding-bottom: 30px;font-weight: 600;width:60%;");
        $("#protein-intake-pdf #resultSection").css({
            padding: "36px 20px",
            "margin-top": "42px"
        });
        $("#protein-intake-pdf #resultSection p").css({
            "font-size": "60px"
        })
    }
});
//show protien intake result
function showResult(selectedAge){
    let result;
    let selectedWeight = $("input#weight-field").val();
    if (selectedWeight && selectedAge) {
        result = selectedWeight / 2.2;
        let showResult;
        if(selectedAge < '65'){
            showResult = result*.8;
        }
        else if(selectedAge == "65"){
            showResult = result*1.1; 
        }
        //fixing output to 2 digit              
        let output = Math.round(showResult);	            
        $(".proteinCalculator_output").html(output);
    }
} 
//calling calculator function on key chage
$('#weight-field').on("keypress", function (e) {
    (46 != e.which || 46 == e.which && "" == $(this).val() || -1 != $(this).val().indexOf(".")) && (e.which < 48 || e.which > 57) && e.preventDefault();
    (3 == $(this).val().length && 46 != e.which) && e.preventDefault();
}).on("paste", function(e) {
    e.preventDefault()
}).on("keyup", function(e) {
    (-1 != $(this).val().indexOf(".")) && $(this).val().split(".")[1].length > 2 && (this.value = parseFloat(this.value).toFixed(2));
    let getDropdownVal = $("#dropdown_label_ageSelection").text();
    let getSelWeightVal = $("input#weight-field").val();
    disableShowResult(getSelWeightVal,getDropdownVal);    
});

 //calling calculator function on dropdown change
 $('#ageSelection-options .a-dropdown__menu li').on('click', function () {
    let getSelWeight = $("input#weight-field").val();
    if( getSelWeight !=""){
        $("#showResult").removeClass("disabled-btn");
        $("#showResult").parent().attr("data-toggle", "modal");
        $("#showResult").attr("tabindex","0");
    } 
    setTimeout(function () {                      
        proteinCalculator();
    }, 200);
});
//enable or disable the result button and dropdown value change on key press
$('#ageSelection-options .a-dropdown__menu li').on('keyup', function(event){   
    if ((event.which == 40)|| (event.which == 38) || (event.which == 13)){
    setTimeout(function () {
    let getSelDropdownVal = $("#dropdown_label_ageSelection").text();
    let getWeightSelect = $("input#weight-field").val();
    
    disableShowResult(getWeightSelect,getSelDropdownVal);
}, 200);
    }
});
//function to disable the result button
function disableShowResult(weightVal,ageVal){
    if(weightVal != "" ){
        if(weightVal >=0   &&  ageVal != "(select one)"){   
                $("#showResult").removeClass("disabled-btn");
                $("#showResult").parent().attr("data-toggle", "modal");        
                $("#showResult").attr("tabindex","0");
                proteinCalculator();         
                    
        }
        else{        
            $("#showResult").removeAttr("tabindex");
            $("#showResult").addClass("disabled-btn");
            $("#showResult").parent().attr("data-toggle", "");
            
        }
    }
    else{        
        $("#showResult").removeAttr("tabindex");
        $("#showResult").addClass("disabled-btn");
        $("#showResult").parent().attr("data-toggle", "");
        
    }
}
//protein calculator functionality acceping weight in pounds and age group
function proteinCalculator() {
    let selectedAgeval = "";
    $("#ageSelection-options li").each(function () {
        if ($(this).hasClass("selected")) {
            selectedAgeval = $(this).attr("data-optionvalue");
        }
        if (selectedAgeval == " ") {
            selectedAgeval = "";
        }
    });
    showResult(selectedAgeval);
    
}    
//trgger click Event when enter key press
$("#showResult").on("keyup", function (event) {
    if (event.which == 13) {
        $(this).parent().trigger('click');
    }
});
//open protien intake result as pdf in new tab
$(document).on("click","#showResult-modal #downLoadPDF",function(e){
       
    e.preventDefault();      
    $("#section-protein-intake-pdf").removeClass("d-none");    
    let pdf = new jspdf.jsPDF('p','px', [450, 570]);       
    let pWidth = pdf.internal.pageSize.width;
    let srcWidth = document.getElementById('section-protein-intake-pdf').scrollWidth;    
    let scale = pWidth / srcWidth;    

    pdf.html(document.getElementById('section-protein-intake-pdf'), {  
    
    html2canvas:{
        scale: scale,
    },

    callback: function(){
        window.open(pdf.output('bloburl','_blank'));
        $("#section-protein-intake-pdf").addClass("d-none");
        
    }
    });

});
//Reset the protein calcualor in-put values, after the popup closed
window.onclick = function() {	
	if($("#showResult-modal").hasClass("show")){
		$("#weight-field").val("");
		$("#dropdown_label_ageSelection").text("(select-one)");
		$("#ageSelection-options .a-dropdown__menu li").removeClass("selected");
		$("#showResult").removeAttr("tabindex");
		$("#showResult").addClass("disabled-btn");
		$("#showResult").parent().attr("data-toggle", "");
	}
}


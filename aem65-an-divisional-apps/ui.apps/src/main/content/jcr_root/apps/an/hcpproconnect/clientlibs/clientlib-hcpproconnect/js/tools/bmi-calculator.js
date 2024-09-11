$(document).ready(function () {
    let headerHeight,bmiCalculatorTop,height,weight;
    $("#height").val("110");
    $("#weight").val("30");
    $("#height-slider").html("<input type='range' min='110' max='210' value='0' class='slider' id='heightRange'>");
    $("#weight-slider").html("<input type='range' min='30' max='220' value='0' class='slider' id='weightRange'>");

    $("input#height").on('change', function(){
        if ($('#height').val() < 110 || $('#height').val() == '') {
            height = 110;
            $('#height').val("110");
            $('input#heightRange').val("110");
        }
        else if ($('#height').val() > 210) {
           height = 210;
            $('#height').val("210");
            $('input#heightRange').val("210");
        }           
        else{
            $('input#heightRange').val($(this).val());
        }
    });

    $("input#weight").on('change', function(){        
         if ($('#weight').val() < 30 || $('#weight').val() == '') {
            weight = 30;
            $('#weight').val("30");
            $('input#weightRange').val("30");
        }
        else if ($('#weight').val() > 220) {
           weight = 220;
            $('#weight').val("220");
            $('input#weightRange').val("220");
        }           
        else{
            $('input#weightRange').val($(this).val());
        }
    });

   
    $("#bmi-link").click(function(e){
      e.preventDefault();
      headerHeight=$(".header").height();
      bmiCalculatorTop=$("#ph-bmi-calculator").offset().top-headerHeight-70;
      setTimeout(function(){
            $('html, body').scrollTop(bmiCalculatorTop);
      },1000);
    });
    
     $(document).on("input","#heightRange",function(){
          $("#height").val($(this).val());
     });    
     
    $(document).on("input","#weightRange",function(){
          $("#weight").val($(this).val());
     });
    BMICalculator();
      
//Calculating the results based on the inputs
$("#results-calculate").click(function(){
    BMICalculator();
});

function BMICalculator() {
    height = $(".slideramount input#height").val();
    weight = $('.slideramount input#weight').val();
    let final = ((weight / (height * height)) * 10000).toFixed(1);
    $(".bmiNumber").text(final);
    if (window.location.pathname == "/br/tools-for-patient-care/bmi-calculator") {
        if ($(".bmiNumber").text() <= 18.5) {
            $(".bmiStatus").text("Underweight");
        }
        else if ($(".bmiNumber").text() <= 24.9) {
            $(".bmiStatus").text("Normal");
        }
        else if ($(".bmiNumber").text() <= 29.9) {
            $(".bmiStatus").text("Acima do Peso");
        }
        else if ($(".bmiNumber").text() >= 30) {
            $(".bmiStatus").text("Obesidade");
        }
    }
    else {
        if ($(".bmiNumber").text() <= 18.5) {
            $(".bmiStatus").text("Underweight");
        }
        else if ($(".bmiNumber").text() <= 24.9) {
            $(".bmiStatus").text("Normal");
        }
        else if ($(".bmiNumber").text() <= 29.9) {
            $(".bmiStatus").text("Overweight");
        }
        else if ($(".bmiNumber").text() >= 30) {
            $(".bmiStatus").text("Obesity");
        }
    }
}
});// DOM ready ends
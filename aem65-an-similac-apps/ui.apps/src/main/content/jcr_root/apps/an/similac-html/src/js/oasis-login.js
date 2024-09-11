jQuery(function() {
    
    
    jQuery('input').blur(function(){
        var inputVal = jQuery(this).val();
   
    if(jQuery.trim(inputVal).length < 1 ){
    
         $(this).parents('.form-group').find('label').removeClass('similac-label-floating')
    }
})


jQuery('input').click(function(){

    jQuery(this).parents('.form-group').find('label').addClass('similac-label-floating')

})

}())



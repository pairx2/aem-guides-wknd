$(document).ready(function(){
	$('.a-tile').each(function(){
       if($(this).find("#icontop").length){
           let currenttilelink =  $(this).find('.a-tile__link');
        	$(currenttilelink).each(function(){
        		let tileIcon = $(this).find('.a-tile__tile-icon').prop("outerHTML");
        		$(this).find('.a-tile__tile-icon').css("display","none");
        		$(this).prepend(tileIcon);
    		});
        }
	});
});
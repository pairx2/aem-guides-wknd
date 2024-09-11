$(document).ready(function(){

//Hide Content type from breadcrumb

if(($(".a-breadcrumb__item:nth-child(3)").find('span').html() == 'Products') || ($(".a-breadcrumb__item:nth-child(3)").find('span').html() == 'Resources')){
$(".a-breadcrumb__item:nth-child(2)").css("display","none");
}

//sample available

let sampleAvailable = $('#pdpContent .cmp-contentfragment__element--sampleAvailable').find('.cmp-contentfragment__element-value').text();
    if(sampleAvailable.includes(false)){
		$('#pdpContent .button').css("display","none");
    }

//rdp second rule padding issue
let horizontalRule = $('#rdpComponent .a-rule')[1];
$(horizontalRule).css("padding-top","30px");

});
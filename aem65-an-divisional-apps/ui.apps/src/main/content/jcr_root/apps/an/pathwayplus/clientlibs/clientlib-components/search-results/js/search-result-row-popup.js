$(document).ready(function(){
	$('.m-search-bar__input-field').each(function(i){
		$(this).attr('id','searchinput'+i);
	});
	$('.o-search-res__results').css('display','block');
    $('.o-search-res__results').each(function(j){
		$(this).append(' <table class="search-table" id=searchtb' + j + ' ><tr><th data-table-value="item">Item #...</th><th data-table-value="materialaltuom">Unit of Measure</th><th data-table-value="itemdescription">Item Description</th><th data-table-value="upc">UPC</th><th data-table-value="ndcformatcode">NDC-Format Code </th><th data-table-value="hcpcs">HCPCS</th></tr></table>');
	});

    $('.m-search-bar').removeAttr("data-api");
    $('.m-search-bar').removeAttr("data-js-component");
$(document).on('click','.search-table tr td' , function(){
	if ($(window).width() < 991) {
        $('html,body').css("overflow: hidden");
         let $row = $(this).closest("tr"),      
         $tds = $row.find("td");    
        $('body').append('<div class="search-table-mbl"><div class="search-table-popup"><div><div class="row-detail"><label>Row Detail</label><a class="table-row-close" href="javascript:void(0)"></a></div><div><label>Item #:</label><span class="table-value1"></span></div><div><label>Material Alt UOM:</label><span class="table-value2"></span></div><div><label>Description:</label><span class="table-value3"></span></div><div><label>UPC:</label><span class="table-value4"></span></div><div><label>NDC-Format Code:</label><span class="table-value5"></span></div><div><label>HCPCS:</label><span class="table-value6"></span></div></div></div><div class="searchpopupbg"></div></div>');
         $.each($tds, function(i) { 
            let l = i+1;
            $('.table-value'+l).text($(this).text()); 
         }); 
	}
});
$(document).on('click','.table-row-close' , function(){
	$('html,body').css("overflow: initial");
    $(this).closest(".search-table-mbl").remove();
});
});

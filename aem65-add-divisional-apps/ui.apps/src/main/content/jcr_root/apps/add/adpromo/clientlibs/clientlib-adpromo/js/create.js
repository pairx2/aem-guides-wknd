var searchUserurl = new URL($('#session-api-url').val());
var searchUserurlOrigin = searchUserurl.origin;
var xApplicationId = document.querySelector('input[name="x-application-id"]').value;
var xCountryCode = document.querySelector('input[name="x-country-code"]').value;
var xPrefLang = document.querySelector('input[name="x-preferred-language"]').value;
var jwtToken = getCookie('id.token');
//function to getCookie
function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return '';
}
$(document).ready(function() {

	$("#section-approve-review").parent().addClass("approve-review");
	$("#section-cancel-review").parent().addClass("cancel-review");
	$(document).on("click", "#review-req-change", function(e){
		var attrVlue = $(this).attr("role");
		localStorage.setItem("reviewAttr", attrVlue);
	});
	$("ul[name= 'chromosome-number'] li").each(function(){
		var liValue = $(this).attr("data-optionvalue");
		$(this).attr("style", "order:"+liValue+";");
		if(liValue == 'X'){
			$(this).attr("style", "order:23;");
		}
		if(liValue == 'Y'){
			$(this).attr("style", "order:24;");
		}
		
	})
	//login name
	var currUser = localStorage.getItem("currUserName");
	$("#activeUser").text(currUser);

	$("#product-page-content .a-dropdown__field").parent().next().prepend('<em class="abt-icon abt-icon-exclamation"></em>');	
	$(document).on("click", "#product-page-content .a-dropdown__field", function(e){			
		if($(this).find(".a-dropdown-selected").length<=0){
			$(this).parents('.a-dropdown').addClass('validation-require');		
			if($(this).find("li").hasClass("itemSelected")){
				$(this).parents('.a-dropdown').removeClass('validation-require');
			}
		}
		else{				
			$(this).parents('.a-dropdown').removeClass('validation-require');			
		}	
	});
	$(document).on("click", "#product-page-content .a-dropdown__field ul li", function(e){			
		$(this).addClass('itemSelected');			
	});

	$("#product-page-content-edit .a-dropdown__field").parent().next().prepend('<em class="abt-icon abt-icon-exclamation"></em>');
	$(document).on("click", "#product-page-content-edit .a-dropdown__field", function(e){			
		if($(this).find(".a-dropdown-selected").length<=0){
			$(this).parents('.a-dropdown').addClass('validation-require');		
			if($(this).find("li").hasClass("itemSelected")){
				$(this).parents('.a-dropdown').removeClass('validation-require');
			}
		}
		else{				
			$(this).parents('.a-dropdown').removeClass('validation-require');			
		}	
	});
	$(document).on("click", "#product-page-content-edit .a-dropdown__field ul li", function(e){			
		$(this).addClass('itemSelected');
			
	});

	$("#product-page-content-clone .a-dropdown__field").parent().next().prepend('<em class="abt-icon abt-icon-exclamation"></em>');
	$(document).on("click", "#product-page-content-clone .a-dropdown__field", function(e){			
		if($(this).find(".a-dropdown-selected").length<=0){
			$(this).parents('.a-dropdown').addClass('validation-require');		
			if($(this).find("li").hasClass("itemSelected")){
				$(this).parents('.a-dropdown').removeClass('validation-require');
			}
		}
		else{				
			$(this).parents('.a-dropdown').removeClass('validation-require');			
		}	
	});
	$(document).on("click", "#product-page-content-clone .a-dropdown__field ul li", function(e){			
		$(this).addClass('itemSelected');
			
	});

	var pageurl = window.location.pathname;
    var splitedUrl = pageurl.substring(pageurl.lastIndexOf('/')+1);
    if(splitedUrl == 'review.html' ){
		var attrvalue = localStorage.getItem("reviewAttr");
		if(attrvalue == "pendingReview"){
			$("#review-label #approve-text").hide();
			$("#review-label #pending-text").show();
			$(".cancel-review").hide();
			$(".approve-review").show();
		}else if(attrvalue == "submittedReq"){
			$("#review-label #pending-text").hide();
			$("#review-label #approve-text").show();
			$(".approve-review").hide();
			$(".cancel-review").show();
		}
	}
	$(".change-req-count").siblings("h5").addClass("pendingHead");
    $("#return-submit").parent().addClass("return-submit");
	// Search edit page
	$("#search-result-table").children("table").addClass("search-result-table");
    $("#order-id-search").parent(".input-group").addClass("search-id-order");
    $("#order-id-search").blur(function(){
        var value = document.getElementById("order-id-search").value;

        if(value.length >= 3){
             $("#order-id-search").parents(".form-group").removeClass("validation-require");
        }else{
            $("#order-id-search").parents(".form-group").addClass("validation-require");
        }
    });

    $("#order-id-search").keypress(function(){
         $(this).parents(".form-group").removeClass("validation-require");
    });
    $("#order-id-search").attr("minlength","3").attr("maxlength","20");
	$(".search-result-table,#product-page-content,#product-page-content-edit,#product-page-content-clone").parents('body').prepend("<div class='loader-parent' style='display: none;'><em class='abt-icon abt-icon-spinner'></em></div>");
	$('.search-id-order').find('p').remove();
	if(splitedUrl == 'search.html' || splitedUrl == "new.html"){
        $("#pageContent").addClass("searchHeight");
		if(splitedUrl == 'search.html'){
            var sessionError = localStorage.getItem("errorMsg");
            if((sessionError == null) || (sessionError == undefined) || (sessionError == "")){
				$('.search-id-order').find('p').remove();
			}
            else if (sessionError.length >0){
                $(".search-id-order").append("<p style='color: red !important;margin-bottom: 0;font-family: inherit;font-size: 1rem !important;'>"+sessionError+"</p>");                
                localStorage.setItem('errorMsg',"");
            }
            else{
                $('.search-id-order').find('p').remove();
            }
        }
    }else{
        $("#pageContent").removeClass("searchHeight");
    }

    /* Review request page */
    $("#review-approve-options").children(":nth-child(3)").attr("id", "approve-request");
    $("#review-approve-options").children(":nth-child(4)").attr("id", "reject-request");
    $("#cancel-review").find(".o-form-container").attr("id", "product-page-content");
    $("#cancel-review").find(".a-checkbox__custom").attr("aria-checked", "false");
    $("#cancel-review .a-checkbox__custom").click(function(){
    	var checked = $("#cancel-review").find(".a-checkbox__custom").attr("aria-checked");        
        if(checked == 'false'){
            $("#cancel-review").attr("role", "cancelChangeRequest");
        }else{
            $("#cancel-review").removeAttr("role", "cancelChangeRequest");
        }
    });

    $(document).on("click", "#approve-request", function(e){
        $("#review-approve-options").removeAttr("role");
        $("#review-approve-options").attr("role", "approveChangeRequest");
    });

    $(document).on("click", "#reject-request", function(f){
        $("#review-approve-options").removeAttr("role");
        $("#review-approve-options").attr("role", "rejectChangeRequest");
    });

    /*create page */
    $("#product-display-name").parent(".input-group").prev(".form-label__align").children("label").attr("style", "border-bottom: 2px dotted;");
	$("textarea[name='justification']").parents(".form-group").find(".form-label").attr("style", "border-bottom: 2px dotted;");



    /* new product change request */
    let new_product = $("#new-product-options").children(":nth-child(3)");
    var existing_product = $("#new-product-options").children(":nth-child(4)");
    var discontinue_product = $("#new-product-options").children(":nth-child(5)");
    var exiting_no = $("#existing-data-options").children(":nth-child(3)");
    var exiting_yes = $("#existing-data-options").children(":nth-child(4)");
     $("#yes-continue-btn").removeAttr("href");
    
    var product = $("#new-product-options").children(".a-radio");
    $(product).click(function(){
        $(this).attr("radio", "product");
    });
    $(new_product).click(function(){
        $("#new-continue-btn").removeAttr("href");
    	$("#new-product-options").children(":nth-child(3)").attr("role", "add-new-product");
        $(".radio--text-require").hide();
    });
    $(existing_product).click(function(){
    	$("#new-continue-btn").attr("href", "edit/search.html");
        $("#existing-product-data").hide();
        $(".radio--text-require").hide();
    });
    $(discontinue_product).click(function(){
        $("#new-continue-btn").attr("href", "discontinue/search.html");
        $("#existing-product-data").hide();
        $(".radio--text-require").hide();
    });
    $(exiting_yes).click(function(){
        $("#yes-continue-btn").attr("href", "clone/search.html");
        $(this).attr("radio", "product");
        $(".radio--text-require").hide();
    });
    $(exiting_no).click(function(){
        $("#yes-continue-btn").attr("href", "create.html");
        $(this).attr("radio", "product");
        $(".radio--text-require").hide();
    });
	$("#new-continue-btn").click(function(){
        var newproduct = $("#new-product-options").children(":nth-child(3)").attr("role");
        if(newproduct === 'add-new-product'){
            $("#new-product-options, #new-continue-btn, #new-cancel-btn").hide();
            $("#existing-product-data").show();
        }else{
        	$("#existing-product-data").hide();
        }
        var product_attr = $("#new-product-options").children(".a-radio").attr("radio");
        if(product_attr == "product"){
            return;
        }else{
            $(".radio--text-require").show();
        }
		var btn_Value = $("#new-continue-btn").attr("href");
		if(btn_Value == 0){
			$(".radio--text-require").show();
		}else{
			$(".radio--text-require").hide();
		}
    });
    $("#yes-continue-btn").click(function(){
		var btnValue = $("#yes-continue-btn").attr("href");
		if(btnValue != 0){
			$(".radio--text-require").hide();
		}else{
			$(".radio--text-require").show();
		}
    });
	
    $('#create-new-probe').parents('.fields').addClass('create-newProble-fields').hide();
    $('#loci-start, #loci-end').parents('.fields').addClass('probe-loci');
	$('#secondary-application-options, #teritary-application-options, #probeName-options, #locus-name-options, .probe-loci').addClass('disabled').find('.a-dropdown__menu li').hide();
	$('#remove-appilcationGroup-btn, #remove-probe, #remove-vial').hide();
	$("#primary-application-options .a-dropdown__field").append('<ul class="a-dropdown__menu" name="primary-application"></ul>');
	populatePrimary();

	$("#secondary-application-options .a-dropdown__field").append('<ul class="a-dropdown__menu" name="secondary-application"></ul>');
	$(document).on("click", "#primary-application-options li", function (e) {
		var primaryAppId = $(this).parents('.selectApplication-category').attr("id");
		var selectPrimaryKey = '';
		selectPrimaryKey = $(this).attr("data-primaryApp");
		$('#'+primaryAppId+' #secondary-application-options').find('.a-dropdown__field').removeClass('active').children('span').removeClass('a-dropdown-selected').addClass('a-dropdown__placeholder').text('Select Secondary Application');
		populateSecondary(selectPrimaryKey,primaryAppId);

	});

	$("#teritary-application-options .a-dropdown__field").append('<ul class="a-dropdown__menu" name="teritary-application"></ul>');
	$(document).on("click", "#secondary-application-options li", function (e) {
		var secondaryAppId = $(this).parents('.selectApplication-category').attr("id");
		var selectSecondaryKey = '';
		selectSecondaryKey = $(this).attr("data-secondaryApp");
		$('#'+secondaryAppId+' #teritary-application-options').find('.a-dropdown__field').removeClass('active').children('span').removeClass('a-dropdown-selected').addClass('a-dropdown__placeholder').text('Select Tertiary Application');
		populateTeritary(selectSecondaryKey,secondaryAppId);
	});

	$('#application-category0').addClass('selectApplication-category');
	$('#remove-appilcationGroup-btn').addClass('remove-appilcationGroup-btn');
	$('#application-group-btn').parent().addClass("application-btn-container");
	//ADD application grouping
	$(document).on("click", "#application-group-btn", function(e) {
		var eventAppCateClone;
		var countAppCategory;
		countAppCategory = $('.selectApplication-category:visible').length + 1;

		if (countAppCategory <= 100) {
			eventAppCateClone = $('.selectApplication-category:eq(0)').clone().addClass('selectApplication-category');
			$(this).hide();
			$(this).parent().hide();
			$(this).parents('.selectApplication-category').find('.remove-appilcationGroup-btn').show();
			eventAppCateClone.find('#remove-appilcationGroup-btn').show();
			eventAppCateClone.find('#application-group-btn').show();
			eventAppCateClone.find('.application-btn-container').show();
			var newIDattr = $('.selectApplication-category:eq(0)').attr('id');
			var Idreplaced = newIDattr.slice(0, -1) + (countAppCategory - 1);
			eventAppCateClone.attr('id', Idreplaced);
			eventAppCateClone.find(".a-dropdown").removeClass("validation-require");
			eventAppCateClone.find("li").removeClass("itemSelected");
			eventAppCateClone.insertAfter('.selectApplication-category:last');
		}
		$(".selectApplication-category:last").find('#primary-application-options .a-dropdown__field').removeClass('active').children('span').removeClass('a-dropdown-selected').addClass('a-dropdown__placeholder').text('Select Primary Application');	
        $(".selectApplication-category:last").find('#secondary-application-options .a-dropdown__field').removeClass('active').children('span').removeClass('a-dropdown-selected').addClass('a-dropdown__placeholder').text('Select Secondary Application');	
        $(".selectApplication-category:last").find('#teritary-application-options .a-dropdown__field').removeClass('active').children('span').removeClass('a-dropdown-selected').addClass('a-dropdown__placeholder').text('Select Tertiary Application');
		$(".selectApplication-category:last").find('#secondary-application-options').addClass("disabled").find('.a-dropdown__menu li').hide();
		$(".selectApplication-category:last").find('#teritary-application-options').addClass("disabled").find('.a-dropdown__menu li').hide();
		$(".selectApplication-category:not(:last)").css("border-bottom","1px solid #d9d9d6");
		$(".selectApplication-category:last").css("border-bottom","none");
	});

	//Remove application category
	$(document).on("click", "#remove-appilcationGroup-btn", function(e) {
		$(this).parents('.selectApplication-category').remove();
		var removeAppCateCount = $('.selectApplication-category:visible').length;
		if (removeAppCateCount < 2) {
			$('.selectApplication-category:eq(0)').find('#remove-appilcationGroup-btn').hide();
			$('.selectApplication-category:eq(0)').find('#application-group-btn').show();
			$('.selectApplication-category:eq(0)').find('.application-btn-container').show();
		}
		var showAdd = removeAppCateCount - 1;
		$('.selectApplication-category:eq(' + showAdd + ')').find('#application-group-btn').show();
	});

	$('#add-probe-btn, #add-viral-btn').addClass('add-product-btn');	
	$('#add-probe-btn').attr('data-click-product', 'probe');	
	$('#add-viral-btn').attr('data-click-product', 'vial');	
	//add vial	
	$('#addViral-0').addClass('addViral-category vialCount-1 newVial');		
	$('.addViral-category').parents('section').parent().addClass('product-cate');
	$('.add-product-btn').hide();
	
    var getCategory = 'false';
    var categoryInput = $('input[name="fishProbe-category"]');
	commonRadioButton(getCategory, categoryInput);
	$("#remove-probe").parent().parent().addClass("remove-probe-link");
	$("#remove-vial").parent().parent().addClass("remove-vial-link");
	$("#add-probe-btn").parent().addClass("add-probe-btn-container");
	$("#add-viral-btn").parent().addClass("add-viral-btn-container");

   $("#section-addViral-0").parent().addClass('addVial').hide().prev('.a-rule').hide();
    $(document).on("click", 'input[name="fishProbe-category"]', function(e) {
        var selectProbeCategory = $(this).val();
        if (selectProbeCategory == "true") {
            $("#section-addViral-0").parent().addClass('addVial').show().prev('.a-rule').show();
            $('#add-viral-btn').show();    
           	$('.addVial').find('#add-probe-btn').show();
        } else {
            $("#section-addViral-0").parent().addClass('addVial').hide().prev('.a-rule').hide();
            $('.add-product-btn').hide();
        }
    });
	
	 //chromosome dropdown
    $('#chromosome-number-options .a-dropdown__field').removeClass('active').children('span').removeClass('a-dropdown-selected').addClass('a-dropdown__placeholder').text('Select Chromosome');
	
	$("#fluorophore-options .a-dropdown__field").addClass("disabled");
	$("#fluorophore-options").addClass("disabled");
	$("#locus-name-options .a-dropdown__field").addClass("disabled").append('<ul class="a-dropdown__menu" name="locus-name"></ul>');
	$(".probe-loci").addClass("disabled");
	$(".probe-loci #loci-start,.probe-loci #loci-end").attr("readonly","readonly");

	$("#probeName-options .a-dropdown__field").append('<ul class="a-dropdown__menu" name="probeName"></ul>');	

	$(document).on("click", "#chromosome-number-options li", function (e) {
		var chromosomeParent = $(this).parents('.addViral-category').attr("id");
		var selectProbeNameKey = '';
		selectProbeNameKey = $(this).attr("data-optionvalue");			
        populateProbeNameKey(selectProbeNameKey,chromosomeParent);
	});

	
	$(document).on("click", "#probeName-options li", function(e) {
		
		var probparentId = $(this).parents('.addViral-category').attr("id");
		var getchromoAttrval = $('#'+probparentId+' #chromosome-number-options').find('.a-dropdown__menu[name="chromosome-number"] li.selected').attr('data-optionvalue');
		var selectProbeOtherVal = '';
		selectProbeOtherVal = $(this).attr("data-probename");

		if(selectProbeOtherVal == "new"){
			$("#"+probparentId+" .create-newProble-fields").show();

			$("#"+probparentId+" #fluorophore-options").removeClass("disabled");
			$("#"+probparentId+" #fluorophore-options .a-dropdown__field").removeClass("disabled");
			$("#"+probparentId+" #locus-name-options").removeClass("disabled");		
			$("#"+probparentId+" #locus-name-options .a-dropdown__field").removeClass("disabled");	

			$('#'+probparentId+' #fluorophore-options').find('.a-dropdown__field').removeClass('active').children('span').removeClass('a-dropdown-selected').addClass('a-dropdown__placeholder').text('Select fluorophore');	
			$('#'+probparentId+' #locus-name-options').find('.a-dropdown__field').removeClass('active').children('span').removeClass('a-dropdown-selected').addClass('a-dropdown__placeholder').text('Select Locus Name');	
			$('#'+probparentId+' #loci-start').val('');	
			$('#'+probparentId+' #loci-end').val('');
			populateLociAllVal(getchromoAttrval,probparentId);			
		}
		else{
			$("#"+probparentId+" .create-newProble-fields").hide();
			$('#'+probparentId+' #fluorophore-options').find('.a-dropdown__field').removeClass('active').children('span').removeClass('a-dropdown-selected').addClass('a-dropdown__placeholder').text('Select fluorophore');	
        	$('#'+probparentId+' #locus-name-options').find('.a-dropdown__field').removeClass('active').children('span').removeClass('a-dropdown-selected').addClass('a-dropdown__placeholder').text('Select Locus Name');		

			$("#"+probparentId+" #fluorophore-options").addClass("disabled");
			$("#"+probparentId+" #fluorophore-options .a-dropdown__field").addClass("disabled");
			$("#"+probparentId+" #locus-name-options").addClass("disabled");		
			$("#"+probparentId+" #locus-name-options .a-dropdown__field").addClass("disabled");
			populateProbeOtherVal(selectProbeOtherVal, getchromoAttrval,probparentId);
		}
		
	});
	
	$(document).on("click", "#locus-name-options li", function (e) {
		var locusparentId = $(this).parents('.addViral-category').attr("id");
		var getLocichromoAttrval = $('#'+locusparentId+' #chromosome-number-options').find('.a-dropdown__menu[name="chromosome-number"] li.selected').attr('data-optionvalue');
		var selectLocusVal = '';
		selectLocusVal = $(this).attr("data-locusName");
		if(selectLocusVal=="Multiple"){
			$('#'+locusparentId+' #loci-start').val('0');	
			$('#'+locusparentId+' #loci-end').val('0');
		}
		else{
			populateLociVal(selectLocusVal,getLocichromoAttrval,locusparentId);
		}

	});

	//add product
	var probeCount = 0;
	
	$(document).on("click", ".add-product-btn", function(e) {		
		//inner Probe
		if ($(this).parents('.addViral-category').hasClass('addViral-category') == true) {
			probeCount = probeCount+1;
            var removeCurrentProduct = $(this).parents('.addViral-category').removeClass('addProduct').addClass('currentData');

            if ($(this).parents('.addViral-category').hasClass('addProduct') == false) {
                //cloning addprobe and add vial on button 
                var eventAddClone;
                var countAddCategory;
                countAddCategory = $(this).parents('.addViral-category').length + 1;
                if (countAddCategory <= 100) {
                    eventAddClone = $(this).parents('.addViral-category').clone().addClass('addViral-category');
                    eventAddClone.find('#remove-probe').show();
                    var newIDatr = $(this).parents('.addViral-category').attr('id');
                    var Idreplac = newIDatr.slice(0, -1) + (countAddCategory - 1);
					eventAddClone.attr('id', Idreplac);
					eventAddClone.removeClass("probeData-"+(probeCount-1));
					eventAddClone.removeClass("newVial");
					eventAddClone.addClass("probeData-"+probeCount);
					eventAddClone.find(".a-dropdown").removeClass("validation-require");
					eventAddClone.find("li").removeClass("itemSelected");
					eventAddClone.find('#chromosome-number-options .a-dropdown__field').removeClass('active').children('span').removeClass('a-dropdown-selected').addClass('a-dropdown__placeholder').text('Select Chromosome');
					eventAddClone.find('#probeName-options .a-dropdown__field').removeClass('active').children('span').removeClass('a-dropdown-selected').addClass('a-dropdown__placeholder').text('Select Probe Name');
					eventAddClone.find('#fluorophore-options .a-dropdown__field').removeClass('active').children('span').removeClass('a-dropdown-selected').addClass('a-dropdown__placeholder').text('Select fluorophore');
					eventAddClone.find('#locus-name-options .a-dropdown__field').removeClass('active').children('span').removeClass('a-dropdown-selected').addClass('a-dropdown__placeholder').text('Select Locus Name');
					eventAddClone.find('#probeName-options, #fluorophore-options, #locus-name-options, .probe-loci').addClass('disabled').find('.a-dropdown__menu li').hide();
					eventAddClone.find('#loci-start').val('');
					eventAddClone.find('#loci-end').val('');
                    eventAddClone.insertAfter('.currentData');
                }
            }
            $(this).hide();
            $(this).parent().siblings('.link').find('#remove-vial').hide();
            var getcurrentid = removeCurrentProduct.attr('id').split("-")[1];
            var removeCData = removeCurrentProduct.removeClass('currentData');
			var addprods = removeCData.nextAll().addClass('addProduct').removeClass('currentData');
			$('.addProduct').each(function() {
				var titlestr = $(this).attr('id');
				var titlelastIndex = titlestr.lastIndexOf("-");
				var titleaddIndex = parseInt(getcurrentid) + 1;
				titlestr = titlestr.substring(0, titlelastIndex) + "-" + titleaddIndex;
				$(this).attr('id', titlestr);
				getcurrentid++;
			});
			addprods.removeClass('addProduct');	
			var addProbLength = $('.addViral-category:visible').length;
			if (addProbLength >1){
				$('.addViral-category:eq(0) #remove-probe' ).hide();

			}
		} 
		//outer probe
        else {
            //cloning addprobe and add vial on button 
			var eventAddViralCateClone;
			var countAddViralCategory;
			countAddViralCategory = $('.addViral-category:visible').length + 1;
			if (countAddViralCategory <= 100) {
				eventAddViralCateClone = $('.addViral-category:eq(0)').clone().addClass('addViral-category');
				eventAddViralCateClone.find('#remove-vial').show();
                eventAddViralCateClone.find('.addViral-category button .add-product-btn').show();
				eventAddViralCateClone.find('#add-viral-btn').show();
				var newIDattr = $('.addViral-category:eq(0)').attr('id');
				var Idreplaced = newIDattr.slice(0, -1) + (countAddViralCategory - 1);
				eventAddViralCateClone.attr('id', Idreplaced);
				eventAddViralCateClone.find(".a-dropdown").removeClass("validation-require");
				eventAddViralCateClone.find("li").removeClass("itemSelected");
				eventAddViralCateClone.removeClass("vialCount-1");
				eventAddViralCateClone.find('#chromosome-number-options .a-dropdown__field').removeClass('active').children('span').removeClass('a-dropdown-selected').addClass('a-dropdown__placeholder').text('Select Chromosome');
				eventAddViralCateClone.find('#probeName-options .a-dropdown__field').removeClass('active').children('span').removeClass('a-dropdown-selected').addClass('a-dropdown__placeholder').text('Select Probe Name');
				eventAddViralCateClone.find('#fluorophore-options .a-dropdown__field').removeClass('active').children('span').removeClass('a-dropdown-selected').addClass('a-dropdown__placeholder').text('Select fluorophore');
				eventAddViralCateClone.find('#locus-name-options .a-dropdown__field').removeClass('active').children('span').removeClass('a-dropdown-selected').addClass('a-dropdown__placeholder').text('Select Locus Name');
				eventAddViralCateClone.find('#probeName-options, #fluorophore-options, #locus-name-options, .probe-loci').addClass('disabled').find('.a-dropdown__menu li').hide();
				eventAddViralCateClone.find('#loci-start').val('');
				eventAddViralCateClone.find('#loci-end').val('');				
				eventAddViralCateClone.insertAfter('.addViral-category:last');
			}

            //increament number of heading on click add vial
			if ($(this).attr('data-click-product') == 'vial') {

                $(this).parent().siblings('.button').children('#add-probe-btn').hide();
				if ($(this).parent().siblings('.product-cate').find('.addViral-category').length > 1) {
					var closestVialVal = $(this).parent().siblings('.product-cate').find('.addViral-category');
					var addVialone = closestVialVal.prev('.addViral-category:last').find('.product_count').text();
					var countVial = parseInt(addVialone) + 1;
					$(this).parent().siblings('.product-cate').find('.addViral-category:last').find('.product_count').text(countVial);
					$(this).parent().siblings('.product-cate').find('.addViral-category:last').removeClass("newVial");
					$(this).parent().siblings('.product-cate').find('.addViral-category:last').addClass("vialCount-"+countVial+" newVial");
                   	$(this).parent().siblings('.product-cate').find('.addViral-category:last .add-product-btn').show();
				}
			} 

			//same product on click add probe
            else {
				if ($(this).parent().siblings('.product-cate').find('.addViral-category').length > 1) {
					var closestProbeVal = $(this).parent().siblings('.product-cate').find('.addViral-category');
					var addProbeone = closestProbeVal.prev('.addViral-category:last').find('.product_count').text();
					$(this).parent().siblings('.product-cate').find('.addViral-category:last').find('.product_count').text(addProbeone);
					$(this).parent().siblings('.product-cate').find('.addViral-category:last').addClass("vialCount-"+addProbeone);
                    $(this).parent().siblings('.product-cate').find('.addViral-category:last #remove-vial').hide();
                    $(this).parent().siblings('.product-cate').find('.addViral-category:last #remove-probe').show();
				}
			}

		}
		$(".addViral-category").css("border-bottom","1px solid #d9d9d6");
		$(".addViral-category:last").css("border-bottom","none");
		
		if ($(".addViral-category:visible").length > 1) {
			$('.addViral-category:eq(0) #add-probe-btn' ).hide();
			$('.addViral-category:eq(0) #remove-probe' ).hide();
		}
		else{
			$('.addViral-category:eq(0) #add-probe-btn' ).show();
		}
		if ($("#addViral-1").hasClass("newVial")){
			$("#addViral-0 #add-probe-btn").show();
		}

	});
	
	$('#remove-vial').addClass('remove-vial');
    $('#remove-probe').addClass('remove-probe');
	var removeLength;    	
	$(document).on("click", ".remove-vial", function(e) {		
		var class_name = $(this).parents('.addViral-category').attr('class').split(' ')[2];
		var addRemoveClass = $(this).parents('.addViral-category').removeClass('removeVial').addClass('removeVialData');	
		removeLength = $(this).parents('.addViral-category').find('.product_count').text().split(" ").pop();	
		var getcurrentRemoveId = addRemoveClass.attr('id').split("-")[1];	
		var remVial = addRemoveClass.removeClass('removeVialData');	
		var remVialList = remVial.nextAll().addClass('removeVial').removeClass('removeVialData');	
		$('.addViral-category:last').find('#remove-vial').show();
		$('.vialCount-1:last').find('#remove-vial').hide();
		$("." + class_name).remove();	
		$('.removeVial').each(function() {	
			var titleAppstr = $(this).attr('id');	
			var titleAppstr1 = $(this).find('.product_count').text()	
			var titlelastIndex = titleAppstr.lastIndexOf("-");	
			var titleaddIndex = getcurrentRemoveId;	
			titleAppstr = titleAppstr.substring(0, titlelastIndex) + "-" + titleaddIndex;	
			$(this).attr('id', titleAppstr);	
			var titlelastAppIndex1 = titleAppstr1.lastIndexOf(" ");	
			var titleaddAppIndex1 = removeLength;	
			titleAppstr1 = titleAppstr1.substring(0, titlelastAppIndex1) + " " + titleaddAppIndex1;	
			$(this).find('.product_count').text(titleAppstr1);	
			removeLength++	
			getcurrentRemoveId++;	
		});		
		remVialList.removeClass('removeVial');
		if ($(".addViral-category:visible").length > 1) {
			$('.addViral-category:eq(0) #add-probe-btn' ).hide();
			$('.addViral-category:eq(0) #remove-probe' ).hide();
			$(".addViral-category").css("border-bottom","1px solid #d9d9d6");
			$(".addViral-category:last").css("border-bottom","none");
		}
		else{
			$('.addViral-category:eq(0) #add-probe-btn').show();
			$(".addViral-category").css("border-bottom","1px solid #d9d9d6");
			$(".addViral-category:last").css("border-bottom","none");
		}
		$ ('.addViral-category').each(function() {
			var probesection =$ (this).attr('class').split(' ')[2];
			if($("." + probesection).length > 1){
				$("."+probesection+":eq(0) #add-probe-btn").hide();
			}
			else{
				$("."+probesection+":eq(0) #add-probe-btn").show();
			}

		});
	});
	
   	$(document).on("click", ".remove-probe", function(e) {		   
		var rmpro = $(this).parents('.addViral-category').removeClass('removeProduct').addClass('removeData');
		var getcurrentid = rmpro.attr('id').split("-")[1];
		var rem = rmpro.removeClass('removeData');
		var ty = rem.nextAll().addClass('removeProduct').removeClass('removeData');
		$(this).parents('.addViral-category').prev().find('.add-product-btn').show();
		$(this).parents('.addViral-category').remove();
		$('.addViral-category:last').find('.add-product-btn').show();
		$('.addViral-category:last').find('#remove-vial').show();
		$('.vialCount-1:last').find('#remove-vial').hide();	 
		$('.removeProduct').each(function() {
			var titlestr = $(this).attr('id');
			var titlelastIndex = titlestr.lastIndexOf("-");
			var titleaddIndex = getcurrentid;
			titlestr = titlestr.substring(0, titlelastIndex) + "-" + titleaddIndex;
			$(this).attr('id', titlestr);			
			getcurrentid++;
		});
		var removePatientCount = $('.removeProduct:visible').length;
		if (removePatientCount < 1) {
			$('.removeProduct:eq(0)').find('#add-probe-btn').show();
			
		}
		if ($(".addViral-category:visible").length > 1) {
			$('.addViral-category:eq(0) #add-probe-btn' ).hide();
			$('.addViral-category:eq(0) #remove-probe' ).hide();
			$(".addViral-category").css("border-bottom","1px solid #d9d9d6");
			$(".addViral-category:last").css("border-bottom","none");
		}
		else{
			$('.addViral-category:eq(0) #add-probe-btn').show();
			$(".addViral-category").css("border-bottom","1px solid #d9d9d6");
			$(".addViral-category:last").css("border-bottom","none");
		}

		ty.removeClass('removeProduct');
		$ ('.addViral-category').each(function() {
			var probesection =$ (this).attr('class').split(' ')[2];
			if($("." + probesection).length > 1){
				$("."+probesection+":eq(0) #add-probe-btn").hide();
			}
			else{
				$("."+probesection+":eq(0) #add-probe-btn").show();
			}

		});

    });

});

function commonRadioButton(getRadioData, inputValue) {
    $(inputValue).each(function(index, value) {
        var radioValue = $(this).attr('value');
        if (radioValue == getRadioData) {
            $(this).addClass('selected');
	        $(this).attr('checked', 'checked');
            $(this).next('span').attr('aria-checked', 'true');			
        }
    });
}

function populateProbeNameKey(selectProbeNameKey,chromosomeParent) {
	var probeData = {
		"action": "currentproductsforchromosome",
		"chromosome": selectProbeNameKey
	};
	$(".loader-parent").show();
	$.ajax({
		url: searchUserurlOrigin + '/quality/api/private/productcatalog/search',
		type: "POST",
		data: JSON.stringify(probeData),
		"headers": {
			"cache-control": 'no-cache',
			"x-application-id": xApplicationId,
			"x-country-code": xCountryCode,
			"x-preferred-language": xPrefLang,
			"x-id-token": jwtToken
		},
		contentType: "application/json",
		success: function(data) {
			$(".loader-parent").hide();
			$("#"+chromosomeParent+" ul[name='probeName']").empty();			
			var probeNameLi = '<li data-probeName="new"><span>Create New Probe</span></li>'
			$.each(data.response, function(index, valueCard) {
				if (valueCard.chromosome == selectProbeNameKey) {
					probeNameLi = probeNameLi+'<li data-probeName="' + valueCard.productId + '"><span>' + valueCard.productName + '</span></li>';					
				}
			});
			$("#"+chromosomeParent+" ul[name='probeName']").append(probeNameLi);
			$("#"+chromosomeParent+" #probeName-options").removeClass('disabled').find('.a-dropdown__menu li').show();
		},
		error: function(error) {}
	});
}


function populateProbeOtherVal(selectProbeOtherVal, getchromoAttrval,probparentId) {
	
	var pdata = {
		"action": "currentproductsforchromosome",
		"chromosome": getchromoAttrval
	};
	var valLociStart,valLociEnd,selLocusName,selFlurofereName;
	var activeLocusName,activeFlurofereName;
	$.ajax({
		url: searchUserurlOrigin + '/quality/api/private/productcatalog/search',
		type: "POST",
		data: JSON.stringify(pdata),
		"headers": {
			"cache-control": 'no-cache',
			"x-application-id": xApplicationId,
			"x-country-code": xCountryCode,
			"x-preferred-language": xPrefLang,
			"x-id-token": jwtToken
		},
		contentType: "application/json",
		success: function(data) {
			
			$("#"+probparentId+" ul[name='locus-name']").empty();
			var locusNameLi = '<li data-locusName=""><span>Select a Locus Name</span></li>';			
			var currLociName = '';
			$.each(data.response, function(index, valueCard) {

				if(currLociName != valueCard.locusName){
					locusNameLi = locusNameLi+'<li data-locusName="' + valueCard.locusName + '"><span>' + valueCard.locusName + '</span></li>';
					currLociName = valueCard.locusName;

				}				
				if (valueCard.productId == selectProbeOtherVal) {
					selFlurofereName = valueCard.fluorophoreId;
					selLocusName = valueCard.locusName;
					valLociStart = valueCard.lociStart;
					valLociEnd = valueCard.lociEnd;
				}				
			});		
			
			$("#"+probparentId+" ul[name='locus-name']").append(locusNameLi);      	         		
					
		},
		error: function(error) {}
	});
	setTimeout(function() { 
		$('#'+probparentId+' #fluorophore-options ul li').each(function(){                             
			var selectedfluorophoreName = $(this).attr('data-optionvalue');                                 
			if(selFlurofereName == selectedfluorophoreName) {
				$(this).addClass('selected');
				activeFlurofereName = $(this).find('span').text();                   
			}
		});
		$("#"+probparentId+ " #fluorophore-options").find('.a-dropdown__placeholder').removeClass().addClass('a-dropdown-selected').text(activeFlurofereName);
		$("#"+probparentId+ " #fluorophore-options").find('.a-dropdown-selected').text(activeFlurofereName);

		$('#'+probparentId+' #locus-name-options ul li').each(function(){                             
			var selectedLocusName = $(this).attr('data-locusName');                                 
			if(selLocusName == selectedLocusName) {
				$(this).addClass('selected');
				activeLocusName = $(this).find('span').text();                   
			}
		});
		$("#"+probparentId+ " #locus-name-options").find('.a-dropdown__placeholder').removeClass().addClass('a-dropdown-selected').text(activeLocusName);
		$("#"+probparentId+ " #locus-name-options").find('.a-dropdown-selected').text(activeLocusName);

		$('#'+probparentId+' #loci-start').val(valLociStart);
		$('#'+probparentId+' #loci-end').val(valLociEnd);
            
    }, 10000);
	
}

function populateLociVal(selectLocusVal,getLocichromoAttrval,locusparentId){
	var locidata = {
		"action": "currentproductsforchromosome",
		"chromosome": getLocichromoAttrval
	};
	$.ajax({
		url: searchUserurlOrigin + '/quality/api/private/productcatalog/search',
		type: "POST",
		data: JSON.stringify(locidata),
		"headers": {
			"cache-control": 'no-cache',
			"x-application-id": xApplicationId,
			"x-country-code": xCountryCode,
			"x-preferred-language": xPrefLang,
			"x-id-token": jwtToken
		},
		contentType: "application/json",
		success: function(data) {		
			
			$.each(data.response, function(index, valueCard) {
				if(selectLocusVal == valueCard.locusName){
					$('#'+locusparentId+' #loci-start').val(valueCard.lociStart);
					$('#'+locusparentId+' #loci-end').val(valueCard.lociEnd);
				}						
                
			});      	         		
					
		},
		error: function(error) {}
	});
}
function populateLociAllVal(getchromoAttrval,probparentId){
	var locusdata = {
		"action": "currentproductsforchromosome",
		"chromosome": getchromoAttrval
	};
	$.ajax({
		url: searchUserurlOrigin + '/quality/api/private/productcatalog/search',
		type: "POST",
		data: JSON.stringify(locusdata),
		"headers": {
			"cache-control": 'no-cache',
			"x-application-id": xApplicationId,
			"x-country-code": xCountryCode,
			"x-preferred-language": xPrefLang,
			"x-id-token": jwtToken
		},
		contentType: "application/json",
		success: function(data) {
			
			$("#"+probparentId+" ul[name='locus-name']").empty();
			var newlocusNameLi = '<li data-locusName=""><span>Select a Locus Name</span></li>';
			$.each(data.response, function(index, valueCard) {
				newlocusNameLi = newlocusNameLi+'<li data-locusName="' + valueCard.locusName + '"><span>' + valueCard.locusName + '</span></li>';
			});		
			
			$("#"+probparentId+" ul[name='locus-name']").append(newlocusNameLi);      	         		
					
		},
		error: function(error) {}
	});

}
function populatePrimary() {
	$.ajax({
		url: searchUserurlOrigin + '/api/public/lookup/referencedata?language=en&referenceType=diseases',
		type: "GET",
		dataType: "json",
		"headers": {
			"cache-control": 'no-cache',
			"x-application-id": xApplicationId,
			"x-country-code": xCountryCode,
			"x-preferred-language": xPrefLang
		},
		contentType: "application/json",
		success: function(data) {
			$("ul[name='primary-application']").empty();
			$.each(data.response, function(index, valueCard) {
				if (valueCard.parentKey == undefined) {
					var primaryAppLi = '<li data-primaryApp="' + valueCard.key + '"><span>' + valueCard.value + '</span></li>';
					$("ul[name='primary-application']").append(primaryAppLi);
				}
			});
		},
		error: function(error) {}
	});
}

function populateSecondary(selectPrimaryKey,primaryAppId) {
	$.ajax({
		url: searchUserurlOrigin + '/api/public/lookup/referencedata?language=en&referenceType=diseases',
		type: "GET",
		dataType: "json",
		"headers": {
			"cache-control": 'no-cache',
			"x-application-id": xApplicationId,
			"x-country-code": xCountryCode,
			"x-preferred-language": xPrefLang
		},
		contentType: "application/json",
		success: function(data) {
			$("#"+primaryAppId+" ul[name='secondary-application']").empty();
			$.each(data.response, function(index, valueCard) {
				if (valueCard.parentKey == selectPrimaryKey) {
					var secondaryAppLi = '<li data-secondaryApp="' + valueCard.key + '"><span>' + valueCard.value + '</span></li>';
					$("#"+primaryAppId+" ul[name='secondary-application']").append(secondaryAppLi);
				}
			});
			$('#'+primaryAppId+ ' #secondary-application-options').removeClass('disabled').find('.a-dropdown__menu li').show();
		},
		error: function(error) {}
	});
}

function populateTeritary(selectSecondaryKey,secondaryAppId) {
	$.ajax({
		url: searchUserurlOrigin + '/api/public/lookup/referencedata?language=en&referenceType=diseases',
		type: "GET",
		dataType: "json",
		"headers": {
			"cache-control": 'no-cache',
			"x-application-id": xApplicationId,
			"x-country-code": xCountryCode,
			"x-preferred-language": xPrefLang
		},
		contentType: "application/json",
		success: function(data) {
			$('#'+secondaryAppId+' ul[name="teritary-application"]').empty();
			$.each(data.response, function(index, valueCard) {
				if (valueCard.parentKey == selectSecondaryKey) {
					var teritaryAppLi = '<li data-teritaryApp="' + valueCard.key + '"><span>' + valueCard.value + '</span></li>';
					$('#'+secondaryAppId+' ul[name="teritary-application"]').append(teritaryAppLi);
				}
			});
			$('#'+secondaryAppId+' #teritary-application-options').removeClass('disabled').find('.a-dropdown__menu li').show();
		},
		error: function(error) {}
	});
}
function globalCssFunction (){
    var urlLink = window.location.pathname;
    var stuff = urlLink.split('/');
    var substring = 'contact-us.html';

    var substringSearch = 'search-results.html';  

    var pageContent = document.getElementById("pageContent");
 	const responsivegrid = pageContent.querySelector('.responsivegrid');
 	const container = responsivegrid.querySelector('.container');

    for(var i=0; i<stuff.length; i++){
        if(stuff[i].includes(substring)){
            container.style.padding = '0px';
          	container.style.background = '#009cde';

        }
        else if(stuff[i].includes(substringSearch)){            
            if($('#section-contact-us-main-container').parents('#pageContent').nextAll(".a-spinner").length>0){
                $(this).each(function(index){
                    $('#section-contact-us-main-container').parents('#pageContent').nextAll(".a-spinner").addClass("searchspin");

                });
            }
        }
    }
}

window.onload = function() {
    globalCssFunction();
};

var btn = $('#back-to-top p');



btn.on('click', function(e) {    
  	
    e.preventDefault();  
    var container = $('.searchresults');
    var scrollTo = $('.o-search-res__results');

    // Calculating new position of scrollbar
    var position = scrollTo.offset().top - container.offset().top + container.scrollTop();

    // Setting the value of scrollbar       
    $('html,body').animate({scrollTop: position},'slow');
});

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

/*---IFU----*/
function downloadFile(filename, data) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;base64,' + data);
	element.setAttribute('download', filename);
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}

/* common download functionality of link */ 
function commonDownload(previousAppId) {
    var headerCountryCode = document.querySelector('input[name="x-country-code"]').value;
    var headerApplicationId = document.querySelector('input[name="x-application-id"]').value; 
    var downloadData = {
		"action": "downloadDocument",
    	"documentId": previousAppId +'.pdf',
        "type":"ifu"
    };

    $.ajax({
			url: searchUserurlOrigin + '/quality/api/public/lookup/getdocument',
			type: "POST",
			dataType: 'json',
			contentType: "application/json;charset=UTF-8",
			data: JSON.stringify(downloadData),
			"headers": {
				'x-country-code': headerCountryCode,
				'x-application-id': headerApplicationId,
				'Content-Type': 'application/json'
			},
			success: function(downloadResponse) {
				$('.loader-parent').hide();
				var encodeval = downloadResponse.response.attachmentBytes;
                const fileName = downloadResponse.response.downloadedDocumentId;
                const content = encodeval;
            	downloadFile(fileName, content);

			},
			error: function(error) {}
		});
}

$(document).ready(function() {
	$('#product-type-options').hide();
	$('#search-result h3, #search-result p, #search-result table').hide();	
    $('#search-btn').prop("disabled", true);	
    $('#search-btn').removeAttr("disabled");
    $('#order-number').parents('.fields').addClass('orderNumberfields').hide();
    $('#lot-number').parents('.fields').addClass('lotNumberfields');
	$('#product-type-options').find('ul li#field_label_product-type_1').addClass('selected');
	$('#instructions-for-use').parents('.container').addClass('parent-ifu');
    $('#search-result table').addClass('table-sortable');
    $('.table-sortable tr:first-child th, .table-sortable tr:first-child td').addClass('asc');
	$('#ifu-modal').wrap(' <div class="modal generic-modal" id="ifuModalNumber"><div class="modal-dialog modal-dialog-centered"><div class="modal-content generic-modal__content"><div class="modal-body generic-modal__content-body"></div></div></div></div>');
    $('<div class="modal-header generic-modal__header"><span class="generic-modal--close"><i aria-hidden="true" class="abt-icon abt-icon-cancel"></i></span></div>').insertBefore('#ifu-modal');
    $('#ifu-modal').closest('body').append('<div class="modal-backdrop show"></div>');
    $('#ifu-modal').closest('body').find('.modal-backdrop.show').hide();
	$('#ifuModalNumber').addClass('tooltip-modal');
	$('#instructions-for-use').parents('body').addClass('loader-body').prepend("<div class='loader-parent' style='display: none;'><em class='abt-icon abt-icon-spinner'></em></div>");

    $(document).on("click", ".tooltip-modal .generic-modal--close, #agree-continue-btn", function(e) {
			e.preventDefault();
			$('#ifuModalNumber').hide();
		});

    $('#searchBy-lotNumber-options .a-dropdown__menu li').click(function(){
        if($(this).attr('id') == 'field_label_searchBy-lotNumber_1') {
            $('.lotNumberfields').show();
			$('#order-number').val(' ');
            $('.orderNumberfields, #product-type-options').hide();
        } else if($(this).attr('id') == 'field_label_searchBy-lotNumber_2') {
            $('.orderNumberfields').show();
            $('#lot-number').val(' ');
            $('.lotNumberfields, #product-type-options').hide();
        } else if($(this).attr('id') == 'field_label_searchBy-lotNumber_3') {
            $('#product-type-options').show();
			$('#lot-number, #order-number').val(' ');
            $('.lotNumberfields, .orderNumberfields').hide();
        }
    });

commonSorting();

    $(document).on("click", ".downloadFile", function(e) {
		e.preventDefault();
		$('.loader-parent').show();
		let previousAppId = $(this).attr('id');
		commonDownload(previousAppId);
	});


});

/*---sort method of table----*/
function commonSorting() {
    $('#search-result .table-sortable thead th:not(:nth-child(2))').each(function(col) {
		var searchData = $(this);
		searchData.html(searchData.html().replace(/&nbsp;/g, ''));

        $(this).hover(
			function() {
				$(this).addClass('focus');

			},
			function() {
				$(this).removeClass('focus');
			}
		);

		$(this).click(function() {

			var sortOrder;
			if ($(this).is('.asc')) {
				$(this).removeClass('asc');
				$(this).addClass('desc selected');
				sortOrder = -1;
			} else {
				$(this).addClass('asc selected');
				$(this).removeClass('desc');
				sortOrder = 1;
			}

            var arrData = $('table').find('tbody >tr:has(td)').get();

			arrData.sort(function(a, b) {
				var val1 = $(a).children('td').eq(col).text().toUpperCase();
				var val2 = $(b).children('td').eq(col).text().toUpperCase();
				if ($.isNumeric(val1) && $.isNumeric(val2))
					return sortOrder == 1 ? val1 - val2 : val2 - val1;
				else
					return (val1 < val2) ? -sortOrder : (val1 > val2) ? sortOrder : 0;
			});
			$.each(arrData, function(index, row) {
				$('tbody').append(row);
			});
		});
	});
}

$("#document-lang-options ul.a-dropdown__menu li").sort(asc_sort).appendTo('#document-lang-options ul.a-dropdown__menu');
 //$("#debug").text("Output:");

// accending sort
function asc_sort(a, b){
        return ($(b).text()) < ($(a).text()) ? 1 : -1;    
    }

// decending sort
function dec_sort(a, b){
	return ($(b).text()) > ($(a).text()) ? 1 : -1;    
}
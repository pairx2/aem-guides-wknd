var searchUserurl = new URL($('#session-api-url').val());
var searchUserurlOrigin = searchUserurl.origin;
function updateActivejudges(tabsVal) {
    var activeJudgelist = new Array();
    activeJudgelist.push(["Row Id", "Judge Information", " Initiation Year", "Date Trained", " Organization, Country", "Applications Assessed", "Last Login Date", "Admin Actions"]);
    var table = $("<table />");
    var data;
	if (tabsVal == true) {
		data = {
		userInfo: {
			userGroup: [
				"Judge"
			],
			"active": true
		}
	}
	} else if (tabsVal == false) {
	data = {
		userInfo: {
			userGroup: [
				"Judge"
			],
			"active": false
		}
	}
	}
    $.ajax({
        url: searchUserurlOrigin + '/api/private/profile/search-users',
        type: 'POST',
        dataType: 'json',
		contentType: "application/json;charset=UTF-8", 
        data: JSON.stringify(data),
        "headers": {
            "x-application-id": xApplicationId,
            "x-country-code": xCountryCode, 
            "x-preferred-language": xPreferredLanguage,
			"x-id-token": getCookie('id.token'),
			"x-application-access-key": "admin1#Admin"
            
        },		
        success: function(dataRes) {
			$("#api-loader").hide();
            var columnCount = activeJudgelist[0].length;
            if (dataRes.errorCode == 0) {
				$('.tableloader').hide();
                $.each(dataRes.response, function(index, element) {
					var rowId;
					if(element.userInfo.userName != undefined){
						rowId = element.userInfo.userName;
                    }else {
                        rowId = "";
                    }
					var firstLastName;
                    if (element.userInfo.firstName != undefined && element.userInfo.lastName != undefined && element.userInfo.email != undefined) {
                        firstLastName = "<span class='lastName'>" + element.userInfo.lastName + "</span>"+',' + "<span class='firstName'>" + element.userInfo.firstName + "</span>" + "<br /><a href='mailto:" + element.userInfo.email + "'>" + element.userInfo.email + "</a><input type='hidden' value=" +element.userInfo.userName
						+" name='userName'/>";
                    } else {
                        firstLastName = "";

                    }
					var judgeInitiationyear;
                    if (element.userInfo.additionalProperties.judgeInitiationYear != undefined) {
                        judgeInitiationyear = element.userInfo.additionalProperties.judgeInitiationYear;
                    } else {
                        judgeInitiationyear = "";
                    }
                    var judgeDateTrained;
                    if (element.userInfo.additionalProperties.judgeDateTrained != undefined) {
                        var DateTrained = element.userInfo.additionalProperties.judgeDateTrained;
						var tempDate = new Date(DateTrained);
                        judgeDateTrained = [tempDate.getMonth() + 1, tempDate.getDate(), tempDate.getFullYear()].join('/');  
                    } else {
                        judgeDateTrained = "";
                    }


                    var judgeCountry, judgeOrg, judgeOrgCountry;
                    if (element.userInfo.additionalProperties.judgeOrganization != undefined) {
                        judgeOrg = element.userInfo.additionalProperties.judgeOrganization;

                    } else {
                        judgeOrg = "";
                    }
                    if (element.userInfo.additionalProperties.judgeCountry != undefined) {
                        judgeCountry = element.userInfo.additionalProperties.judgeCountry;

                    } else {
                        judgeCountry = "";
                    }
                    if (judgeCountry != "") {
                        judgeOrgCountry = judgeOrg + ', </br>' + judgeCountry;
                    } else {
                        judgeOrgCountry = judgeOrg;
                    }

                     var lastLoginDate;
                    if (element.userInfo.additionalProperties.lastLogin != undefined) {
						var datelogin = element.userInfo.additionalProperties.lastLogin;
						var tempDateDet = new Date(datelogin);
                        lastLoginDate = [tempDateDet.getMonth() + 1, tempDateDet.getDate(), tempDateDet.getFullYear()].join('/');
                    } else {
                        lastLoginDate = "";
                    }
                   var adminAction;
                    var applicationAssess = "<a href='#' class='applicationAsses'><em class='abt-icon abt-icon-expand'></em></a>";
                    if (tabsVal == true) {  
				      adminAction = "<div class='deactivate-acct'><a href='#' class='tooltip-list'><em class='abt-icon abt-icon-remove'></em><span class='tooltiptext'>Deactivate Account</span></a></div><div class='reset-acct'><a href='#' class='tooltip-list'><em class='abt-icon abt-icon-key'></em><span class='tooltiptext'>Reset Password</span></a></div>"
				    }
				
                   if (tabsVal == false) {
				     if (element.userInfo.additionalProperties.organizationStatus == "ACTIVE") {
					adminAction ="<div class='acctInactive'><em class='abt-icon abt-icon-remove'></em>ACCOUNT INACTIVE</div><div class='reactiveText'><a href='#'>Reactivate</a></div>";
				   }
                     else{
                           adminAction ="<div class='acctInactive'><em class='abt-icon abt-icon-remove'></em>ACCOUNT INACTIVE</div>";
                   }
				   }
                    activeJudgelist.push([rowId, firstLastName, judgeInitiationyear, judgeDateTrained, judgeOrgCountry, applicationAssess, lastLoginDate, adminAction]);


                });

                var row = $(table[0].insertRow(-1));

                for (var i = 0; i < columnCount; i++) {
                    var headerCell = $("<th />")
                    headerCell.attr("data-sortable", true);

                    headerCell.addClass('asc');
                    headerCell.html(activeJudgelist[0][i]);
                    row.append(headerCell);
                }

                //Add the data rows.
                for (var m = 1; m < activeJudgelist.length; m++) {
                    row = $(table[0].insertRow(-1));
                    for (var j = 0; j < columnCount; j++) {
                        var cell = $("<td />");
                        cell.html("<span>" + activeJudgelist[m][j] + "</span>");
                        row.append(cell);
                    }
                }

				if (tabsVal == true) {
					if ($('#admin-tools-tab #section-active-judges  #active-judges:eq(0) table').length == 0) {
						$('#admin-tools-tab #section-active-judges  #active-judges:eq(0)').append(table);
						

					}

				}

				if (tabsVal == false) {
					if ($('#admin-tools-tab #section-active-judges  #active-judges:eq(1) table').length == 0) {
						$('#admin-tools-tab #section-active-judges  #active-judges:eq(1)').append(table);
						
					}
				}
                $('#active-judges th:last-child').removeClass('asc');

                $('#active-judges th').each(function(col) {

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
                                if (val1.includes("/") && val2.includes("/")){
                                    var date1 = new Date(val1);
                                    var date2 = new Date(val2);
                                    return sortOrder == 1 ? date1 - date2 : date2 - date1;
                                }
                                else{
                                    return (val1 < val2) ? -sortOrder : (val1 > val2) ? sortOrder : 0;
                                }
                        });
                        $.each(arrData, function(index, rows) {
                            $('tbody').append(rows);
                        });
                    });
                });
                $('#active-judges th').each(function(index) {
                    $(this).addClass('column' + index);
                });
                $('.applicationAsses').closest('td').addClass('alignCenter');
            }
        },



        error: function(error) {
           
        }
    });
}
function populateOrganization(){
	$.ajax({
		  url: searchUserurlOrigin + '/api/private/eform/eforms?type=Organization',
		  type : "GET",
		   dataType: 'json',
		   contentType: "application/json",
		   "headers": {
				"x-application-id": xApplicationId,
				"x-country-code": xCountryCode, 
				"x-preferred-language": xPreferredLanguage,
				"x-id-token": getCookie('id.token'),
				"x-application-access-key": "admin1#Admin"
			},  		   
		  success: function(response) {
		  $.each(response.response.data, function(index, element) {
			  if(element.status=="ACTIVE"){
					$("ul[name='deactivate-organization-names']").append('<li id='+element.id+' data-hashcontent='+element._hashedContent+' ><span>'+element.name+'</span></li>');
			  }
			  else if(element.status=="INACTIVE"){
						$("ul[name='reactivate-organization-names']").append('<li id='+element.id+' data-hashcontent='+element._hashedContent+' ><span>'+element.name+'</span></li>');
			  }
		  });
		  },
		   error: function(error) {
			}
	   });
}    

function populateCountries(){
    $.ajax({
          url: searchUserurlOrigin + '/api/public/lookup/referencedata?language=en&referenceType=country',
          type : "GET",
          dataType: "json",
		   "headers": {
         "x-application-id": xApplicationId,
         "x-country-code": xCountryCode,
         "x-preferred-language": xPreferredLanguage
   },
          contentType: "application/json",
          success: function(response) {
              $.each(response.response, function(cIndex, cList){
                    var countryLi = '<li data-country="'+ cList.key +'"><span>'+cList.value+'</span></li>';
                    $("ul[name='country']").append(countryLi);                    
              });
            },
           error: function(error) {
            }
       });
}

$(document).ready(function() {

    $('#admin-tools-tab .tab-pane').each(function(index) {
        $(this).addClass('tabs' + index);
    });

    /* Admin table active judges tab */
    if (document.getElementById('active-judges')) {
         $('<div class="tableloader"><em class="abt-icon abt-icon-spinner"></em><p>Loading...</p></div>').insertAfter('.tab-pane.active #active-judges');
        $('<div class="tableloader"><em class="abt-icon abt-icon-spinner"></em><p>Loading...</p></div>').insertAfter('.tabs5 #active-judges');
        updateActivejudges(true);
    }

    $(document).on("click", ".tabs0",function(e) {
         $('.tab-pane.active .tableloader').show();
        $('#admin-tools-tab #section-active-judges  #active-judges:eq(0) .table-responsive').show();
        $('#admin-tools-tab #section-active-judges  #active-judges:eq(1) .table-responsive').hide();
        updateActivejudges(true);
    });
    $(document).on("click", ".tabs1",function(e) {
        $('.tabs5 .tableloader').show();
        $('#admin-tools-tab #section-active-judges  #active-judges:eq(0) .table-responsive').hide();
        $('#admin-tools-tab #section-active-judges  #active-judges:eq(1) .table-responsive').show();
        updateActivejudges(false);
    });
    
    $('#admin-tools-tab #section-active-judges  #active-judges:eq(0) table').wrap('<div class="table-responsive"></div>');
    $('#admin-tools-tab #section-active-judges  #active-judges:eq(1) table').wrap('<div class="table-responsive"></div>');  

	$(document).on("click", ".tabs2",function(e) {
		$('#admin-tools-tab #section-active-judges  #active-judges:eq(0) .table-responsive').hide();
		$('#admin-tools-tab #section-active-judges  #active-judges:eq(1) .table-responsive').hide();

	});
	$(document).on("click", ".tabs3",function(e) {
		$('#admin-tools-tab #section-active-judges  #active-judges:eq(0) .table-responsive').hide();
		$('#admin-tools-tab #section-active-judges  #active-judges:eq(1) .table-responsive').hide();

	});
	
	/* ADD Judge dropdown error message issue on focus */
    $('.a-dropdown__field').click(function(){
        $(this).parents('.a-dropdown').addClass('validation-require');
    }); 
    /* Add Organisation */
    if ($('#form-deactivate-organization')) {
        $('#form-deactivate-organization .a-dropdown__field').append('<ul class="a-dropdown__menu" name="deactivate-organization-names"></ul>');
        $(document).on("click", ".addJudgeAction, .manageOrgAction", function() { 
           populateOrganization();
        });
    }
    if ($('#form-reactivate-organization')) {
        $('#form-reactivate-organization .a-dropdown__field').append('<ul class="a-dropdown__menu" name="reactivate-organization-names"></ul>');
    }
    if ($('#HCECreateJudgeFormCommand .a-dropdown__field')) {
        $('#HCECreateJudgeFormCommand .a-dropdown__field').append('<ul class="a-dropdown__menu" name="deactivate-organization-names"></ul>');
    }
    // Country dropdown population
    $("#HCECreateJudgeFormCommand").find("form").addClass("addJudgeForm");
	$('#HCECreateJudgeFormCommand .addJudgeForm .columncontrol:eq(1)').find('.columncontrol__column:eq(0) .form-group').addClass('marginBtmNone');
    $('#HCECreateJudgeFormCommand .addJudgeForm .columncontrol:eq(1)').find('.columncontrol__column:eq(0)').addClass('errmsgAlignment');
	$('#form-reactivate-organization').find('.form-container .columncontrol:eq(0)').addClass('forNotesbtm');
    $(".addJudgeForm .columncontrol:eq(2)").addClass("judgeDropdowns");
    $(".judgeDropdowns .columncontrol__column:eq(1)").addClass("countryDropdown");
	$("#HCECreateJudgeFormCommand").find(".countryDropdown").find(".a-dropdown__field ul").remove();	
    $("#HCECreateJudgeFormCommand .countryDropdown .a-dropdown__field").append('<ul class="a-dropdown__menu" name="country"></ul>');
    $("#applicantCountry-options .a-dropdown__field").append('<ul class="a-dropdown__menu" name="country"></ul>');
    populateCountries();



    
   /*Deactivate Popup */
	$('#deactivate-account-popup').wrap(' <div class="modal generic-modal" id="deactivateaccount-popup"><div class="modal-dialog modal-dialog-centered"><div class="modal-content generic-modal__content"><div class="modal-body generic-modal__content-body"></div></div></div></div>');
	$('<div class="modal-header generic-modal__header"><span class="generic-modal--close" data-dismiss="modal" aria-label="Close"><i aria-hidden="true" class="abt-icon abt-icon-cancel"></i></span></div>').insertBefore('#deactivate-account-popup');
	$('#deactivate-account-popup').closest('body').append('<div class="modal-backdrop show"></div>');
	$('#deactivate-account-popup').closest('body').find('.modal-backdrop.show').hide();
	$(document).on("click", ".deactivate-acct a",function(e) { 
		e.preventDefault(); 
		 var fullName = $(this).closest('tr').find('.firstName').text() + ' ' + $(this).closest('tr').find('.lastName').text() ;
		var userName = $(this).closest('tr').find('input[name="userName"]').val();
		$('#deactivate-account-popup input[name="getuserName"]').val(userName);    
		$('#deactivate-account-popup #judge-account-id').text(fullName);   
		$('#deactivateaccount-popup').show();
		$('#deactivate-account-popup').closest('body').find('.modal-backdrop.show').show();
	});
	
	$('#assessments-completed-popup').wrap(' <div class="modal generic-modal" id="assessments-completed"><div class="modal-dialog modal-dialog-centered"><div class="modal-content generic-modal__content"><div class="modal-body generic-modal__content-body"></div></div></div></div>');
	$('<div class="modal-header generic-modal__header"><span class="generic-modal--close" data-dismiss="modal" aria-label="Close"><i aria-hidden="true" class="abt-icon abt-icon-cancel"></i></span></div>').insertBefore('#assessments-completed-popup');
	$('#assessments-completed-popup').closest('body').append('<div class="modal-backdrop show"></div>');
	$('#assessments-completed-popup').closest('body').find('.modal-backdrop.show').hide();
    $(document).on("click", ".applicationAsses",function(e) { 
        $(".loader-parent").show(); 
		e.preventDefault();
        $('#assessments-completed-table table').remove();
		$('#organization-country-name p').remove();
		$('#assessments-completed').show();
		$('#assessments-completed-popup').closest('body').find('.modal-backdrop.show').show();
        $('#section-assessments-completed-table').parent().addClass('assessmentCompleteParent');
        var rowId = $(this).parents('tr').find('td:nth-child(1) span').text()

        var parentTableName = document.querySelector('#assessments-completed-table');
        var headerKeys = ['Unique ID', 'Merit', 'Standout', "Judge's Score", "Avg. Judges' Score", 'Days in Review by Judge', 'Date Closed by Judge'];
        commonTableFormat(parentTableName, headerKeys);
        $('#assessments-completed-table').addClass('table-responsive tabs').children('table').addClass('table-sortable');
        $('.table-sortable thead th').addClass('asc');
        totalCount('/api/private/eform/eforms?type=AssessedApplicationReport&id='+ rowId, 'Assessed Application Report');
        commonAjax('/api/private/eform/eforms?type=AssessedApplicationReport&id='+ rowId, 'Assessed Application Report');
        commonSorting();
	});
	$('#admintoolTitle').parents('#login-container').addClass('adminToolsContainer');
	
	/*Reactivate Popup */
	$('#reactivate-account-popup').wrap(' <div class="modal generic-modal" id="reactivateaccount-popup"><div class="modal-dialog modal-dialog-centered"><div class="modal-content generic-modal__content"><div class="modal-body generic-modal__content-body"></div></div></div></div>');
	$('<div class="modal-header generic-modal__header"><span class="generic-modal--close" data-dismiss="modal" aria-label="Close"><i aria-hidden="true" class="abt-icon abt-icon-cancel"></i></span></div>').insertBefore('#reactivate-account-popup');	$(document).on("click", ".reactiveText a",function(e) {
		e.preventDefault(); 
		var fullName = $(this).closest('tr').find('.firstName').text() + ' ' + $(this).closest('tr').find('.lastName').text() ;
		var userName = $(this).closest('tr').find('input[name="userName"]').val();
		$('#reactivate-account-popup input[name="getuserName"]').val(userName);
		$('#reactivate-account-popup #judge-account-id').text(fullName);   
		$('#reactivateaccount-popup').show();
		$('#reactivate-account-popup').closest('body').find('.modal-backdrop.show').show();
	});
	
   /*Reset Password Popup */
	$('#reset-password-popup').wrap(' <div class="modal generic-modal" id="resetpassword-popup"><div class="modal-dialog modal-dialog-centered"><div class="modal-content generic-modal__content"><div class="modal-body generic-modal__content-body"></div></div></div></div>');
	$('<div class="modal-header generic-modal__header"><span class="generic-modal--close" data-dismiss="modal" aria-label="Close"><i aria-hidden="true" class="abt-icon abt-icon-cancel"></i></span></div>').insertBefore('#reset-password-popup');
    $(document).on("click", ".reset-acct a",function(e) {
        e.preventDefault();
		var fullName = $(this).closest('tr').find('.firstName').text() + ' ' + $(this).closest('tr').find('.lastName').text() ;
		var userName = $(this).closest('tr').find('input[name="userName"]').val();
		$('#reset-password-popup input[name="getuserName"]').val(userName);
		$('#reset-password-popup #judge-account-id').text(fullName);   

       var userEmail =  $(this).closest('tr').find('td:nth-child(2) a').text();
        var data = {
           "email": userEmail
        };      
        $.ajax({
              url: searchUserurlOrigin + '/api/public/profile/forgot-password',
              type : "POST",
               dataType: 'json',
               contentType: "application/json;charset=UTF-8", 
               data: JSON.stringify(data),
               "headers": {
                    "x-application-id": xApplicationId,
                    "x-country-code": xCountryCode, 
                    "x-preferred-language": xPreferredLanguage,
                    "x-id-token": getCookie('id.token'),
					"x-application-access-key": "admin1#Admin"
                    
                },            
              success: function(response) {

                if (response.errorCode == 0) {
                      $('#resetpassword-popup').show();
                      $('#reset-password-popup').closest('body').find('.modal-backdrop.show').show(); 
                 }

              },
               error: function(error) {
                }
           });

    });

   $(document).on("click", '.generic-modal div[data-dismiss="modal"], .generic-modal--close',function(e) { 
        e.preventDefault();
        $(this).closest('.generic-modal').hide();
        $('.modal-backdrop.show').hide();
    });	

	$(document).on("click", "#organization-deactive", function(e) {
		e.preventDefault();
		var selectedOrg = document.querySelector('ul[name="deactivate-organization-names"] .selected').getAttribute('data-hashcontent');
		var selectedOrgID = document.querySelector('ul[name="deactivate-organization-names"] .selected').getAttribute('id');
		var data = {
			type: "Organization",
			id: selectedOrgID,
			_hashedContent: selectedOrg,
			status: "INACTIVE"
		}
		$.ajax({
			url: searchUserurlOrigin + '/api/private/eform/eforms',
			type: "POST",
			dataType: 'json',
			contentType: "application/json;charset=UTF-8",
			data: JSON.stringify(data),
			"headers": {
				"x-application-id": xApplicationId,
				"x-country-code": xCountryCode,
				"x-preferred-language": xPreferredLanguage,
				"x-id-token": getCookie('id.token'),
				"x-application-access-key": "admin1#Admin"
			},
			success: function(response) {

				if (response.errorCode == 0) {
					window.location.href = "/en/secure/administration/tools.html";
				}

			},
			error: function(error) {}
		});


	});
});
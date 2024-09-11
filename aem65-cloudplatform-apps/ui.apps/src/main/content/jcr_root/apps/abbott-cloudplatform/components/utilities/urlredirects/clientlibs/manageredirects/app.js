(function ($, $document) {
  "use strict";

    let ui = $(window).adaptTo("foundation-ui");
	ui.wait();
     $(document).ready(function () {
		 ui.clearWait();
			getUrlParameter();
			getVersion();
			validateRules();

  		$('#search-url-redirect-rule').click(function(e) {
				e.preventDefault();
				let searchText = $('#redirect-search-box').val();
				window.location.href = $(this).attr('href') +'q=' + searchText;
				$('#redirect-search-box').val(searchText);
 		 });

         $('.search-close').click(function(e) {
				e.preventDefault();
                let searchText = $('#redirect-search-box').val();
             	if(searchText !==''){
					$('#redirect-search-box').val('');
					urlRedirect();
             }
 		 });

            $('#redirect-search-box').keypress(function(event){
                let keycode = (event.keyCode ? event.keyCode : event.which);
                if(keycode == '13'){
                    let searchText = $(this).val();
                    window.location.href = $('#search-url-redirect-rule').attr('href') +'q=' + searchText;
               }
         });    

		//Checking status of rules applied
		let status_val = $('#status-value').val();
         if(status_val === "new" || status_val === "promoted" ){
			$('#save').attr('disabled', true);
			$('#apply').attr('disabled', true);
			$('#promote').attr('disabled', true);
         }
		else if(status_val === "edited"){
            $('#apply').attr('disabled', true);
            $('#promote').attr('disabled', true);
         }
         else if(status_val === "saved"){
            $('#save').attr('disabled', true);
            $('#promote').attr('disabled', true);
         }
         else if(status_val === "applied"){
			$('#save').attr('disabled', true);
			$('#apply').attr('disabled', true);
         }

        });

		function getUrlParameter(){
			let path = window.location.href;
            let paramString = path.split('?')[1];
            let queryString = new URLSearchParams(paramString);
			for (let pair of queryString.entries()) {
                if(pair[0] === 'q'){
					$('#redirect-search-box').val(pair[1]);
                }
            }
		}

		function urlRedirect(){
            let path = window.location.href;
            let paramString = path.split('?')[0];
            window.location.href= paramString;
        }

		
		 function getVersion(){
             let ruleVersion = $('#rule-version').attr('data-version');
             if(ruleVersion){
                 let  values=ruleVersion.split('.');
                 let  versionNumber=values[0];
                 $('#rule-version').html(versionNumber);
             }
        }

        function validateRules() {
            let actionPath = $('#fetch-url').val() + ".fetch.html";
            let resourcePath = $('#fetch-url').attr('data-path');
			ui.wait();
            $.ajax({
                url: actionPath,
                data: {
                    path: resourcePath
                },
                type: "GET"
            })
            .success(function(response) {
                handleValidateSuccess(response);
            })
            .fail(function(status) {
                ui.alert("Oops!! Something went wrong. Please contact platform team.",'error');
            }).always(function(){
                  ui.clearWait();
            });
        }

        function overwriteFromEsl() {
            let actionPath = $('#fetch-url').val() + ".overwrite.html";
            let resourcePath = $('#fetch-url').attr('data-path');
             ui.wait();
            $.ajax({
                url: actionPath,
                data: {
                    path: resourcePath
                },
                type: "GET",
                async: true
            })
            .success(function(response) {
                handleValidateSuccess(response);
            })
            .fail(function(status) {
                 ui.alert("Oops!! Something went wrong. Please contact platform team.",'error');
            }).always(function(){
                ui.clearWait();
            });
        }

        function handleValidateSuccess(response) {
            let errorCode = JSON.parse(response).errorCode;
            let message = JSON.parse(response).message;
            let state = JSON.parse(response).state;
            if (state === 'overwritten' && errorCode === 0) {
                urlRedirect();

            } else if (state === 'outdated' && errorCode === 0) {

                let actions = [
                        {text: 'No'}, {text: 'Yes', warning: true, handler: overwriteFromEsl}
                    ];
                ui.prompt("Updates Available", message, 'notice', actions);
            }
        }

    function performImport(){
        let $form = $('.cq-dialog-upload').closest('form');
        let data = new FormData($form[0]);
		ui.wait();
		$.ajax({
            url: $form.attr('action'),
            type: "POST",
            data: data,
            cache: false,
            contentType: false,
            processData: false,
        })
        .success(function (response /*json response from the Sling POST servlet*/) {
            let status= JSON.parse(response).status;
            let errorCode = JSON.parse(response).errorCode;
            if (status === true && errorCode === 0) {
                 let actions = [{text: 'OK', primary: true, handler: urlRedirect}];
                 ui.prompt("Import Status", "Rules imported successfully", 'success', actions );
            }
            else if(status === true && errorCode === 206){
                let actions = [{text: 'OK', primary: true, handler: urlRedirect}];
                ui.prompt("Import Status", "<b>Rules imported partially</b>" + "<p>" + JSON.parse(response).message + "</p>", 'info', actions );
            }
            else {
                ui.alert("Import failed!!",JSON.parse(response).message,'error');
            }
        })
        .fail(function (status) {
            ui.alert("Some error occured",'error');
        }).always(function(){
            ui.clearWait();
        });
    }	
	
	function performStateChange() {
		let stateChangeRuleForm = "#state-change-rule-properties-form";
		let $form = $(stateChangeRuleForm);
		let data = $form.serialize();
		$.ajax({
			url: $form.attr('action'),
			type: "POST",
			data: data,
			cache: false
		})
		.success(function (response) {
			if($(".rules-state-info").html() !== "EDITED" ) {
				urlRedirect();
			}
		})
		.fail(function (response) {
			ui.notify("Error", "Operation failed!!", 'error');
		});
	}

		//Reorder operation
		
		[
        
			'coral-table:beforeroworder'
		].forEach(function(eventName) {
            $document.on(eventName, '#edit-redirect-coral-table', function(e) {
            if(e.type=='coral-table:beforeroworder') {
              let postUrl =  e.detail.row.getAttribute('data-path');
          	  let rowIndex = e.detail.row.rowIndex;
          	  let beforeRow = e.detail.before;
          	  let beforeIndex;
              if(!beforeRow) {
        		  beforeIndex = $('#edit-redirect-coral-table').get(0)._items.length + 1;
        	  } else {
        		  beforeIndex = e.detail.before.rowIndex;
        	  }

			  let $form = $('#save-url-redirects');
			  $form.attr('action',postUrl);
              let data = $form.serialize();
              let nextIndex = beforeIndex - 1;
			  let page= parseInt($('#page-size').val());
              let pageNumber = $(".page_number").attr("data-pageNum");
              if (!isNaN(pageNumber)) {
                pageNumber = parseInt(pageNumber);
              } else {
                pageNumber = 1;
              }           
              let nextOrder = (pageNumber-1)*page;
              if(rowIndex == beforeIndex || rowIndex == nextIndex) {
            	  return false;
              } 
			  else if(rowIndex < nextIndex) { 
            	  nextIndex = nextIndex - 1;
              }  
              let order = parseInt(nextIndex) + nextOrder;
              data += ":order=" + order;
              $.ajax({
                    url: $form.attr('action'),
                    type: "POST",
                    data: data,
                    async: false
                })
				.success(function (response) {
					performStateChange();
				})
				.fail(function (response) {
					ui.notify("Error", "Operation failed!!", 'error');
				});
            }
        });
      });
	  
	    //Import validation
		
		$(document).on("click", ".cq-dialog-upload", function (e) {
        e.preventDefault();
        let fileExtension = ['csv'];
        if ($.inArray($('#redirect-import-ctrl').val().split('.').pop().toLowerCase(), fileExtension) == -1) {
            if($('#redirect-import-ctrl').val().length){
                ui.alert("Incorrect file type", "Please use only" + " " + fileExtension.join(', ').toUpperCase() +" " + "file type",'info');
            }
            else {
                ui.alert("No file chosen", "Please choose a file to import.",'info');
            }
        }
		else {
            let actions = [
                    {text: 'Yes', warning: true, handler: performImport},
                    {text: 'No'}
                  ];
		     ui.prompt("Would you like to import?", "You are about to import an external file, this will override all the existing rules for this site. Are you sure you want to import the file?", 'warning', actions);    
        }

        return false;
    });

    //Save, Apply and Promote operations
	
    $(document).on("click", ".redirect-rule-button", function (e) {
       e.preventDefault();
       ui.wait();
       let $form = $('.esl-form');
       let path = $(this).attr('data-path');
       let formAction = $form.attr('action');
       let actionPath = formAction.replace('selector', path);
       $(this).attr("disabled", true);
       let resourcePath = $('#resource-value').val();

	   $.ajax({
          url: actionPath,
          data: {path: resourcePath },
          type: "GET"
        }).success(function (response){
              let status =JSON.parse(response).status;
              let message = JSON.parse(response).message;
              if(status === true){
                 let actions = [{text: 'OK', primary: true, handler: urlRedirect}];
                 ui.prompt("Action successful", message, 'success', actions );
              }
              else {
                  let actions = [{text: 'OK', primary: true, handler: urlRedirect}];
                  ui.prompt("Action failed", message, 'error', actions );
              }
          })
          .fail(function (status) {
              ui.alert("Oops!! Something went wrong. Please contact platform team.",'error');
          }).always(function(){
                  ui.clearWait();
          });
    });
})($, $(document));
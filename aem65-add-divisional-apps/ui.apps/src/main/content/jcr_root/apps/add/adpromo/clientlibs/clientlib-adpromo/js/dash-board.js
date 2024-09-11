
$(document).ready(function(){  

    if($("#dash-board").length > 0) {
        $(".pending-request-table,.submitted-request-table,.approved-request-table,.rejected-request-table,.pendingHead,.change-req-count").hide()
        loadTabTableData('submittedrequest','.submitted-request-table');   
        loadTabTableData('recentlyapproved','.approved-request-table'); 
        loadTabTableData('recentlyrejected','.rejected-request-table');
        var groups = localStorage.getItem("groups");
        if(groups.includes('-Global')){
            $(".pendingHead").show();
            $(".change-req-count").show();
            loadTabTableData('pendingreview','.pending-request-table');
        }
    }	
});

function loadTabTableData(actionName,tableName) {    
    $.ajax({
        url: searchUserurlOrigin + '/quality/api/private/productcatalog/changerequest',
        type: "POST",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify({action: actionName}),
        "headers": {
            "x-application-id": xApplicationId,
            "x-country-code": xCountryCode,
            "x-preferred-language": xPrefLang,           
            "x-id-token": jwtToken
        },
        success: function(responseVal) {                

            if(responseVal.errorCode == 400){
                $(tableName).hide();
            }
            if (responseVal.errorCode == 0) {
                $(".loader-parent").hide();
                if(actionName == "pendingreview"){
                    $(".change-req-count").html("You have "+ (responseVal.response.length)+" pending change request(s) to review.")
                }
                else{
                    $("#inbox-table p.submitt-req-count,#approved-table p,#rejected-table p").hide();
                }
                var table = $(tableName+ " tbody");
                $.each( responseVal.response, function( index, element ){                    
                    var tr = $('<tr/>');
                    
                    if( element.submitterName != undefined){
                        tr.append('<td>' +element.submitterName+ '</td>');
                    }
                    else{
                        tr.append('<td></td>').hide();
                    } 
                    if( element.productName != undefined){
                        tr.append('<td>' +element.productName+ '</td>');
                    }
                    else{
                        tr.append('<td></td>').hide();
                    } 
                    if( element.changeId != undefined){
                        tr.append('<td>' +element.changeId+ '</td>');
                    }
                    else{
                            tr.append('<td></td>').hide();
                    }  
                    if( element.changeType != undefined){
                        tr.append('<td>' +element.changeType+ '</td>');
                    }
                    else{
                            tr.append('<td></td>').hide();
                    }  
                    if( element.lastModifiedDate != undefined){
                        tr.append('<td>' +element.lastModifiedDate+ '</td>');
                    }
                    else{
                            tr.append('<td></td>').hide();
                    }
                    if(actionName == "submittedrequest"){

                        if (element.changeId != undefined){
                            tr.append('<td><a href="/secure/product/request/review" class="link-alt" id="review-req-change" changeid="'+element.changeId+'" submitter="'+element.submitterName+'" changeType="'+element.changeType+'" role="submittedReq">REVIEW</a></td>' );
                        }
                        else{
                                tr.append('<td></td>').hide();
                        }
                    }else if(actionName == "pendingreview"){

                        if (element.changeId != undefined){
                            tr.append('<td><a href="/secure/product/request/review" class="link-alt" id="review-req-change" changeid="'+element.changeId+'" submitter="'+element.submitterName+'" changeType="'+element.changeType+'" role="pendingReview">REVIEW</a></td>' );
                        }
                        else{
                                tr.append('<td></td>').hide();
                        }
                    }
    
                    table.append(tr); 
                    $(".link-alt").focus(function(){
                        var reviewUrl = $(this).attr("href");
                        localStorage.setItem("reviewUrl", reviewUrl);
                        var changeId = $(this).attr("changeid");
                        var submitter = $(this).attr("submitter");
                        var type = $(this).attr("changeType");
                        localStorage.setItem("changeid", changeId);
                        localStorage.setItem("submitter", submitter);
                        localStorage.setItem("changetype", type);
                    }); 
                    
                }); 
                $(tableName).show();
            }                 
        },
        error: function(error) {}
    });
}
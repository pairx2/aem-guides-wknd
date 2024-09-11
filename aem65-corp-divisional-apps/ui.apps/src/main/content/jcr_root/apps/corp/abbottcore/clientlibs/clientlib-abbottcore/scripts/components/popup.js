/**********************************
Popup Experience Fragment
**********************************/

$(document).ready(function () {
	
    var token = getCookie("id_token");	
    var searchUserurls = new URL($("#session-api-url").val());	
    var searchUserurlOrigins = searchUserurls.origin;	
    var getDocument = "/api/private/lookup/getdocument";

    /* Site leaving popup to support container instead of layout container */
    let siteLeavingSection = $('#site-leaving-popup').length && $('#site-leaving-popup').find('.columncontrol .container');//.addClass('a-container');
    if (siteLeavingSection.length && isOnPublish()) {
        siteLeavingSection.replaceWith($('<section class="a-container">' + siteLeavingSection.html() + '</section>'));
        siteLeavingSection.find('.columncontrol__column').addClass('a-container__column');
    }

    // Close the site leaving popup when "Yes" is clicked to confirm the redirect by user
    let siteLeavingModal = $('#site-leaving-popup-content');
    if (siteLeavingModal.length && isOnPublish()) {
        $(document).on('click', "#siteLeavingPopupFragmentPathModal div[data-btn-type='continue'] .btn", function () {
            $("#siteLeavingPopupFragmentPathModal div[data-dismiss='modal']")[0].click();
        });
    }
	
    /*Pending photo popup */
    $('#section-approve-reject-popup #reject-comments').parents('.fields').hide();
    $('div#approveReject .form-container').append('<a href="#" class="closeIcon">×</a>');
    $('.closeIcon').click(function(e) {
        e.preventDefault();
        $('#section-approve-reject-popup').hide();
        $('#section-approve-reject-popup').parents('body').find('.abbott-wrapper').removeClass('setZindex');
    });
    
	
    $(document).on("click", "#viewPhoto", function(e) {
        e.preventDefault();
        var documentID = $(this).parents('tr').find('input#documentID').val();
        var userName = $(this).parents('tr').find('input#userName').val();

        $('#section-approve-reject-popup').find('input#user-name').val(userName);

        var getapprovalAction;
        getapprovalAction = {
            "action": "download",
            "documentId": documentID,
            "type": "photoapproval"
        };
        $.ajax({
            url: searchUserurlOrigins + getDocument,
            datatype: "json",
            type: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-Country-Code": $("input[name='x-country-code']").val(),
                "X-Application-Id": $("input[name='x-application-id']").val(),
                "x-Preferred-language": $("input[name='x-preferred-language']").val(),
                "x-id-token": token,
            },

            data: JSON.stringify(getapprovalAction),
            beforeSend: function() {
                setTimeout(function() {
                    toggleLoadingSpinner();
                }, 10);
            },
            success: function(photoApprovalresponse) {
                toggleLoadingSpinner();
                var photoBytes = photoApprovalresponse.response.attachmentBytes;
                $('#approveReject').find('.formcontainer .imgSize').remove();
                $('#approveReject').find('.formcontainer .options').before("<img src='" + `data:image/png;base64,${photoBytes} ` + "' class='imgSize'/>");
                $('#section-approve-reject-popup').parents('body').find('.abbott-wrapper').addClass('setZindex');

                $('#section-approve-reject-popup').show();
            }
        });

    });



    $('#photo-options li').click(function(indexval) {
        var dataoptionValue = $(this).attr('data-optionvalue');
        if (dataoptionValue == 'APPROVE') {
            $('#section-approve-reject-popup #reject-comments').parents('.fields').hide();
          

        } else if (dataoptionValue == 'REJECT') {
            $('#section-approve-reject-popup #reject-comments').parents('.fields').show();
           

        }
    });	
	
});


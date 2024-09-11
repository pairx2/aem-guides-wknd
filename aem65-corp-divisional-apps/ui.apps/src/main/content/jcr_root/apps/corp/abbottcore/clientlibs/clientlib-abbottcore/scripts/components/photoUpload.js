/**********************************
Photo Upload
**********************************/
$(document).ready(function() {
    $('#uploadBtn').attr('disabled', true);
    var tokenns = getCookie("id_token");
    var searchUserurls = new URL($("#session-api-url").val());

    var searchUserurlOrigins = searchUserurls.origin;
    $('#fileTxt').attr('disabled', true)
    var fileName,binaryfile;

    $(document).on("click", ".browse", function() {
        var file = $(this)
            .parents('#photo_upload')
            .find("#photoUpload");
        file.trigger("click");
        $('#spnDocsuccessMsg').hide();
        $("#fileTxt").val('');
    });
    $('input[type="file"]').change(function(e) {

        fileName = e.target.files[0].name;
		binaryfile = e.target.files[0];
        $("#fileTxt").val(fileName);
        $('#uploadBtn').attr('disabled', true);        
        var extension = $(this).val().split('.').pop().toLowerCase();
		if(extension == 'gif'){
           extension = 'jpg';
       }
        var validFileExtensions = ['jpeg', 'jpg', 'png', 'gif'];

        //Check file extension in the array.if -1 that means the file extension is not in the list. 
        if ($.inArray(extension, validFileExtensions) == -1) {
            $('#spnDocMsg').text("Please upload only jpg, jpeg, png, gif file").show();
            // Clear fileuload control selected file
            $("#fileTxt").val('');
            //Disable Submit Button
            $('#uploadBtn').attr('disabled', true);
        } else {
            // Check and restrict the file size to 32 KB.
            var MAX_FILE_SIZE = 3 * 1024 * 1024; // 5MB
            if ($(this).get(0).files[0].size > MAX_FILE_SIZE) {
                $('#spnDocMsg').text("Max allowed file size is 3 MB").show();
                // Clear fileuload control selected file
                $("#fileTxt").val('');
                //Disable Submit Button
                $('#uploadBtn').attr('disabled', true);
            } else {
                //Clear and Hide message span
                $('#spnDocMsg').text('').hide();
            }
        }

        if ($('#spnDocMsg').text().length < 1) {
            var photoDet = {
                "uid": sessionStorage.getItem('uid'),
                "fileExtension": extension
            };

            $.ajax({
                url: searchUserurlOrigins + '/api/private/profile/signed-url',
                datatype: "json",
                type: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-Country-Code": $("input[name='x-country-code']").val(),
                    "X-Application-Id": $("input[name='x-application-id']").val(),
                    "x-Preferred-language": $("input[name='x-preferred-language']").val(),
                    "x-id-token": tokenns,
                },

                data: JSON.stringify(photoDet),
                success: function(response) {
                    localStorage.setItem('signedUrl', response.response.signedUrl);
                    $('#uploadBtn').attr('disabled', false);
                }
            });

        }
    });

    $(document).on("click", "#uploadBtn", function() {

		var settings = {
			"url":  localStorage.getItem('signedUrl'),
			"method": "PUT",
			"timeout": 0,
			"headers": {
			"x-application-id": $("input[name='x-application-id']").val(),
			"x-country-code": $("input[name='x-country-code']").val(),
			"x-preferred-language": $("input[name='x-preferred-language']").val(),
			"x-id-token": tokenns,
			"Content-Type": "image/jpeg"
		},
		"data": binaryfile,
		processData: false
		};

		$.ajax(settings).done(function (response) {
			$('#spnDocsuccessMsg').show();
		});

    });




});
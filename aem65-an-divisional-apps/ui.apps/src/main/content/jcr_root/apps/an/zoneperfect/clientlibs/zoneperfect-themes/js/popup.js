$(document).ready(function () {
    $(document).on('click', function (event) {
            if ($(event.target).parent().attr('data-redirect-confirm') == 'true' || $(event.target).attr('data-redirect-confirm') == 'true') {
                if($('#siteLeavingPopupFragmentPathModal')) {
                    $('#siteLeavingPopupFragmentPathModal').css('display','block');
                    $('.modal-backdrop').css('display','block');
                    $('body').css({'overflow-y':'hidden','padding-right':'17px'});
                }
                setTimeout(() => {
                    if($('#siteLeavingPopupFragmentPathModal .button')) {
                        $(document).on('click','#siteLeavingPopupFragmentPathModal .button', function () {
                            let getAttrVal = $('#siteLeavingPopupFragmentPathModal .button > div').attr('data-btn-type');
                             if(getAttrVal && getAttrVal == 'continue') {
                                $('#siteLeavingPopupFragmentPathModal').css('display','none');
                                $('.modal-backdrop').css('display','none');
                                $('body').css({'overflow-y':'scroll','padding-right':'0'});
                             }
                        });
                    }
                 },100);
            }  
    })
});




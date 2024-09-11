/**
 * content-catalogue
 **/
$(document).ready(function () {
    let id_length=$('#id-length').val()
    if($('#e-lear-redirect').length>0){ $('body').addClass('e-learning-redirect');}
    $(document).on('click', '.e-learning-redirect a', function() {
        let clicked_id = $(this).attr('id');
        !clicked_id && (clicked_id = $(this).closest('[id]').attr('id'));
        let clicked_id_trim = '';
        if(clicked_id){
          if(clicked_id.includes('-')){
            clicked_id_trim=clicked_id.substring(0, clicked_id.indexOf("-"))
          } else{
              clicked_id_trim=clicked_id;
          }
        }
  
        if(clicked_id_trim.length> ((id_length)?id_length:20)){
        setItemLocalStorage('launchURL', clicked_id_trim, true);
        }
  
    })
  })

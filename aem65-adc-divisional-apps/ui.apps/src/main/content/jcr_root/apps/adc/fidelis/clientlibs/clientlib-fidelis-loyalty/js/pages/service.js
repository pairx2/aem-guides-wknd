/**
 * SERVICE MATERIAL - PAGE
 **/

$(document).ready(function(){
  if($('#serviceMaterialCards').length > 0){
    serviceCardsButton('serviceMaterialCards');
  }
})

/**
 * @function
 * Summary: Function to append download icon in service materials card
 */
function serviceCardsButton(servicardComponentId){
  const serviceCards = $('#'+servicardComponentId);
  serviceCards.find('.cmp-download').each(function(){
    let downloadLink = $(this).find('.cmp-download__title-link').attr('href');
    $(this).prepend('<a href="'+ downloadLink +'" class="abt-icon abt-icon-download1"></a>');
  })

  // set equal height for Cards within .conatiner > .row
  setCardEqualHeight();
}
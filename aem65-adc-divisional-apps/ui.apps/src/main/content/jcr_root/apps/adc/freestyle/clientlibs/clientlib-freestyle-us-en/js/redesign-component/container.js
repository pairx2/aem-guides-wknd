/**
 * Container - COMPONENT
 * Container V1 ~ restrict content to 512 character 
**/

$(function () {
    const containerV1 = '.a-container.a-container--redesign.a-container--v1';
    const textSelector = `${containerV1} .columncontrol__column:last-child  .text`;
    const textCount = $(`${textSelector} p`)?.text()?.length;
    const maxCount = 512;
    if (textCount >= maxCount) {
    	 $(`${textSelector} p`)?.html($(`${textSelector} p`)?.html()?.substr(0,maxCount) + ' [...]');
    }

    
    $("[id^='us-redesign--aline-center-']")?.each(function() {
        const elm = $(this);
        elm?.find('.a-container__column').each(function() {
         const colElm = $(this);
         if (colElm?.is(':empty') || colElm?.children()?.length == 0){
            colElm.addClass('d-none d-lg-block');
         } 
        });
    });

});

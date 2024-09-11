import { copyTextToClipBoard } from '../utilitybox/html';

/*
    On click of color code links, text will be copied to clip Board.
    Copy to ClipBoard function is already defined in html utility box component which is imported.
*/
let updateColorPalette: any;

$('#stg-demo-iframe').contents().find('body').on('click', '#stg-colors .card-footer > a', (e) => {    
    e.preventDefault();
    let textToCopy = $(e.target).html().trim();
    copyTextToClipBoard(textToCopy);
    $(e.target).html('<i class="fa fa-check" aria-hidden="true"></i><span class="text-success">Copied</span>');
    setTimeout(() =>{  $(e.target).html(textToCopy) }, 1000);
});


$('#stg-levelone-ul').on("click", '#stg-v-colors-default', function(e) {
    updateColorPalette();
});

updateColorPalette = () => {
    $('#stg-demo-iframe').contents().find('body .stg-color-card').each((i, e) => {
        let sassVar = $(e).attr('data-sass-var');
        let hexCode = $(e).attr('data-hex');
        let title = $(e).attr('data-title');
        let clrCardTmplate = $($('#stg-demo-iframe').contents().find('body #stg-clr-card-tmplt').html().trim());
        clrCardTmplate.find('.card-body').css('background-color', hexCode).end()
        .find('.stg-clr-sassvar code').html(sassVar).end()
        .find('.stg-clr-hex code').html(hexCode).end()
        .find('.card-header').html(title);
        $(e).addClass('col-3').append(clrCardTmplate);
    });
};
export { updateColorPalette }

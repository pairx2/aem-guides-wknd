$('#stg-utility-box > ul a').click((e) => {
    let clickedOn = $(e.target).html().trim();
    $('#stg-utility-box > ul a').removeClass('active');
    $(e.target).addClass('active');
    $('#stg-util-body > div').hide();
    
    if(clickedOn == 'Accessibility') {
        $('#stg-util-b-accessibility').show();
    } else if(clickedOn == 'HTML') {
        $('#stg-util-b-html').show();
    } else if(clickedOn == 'Knobs') {
        $('#stg-util-b-knobs').show();
    }
    e.preventDefault();
});

// Minimize/maximize utility box
$('.restore-btn').click( () => {
    var utilityBoxEle = $('#stg-utility-box');
    var demoBoxEle = $('#stg-demo-box');
    if(utilityBoxEle.hasClass('restore-utility')) {
        utilityBoxEle.removeClass('restore-utility');
        demoBoxEle.removeClass('stg-demo-box-100-h');
    } else {
        utilityBoxEle.addClass('restore-utility');
        demoBoxEle.addClass('stg-demo-box-100-h');
    }
});

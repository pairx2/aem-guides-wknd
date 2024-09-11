/**********************************
Card Component
**********************************/
$(function () {
    const imgPath = window.screen.width < 767 ? 'play-btn-icon-MOB' : 'play-btn-icon';
    //js to acheive
    $('.a-video__player-source').attr('poster', '/content/dam/an/ensure-com/' + imgPath + '.png');
});
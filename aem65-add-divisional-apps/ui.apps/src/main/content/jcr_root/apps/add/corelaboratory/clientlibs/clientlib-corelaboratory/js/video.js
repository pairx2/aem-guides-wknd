$("video").attr('muted', true);
$('video').attr('loop', 'loop');
try{
  $('video').load();
}catch(e) {}

jQuery(".a-video__player-source").prop('muted', true);
setTimeout(function () {
    $(".a-video__player-source").removeAttr('controls');
  }, 100);

  $('body').on('click', '.generic-modal--close', function (event) {
    var iframeEle = $(this).closest('.modal-dialog').find('iframe');
    if (iframeEle.length < 1) { return; }
    iframeEle = iframeEle[0];
    var iframeSrc = iframeEle.src;
    iframeEle.src = '';
    iframeEle.src = iframeSrc;
  });
  
  $(document).on('click', '.generic-modal', function (e) {
    if ($(e.target).closest('.modal-content').length > 0 || $(e.target).hasClass('modal-content')) {
      return;
    }
    var iframeEle = $(this).find('iframe');
    if (iframeEle.length < 1) { return; }
    iframeEle = iframeEle[0];
    var iframeSrc = iframeEle.src;
    iframeEle.src = '';
    iframeEle.src = iframeSrc;
  });
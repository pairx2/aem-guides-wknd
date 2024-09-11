(function(){
    var imgComp =  document.querySelectorAll(".m-image-popup");
        imgComp?.forEach(function (cta) {
        let modalID = cta.getAttribute('data-target');
        let timer =  setInterval(()=>{
        document.querySelector(modalID)?.classList.add('modal-imageComp');
        clearInterval(timer);
    },500);
    })
})();

$(".image").each(function() {
	var caption_text = $(this).find(".heading-bottom span").text();
	if(caption_text.trim() == ''){
        $(this).find(".heading-bottom").parent().addClass("caption-none");
    }
});
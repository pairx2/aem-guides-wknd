$(function() {
	let textarr = document.querySelectorAll(".a-container-pedialyte-testimonials .cmp-container .a-text--base");
    let activeId = localStorage.getItem("activeNumber");
    let textarrLength=textarr.length;
    if(textarrLength>0){
    for(let i=0;i<textarrLength;i++){
		textarr[i].classList.add("hide");
    }
    if(!activeId || +activeId === textarrLength){
        textarr[0].classList.remove("hide");
        localStorage.setItem("activeNumber",1);
    }else{
        textarr[activeId].classList.remove("hide");
        localStorage.setItem("activeNumber",parseInt(activeId)+1);
    }
    }
});
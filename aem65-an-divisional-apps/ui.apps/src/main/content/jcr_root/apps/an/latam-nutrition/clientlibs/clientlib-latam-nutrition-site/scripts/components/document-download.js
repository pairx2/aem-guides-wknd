window.addEventListener('load', function rowCardsAccordion () {
	let rowCards = document.querySelectorAll(".a-container--document-download .columncontrol.a-column-control--base");
	let seeMoreBtn = document.querySelector(".a-link--doc-download .a-link");

    if (rowCards.length > 2) {
        rowCards.forEach(function(rowCard, index){
            if(index > 1) {
                rowCard.classList.add("hide-rows");
            }
        });
    }
    

    // On Click of see more button, show all the row cards and remove the button
    if (seeMoreBtn) {
        seeMoreBtn.addEventListener("click", function () {
            rowCards.forEach(function(rowCard, index){
                if (rowCard.classList.contains("hide-rows")) {
                   rowCard.classList.remove("hide-rows");
                }
            });
            seeMoreBtn.style.display = "none";
        });
    }
});
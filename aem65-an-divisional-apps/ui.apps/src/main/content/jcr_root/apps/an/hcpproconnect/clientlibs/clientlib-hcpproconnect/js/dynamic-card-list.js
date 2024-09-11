$(".o-dynamic-card-list .m-card").each(function(){

    let articleBody= $(this).find(".m-card__body");
    let title = $(articleBody).find(".m-card__title").text();
    if(title.endsWith("Abbott")){
        let updatedTitle = title.split("Abbott")[0];
            $(articleBody).find(".m-card__title").text(updatedTitle);
    }
})
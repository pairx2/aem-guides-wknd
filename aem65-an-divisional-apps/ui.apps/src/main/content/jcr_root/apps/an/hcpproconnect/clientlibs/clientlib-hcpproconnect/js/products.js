$(document).ready(function() {
    let currentUrl = window.location.href;
    if (currentUrl.indexOf("products") >= 0) {
        let contentype = "products";
        showLoading();
        callSearchApi(contentype);       
    }
});

function mapCatagoryUpdate(map,categoryStri,catCurrenttitle){
    let titleCategory = [];
    if (map.hasOwnProperty(categoryStri)) {

        titleCategory = map[categoryStri];
        titleCategory.push(catCurrenttitle);
        map[categoryStri] = titleCategory;
    } 
    else {
        titleCategory.push(catCurrenttitle)
        map[categoryStri] = titleCategory;
    }
    return map;
}

function setObjtagsdietaryUpdate(setObjtagsdietaryreq,dietarystri){
    if (!setObjtagsdietaryreq.has(dietarystri)) {
        setObjtagsdietaryreq.add(dietarystri)
        $("#dietary-options").append(options);
    }
    return setObjtagsdietaryreq;
}

function setObjbrandUpdate(setObjBrand,brandsstri){   
    if (!setObjBrand.has(brandsstri)) {
        setObjBrand.add(brandsstri)
        $("#brands-options").append(options);
    }
    return setObjBrand;
}

function setObjclinicalUpdate(setObjClinical,clinicalstri){
    if (!setObjClinical.has(clinicalstri)) {
        setObjClinical.add(clinicalstri)
        $("#clinical-options").append(options);
    }
    return setObjClinical;
}

function setObjformatUpdate(setObjFormat,formatstri){
    if (!setObjFormat.has(formatstri)) {
        setObjFormat.add(formatstri)
        $("#format-options").append(options);
    }
    return setObjFormat;
}

function setObjageUpdate(setObjAgeRange,agestri){
    if (!setObjAgeRange.has(agestri)) {
        setObjAgeRange.add(agestri)
        $("#age-range-options").append(options);
    }
    return setObjAgeRange;
}

function setObjProductbrkdwnUpdate(setObjProductbreakdown,productstri){
    if (!setObjProductbreakdown.has(productstri)) {
        setObjProductbreakdown.add(productstri)
        $("#productbreakdown-options").append(options);
    }
    return setObjProductbreakdown;
}

function filterCheckboxClick(map,map1){
    let checkBox = [];      
    let idArray = [];
    
    localStorage.setItem("checkText", checkBox);

    $(".a-checkbox__input").click(function() {
        $(this).each(function(int) {
            let idText = $(this)[int].getAttribute("data-checkbox-name");
            let id = $(this)[int].getAttribute("id");
            let checked = $("#" + id).prop("checked");
            
            if (checked) {
                idArray.push("#" + id);
                checkBox.push(idText);
                map1[idText] = map[idText];
            } 
            else {
                checkBox.pop(idText)
                delete map1[idText]
            }
        });
        
        
        let producttitilebrandschecked = [];
        let counter = 0;
        showHideCards(map1, producttitilebrandschecked, counter);
        showPagination();
    })
    
    //  console.log("id "+idArray)
    resetFilters(idArray);

    let checkboxEle = $('.options').find('.a-checkbox');
    $(checkboxEle.find('.a-checkbox__input')).click(function() {
        let filtervalue = $(this).siblings('.a-checkbox__text').text();
        let checkboxId = $(this).attr('id');

        if ($(this).is(':checked')) {
          
            $("#selectedFilters").append(`<button type="button" id="btn-data" class="btn border rounded-pill mr-3 mb-3" selectedCheckboxId=${checkboxId}>${filtervalue}<em id="cancelselectedfilter" class="abt-icon abt-icon-cancel pl-5"></em></button>`);
            $('#selectedFilters').find('.btn .abt-icon-cancel').click(function() {
                let selectedCheckboxId = "#" + $(this).parent().attr('selectedCheckboxId');
                $(selectedCheckboxId).prop("checked", false);
                
                
                let idUncheckText = $(selectedCheckboxId)[0].getAttribute("data-checkbox-name");
                
                delete map1[idUncheckText];
                let producttitilebrandschecked = [];
                
                let counter = 0;
                showHideCards(map1, producttitilebrandschecked, counter)
                showPagination();
                
                $("#selectedFilters").find($(this).parent()).remove();
            });
             
        } 
        else {
            $("#selectedFilters").find(".btn").remove(":contains('" + filtervalue + "')");
        }
        
    });
}

function  productResponseFilter()
{
    $('#product-resource').show();
    showPagination();
    let json = localStorage.getItem("response");
    let jsonArray = JSON.parse(json)
    let results = jsonArray.response.results;

    let setObjBrand = new Set();
    let setObjtagsdietaryreq = new Set();
    $(".a-checkbox-label").text("");

    let setObjClinical = new Set();
    let setObjAgeRange = new Set();
    let setObjProductbreakdown = new Set();
    let setObjFormat = new Set();

    let map = {};
    for (let i in results) {
        let tag = results[i].tags;

        let tagString = String(tag);
        let tagArray = tagString.split("\n");

        for (let j in tagArray) {
            if (tagArray[j].indexOf("dietary-requirement") >= 0) {
                let dietarystri = tagArray[j].substring(tagArray[j].lastIndexOf("/") + 1, tagArray[j].length)
                let dietarycurrenttitle = results[i].title.trim().replace(cfpattern, '');
                
                map = mapCatagoryUpdate(map,dietarystri,dietarycurrenttitle);

                setObjtagsdietaryreq = setObjtagsdietaryUpdate(setObjtagsdietaryreq,dietarystri);
                
            } 
            else if (tagArray[j].indexOf("brands") >= 0) {
                let brandcurrenttitle = results[i].title.trim().replace(cfpattern, '');
                let brandsstri = tagArray[j].substring(tagArray[j].lastIndexOf("/") + 1, tagArray[j].length)
                
                map = mapCatagoryUpdate(map,brandsstri,brandcurrenttitle);

                setObjBrand = setObjbrandUpdate(setObjBrand,brandsstri);

            } 
            else if (tagArray[j].indexOf("clinical-areas") >= 0) {
                let clinicalstri = tagArray[j].substring(tagArray[j].lastIndexOf("/") + 1, tagArray[j].length)
                let clinicalcurrentTitle = results[i].title.trim().replace(cfpattern, '');
                
                map = mapCatagoryUpdate(map,clinicalstri,clinicalcurrentTitle);

                setObjClinical = setObjclinicalUpdate(setObjClinical,clinicalstri);

            } 
            else if (tagArray[j].indexOf("format") >= 0) {
                let formatstri = tagArray[j].substring(tagArray[j].lastIndexOf("/") + 1, tagArray[j].length)
                let formatcurrentTitle = results[i].title.trim().replace(cfpattern, '');
                
                map = mapCatagoryUpdate(map,formatstri,formatcurrentTitle);

                setObjFormat = setObjformatUpdate(setObjFormat,formatstri);

            }
            else if (tagArray[j].indexOf("age") >= 0) {
                let agestri = tagArray[j].substring(tagArray[j].lastIndexOf("/") + 1, tagArray[j].length)
                let agecurrentTitle = results[i].title.trim().replace(cfpattern, '');
                
                map = mapCatagoryUpdate(map,agestri,agecurrentTitle);

                setObjAgeRange = setObjageUpdate(setObjAgeRange,agestri);

            } 
            else if (tagArray[j].indexOf("product-breakdown") >= 0) {
                let productstri = tagArray[j].substring(tagArray[j].lastIndexOf("/") + 1, tagArray[j].length)
                let productcurrentTitle = results[i].title.trim().replace(cfpattern, '');

                map = mapCatagoryUpdate(map,productstri,productcurrentTitle);
                
                setObjProductbreakdown = setObjProductbrkdwnUpdate(setObjProductbreakdown,productstri);

            }

        }

    }

    let brands = [];
    brands = Array.from(setObjBrand);

    let agerange = [];
    agerange = Array.from(setObjAgeRange);
    
    let tagsdietaryreq = [];
    tagsdietaryreq = Array.from(setObjtagsdietaryreq);
    
    let clinical = [];
    clinical = Array.from(setObjClinical);
    
    let productbreakdown = [];
    productbreakdown = Array.from(setObjProductbreakdown);
    
    let format = [];
    format = Array.from(setObjFormat);
    
    dynamicPopulation("#brands-options", brands, "brands")
    dynamicPopulation("#format-options", format, "format")
    dynamicPopulation("#clinical-options", clinical, "clinical")
    dynamicPopulation("#productbreakdown-options", productbreakdown, "productbreakdown")
    dynamicPopulation("#dietary-options", tagsdietaryreq, "dietary")
    dynamicPopulation("#age-range-options", agerange, "age")
    expandFilter();
    
    let map1 = {};
    filterCheckboxClick(map,map1);
    
    hideLoading();
}

function dynamicPopulation(id, ArrayAttr, idname) {
    if(isCountryCodeUK())
		ArrayAttr.sort();
    
    if($('.ph-enhanced-filters').length)
        ArrayAttr.sort();
    
    $(id).find(".a-checkbox__text").each(function(dynamic1) {
        let chkBoxText = ArrayAttr[dynamic1];

        if($('.ph-enhanced-filters').length)
            chkBoxText = chkBoxText.indexOf('-specific') > 0 ? chkBoxText : chkBoxText.replace(/-/g, ' ');

        $(this).text(chkBoxText);
    });

    $(id).find(".a-checkbox__input").each(function(dynamic2) {
        $(this).attr("id", idname + dynamic2);
        $(this).attr("data-checkbox-name", ArrayAttr[dynamic2]);
    });
    
    $(id).find(".a-checkbox__label").each(function(dynamic3) {
        $(this).attr("for", idname + dynamic3);
    });
}

function showHideCards(map, producttitilebrandschecked, counter) {
	$('.a-contentfragmentlist--expert section.cmp-contentfragmentlist .article-anchor').each(function(i) {
        let text = $(this).find(".cmp-contentfragment__element--heading .cmp-contentfragment__element-value").text().trim(); 
        let producttitilebrandschecked = [];
        $(this).hide();
        $(this).removeClass("matched");
		let tagMatched = false;
        let mapCounter=0;
        let bolTrue = true;
        let bolFalse = false;

        for (let t in map) { 
            counter++; 
            if(mapCounter==0){
				producttitilebrandschecked = map[t]; 
                if (producttitilebrandschecked.includes(text)) {
                    tagMatched = true;
                } 
            }
            else
            {
				producttitilebrandschecked = map[t]; 
                if (!(producttitilebrandschecked.includes(text) && tagMatched==bolTrue)) {
                    tagMatched = false;
                }
            }
            mapCounter++;
            if(tagMatched==bolFalse)
            {
                break;
            }
        }
        if(tagMatched)
        {
			 $(this).show();
             $(this).addClass("matched");
        }
        if (counter == 0) {
            $(this).show();
            $(this).addClass("matched");
        }
    });   
}

function resetFilters(idArray) {

 $("#reset-filter").click(function() {
        $(idArray).each(function(resetInt) {
            $((idArray)[resetInt]).prop("checked", false);
        })
        $("#selectedFilters").find(".btn").remove();
        $('.a-contentfragmentlist--expert section.cmp-contentfragmentlist .article-anchor').each(function() {
            $(this).show();
            $(this).addClass("matched");
        })

       showPagination();
		window.location.reload();

    });


}
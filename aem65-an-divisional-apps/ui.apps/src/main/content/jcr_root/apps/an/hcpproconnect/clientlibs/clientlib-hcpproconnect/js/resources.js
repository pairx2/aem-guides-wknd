$(document).ready(function() {
    let currentUrl = window.location.href;
    if (currentUrl.indexOf("resources") >= 0) {
        let contentype = "resources";
        showLoading();
        callSearchApi(contentype);
    }
});

function mapCatagoryUpdateResource(map, categoryStri, catCurrenttitle){
        
    let titleCategory = [];
    if (map.hasOwnProperty(categoryStri)) {

          titleCategory = map[categoryStri];
          titleCategory.push(catCurrenttitle);
          map[categoryStri] = titleCategory;
     }
     else 
     {
          titleCategory.push(catCurrenttitle)
          map[categoryStri] = titleCategory;
     }
     return map;

}
function setObjAgeRangeUpdate(setObjAgeRangereq, agestri){
    if (!setObjAgeRangereq.has(agestri)) {
        setObjAgeRangereq.add(agestri)
        $("#age-range-options").append(options);
    }
    return setObjAgeRangereq;
}
function setObjClinicalAreasUpdate(setObjClinicalAreas, clinicalstri){

    if (!setObjClinicalAreas.has(clinicalstri)) {
        setObjClinicalAreas.add(clinicalstri)

        $("#clinical-areas-options").append(options);
    }
    return setObjClinicalAreas;
}
function setObjClinicalSolutionsUpdate(setObjClinicalSolutions, clsolutionstri){
        
    if (!setObjClinicalSolutions.has(clsolutionstri)) {
       setObjClinicalSolutions.add(clsolutionstri)

        $("#clinical-solutions-options").append(options);
     }
     return setObjClinicalSolutions;
}
function setObjBrandsUpdate(setObjBrands, brandstri){
        
    if (!setObjBrands.has(brandstri)) {
    setObjBrands.add(brandstri)

    $("#brands-options").append(options);
    }
    return setObjBrands;
}
function setObjContenttypeUpdate(setObjContenttype, contentstri){

    if (!setObjContenttype.has(contentstri)) {
        setObjContenttype.add(contentstri)

        $("#content-type-options").append(options);
    }
    return setObjContenttype;

}
function setObjForUpdate(setObjFor, forstri){
       
    if (!setObjFor.has(forstri)) {
        setObjFor.add(forstri)

        $("#for-options").append(options);
    }
    return setObjFor;
}
function  filterCheckBox(map, map1){
    let checkBox = [];    
    let idArray = [];

    localStorage.setItem("checkText", checkBox);

    $(".a-checkbox__input").click(function() {

        let idText = $(this).attr("data-checkbox-name");
        let id = $(this).attr("id");
        let checked = $("#" + id).prop("checked");

        if (checked) {
            idArray.push("#" + id);

            checkBox.push(idText);
            map1[idText] = map[idText];
        } else {
            checkBox.pop(idText)
            delete map1[idText]
        }

        let producttitilebrandschecked = [];
        
        let counter = 0;
        showHideCards(map1, producttitilebrandschecked, counter)
        showPagination();
        
    })
    
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
            
            
        } else {
            $("#selectedFilters").find(".btn").remove(":contains('" + filtervalue + "')");

        }
        
    });
}

function resourceResponseFilters()
{
		$('#product-resource').show();
        showPagination();
        let json = localStorage.getItem("response");
        let jsonArray = JSON.parse(json)
        let results = jsonArray.response.results;

        let setObjClinicalAreas = new Set();
        let setObjAgeRangereq = new Set();
        $(".a-checkbox-label").text("");

        let setObjClinicalSolutions = new Set();
        let setObjBrands = new Set();
        let setObjContenttype = new Set();
        let setObjFor = new Set();
        
        let map = {};
        for (let i in results) {
            let tag = results[i].tags;

            let tagString = String(tag);
            let tagArray = tagString.split("\n");

            for (let j in tagArray) {
                if (tagArray[j].indexOf("age") >= 0) {
                    let agestri = tagArray[j].substring(tagArray[j].lastIndexOf("/") + 1, tagArray[j].length)
                    let agecurrenttitle = results[i].title.trim().replace(cfpattern, '');

                    map = mapCatagoryUpdateResource(map, agestri, agecurrenttitle);
                    
                    setObjAgeRangereq = setObjAgeRangeUpdate(setObjAgeRangereq, agestri);

                } 
                else if (tagArray[j].indexOf("clinical-areas") >= 0) {
                    let clinicalstri = tagArray[j].substring(tagArray[j].lastIndexOf("/") + 1, tagArray[j].length)
                    let clinicalcurrentTitle = results[i].title.trim().replace(cfpattern, '');

                    map = mapCatagoryUpdateResource(map, clinicalstri, clinicalcurrentTitle);

                    setObjClinicalAreas = setObjClinicalAreasUpdate(setObjClinicalAreas, clinicalstri);

                } 
                else if (tagArray[j].indexOf("clinical-solutions") >= 0) {
                    let clsolutionstri = tagArray[j].substring(tagArray[j].lastIndexOf("/") + 1, tagArray[j].length)
                    let clsolcurrentTitle = results[i].title.trim().replace(cfpattern, '');

                    map = mapCatagoryUpdateResource(map, clsolutionstri, clsolcurrentTitle);

                    setObjClinicalSolutions =  setObjClinicalSolutionsUpdate(setObjClinicalSolutions, clsolutionstri);
                } 
                else if (tagArray[j].indexOf("brands") >= 0) {
                    let brandstri = tagArray[j].substring(tagArray[j].lastIndexOf("/") + 1, tagArray[j].length)
                    let brandscurrentTitle = results[i].title.trim().replace(cfpattern, '');

                    map = mapCatagoryUpdateResource(map, brandstri, brandscurrentTitle);

                    setObjBrands = setObjBrandsUpdate(setObjBrands, brandstri);
                } 
                else if (tagArray[j].indexOf("content-type") >= 0) {
                    let contentstri = tagArray[j].substring(tagArray[j].lastIndexOf("/") + 1, tagArray[j].length)
                    let contentcurrentTitle = results[i].title.trim().replace(cfpattern, '');

                    map = mapCatagoryUpdateResource(map, contentstri, contentcurrentTitle);

                    setObjContenttype = setObjContenttypeUpdate(setObjContenttype, contentstri);
                } 
                else if (tagArray[j].indexOf("for") >= 0) {
                    let forstri = tagArray[j].substring(tagArray[j].lastIndexOf("/") + 1, tagArray[j].length)
                    let forcurrentTitle = results[i].title.trim().replace(cfpattern, '');

                    map = mapCatagoryUpdateResource(map,forstri,forcurrentTitle);

                    setObjFor = setObjForUpdate(setObjFor, forstri);

                }

            }
        }

        let agerange = [];
        agerange = Array.from(setObjAgeRangereq);

        let clinicalareas = [];
        clinicalareas = Array.from(setObjClinicalAreas);

        let clinicalsolutions = [];
        clinicalsolutions = Array.from(setObjClinicalSolutions);

        let contenttype = [];
        contenttype = Array.from(setObjContenttype);

        let For = [];
        For = Array.from(setObjFor);
        
        let brands=[]
        brands=Array.from(setObjBrands)

        dynamicPopulation("#age-range-options", agerange, "age")
        dynamicPopulation("#clinical-areas-options", clinicalareas, "clinicalareas")
        dynamicPopulation("#clinical-solutions-options", clinicalsolutions, "clinicalsolutions")
        dynamicPopulation("#content-type-options", contenttype, "contenttype")
        dynamicPopulation("#for-options", For, "For")
        dynamicPopulation("#brands-options", brands, "brands")
        expandFilter();

        let map1 = {};
        filterCheckBox(map, map1);
       
   		hideLoading();     

    }
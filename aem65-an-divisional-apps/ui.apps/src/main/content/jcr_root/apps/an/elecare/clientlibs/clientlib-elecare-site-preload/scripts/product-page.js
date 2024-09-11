
function updatePIMrequest(data) {
	delete data.body['product-child'];
  	delete data.body['serving id'];
    data.headers['x-preferred-language'] = 'en';
    return data;
}

function onSuccessPIMrequest(data) {
    if (data.errorCode == 0) {
        if (data.response && data.response.productFormulations && data.response.productFormulations.length) {
                data.response.productFormulations.forEach(product => {
                if (product.id == $("#product-child-id").val()) {
					let allergyText = $("#allergen-info p");
                   	let allergen  = allergyText.html().replace('{allergen}', product.allergenStatement);
					allergyText.html(allergen);
                    let ingredientsText = $("#ingredient-info p");
                   	let ingredient  = ingredientsText.html().replace('{ingredient}', product.ingredients);
					ingredientsText.html(ingredient);
                    if (product.productNutritionalInformationServingSize && product.productNutritionalInformationServingSize.length) {
                        prefillServingData(product);
                    }
        			$("#nutrition-info p:first").remove();
        			$("#mineral-info p:first").remove();
                    $("#vitamin-info p:first").remove();
                }
                return false;
            });
        }
	}
}

function prefillServingData(product) {
    product.productNutritionalInformationServingSize.forEach(servingData => {
        if (servingData.id == $("#serving-id").val()) {
            let servingSizeText = $("#serving-size p");
            let footerTable = $("#footer-info p");
            let servingText = servingSizeText.html().replace('{servingSize}', servingData.servingSize);
            if(footerTable && footerTable.length) {
                let text  = footerTable.html().replace('{footernotes}', servingData.productNutritionalInformationFooterNotes[0].value);
                footerTable.html(text);
            }
            servingSizeText.html(servingText);
            prefillPIMData(servingData);
        }
         return false;
    });
}

function prefillPIMData(servingData) {
    servingData.productNutritionalInformationItems.forEach((nutrient) => {
        switch(nutrient.categoryName) {
            case "Minerals":
                    let mineralTable = $(".col-md-4:nth-child(1) #mineral-info p:first").clone();
                    let  mineralText = mineralTable.html().replace('{name}', nutrient.name).replace('{value}', nutrient.value).replace('{percentDV}', nutrient.percentDV ? nutrient.percentDV+''+'%' :'');
                    mineralTable.html(mineralText);
                if($(".col-md-4:nth-child(1) #mineral-info p").length <= 7){
                    $(".col-md-4:nth-child(1) #mineral-info").append(mineralTable);
                }else if($(".col-md-4:nth-child(2) #mineral-info p").length <= 7){
                    $(".col-md-4:nth-child(2) #mineral-info").append(mineralTable);
                }else{
                    $(".col-md-4:nth-child(3) #mineral-info").append(mineralTable);
                }
                break;
            
            case "Vitamins":
                    let vitaminTable = $(".col-md-4:nth-child(2) #vitamin-info p:first").clone();
                    let vitaminText = vitaminTable.html().replace('{name}', nutrient.name).replace('{value}', nutrient.value).replace('{percentDV}', nutrient.percentDV ? nutrient.percentDV+''+'%' :'' );
                    vitaminTable.html(vitaminText);
                if($(".col-md-4:nth-child(2) #vitamin-info p").length <= 9){
                    $(".col-md-4:nth-child(2) #vitamin-info").append(vitaminTable);
                }else{
                    $(".col-md-4:nth-child(3) #vitamin-info").append(vitaminTable);
                }
                break;

            default:
                let nutritionTable = $("#nutrition-info p:first").clone();
                let nutrientText  = nutritionTable.html().replace('{name}', nutrient.name).replace('{value}', nutrient.value).replace('{percentDV}', nutrient.percentDV ? nutrient.percentDV+''+'%' :'')
                nutritionTable.html(nutrientText);
                $("#nutrition-info").append(nutritionTable);
                break;
        }
    });
}

function onErrorPIMrequest(data) {
    return data;
}
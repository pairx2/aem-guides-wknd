
function updatePIMrequest(data) {
    delete data.body['product-child'];
    delete data.body['serving id'];
    data.headers['x-preferred-language'] = 'en';
    return data;
}

function setNutritionTableValues(servingData) {    
    servingData.productNutritionalInformationItems.forEach((nutrient) => {
        switch (nutrient.categoryName) {
            case "Minerals":
                let mineralTable = $("#mineral-info p:first").clone();
                let mineralText = mineralTable.html().replace('{name}', nutrient.name).replace('{value}', nutrient.value).replace('{percentDV}', nutrient.percentDV);
                mineralTable.html(mineralText);
                $("#mineral-info").append(mineralTable);
                break;

            case "Vitamins":
                let vitaminTable = $("#vitamin-info p:first").clone();
                let vitaminText = vitaminTable.html().replace('{name}', nutrient.name).replace('{value}', nutrient.value).replace('{percentDV}', nutrient.percentDV);
                vitaminTable.html(vitaminText);
                $("#vitamin-info").append(vitaminTable);
                break;

            default:
                let nutritionTable = $("#nutrition-info p:first").clone();
                let nutrientText = nutritionTable.html().replace('{name}', nutrient.name).replace('{value}', nutrient.value).replace('{percentDV}', nutrient.percentDV);
                $("#nutrition-info").append(nutritionTable);
                if (nutrient.indentCount == "1") {
                    nutritionTable.html(nutrientText).addClass("indentCount-one");
                }
                else if (nutrient.indentCount == "2") {
                    nutritionTable.html(nutrientText).addClass("indentCount-two");
                }
                else {
                    nutritionTable.html(nutrientText);
                }
                break;
        }
    });
}
function setNutritionInfoValues(product) {    
    if (product.id == $("#product-child-id").val()) {
        let allergyText = $("#allergen-info p");
        let allergen = allergyText.html().replace('{allergen}', product.allergenStatement);
        allergyText.html(allergen);
        let ingredientsText = $("#ingredient-info p");
        let ingredient = ingredientsText.html().replace('{ingredient}', product.ingredients);
        ingredientsText.html(ingredient);
        if (product.productNutritionalInformationServingSize && product.productNutritionalInformationServingSize.length) {
            product.productNutritionalInformationServingSize.forEach(servingData => {
                if (servingData.id == $("#serving-id").val()) {
                    let servingSizeText = $("#serving-size p");
                    let footerTable = $("#footer-info p");
                    let servingText = servingSizeText.html().replace('{servingSize}', servingData.servingSize);
                    let text = footerTable.html().replace('{footernotes}', servingData.productNutritionalInformationFooterNotes[0].value);
                    footerTable.html(text);
                    servingSizeText.html(servingText);
                    setNutritionTableValues(servingData);
                }
                return false;
            });
        }
        $("#nutrition-info p:first").remove();
        $("#mineral-info p:first").remove();
        $("#vitamin-info p:first").remove();
    }
}

function onSuccessPIMrequest(data) {
    if (data.errorCode == 0) {
        if (data.response && data.response.productInstructions && data.response.productInstructions.length) {
            data.response.productInstructions.forEach((product) => {
            if(product.category!=="Important Safety Information"){
                let category = product.category;
                let use = product.value;
                let cloneDirections = $("#directions-use p").clone();
                let categoryTable = cloneDirections[0];
                let nutritionTable = cloneDirections[1];
                let categoryTextValue = categoryTable.innerHTML.replace('{category}', category.toUpperCase());
                categoryTable.innerHTML = categoryTextValue;
                let check = nutritionTable.innerHTML.replace('{directionsForUse}', use);
                nutritionTable.innerHTML = check;
                $("#directions-use").append(categoryTable);
                $("#directions-use").append(nutritionTable);
              }
            });
            $("#directions-use p:first, #directions-use p:nth-child(2)").remove();
        }

        if (data.response && data.response.productFormulations && data.response.productFormulations.length) {
            data.response.productFormulations.forEach(product => {
                setNutritionInfoValues(product);
                return false;
            });
        }
    }
}

function onErrorPIMrequest(data) {
    return data;
}
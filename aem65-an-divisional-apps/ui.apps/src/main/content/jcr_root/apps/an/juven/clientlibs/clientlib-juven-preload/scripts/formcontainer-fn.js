/**
 * FORM CONTAINER
 */

/**
 * @function
 * Summary: Function that triggers on submit hit of product detials API
 * Parameters: data -> payload
 */

function updateRequestPIMProductDetails(data) {
    toggleLoadingSpinner();
    return data;
}

/**
 * @function
 * Summary: Function that triggers on success response of product detials API
 * Parameters: data -> payload
 */
 function matchFlavorFunction(data, authoredProductFormulationsId, authoredServicingID) {
    let flavorMatched = false; // Flag to check the flavor ID match
    data.response.productFormulations.forEach(flavor => {
        if (flavor.id == authoredProductFormulationsId) {
            flavorMatched = true;
            // Calling Ingredients data function to fill in Ingredient data
            productIngredientsData(flavor);
            if (flavor.productNutritionalInformationServingSize && flavor.productNutritionalInformationServingSize.length) {
                flavor.productNutritionalInformationServingSize.every(servingData => {
                    if (servingData.id == authoredServicingID) {

                        // Calling Serving data function to fill in Nutrients, Vitamins and Minerals Data
                        productServingData(servingData);
                        return false;
                    }
                });
            }
            return false;
        }
    });
    if (!flavorMatched) {
        onErrorPIMProductDetails();
    }
}

function onSuccessPIMProductDetails(data) {
    if (data.errorCode == 0) {
        let authoredProductFormulationsId = 0,
            authoredServicingID = 0;
        let authoredProductEle = $('#form-var--products .form-container .text .cmp-text');
        let authoredProductInfo = authoredProductEle.text().trim();

        if (authoredProductInfo.includes('productFormulationsId')) {
            authoredProductFormulationsId = authoredProductInfo.split('productFormulationsId:')[1].split('}')[0];
        }

        if (authoredProductInfo.includes('productServingId')) {
            authoredServicingID = authoredProductInfo.split('productServingId:')[1].split('}')[0];
        }

        if (data.response && data.response.productFormulations && data.response.productFormulations.length) {
            matchFlavorFunction(data, authoredProductFormulationsId, authoredServicingID);
        }
    }
}

/**
 * @function
 * Summary: Function that fills in Ingredients data on the frontend
 * Parameters: data -> partial payload object
 */
function productIngredientsData(productFlavor) {

    if (productFlavor.ingredients && productFlavor.ingredients.length) {
        let ingredientsEle = $('#ingredients-data .ingredients');
        ingredientsEle.length && ingredientsEle.html(ingredientsEle.html().replace('{ingredients}', productFlavor.ingredients));
    }

    let allegenStatementEle = $('#ingredients-data .allergen-statement');
    if (allegenStatementEle.length) {
        if (productFlavor.allergenStatement && productFlavor.allergenStatement.length) {
            allegenStatementEle.html(allegenStatementEle.html().replace('{allergen-statement}', productFlavor.allergenStatement));
        } else {
            allegenStatementEle.hide();
        }
    }
}

function setServingEle(servingEle, productServingObj) {    
    if (servingEle.length) {
        if (productServingObj.servingSize && productServingObj.servingSize.length) {
            servingEle.html(servingEle.html().replace('{productNutritionalInformationServingSize}', productServingObj.servingSize));
        } else {
            servingEle.hide();
        }
    }
}
/**
 * @function
 * Summary: Function that fills in Nutrients, Vitamins and Minerals data on the frontend
 * Parameters: data -> partial payload object
 */
function productServingData(productServingObj) {

    if (productServingObj.productNutritionalInformationItems && productServingObj.productNutritionalInformationItems.length) {
        let nutritionTemplate = $('#nutrition-data .nutrition-template').clone();
        nutritionTemplate.removeClass('nutrition-template');
        let vitaminTemplate = $('#vitamin-data .vitamin-template').clone();
        vitaminTemplate.removeClass('vitamin-template');
        let mineralTemplate = $('#mineral-data .mineral-template').clone();
        mineralTemplate.removeClass('mineral-template');
        let servingEle = $('#nutrition-data .serving-size');
        let nutritionFootNoteEle = $('#nutrition-data .nutrition-footnote');

        setServingEle(servingEle, productServingObj);

        if (nutritionFootNoteEle.length) {
            if (
                productServingObj.productNutritionalInformationFooterNotes &&
                productServingObj.productNutritionalInformationFooterNotes.length &&
                productServingObj.productNutritionalInformationFooterNotes[0].value &&
                productServingObj.productNutritionalInformationFooterNotes[0].value.length
            ) {
                nutritionFootNoteEle.html(nutritionFootNoteEle.html().replace('{productNutritionalFooterNote}', productServingObj.productNutritionalInformationFooterNotes[0].value));
            } else {
                nutritionFootNoteEle.hide();
            }
        }

        //servingSize
        productServingObj.productNutritionalInformationItems.forEach(infoItem => {
            let newHTML = '';
            switch (infoItem.categoryName) {
                case 'Nutrient Data':
                    let nutritionData = nutritionTemplate.clone();
                    newHTML = nutritionData.html().replace('{name}', infoItem.name + ': ').replace('{value}', infoItem.value);
                    nutritionData.empty().append(newHTML).insertBefore("#nutrition-data .nutrition-template");
                    break;
                case 'Vitamins':
                    let vitaminData = vitaminTemplate.clone();
                    newHTML = vitaminData.html().replace('{name}', infoItem.name + ': ').replace('{value}', infoItem.value);
                    vitaminData.empty().append(newHTML).insertBefore("#vitamin-data .vitamin-template");
                    break;
                case 'Minerals':
                    let mineralData = mineralTemplate.clone();
                    newHTML = mineralData.html().replace('{name}', infoItem.name + ': ').replace('{value}', infoItem.value);
                    mineralData.empty().append(newHTML).insertBefore("#mineral-data .mineral-template");
                    break;
                default:
            }
        });
        $("#nutrition-data .nutrition-template").remove();
        $("#vitamin-data .vitamin-template").remove();
        $("#mineral-data .mineral-template").remove();
        $('#nutrition-data').show();
        $('#ingredients-data').show();
        $('#vitamin-data').show();
        $('#mineral-data').show();
    }
}

/**
 * @function
 * Summary: Function that triggers on error of product detials API
 * Parameters: data -> payload
 */

function onErrorPIMProductDetails() {
    $('#nutrition-data').hide();
    $('#ingredients-data').hide();
    $('#vitamin-data').hide();
    $('#mineral-data').hide();
}

/**
 * @function
 * Summary: Function that triggers on complete of product detials API
 */

function onCompletePIMProductDetails() {
    toggleLoadingSpinner();
}
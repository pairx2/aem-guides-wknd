window.dataLayer = window.dataLayer || [];

$(document).ready(function () {
    // Page load data layer init
    

    // Product, Solution Set, Education page -  Analytics Data Layer
    const dataLayerObjs = $("[name^='dataLayer_']");
    let productName = null, productCategory = null, solutionSetName = null, educationName = null, educationCategory = null;
    
    for(let i of dataLayerObjs){
        const curr = $(i);
        const identifier = curr.attr("name").split("_")[1];
        if (identifier === "ProductName") {
            productName = curr.val();
        } else if (identifier === "ProductCategory") {
            productCategory = curr.val();
        } else if (identifier === "SolutionSetName") {
            solutionSetName = curr.val();
        } else if (identifier === "EducationName") {
            educationName = curr.val();
        } else if (identifier === "EducationCategory") {
            educationCategory = curr.val();
        }
    }
    

    if (isUserLoggedIn()) {
        analyticsForLoggedInUser(dataLayerObjs,productName,productCategory,solutionSetName,educationName,educationCategory);
    } else {
        analyticsForNoLoggedInUser(dataLayerObjs,productName,productCategory,solutionSetName,educationName,educationCategory);
        
    }
    // Samples Analytics Data Layer
    $("#requestSampleButton").on("click", function () {
        requestSampleBtnClick(dataLayerObjs, productName, productCategory);        
    });
        

});

function requestSampleBtnClick(dataLayerObjs, productName, productCategory) {    
    if (dataLayerObjs.length && productName && productCategory) {
        window.dataLayer.push({
            "event": "request gratis",
            "productName": productName,
            "productCategory": productCategory
        });
    }
    
}
function analyticsForLoggedInUser(dataLayerObjs,productName,productCategory,solutionSetName,educationName,educationCategory){
    const data = getLocalStorage("userInfo");
    const userId = data.userName;
    const { sfdcId, specialty, institutionType, segmentType } = data.additionalProperties;
    if (dataLayerObjs.length && productName && productCategory) {
        window.dataLayer.push({
            "event": "page load",
            "cognitoID": `${userId}`,
            "contactID": `${sfdcId}`,
            "specialization": `${specialty}`,
            "institutionType": `${institutionType}`,
            "persona": `${segmentType}`,
            "productName": productName,
            "productCategory": productCategory
        });
    } else if (dataLayerObjs.length && solutionSetName) {
        window.dataLayer.push({
            "event": "page load",
            "cognitoID": `${userId}`,
            "contactID": `${sfdcId}`,
            "specialization": `${specialty}`,
            "institutionType": `${institutionType}`,
            "persona": `${segmentType}`,
            "solutionSet": solutionSetName
        });
    } else if (dataLayerObjs.length && educationName && educationCategory) {
        window.dataLayer.push({
            "event": "page load",
            "cognitoID": `${userId}`,
            "contactID": `${sfdcId}`,
            "specialization": `${specialty}`,
            "institutionType": `${institutionType}`,
            "persona": `${segmentType}`,
            "educationName": educationName,
            "educationCategory": educationCategory
        });
    } else {
        window.dataLayer.push({
            "event": "page load",
            "cognitoID": `${userId}`,
            "contactID": `${sfdcId}`,
            "specialization": `${specialty}`,
            "institutionType": `${institutionType}`,
            "persona": `${segmentType}`
        });
    }
}
function analyticsForNoLoggedInUser(dataLayerObjs,productName,productCategory,solutionSetName,educationName,educationCategory){
    if (dataLayerObjs.length && productName && productCategory) {
        window.dataLayer.push({
            "event": "page load",
            "productName": productName,
            "productCategory": productCategory
        });
    } else if (dataLayerObjs.length && solutionSetName) {
        window.dataLayer.push({
            "event": "page load",
            "solutionSet": solutionSetName
        });
    } else if (dataLayerObjs.length && educationName && educationCategory) {
        window.dataLayer.push({
            "event": "page load",
            "educationName": educationName,
            "educationCategory": educationCategory
        });
    } else {
        window.dataLayer.push({
            "event": "page load"
        });
    }
}
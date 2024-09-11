function sortResponse(globalResponse){

let outputArray= [];
let checkBoxArray = [];
let blood_type = '';
let plasma_type = '';
let poiData = globalResponse;

if(window.location.href.indexOf("bca.html") > -1) {

    if($("input:checkbox[name=plant-a-tree]").prop("checked") == true){

        poiData.forEach(function(plant){
            if(plant.plantTree == "Yes"){
                outputArray.push(plant);
            }
        });
        let poiDataSet = JSON.stringify(outputArray);
        localStorage.setItem("poiLocator", poiDataSet);
        return outputArray;
    }else{

        poiData.forEach(function(bcaData){
            if(bcaData.parentOrganization == "BCA"){
                outputArray.push(bcaData);
            }
        });
        let poiDataSet = JSON.stringify(outputArray);
        localStorage.setItem("poiLocator", poiDataSet);
        return outputArray;
    }

}

$("input:checkbox[name=donate]:checked").each(function(){
    checkBoxArray.push($(this).val());
});

if(checkBoxArray[0] && checkBoxArray[1]) {
    blood_type= 'Whole Blood';
    plasma_type= 'Plasma';
}
else{
    blood_type = checkBoxArray[0] == 'blood' ? 'Whole Blood' : 'Plasma';
}

if(blood_type){
    for(let i=0; i< poiData.length; i++){
        let data = poiData[i]['donationType'][0];
        if(data == blood_type || data == plasma_type || data == "Both"){
            outputArray.push(poiData[i]);
        }
    }
    let poiDataSet = JSON.stringify(outputArray);
    localStorage.setItem("poiLocator", poiDataSet);
    return outputArray;
}
else{
    outputArray = [];
    let poiDataSet = JSON.stringify(outputArray);
    localStorage.setItem("poiLocator", poiDataSet);
    return outputArray;
}


}

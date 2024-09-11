function sortResponse(globalResponse){
    var filteredPOIData= [];
    var modifiedData = [];
    var poiData = globalResponse; 
    var filterValue = $('.a-dropdown__field .a-dropdown__menu li.selected').attr('data-optionvalue');
    if ($('.a-dropdown__field .a-dropdown__menu').attr('name') === 'device') {
        if (filterValue && filterValue !== 'ALL') {
            var filterValueAll = filterValue.split(';'); 
            var filterValues = filterValueAll.map(element => {
                  return element.trim();
                });
            poiData.forEach(function(place) {   
                var deviceTypeAll = place.deviceType[0].split(';');
                var deviceTypes = deviceTypeAll.map(element => {
                  return element.trim();
                });
                if(filterValues.length === 1) {
                    if (deviceTypes.includes(filterValues[0])) { 
                        pushData(place); 
                    }
                }  
                else {
                    if (deviceTypes.includes(filterValues[0]) && deviceTypes.includes(filterValues[1]) && deviceTypes.includes(filterValues[2])) { 
                        pushData(place); 
                    }
                }              
            });
            function pushData(place) {
                filteredPOIData.push(place);
            }
            var $pagination = $('.a-pagination');
            filteredPOIData.length > 0 ? $pagination.removeClass('d-none') : $pagination.addClass('d-none');
            return filteredPOIData;
        }
        else {
            modifiedData = updateData(poiData);
            return modifiedData; 
        }
    }
    else {
        modifiedData = updateData(poiData);
        return modifiedData;        
    }    
}

function updateData(poiData) {
    var updatedPOIData = [];
    poiData.forEach(function(place) {  
        updatedPOIData.push(place); 
    });
    var $pagination = $('.a-pagination');
    updatedPOIData.length > 0 ? $pagination.removeClass('d-none') : $pagination.addClass('d-none');
    return updatedPOIData;
}


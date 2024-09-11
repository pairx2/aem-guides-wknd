$(document).ready(function() {
    if($('#product-data-popup-xf').length > 0) {
        let productDataJson = $('#product-data-json').val();
        let col1MlValue = $('#ml-col-1').val();
        let col2MlValue = $('#ml-col-2').val();
 
        $.getJSON(productDataJson, function (json) {
            localStorage.setItem('productDataJson', JSON.stringify(json));
        });
 
        let updatedValue = $('.product-data-thead').html()
                            .replace('{ml-col-1}', col1MlValue)
                            .replace('{ml-col-2}', col2MlValue);
 
        $('.product-data-thead').html(updatedValue);
        $('#product-no-data').hide();
 
        let buttonClose = `<div>
                            <span class="generic-modal--close"
                            data-dismiss="modal"
                            aria-label="Close">
                            <i id="close-product-data-popup"
                            aria-hidden="true"
                            class="abt-icon abt-icon-cancel"></i>
                            </span>
                            </div>`;
 
        $("#product-data-popup").append(buttonClose);
 
        $("#close-product-data-popup").bind('click', function(e) {
           e.preventDefault();
           $("#product-data-popup-xf").hide();
           $("body").css('overflow', 'auto');
        });
    }
});
function energyList (product,energyTBody, vitaminsTBody){
    let energy = product.energy?.length ? product.energy[0] : null;
    let vitamins = product.vitamins?.length ? product.vitamins[0] : null;
    if(energy) {
        fillProductDataTable(energy, energyTBody);
        $('#product-data-energy-table').parents('.text').after('<hr>');
    } else
        $('#product-data-energy-table').parents('.text').hide();
 
    if(vitamins) {
        fillProductDataTable(vitamins, vitaminsTBody);
        $('#product-data-vitamins-table').parents('.text').after('<hr>');
    } else
        $('#product-data-vitamins-table').parents('.text').hide();
}
function showProductDataPopup(imgSrc, productName) {
    let data = localStorage.getItem('productDataJson');
    fillProductDataInfo(imgSrc, productName);
    if(data) {
        data = JSON.parse(data);
        let productData = data.filter(productItem => { return productItem.ProductName == productName });
        let energyTBody = $('#product-data-energy-table').find('.product-data-tbody');
        let vitaminsTBody = $('#product-data-vitamins-table').find('.product-data-tbody');
        let mineralsTBody = $('#product-data-minerals-table').find('.product-data-tbody');
        energyTBody.empty();
        vitaminsTBody.empty();
        mineralsTBody.empty();
        if(productData.length > 0) {
            $('#product-data-tables-container').show();
            $('#product-data-tables-container').find('hr').remove();
            let product = productData[0];
            let minerals = product.minerals?.length ? product.minerals[0] : null;
        energyList(product,energyTBody, vitaminsTBody);
            if(minerals) {
                fillProductDataTable(minerals, mineralsTBody);
            } else
                $('#product-data-vitamins-table').parents('.text').hide();
 
        } else {
            showNoProductData();
        }
    } else {
        showNoProductData();
    }
    $("#product-data-dl-pdf").click(function (e) {
        e.preventDefault();
        const element = $("#product-data-tables-container")[0];
        let opt = {
            margin:       .7,
            filename:     productName + '-nutrition.pdf',
            html2canvas: { scale: 2, useCORS: true },
            image:        { type: 'jpeg', quality: 0.98 },
            jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save();
    });
 
    $("body").css('overflow', 'hidden');
    $("#product-data-popup-xf").show();
}
 
function showNoProductData() {
    $('#product-no-data').show();
    $('#product-data-tables-container').hide();
    $('#product-data-dl-pdf').addClass('disabled');
}
 
function fillProductDataTable(data, tbody) {
    Object.keys(data).forEach(item => {
        let row = $(`<tr></tr>`);
        let details = data[item];
        let detailVal = parseFloat(details[0].value ? details[0].value : 0);
        let col1MlValue = $('#ml-col-1').val();
        let col2MlValue = $('#ml-col-2').val();
        let col2FinalValue = parseFloat((details[0].value * col2MlValue) / col1MlValue);
 
        col2FinalValue = col2FinalValue.toFixed(2);
        detailVal = detailVal.toFixed(2);
 
        row.append($(`<td>${item}</td>`));
        row.append($(`<td>${details[0].unit}</td>`));
        row.append($(`<td>${detailVal}</td>`));
        row.append($(`<td>${col2FinalValue}</td>`));
        tbody.append(row);
    });
}
 
function fillProductDataInfo(imgSrc, productName) {
    let text = $('#product-data-info-text').parent().detach();
    let subText = $('#product-data-info-subtext').parent().detach();
    let downloadBtn = $('#product-data-dl-pdf').parent().detach();
    let img = $(`<img src=${imgSrc} />`);
    let infoContainer = $(`<div class="info-container-right"></div>`);
    let productNameElem = $(`<h3>${productName}</h3>`);
 
    $('#product-data-info').empty();
 
    infoContainer.append(productNameElem);
    infoContainer.append(subText);
    infoContainer.append(text);
    infoContainer.append(downloadBtn);
 
    $('#product-data-info').append(img);
    $('#product-data-info').append(infoContainer);
}
if($('.productDetailPageRun').hasClass('pageRun')){
    let productDataJSON = $(".productData").val();
	//Title Value data mapping in Table for PDF Start
	const titles=[];
    let uniqueTitles=[];
    let indentDataArr = [];
    const unique = (value, index, self) => {
      return self.indexOf(value) === index
    }
    let newdata = JSON.parse(productDataJSON);
    let checkData = newdata.ServingSize;
        $(checkData).each(function(index){
            $(checkData[index].NutritionalInfo).each(function(item){
                let data =checkData[index].NutritionalInfo[item].NutritionName;
                let indentVal =checkData[index].NutritionalInfo[item].IndentCount;
                let indentData = {};
                indentData.NutritionName = data;
                indentData.indentCount = indentVal;
                indentDataArr.push(indentData);
                titles.push(data);
                uniqueTitles = titles.filter(unique);
            });

        });

    for (const element of uniqueTitles) {
        let elementVal = {};
		elementVal = indentDataArr.find(indentData => indentData.NutritionName === ""+element+"");
        if(elementVal.indentCount == ''){
            $(".nutritionInformation .availTable table tbody").append('<tr><td>'+element+'</td><td class="subtitle" data-title="'+element+'"><span class="valueNutri">NA</span><span class="perDV">NA</span></td></tr>');
        }
        else if(elementVal.indentCount == '1'){
            $(".nutritionInformation .availTable table tbody").append('<tr><td class="padding1">'+element+'</td><td class="subtitle" data-title="'+element+'"><span class="valueNutri">NA</span><span class="perDV">NA</span></td></tr>');
        }
        else if(elementVal.indentCount == '2'){
            $(".nutritionInformation .availTable table tbody").append('<tr><td class="padding2">'+element+'</td><td class="subtitle" data-title="'+element+'"><span class="valueNutri">NA</span><span class="perDV">NA</span></td></tr>');
        }
        
    }

    $(".nutritionInformation .availTable").each(function(item){
    
	  $(newdata.ServingSize[item].NutritionalInfo).each(function(j){
		$(".nutritionInformation .availTable").eq(item).find('.subtitle[data-title="'+newdata.ServingSize[item].NutritionalInfo[j].NutritionName+'"] .valueNutri').html(newdata.ServingSize[item].NutritionalInfo[j].NutritionValue);
		$(".nutritionInformation .availTable").eq(item).find('.subtitle[data-title="'+newdata.ServingSize[item].NutritionalInfo[j].NutritionName+'"] .perDV').html(newdata.ServingSize[item].NutritionalInfo[j].PercentDV); 
	  });

    });
	//Title Value data mapping in Table for PDF End

    let actualDataJSON = JSON.parse(productDataJSON);
	
    $("#lastUpdated").text(actualDataJSON.approvalDateTime);

    function pdfAddImage(pdf,tableLogo){
        let windowSize = $(window).width();
        if (windowSize <= 991) {
            pdf.addImage(tableLogo,'png', 25,  40, 64, 18);
         }else{
            pdf.addImage(tableLogo,'png', 42,  40, 64, 18);
         }
         return pdf;
    }
    
    function convertHTMLToPDF() {
		let tableLogo = $(".tableImg img").attr("src");
        $("#parent").removeClass("d-none");
        $("body").css("overflow-y","hidden");
        //Product Image
        $(".productImg").attr("src", $(".dynamic-product-detail .mySlides:visible").find("img").attr("src"));
    
        //Product Title
         let headerTitle = $("#parent .productTitle").text().replaceAll('.','_');
    
        let tempId = $(".dynamic-product-detail .cmp-product-detail__formulation-dropdown .a-dropdown").find(".o-content-section__list-item.selected").attr("id");
        
		$("#parent .nutritionInformation .footNote").hide();
        $("#parent .nutritionInformation .footNote[data-val='" + tempId +"']").show();
		
		//Availability data
        $("#parent .availability tbody tr").hide();
        $("#parent .availability tbody tr[data-val='" + tempId +"']").show();
    
        //Ingredients data
        $("#parent .ingredients .pdfingredients").hide();
        $("#parent .ingredients .pdfingredients[data-val='" + tempId +"']").show();
    
        //Nutrition data
        $("#parent .nutritionInformation .availTable").hide();
        $("#parent .nutritionInformation .availTable[data-val='" + tempId +"']").show();
    
        $("#parent .nutritionInformation .availTable:visible").eq(0).find("tr td").show();
        $("#parent .nutritionInformation .availTable:visible").eq(0).find("tr th").show();

        let pdf = new jspdf.jsPDF('p', 'pt', 'a4', true);
        let pWidth = pdf.internal.pageSize.width;
        let srcWidth = document.getElementById('parent').scrollWidth;
        let margin = 18;
        let scale = (pWidth - margin * 2) / srcWidth;

        let marginVal = (window.navigator.userAgent.indexOf("Edg") > -1)?32:margin;

        

        pdf.html(document.getElementById('parent'), {
            x: marginVal,
            y: margin,
            margin:[48,0,60,0],
            //pagebreak:{mode:['avoid-all','break-before:always','legacy']},//
            //pagebreak:{inside:['avoid-all','page-break-inside:avoid','legacy']},
            //pagebreak:{before:'*'},//
            html2canvas:{
                scale: scale,
            },

            callback: function(){
                let pageCount = pdf.internal.getNumberOfPages(); //Total Page Number
                let totalPages = pdf.internal.getNumberOfPages();
                 for(let i = 1; i <= pageCount; i++) { 
                     pdf.setPage(i); 
                     let pageCurrent = pdf.internal.getCurrentPageInfo().pageNumber; //Current Page
                     $(".currentPage").text(pageCurrent);
                     $(".totalPage").text(totalPages); 
                     pdf.setDrawColor(127,127,127);
                     pdf.setLineWidth(0.5);
                     pdf.line(0, pdf.internal.pageSize.getHeight()-50, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight()-50);
                     pdf.line(pdf.internal.pageSize.getWidth() - 85, pdf.internal.pageSize.getHeight()-48, pdf.internal.pageSize.getWidth() - 85, pdf.internal.pageSize.getHeight() - 2);
                     pdf.setFontSize(7);
                     pdf.autoTable({
                         styles: { fontSize: 7 },
						  columnStyles:{
                            0: {cellWidth: 55},
							1: {cellWidth: 145},
							2: {cellWidth: 150},
							3: {cellWidth: 135},
							4: {cellWidth: 80},
                        },
                         html: "#footer",
                         theme: "plain",
                         startY: 780,
                         margin:{
                             bottom:-40
                         },

                     });
                     pdf.addImage(tableLogo,'png', 20,pdf.internal.pageSize.getHeight() - 38,64,18);
                     if(i > 1){
                        pdf.setFontSize(12);
                        pdf.text(headerTitle, 20, 23);
                        pdf.setDrawColor(0,0,0);
                        pdf.setLineWidth(0.7);
                        pdf.line(0, 37, pdf.internal.pageSize.getWidth(), 37);

                     }
					 if(i == 1){
                         
                         pdf = pdfAddImage(pdf,tableLogo);
                          
                     }
    
                 }
                 pdf.save(headerTitle);
                 $("#parent").addClass("d-none");
                 $("body").css("overflow-y","scroll");
            }
        });
       }
    }

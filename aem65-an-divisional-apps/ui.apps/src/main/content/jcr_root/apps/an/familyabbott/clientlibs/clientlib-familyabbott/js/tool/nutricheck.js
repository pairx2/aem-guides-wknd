function productJsonFetch(jsonName) {
	if($('[name=' + jsonName + ']').length) {
		let productJsonData, jsonPath = $('[name=' + jsonName + ']').val();
		$.getJSON(jsonPath, {
			format: 'json'
		})
		.done(function(data) {
			if(data) {
				productJsonData = data;
				return productJsonData;
			}
		});
	}
}

function productCalc(productName, weight, pID) {
	let retVal = 0, volVal = $("input[name=volume]");
	for(let v in pID) {
		let curPID = pID[v];
		let productCal = 1 * volVal.eq(v).val() / weight * 0.01;
		retVal += curPID[productName] * productCal;
	}
	return retVal;
}

function roundOff(value, decimal) {
	if(decimal == 0) {
		decimal = 1;
	}
	else if(decimal == 1) {
		decimal = 10;
	}
	else if(decimal == 2) {
		decimal = 100;
	}
	else if(decimal == 3) {
		decimal = 1000;
	}
	else if(decimal == 4) {
		decimal = 10000;
	}
	return Math.round(value*decimal)/decimal;
}
	
function productSelectedList() {
	let productSelectedListVal = [];
	$(".product-list").each(function(){
		productSelectedListVal.push($(this).find('ul li.selected').attr('data-optionvalue'));
	});
	return productSelectedListVal;
}

$(document).on("click",".product-list li",function(){
	if($(this).closest(".a-dropdown").hasClass("validation-require")){
		$(this).closest(".a-dropdown").removeClass("validation-require");
	}
});

$(document).on("change keyup keydown","[type='number']",function(){
	if($(this).closest(".form-group").hasClass("validation-require")){
		$(this).closest(".form-group").removeClass("validation-require");
	}
});

$(document).on("click", "img.remove-product", function() {
	$(this).parent().remove();
});

function tableHeadCreate() {
	if($("#vitamins-table").length) {
		let vTableTr1 = $("#vitamins-table table tr:first-child th");
		let vTableThead = '<thead>';
		vTableTr1.each(function(){
			let vTableTheadText = $(this).find("p").length ? '<th>'+$(this).find("p").text()+'</th>' : '<th>'+$(this).text()+'</th>';
			vTableThead += vTableTheadText;
		});
		vTableThead += '</thead>';
		$("#vitamins-table table").prepend(vTableThead);
		$("#vitamins-table table tbody tr:first-child").remove();
	}
	
	if($("#minerals-table").length) {
		let mTableTr1 = $("#minerals-table table tr:first-child th");
		let mTableThead = '<thead>';
		mTableTr1.each(function(){
			let mTableTheadText = $(this).find("p").length ? '<th>'+$(this).find("p").text()+'</th>' : '<th>'+$(this).text()+'</th>';
			mTableThead += mTableTheadText;
		});
		mTableThead += '</thead>';
		$("#minerals-table table").prepend(mTableThead);
		$("#minerals-table table tbody tr:first-child").remove();
	}
}

function patientTypePopulate(patientAgeList) {
	$('[name="patient_type"] li').on("click",function() {
		let patientType = $(this).attr('data-optionvalue');
		let patientAgeListDropDown = '';
		if(patientAgeList.length) {
			for(let j in patientAgeList) {
				if(patientAgeList[j].typeName.toLowerCase() == patientType.toLowerCase()) {
					patientAgeListDropDown += '<li data-optionvalue="'+patientAgeList[j].typeId+'" id="field_label_patient-age_'+(j+1)+'"><span class="a-dropdown__option-text">From ' + patientAgeList[j].lowerAge + ' to ' + patientAgeList[j].upperAge + '</span></li>';
				}
			}
			$('[name="patient_age"] li').remove();
			$('[name="patient_age"]').append(patientAgeListDropDown);
			$('[name="patient_age"] li:first-child').click();
			if($('[name="patient_age"]').parent().hasClass('active')) {
				$('[name="patient_age"]').parent().removeClass('active')
			}
		}
	});
}
function nutricheckProductAdd(productListCount) {
	$("#addProduct").on("click",function(){
		let productSelectedEmpty = 0, productSelectedValue = [];
		$(".product-list").each(function() {
			if($(this).find('ul li.selected').attr('data-optionvalue') == undefined) {
				$(this).find('.a-dropdown').addClass("validation-require");
				productSelectedEmpty++;
			}
			else {
				productSelectedValue.push($(this).find('ul li.selected').attr('data-optionvalue'));
			}
		});
		if(productSelectedEmpty == 0) {
			let productListClone = $(".clone-source .cmp-container").clone(true, true);
			productListClone.removeAttr('id').find("#prescribed-volume").val("").removeAttr("id");
			let productListCloneOption = productListClone.find(".product-list .a-dropdown__menu li");
			productListClone.find(".product-list .a-dropdown__field > span").text("Select Product*");
			productListCloneOption.each(function() {
				if(productSelectedValue.indexOf($(this).attr('data-optionvalue')) > -1) {
					productListClone.find(".product-list .a-dropdown__menu li[data-optionvalue='" + $(this).attr('data-optionvalue') + "']").remove();
				}
			});
			productListClone.find(".product-list").attr("id",productListClone.find(".product-list").attr("id")+productListCount);
			productListClone.find(".a-dropdown__title").attr("id",productListClone.find(".a-dropdown__title").attr("id")+productListCount);
			productListClone.find(".a-dropdown-selected").attr("id",productListClone.find(".a-dropdown-selected").attr("id")+productListCount);
			productListClone.find(".a-dropdown__menu").attr("name",productListClone.find(".a-dropdown__menu").attr("name")+productListCount);
			if(productListClone.find(".a-input-field input").closest(".form-group").hasClass("validation-require")) {
				productListClone.find(".a-input-field input").closest(".form-group").removeClass("validation-require");
			}				
			let removeIconImg = $('[name="removeIcon"]').length ? $('[name="removeIcon"]').val() : "/content/dam/an/familyabbott/au-en/nutricheck/remove.svg";
			productListClone.append("<img src="+ removeIconImg +" class='remove-product' />");
			if(productListCount == 1) {
				$(".clone-target .cmp-container").remove();
			}
			$(".clone-target .a-container__content").append(productListClone);
			productListCount++;
		}
	});
}

$(document).ready(function() {
	let productList, patientAgeList, productVitaminsMinerals, productAiRdi, productVitamins, productMinerals, productListCount = 1;
	
	if($('[name="product_list_json"]').length) {
		let productListJSON = $('[name="product_list_json"]').val();
		$.getJSON(productListJSON, {
			format: 'json'
		})
		.done(function(data) {
			if(data) {
				productList = data;
				if(productList.length) {
					let productListDropDown = '';
					for(let i in productList) {
						productListDropDown += '<li data-optionvalue="'+productList[i].productId+'" id="field_label_product-list_'+(i+1)+'"><span class="a-dropdown__option-text">'+productList[i].productName+'</span></li>';
					}
					$('[name="product_details"] li').remove();
					$('[name="product_details"]').append(productListDropDown);
				}
			}
		});
	}
	
	if($('[name="patient_age_json"]').length) {
		let patientAgeListJSON = $('[name="patient_age_json"]').val();
		$.getJSON(patientAgeListJSON, {
			format: 'json'
		})
		.done(function(data) {
			if(data) {
				patientAgeList = data;
				patientTypePopulate(patientAgeList);
			}
		});
	}
	
	if($('[name="product_vitamins_minerals_json"]').length) {
		let productVitaminsMineralsJSON = $('[name="product_vitamins_minerals_json"]').val();
		$.getJSON(productVitaminsMineralsJSON, {
			format: 'json'
		})
		.done(function(data) {
			if(data) {
				productVitaminsMinerals = data;
			}
		});
	}
	
	if($('[name="product_ai_rdi_json"]').length) {
		let productAiRdiJSON = $('[name="product_ai_rdi_json"]').val();
		$.getJSON(productAiRdiJSON, {
			format: 'json'
		})
		.done(function(data) {
			if(data) {
				productAiRdi = data;
			}
		});
	}
	
	if($('[name="product_vitamins_json"]').length) {
		let productVitaminsJSON = $('[name="product_vitamins_json"]').val();
		$.getJSON(productVitaminsJSON, {
			format: 'json'
		})
		.done(function(data) {
			if(data) {
				productVitamins = data;
			}
		});
	}
	
	if($('[name="product_minerals_json"]').length) {
		let productMineralsJSON = $('[name="product_minerals_json"]').val();
		$.getJSON(productMineralsJSON, {
			format: 'json'
		})
		.done(function(data) {
			if(data) {
				productMinerals = data;
			}
		});
	}
	
	if($('[name="patient_age"]').length){
		$('[name="patient_age"] li').remove();
	}
	
	nutricheckProductAdd(productListCount);
	tableHeadCreate();
	
	$("#form-details button[type='submit']").on("click",function(e) {
		e.preventDefault();
		let productVolume = 0, productListEmptyField = 0, volumeEmptyField = 0, patientWeight = $('[name="weight"]').val();
		let productSelectedListArray = productSelectedList(), selectedProductId = [];
		
		let productValueList = "", booleanFalse = false;
		$(".product-list").each(function(){
			productValueList += $(this).find("ul li.selected").text() + ' | ' + $(this).closest(".cmp-container").find('.a-input-field input').val() + ' mL <br/>';
			productVolume += Number($(this).closest(".cmp-container").find('.a-input-field input').val());
			if($(this).find('ul li.selected').attr('data-optionvalue') == undefined) {
				$(this).find('.a-dropdown').addClass("validation-require");
				productListEmptyField++;
			}
			if($(this).closest(".cmp-container").find('.a-input-field input').val() == '') {
				volumeEmptyField++;
			}
		});
		
		if(productListEmptyField == 0 && volumeEmptyField == 0) {
			productValueList = productValueList.substring(0, productValueList.lastIndexOf("<br/>"));
			$(".nutricheck_product_values").html(productValueList);
			$(".nutricheck_patient_values").html($("[name='patient_type'] li.selected").text().replace(/\s/g, '') + ' | ' + $("[name='patient_age'] li.selected").text() + ' | ' + patientWeight + ' Kg');
		
			for(let i in productList) {
				if(productSelectedListArray.indexOf(productList[i].productId.toString()) > -1) {
					selectedProductId.push(productList[i]);
				}
			}
			
			let product_kj = productCalc("kj", patientWeight, selectedProductId);
			let product_kcal = productCalc("kcal", patientWeight, selectedProductId);
			let product_protein = productCalc("protein", patientWeight, selectedProductId);
			let product_carbohydrate = productCalc("carbohydrate", patientWeight, selectedProductId);
			let product_ofsugars = productCalc("ofSugars", patientWeight, selectedProductId);
			let product_fat = productCalc("fat", patientWeight, selectedProductId);
			let product_ofwhichsaturates = productCalc("ofWhichSaturates", patientWeight, selectedProductId);
			let product_fibre = productCalc("fibre", patientWeight, selectedProductId);
			let product_ofwhichfos = productCalc("ofWhichFOS", patientWeight, selectedProductId);
			
			$(".kj-value").text(roundOff(product_kj, 2));
			$(".kcal-value").text(roundOff(product_kcal, 2));
			$(".protein").text(roundOff(product_protein, 4));
			$(".carbohydrate").text(roundOff(product_carbohydrate, 2));
			$(".of-sugars").text(roundOff(product_ofsugars, 2));
			$(".fat").text(roundOff(product_fat, 2));
			$(".of-which-saturates").text(roundOff(product_ofwhichsaturates, 2));
			$(".fibre").text(roundOff(product_fibre, 2));
			$(".of-which-fos").text(roundOff(product_ofwhichfos, 2));
			
			let productVitMin = [];
			for(let j in productVitaminsMinerals) {
				if(productSelectedListArray.indexOf(productVitaminsMinerals[j].productId.toString()) > -1) {
					productVitMin.push(productVitaminsMinerals[j]);
				}
			}
			
			let vitamins = productVitMin[0].vitamins, minerals = productVitMin[0].minerals, vitaminsTableIndex = 0, mineralsTableIndex = 0;
			
			for (let key in vitamins){
				let totalProductVitamins = 0;
				for(let vtotal in productVitMin) {
					totalProductVitamins += productVitMin[vtotal].vitamins[key];
				}
				let prescribedVitaminsVolume = roundOff(totalProductVitamins/productVitMin.length, 2) * productVolume * 0.01;
				productVitamins[key] = roundOff(prescribedVitaminsVolume, 2);
				$("#vitamins-table tbody td:nth-child(3)").eq(vitaminsTableIndex).html(vitamins[key]);
				$("#vitamins-table tbody td:nth-child(4)").eq(vitaminsTableIndex).html(roundOff(prescribedVitaminsVolume, 2));
				vitaminsTableIndex++;
			}
			for (let key in minerals){
				let totalProductMinerals = 0;
				for(let mtotal in productVitMin) {
					totalProductMinerals += productVitMin[mtotal].minerals[key];
				}
				let prescribedMineralsVolume = roundOff(totalProductMinerals/productVitMin.length, 2) * productVolume * 0.01;
				productMinerals[key] = roundOff(prescribedMineralsVolume, 2);
				$("#minerals-table tbody td:nth-child(3)").eq(mineralsTableIndex).html(minerals[key]);
				$("#minerals-table tbody td:nth-child(4)").eq(mineralsTableIndex).html(roundOff(prescribedMineralsVolume, 2));
				mineralsTableIndex++;
			}
			
			let productAiRdiData;
			for(let k in productAiRdi) {
				if($('[name="patient_age"] li.selected').attr('data-optionvalue') == productAiRdi[k].typeId) {
					productAiRdiData = productAiRdi[k];
				}
			}
			
			let productAiRdiVitamins = productAiRdiData.vitamins, productAiRdiVitaminsTableIndex = 0, productAiRdiVitaminsTitle, productAiRdiVitaminsItem;
			$.each(productAiRdiVitamins, function(index, item){
				if(item.ai != booleanFalse){
					productAiRdiVitaminsTitle = "AI";
					productAiRdiVitaminsItem =  item.ai;
				}
				else{
					productAiRdiVitaminsTitle = "RDI";
					productAiRdiVitaminsItem =  item.rdi;
				}
				let productPerPrescribedVitaminsVolume = productVitamins[item.vitaminId];
				let productVitaminsValue = productPerPrescribedVitaminsVolume / productAiRdiVitaminsItem * 100;
				
				$('#vitamins-table tbody td:nth-child(5)').filter(function() {
					return $(this).parent().find("td:first-child p").data('vitamin-id') === item.vitaminId;
				}).html(productAiRdiVitaminsTitle);
				
				let vitaminsTrData = $('#vitamins-table tbody td:nth-child(6)').filter(function() {
					return $(this).parent().find("td:first-child p").data('vitamin-id') === item.vitaminId;
				}).html(roundOff(productVitaminsValue, 0) + '%');
				
				vitaminsTrData.removeClass('green');
				vitaminsTrData.removeClass('ear-green');
				if(productVitaminsValue >= 100) {
					vitaminsTrData.addClass('green');
				}
				else if(productPerPrescribedVitaminsVolume >= item.ear) {
					vitaminsTrData.addClass('ear-green');
				}
				
				let currentVitaminUI = $('#vitamins-table tbody td:nth-child(7)').filter(function() {
					return $(this).parent().find("td:first-child p").data('vitamin-id') === item.vitaminId;
				});
				if(productPerPrescribedVitaminsVolume > parseInt(item.ul)) {
					currentVitaminUI.addClass('red');
				}
				else {
					currentVitaminUI.removeClass('red');
				}
				productAiRdiVitaminsTableIndex++;
			});
			
			let productAiRdiMinerals = productAiRdiData.minerals, productAiRdiMineralsTableIndex = 0, productAiRdiMineralsTitle, productAiRdiMineralsItem;
			$.each(productAiRdiMinerals, function(index, item){
				if(item.ai != booleanFalse){
					productAiRdiMineralsTitle = "AI";
					productAiRdiMineralsItem =  item.ai;
				}
				else{
					productAiRdiMineralsTitle = "RDI";
					productAiRdiMineralsItem =  item.rdi;
				}
				let productPerPrescribedMineralsVolume = productMinerals[item.mineralId];
				let productMineralsValue = productPerPrescribedMineralsVolume / productAiRdiMineralsItem * 100;
				
				$('#minerals-table tbody td:nth-child(5)').filter(function() {
					return $(this).parent().find("td:first-child p").data('mineral-id') === item.mineralId;
				}).html(productAiRdiMineralsTitle);
				
				let mineralsTrData = $('#minerals-table tbody td:nth-child(6)').filter(function() {
					return $(this).parent().find("td:first-child p").data('mineral-id') === item.mineralId;
				}).html(roundOff(productMineralsValue, 0) + '%');
				
				mineralsTrData.removeClass('green');
				mineralsTrData.removeClass('ear-green');
				if(productMineralsValue >= 100) {
					mineralsTrData.addClass('green');
				}
				else if(productPerPrescribedMineralsVolume >= item.ear) {
					mineralsTrData.addClass('ear-green');
				}
				
				let currentVitaminUI = $('#minerals-table tbody td:nth-child(7)').filter(function() {
					return $(this).parent().find("td:first-child p").data('mineral-id') === item.mineralId;
				});
				if(productPerPrescribedMineralsVolume > parseInt(item.ul)) {
					currentVitaminUI.addClass('red');
				}
				else {
					currentVitaminUI.removeClass('red');
				}
				productAiRdiMineralsTableIndex++;
			});
			$(".product_patient_result_container").parent().show();
			$('html,body').animate({
				scrollTop: $(this).closest(".formcontainer").next().offset().top - $(".o-header__sticky-section").height() - 20
			}, 500);
		}
		else {
			$(".product-list").each(function(){
				if(productListEmptyField > 0) {
					if($(this).find('ul li.selected').attr('data-optionvalue') == undefined) {
						$(this).find('.a-dropdown').addClass("validation-require");
					}
				}
				if(volumeEmptyField > 0) {
					if($(this).closest(".cmp-container").find('.a-input-field input').val() == '') {
						$(this).closest(".cmp-container").find('.a-input-field input').closest('.form-group').addClass('validation-require');
					}
				}
			});
		}
	});
	
	$(".nutricheck-print").on("click",function(){
		$(".nutricheck-container > div > div > .cmp-container > div:not(:has(.nutricheck_result_print))").hide();
		$(".abbott-wrapper").hide();
		$(".nutricheck_result_print .cmp-container > div:has(.nutricheck_form_details_values)").show();
		window.print();
		$(".nutricheck-container > div > div > .cmp-container > div").show();
		$(".abbott-wrapper").show();
		$(".nutricheck_result_print .cmp-container > div:has(.nutricheck_form_details_values)").hide();
	});
	
	let isFieldEmpty = function (el) {
		return el.val() == '';
	}
	
	$('.nutricheck-pdf-download').on('click', function(){
		let isWeightEmpty = isFieldEmpty($('#patient-weight'));
		let doc = new jspdf.jsPDF('p', 'pt');
		let detailsColumns = [
			{title: "PRODUCT DETAILS", dataKey: "product"},
			{title: "PATIENT DETAILS", dataKey: "patient"}
		];
		let detailsRow = [
			{ "product" : $('.nutricheck_product_values').html().replaceAll("<br>", " || "), "patient": $('.nutricheck_patient_values').text()},
		];
		let energyColumns = [
			{title: "Energy (kJ / kg)", dataKey: "kj"},
			{title: "Energy (kcal / kg)", dataKey: "kcal"},
			{title: "Protein (g / kg):", dataKey: "protein"}
		];
		let energyRow = [
			{ "kj" : $('.energy-results .kj-value').text(), 
			  "kcal": $('.energy-results .kcal-value').text(),
			  "protein": $('.energy-results .protein').text()
			}
		];

		let vitamins = document.querySelectorAll("#vitamins-table > table")[0];
		let jsonVitamins = doc.autoTableHtmlToJson(vitamins);
		let vitaminsColumns = [
			{title: "VITAMINS"},
			{title: "UNITS"},
			{title: "PER 100\nML"},
			{title: "PER PRESCRIBED\nVOLUME"},
			{title: "RDI OR\nAI"},
			{title: "% RDI / AI MET IN\nPRESCRIBED VOLUME"}
		];

		let minerals = document.querySelectorAll("#minerals-table > table")[0];
		let jsonMinerals = doc.autoTableHtmlToJson(minerals);
		let mineralsColumns = [
			{title: "MINERALS"},
			{title: "UNITS"},
			{title: "PER 100\nML"},
			{title: "PER PRESCRIBED\nVOLUME"},
			{title: "RDI OR\nAI"},
			{title: "% RDI / AI MET IN\nPRESCRIBED VOLUME"}
		];

		//display table with patient and product details
		doc.autoTable(
			detailsColumns, 
			detailsRow, 
			{ 
				startY : 30,
				theme: 'grid',
				fontStyle: 'bold',
				tableLineColor: 255,
				headerStyles: {
					fillColor: [217, 217, 214],
					fontSize: 15,
					textColor: 0,
					halign: 'center',
				},
				bodyStyles: {
					fillColor: [217, 217, 214],
					fontStyle: 'bold',
					textColor: 0,
					halign: 'center',
				}
			}
		);

		//display table with energy ouputs
		if(!isWeightEmpty){
			doc.autoTable(
				energyColumns, 
				energyRow, 
				{ 
					startY : doc.autoTable.previous.finalY,
					theme: 'grid',
					fontStyle: 'bold',
					lineWidth: 1,
					tableLineColor: [217, 217, 214],
					headerStyles: {
						fillColor: [34, 34, 49],
						lineWidth: 1,
						lineColor: [217, 217, 214]
					},
					bodyStyles: {
						fillColor: [255, 255, 255],
						fontStyle: 'bold'
					}
				}
			);
		}

		//display vitamins table
		doc.autoTable(
			vitaminsColumns, 
			jsonVitamins.data, 
			{ 
				startY : doc.autoTable.previous.finalY,
				theme: 'grid',
				headerStyles: {
					fillColor: [34, 34, 49],
					textColor: 255, 
					fontStyle: 'bold',
					lineWidth: 1,
					lineColor: [217, 217, 214]
				},
				columnStyles: {
					0: {columnWidth: 90},
					1: {columnWidth: 50}
				},
				bodyStyles: {
					fillColor: [244, 244, 243],
					lineColor: [217, 217, 214]
				},
				alternateRowStyles: {
					fillColor: [255, 255, 255]
					
				},
				createdCell: function(cell, data) {
					if (cell.column.index === 5 && cell.row.section === "body") { 
						if(cell.row.raw[5].content.replace('%','') < 100) {
							if(cell.row.raw[5]._element.className.indexOf("ear-green") > -1) {
								cell.cell.styles.fillColor = [172, 236, 123]
							}
							else {
								cell.cell.styles.fillColor = [238, 179, 59]
							}
						}
						else {
							cell.cell.styles.fillColor = [154, 182, 69]
						}
					}
				}
			}
		);

		//display minerals table
		doc.autoTable(
			mineralsColumns, 
			jsonMinerals.data,
			{ 
				startY : doc.autoTable.previous.finalY,
				theme: 'grid',
				headerStyles: {
					fillColor: [34, 34, 49],
					textColor: 255, 
					fontStyle: 'bold',
					lineWidth: 1,
					lineColor: [217, 217, 214]
				},
				columnStyles: {
					0: {columnWidth: 90},
					1: {columnWidth: 50}
				},
				bodyStyles: {
					fillColor: [244, 244, 243],
					lineColor: [217, 217, 214]
				},
				alternateRowStyles: {
					fillColor: [255, 255, 255]
					
				},
				createdCell: function(cell) {
					if (cell.column.index === 5 && cell.row.section === "body") { 
						if(cell.row.raw[5].content.replace('%','') < 100) {
							if(cell.row.raw[5]._element.className.indexOf("ear-green") > -1) {
								cell.cell.styles.fillColor = [172, 236, 123]
							}
							else {
								cell.cell.styles.fillColor = [238, 179, 59]
							}
						}
						else {
							cell.cell.styles.fillColor = [154, 182, 69]
						}
					}
				}
			}
		);

		//Chrome and Safari are able to display the preview
		// doc.output('dataurlnewwindow');
		doc.save("NRV.pdf");
	});
});
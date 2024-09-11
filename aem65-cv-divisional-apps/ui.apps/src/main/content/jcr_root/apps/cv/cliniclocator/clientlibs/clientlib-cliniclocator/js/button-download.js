$(document).ready(function() {
	const element = document.getElementById("btnDownload");
	element.addEventListener("click", function() {
		var date = new Date();
		var dropDownType = $("ul[name='poiType'] li.selected").text().replaceAll(' ', '').replaceAll('\n', '') + '-' + date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
		var docDownloadUrl = $("#" + $("ul[name='poiType'] li.selected").attr('data-optionvalue')).find('input[name="downloadDataSource"]').val();
		var timestamp = date.valueOf();
		var apiFullUrl = document.querySelector('[name="API_BASE"]').value + docDownloadUrl + "?q=" + timestamp;
		downloadTableData(dropDownType, apiFullUrl);
	});
});
var headers = {
	id: "id",
	type: "type",
	status: "status",
	name: "name",
	addressOne: "addressOne",
	addressTwo: "addressTwo",
	zone: "zone",
	city: "city",
	country: "country",
	region: "region",
	latitude: "latitude",
	longitude: "longitude",
	zipCode: "zipCode",
	phone: "phone",
	website: "website",
	language: "language",
	deviceType: "deviceType",
	lastName: "lastName",
	firstName: "firstName",
	speciality: "speciality",
	notes: "notes",
	salesRepName: "salesRepName",
	credentials: "credentials",
	salesArea: "salesArea",
	hospital: "hospital",
	physicianPrefix: "physicianPrefix",
	salesRegion: "salesRegion"
};

function downloadTableData(fileName, endPoint) {
	var applicationid = document.querySelector('input[name="x-application-id"]').value;
	var countrycode = document.querySelector('input[name="x-country-code"]').value;
	var prefferedlang = document.querySelector('input[name="x-preferred-language"]').value;
	prefferedlang = prefferedlang.substring(0, 2);
	var jsonHeader = {
		"cache-control": "no-cache",
		"Content-Type": "application/json",
		"x-application-id": applicationid,
		"x-country-code": countrycode,
		"x-preferred-language": prefferedlang,
	};
	var options = {
		method: "GET",
		mode: "cors",
		headers: jsonHeader,
	};
	fetch(endPoint, options).then((response) => {
		if(response.ok) {
			return response.json();
		} else {
			throw new Error("Something went wrong");
		}
	}).then((responseJson) => {
		exportCSVFile(headers, responseJson.response.poiData, fileName);
	}).catch(() => console.log("error occured in downloading"));
}

function convertToCSV(objArray) {
	var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
	var str = '';
	var headerArray = ['id', 'type', 'status', 'name', 'addressOne', 'addressTwo', 'zone', 'city', 'country', 'region', 'geometry', 'zipCode', 'phone', 'website', 'language', 'deviceType', 'lastName', 'firstName', 'speciality', 'notes', 'salesRepName', 'credentials', 'salesArea', 'hospital', 'physicianPrefix', 'salesRegion'];
	for(var i = 0; i < array.length; i++) {
		var indexArray = array[i];
		if(i !== 0) {
			indexArray = rearrangeArray(headerArray, array[i]);
		}
		var line = '';
		for(var index in indexArray) {
			if(line != '') line += ','
			if(index == "geometry") {
				line += '"' + indexArray[index].latitude + '"' + ',' + '"' + indexArray[index].longitude + '"';
			} else {
				line += '"' + indexArray[index] + '"';
			}
		}
		str += line + '\r\n';
	}
	return str;
}

function rearrangeArray(orignalArray, jsonObject) {
	const rearrangedObject = {};
	orignalArray.forEach(value => {
		if(jsonObject.hasOwnProperty(value)) {
			rearrangedObject[value] = jsonObject[value];
		} else {
			rearrangedObject[value] = '';
		}
	});
	return rearrangedObject;
}

function exportCSVFile(headers_data, items, fileTitle) {
	if(headers_data) {
		items.unshift(headers_data);
	}
	// Convert Object to JSON
	var jsonObject = JSON.stringify(items);
	var csv = this.convertToCSV(jsonObject);
	var exportedFilenmae = (fileTitle || "export") + ".csv";
	var blob = new Blob([csv], {
		type: 'text/csv;charset=utf-8;'
	});
	if(navigator.msSaveBlob) { // IE 10+
		navigator.msSaveBlob(blob, exportedFilenmae);
	} else {
		var link = document.createElement("a");
		if(link.download !== undefined) { // feature detection
			// Browsers that support HTML5 download attribute
			var url = URL.createObjectURL(blob);
			link.setAttribute("href", url);
			link.setAttribute("download", exportedFilenmae);
			link.style.visibility = 'hidden';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
	}
}
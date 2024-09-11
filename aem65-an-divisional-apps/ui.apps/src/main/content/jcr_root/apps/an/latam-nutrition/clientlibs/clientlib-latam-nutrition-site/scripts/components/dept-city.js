$(window).on('load',function () {
    setTimeout(function () {
        function onlyUnique(value, index, self) {
              return self.indexOf(value) === index;
        }
        let deptCityResponse = JSON.parse(getItemLocalStorage('deptCityResponse',true));
        if ( $('#dept-city') && $('#dept-city').length && deptCityResponse.length) {
             let deptCityArr = deptCityResponse.map(function (el) {
                return el.parentKey;
            });
            let depCityFinalArr = deptCityArr.filter(onlyUnique).sort();
            $('ul[name="department"] li').remove();
            $.each(depCityFinalArr, function (i, j) {
                $("<li><span>"+ j +"</span></li>").attr("data-optionvalue", j).appendTo('ul[name="department"]');
            });   
        }
    }, 100);
    $("ul[name='department']").closest(".a-dropdown").on('change',function() {
    let deptCityResponse = JSON.parse(getItemLocalStorage('deptCityResponse',true));
        if ( $('#dept-city') && $('#dept-city').length && deptCityResponse.length) {
            let deptName = $($($("ul[name='department']")[0]).siblings()[0]).html().trim();
            let newArray = deptCityResponse.filter(function (el) {
                return el.parentKey == deptName;
            });
            $('ul[name="city"] li').remove();
            $.each(newArray, function (i, j) {
                $("<li><span>"+ j.value +"</span></li>").attr("data-optionvalue", j.value).appendTo('ul[name="city"]');
            });
        }
    });
});
$(document).ready(function () {
	setTimeout(function () {
		let formNameList = ["department","city","altura","peso"];
		for(let i in formNameList) {
			let deptCityAlturaList;
			if($("[name='"+formNameList[i]+"']").length && $("[name='"+formNameList[i]+"'] li").length && $("[name='"+formNameList[i]+"'] li").length > 100) {
				deptCityAlturaList = $("[name='"+formNameList[i]+"']").html();
				$("[name='"+formNameList[i]+"']").empty().append(deptCityAlturaList);
			}
		}
	}, 1000);
});
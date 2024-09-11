//myResurce-page

//Fetch all bookmarked Item and tab details
function getBookmarkData()
{	
    hideDeleteSortfied();
    const modulearrName = getallTabname();
    sessionStorage.setItem('moduleNames', JSON.stringify(modulearrName));	
	const bookmarkData = getSessionStorage('bookmark_list');
    let checkBookmarkData = (bookmarkData === null || bookmarkData.length === 0);
	if (checkBookmarkData) {
        let tabName;
        hideDeleteSortfied();
        for(let n in modulearrName){
            tabName = modulearrName[n].replaceAll(" ",'').toLowerCase();
            noDataResourceTable(tabName);
        }        
    }
	else{              
        callResourcetable(modulearrName,bookmarkData);	       
	}	
}
//function to show bookmarked Items
function callResourcetable(moduleArray,bookmarkItem){
    let sessionName;
    for(let i in moduleArray){
        let sessionData = [];
        for(let key in bookmarkItem){
            if (bookmarkItem[key].module === moduleArray[i].toLowerCase() ){
                sessionData.push({ "id": bookmarkItem[key].id, "title": bookmarkItem[key].title,"url": bookmarkItem[key].url, "module": bookmarkItem[key].module,"createdDt": bookmarkItem[key].createdDt});				
            }  
        }
        sessionName = moduleArray[i].replaceAll(" ",'').toLowerCase();
        sessionStorage.setItem(sessionName, JSON.stringify(sessionData));            
        if(sessionData.length>0){
            populateResouceTable(sessionName,sessionData);
            let defaultSort = $("#resourceSort-options li.selected").attr("data-optionvalue").toString();
            sortbyVal(defaultSort);
        }  
        else{
            noDataResourceTable(sessionName);
        }          
    }   
}

//Sorting according to sort option selection
$(document).on("click", "#resourceSort-options li", function (e) {		
	let selectSortOrder = '';	
    selectSortOrder = $(this).attr("data-optionvalue").toString();	    	
	sortbyVal(selectSortOrder);
});
//hide button and sort option
function hideDeleteSortfied(){
    $("#confirmDeleteResources").hide();
    $("#resourceSort-options").hide();
}
// Sort fuction for "ascending,descending,datewise" order
function sortbyVal(sortOrder){
	let sortTab = [];
	sortTab = getallTabname();	
	for(let v in sortTab){
		let tabSession = sortTab[v].replaceAll(" ",'').toLowerCase();
		let sortArray = JSON.parse(sessionStorage.getItem(tabSession));
        if (sortArray != null){
            if(sortArray.length>0){
                if(sortOrder.trim() === "ascending"){
                    sortAscending(sortArray);                    
                    populateResouceTable(tabSession,sortArray);                    
                }
                else if(sortOrder.trim() === "descending"){
                    sortDescending(sortArray);		
                    populateResouceTable(tabSession,sortArray);
                    
                }
                else if(sortOrder.trim() === "dateAscending"){
                    sortDateAscending(sortArray);                    		
                    populateResouceTable(tabSession,sortArray);
                }	
                else if(sortOrder.trim() === "dateDescending"){
                    sortDateDescending(sortArray);                    		
                    populateResouceTable(tabSession,sortArray);
                }
            }           

        }			
					
	}
}

function sortAscending(titleAscending){
    titleAscending.sort(function(a,b){
        let titleStrA = a["title"].toLowerCase();
        let titleStrB = b["title"].toLowerCase();
        if(titleStrA > titleStrB)
        {
            return 1;
        }
        else if(titleStrA < titleStrB)
        {
            return -1;
        }
        return 0;
    });			
}
function sortDescending(titleDescending){
    titleDescending.sort(function(a,b){
        let titlezStrA = a["title"].toLowerCase();
        let titlezStrB = b["title"].toLowerCase();
        if(titlezStrA < titlezStrB)
        {
            return 1;
        }
        else if(titlezStrA > titlezStrB)
        {
            return -1;
        }
        return 0;
    });	
}
function sortDateAscending(dateAscending){
    dateAscending.sort(function(a,b){
        let crDateA = new Date(a["createdDt"]);
        let crDateB = new Date(b["createdDt"]);
        if(crDateA < crDateB)
        {
            return 1;
        }
        else if(crDateA > crDateB)
        {
            return -1;
        }
        return 0;
    });	
}
function sortDateDescending(dateDescending){
    dateDescending.sort(function(a,b){
        let crDateM = new Date(a["createdDt"]);
        let crDateN = new Date(b["createdDt"]);
        if(crDateM > crDateN)
        {
            return 1;
        }
        else if(crDateM < crDateN)
        {
            return -1;
        }
        return 0;
    });	

}
//function to show empty tab content
function noDataResourceTable(categoryName){    
	$("#"+categoryName+" table").attr("id",categoryName+"BookmarkTable");	
    $("#"+categoryName+ " ul").remove();    
	let resourceTableId = $("#"+categoryName+" table").attr("id");	
	$("#"+resourceTableId+ " tbody").remove();
    $("#"+resourceTableId+ " thead").remove();
    $("#"+resourceTableId+ " tbody").remove();
    $("#"+categoryName+ " ul").remove();
	let resourceTblenoData = "";
	resourceTblenoData += "<tbody><tr><td class='noDataText'>No saved articles</td></tr></tbody>";
	$("#"+resourceTableId).append(resourceTblenoData);
}

//populate tabwise table data
function populateResouceTable(category,arrVal)
{
	let resourceArr = arrVal;    
    $("#"+category+" table").attr("id",category+"BookmarkTable");	
    let resourceTable = $("#"+category+" table").attr("id");
    
    $("#"+resourceTable+ " thead").remove();
    $("#"+resourceTable+ " tbody").remove();
    $("#"+category+ " ul").remove();	  
	
	let resourceTblestr = "";
    resourceTblestr += "<thead><tr><th class='tdDelete'></th><th>Saved Item</th><th></th></tr></thead><tbody>";
    for (let item in resourceArr) {	        
        let createDate = resourceArr[item].createdDt;
        let addDay = getDayformat(createDate);
        let addDate = getDateformat(createDate);
        let addTime = getTimeformat(createDate);
        let resourceDate = "added on "+ addDay + ", " + addDate + " at " +addTime;
        resourceTblestr += '<tr>';
        resourceTblestr += "<td><input type='checkbox' name= 'deleteBookmark' id='"+category+"deleteItem"+item+"' value='"+resourceArr[item].id+"' /></td>";
        resourceTblestr += "<td><a href="+resourceArr[item].url+" class='resourceLink'>"+resourceArr[item].title+"</a></td>";
        resourceTblestr += "<td><span>"+resourceDate+"</span></td>";		
        resourceTblestr += '</tr>';
    }
    resourceTblestr += '</tbody>';
    $("#"+resourceTable).append(resourceTblestr);

    let totalRows = $("#"+resourceTable).find('tbody tr:has(td)').length;
    let recordPerPage = $("#paginationCount").val();
    let totalPages = Math.ceil(totalRows / recordPerPage);

    //pagination
    addPagination(resourceTable,category,totalPages);   
    

    $("#"+category+' .pageNumber').click(function () {
        $(this).addClass('focus').siblings().removeClass('focus');
    });

    $("#"+resourceTable).find('tbody tr:has(td)').hide();
    let tr = $('#'+resourceTable+' tbody tr:has(td)');
    for (let m = 0; m <= recordPerPage - 1; m++) {
        $(tr[0]).addClass("topSpace");
        $(tr[m]).show();
    }
    let pageNumber;
    $("#"+category+' .pageNumber').click(function (event) {
        $("#"+resourceTable).find('tbody tr:has(td)').hide();
        pageNumber = $(this).text();

        enableDisablePrevNext(pageNumber,category,totalPages,recordPerPage,tr);
    }); 
    let nextPageNumber;
    $("#"+category+" .page-next").click(function (event) {
        event.preventDefault();
        nextPageNumber = $(this).prevAll("li.focus").next().text();
        if(nextPageNumber>0){
            $("#"+resourceTable).find('tbody tr:has(td)').hide();
            enableDisablePrevNext(nextPageNumber,category,totalPages,recordPerPage,tr);
            $(this).prevAll("li.focus").next('.pageNumber').addClass("focus").siblings().removeClass('focus');            
        }        
    });
	
    let prevPageNumber;
    $("#"+category+" .page-prev").click(function (event) {
        event.preventDefault();
        prevPageNumber = $(this).nextAll("li.focus").prev().text();
        if(prevPageNumber>0){
            $("#"+resourceTable).find('tbody tr:has(td)').hide();
            enableDisablePrevNext(prevPageNumber,category,totalPages,recordPerPage,tr);
            $(this).nextAll("li.focus").prev('.pageNumber').addClass("focus").siblings().removeClass('focus');            
        }
        
    });    
    $("#confirmDeleteResources").addClass("disabled");
    $("#confirmDeleteResources").parent().attr("data-toggle","");
    $("#confirmDeleteResources").css("display","block");
    $("#resourceSort-options").show();
}

// pagination Function
function addPagination(resourceTable,category,totalPages){    

    let $pages = $('<ul id="pages"></ul>');
    $('<li class="page-prev disabled"><a><em class="abt-icon abt-icon-arrow-right arrow-prev"></em></a></li>').appendTo($pages);
    for (let k = 0; k < totalPages; k++) {
        $('<li class="pageNumber">' + (k + 1) + '</li>').appendTo($pages);
    }
    $('<li class="page-next"><a><em class="abt-icon abt-icon-arrow-right"></em></a></li>').appendTo($pages);    
    $pages.appendTo("#"+category);

    let $addmobPages = addMobilePagination(totalPages)   
    $addmobPages.appendTo("#"+category);


    $("#"+category+' #pages .pageNumber:eq(0)').addClass('focus');
    $("#"+category+' #mob_pages .pageNumber:eq(0)').addClass('focus');

    if (totalPages == "1") {
        $("#"+category+" .page-next").addClass("disabled");
    }
    else {
        $("#"+category+" .page-next").removeClass("disabled");
    }

}

function addMobilePagination(totalPages){
    let $mobPages = $('<ul id="mob_pages"></ul>');
    $('<li class="page-prev disabled"><a><em class="abt-icon abt-icon-left-arrow arrow-prev"></em></a></li>').appendTo($mobPages);
    for (let p = 0; p < totalPages; p++) {
        $('<li class="pageNumber">' + (p + 1) + '</li>').appendTo($mobPages);
    }
    $('<li class="totalCount"> of &nbsp;'+totalPages+'</li><li class="page-next"><a><em class="abt-icon abt-icon-right-arrow"></em></a></li>').appendTo($mobPages);
    return $mobPages;
}
function enableDisablePrevNext(currPageNumber,category,totalPages,recordPerPage,tr){
    if (currPageNumber > 1) {
        $("#"+category+" .page-prev").removeClass("disabled");
    }
    else {
        $("#"+category+" .page-prev").addClass("disabled");
    }
    if (currPageNumber == totalPages) {
        $("#"+category+" .page-next").addClass("disabled");
    }
    else {
        $("#"+category+" .page-next").removeClass("disabled");
    }
    let nBegin = (currPageNumber - 1) * recordPerPage;
    let nEnd = currPageNumber * recordPerPage - 1;
    for (let n = nBegin; n <= nEnd; n++) {
        $(tr[nBegin]).addClass("topSpace");
        $(tr[n]).show();
    }

}
//fetch all tabnames
function getallTabname(){
	const alltabName = [];	
	$("#resourcesTab .nav-tabs .nav-item").each(function( index ) {		  
	  alltabName.push($(this).text().trim());
	});
	return alltabName;
}

//fetch Day from date
function getDayformat(createDate){
	let weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

	let dayformat = new Date(createDate);
	return weekday[dayformat.getDay()];
}

//fetch formated date from datefield
function getDateformat(createDate){
	
	let objectDate = new Date(createDate);

	let day = objectDate.getDate();
	if (day < 10) {
		day = '0' + day;
	}

	let month = objectDate.getMonth()+1;
	if (month < 10) {
		month = '0' + month;
	}

	let year = objectDate.getFullYear();
	let dateFormat = day+"/"+month+"/"+year;
	
	return dateFormat;
	
}

//fetch time format
function getTimeformat(createDate){
	let objectTime = new Date(createDate);
	return objectTime.toLocaleTimeString("en-US", {timeZone: "America/New_York",hour: "2-digit",minute: "2-digit"});	
}

$(document).ready(function () {	
    if (isUserLoggedIn()) {
        getBookmarkData();
        let activeTab = $(".nav-tabs a.active").find(".a-tabs__nav-text").text().replaceAll(" ",'').toLowerCase().trim();
        if(activeTab!=""){
            if(($("#"+activeTab+" table tbody tr").length == 0) || ($("#"+activeTab+" table tbody tr td").hasClass("noDataText"))){            
                noDataResourceTable(activeTab);
                $(".noDataText").parents().find(".tabs").next().find("#confirmDeleteResources").hide();
                $(".noDataText").parents().find(".tabs").parent().next().find("#resourceSort-options").hide();
            } 
        }
        
        $("#deleteResources").attr("data-dismiss", "modal");       
    }
    let closeElement = "<span class='siteLeaveclose'><i class='abt-icon abt-icon-cancel'></i></span>"
    $("#siteLeavingPopup-modal").prepend(closeElement); 
    $("#siteLeavingPopup-modal .section-info").parent().attr("id","siteLeavingPopup-section");
    $("#siteLeavingPopup-section .a-container__column:nth-of-type(1) .button .btn").attr("id","siteLeavingPopup-redirect");
    $("#siteLeavingPopup-section .a-container__column:nth-of-type(2) .button .btn").attr("id","siteLeavingPopup-cancel");
});
$(document).on("click","input:checkbox[name=deleteBookmark]",function(){        
    $(this).toggleClass("selActive");
    if($("input:checkbox[name=deleteBookmark]:checked").length>0){            
        $("#confirmDeleteResources").removeClass("disabled");
        $("#confirmDeleteResources").parent().attr("data-toggle","modal");
    }
    else{
        $("#confirmDeleteResources").addClass("disabled");
        $("#confirmDeleteResources").parent().attr("data-toggle","");
    }
    
});
$(".nav-tabs a").click(function(e) {        
    let tabTaxt = $(this).find(".a-tabs__nav-text").text().replaceAll(" ",'').toLowerCase().trim();        
    $("input:checkbox[name=deleteBookmark]").prop('checked', false);
    $("#confirmDeleteResources").addClass("disabled");
    $("#confirmDeleteResources").parent().attr("data-toggle","");
    if(($("#"+tabTaxt+" table tbody tr").length == 0) || ($("#"+tabTaxt+" table tbody tr td").hasClass("noDataText"))){            
        noDataResourceTable(tabTaxt);
        $(".noDataText").parents().find(".tabs").next().find("#confirmDeleteResources").hide();
        $(".noDataText").parents().find(".tabs").parent().next().find("#resourceSort-options").hide();
    }
    else{
        let selectedVal = $("#resourceSort-options ul.a-dropdown__menu li#field_label_resourceSort_1 span").text();		
		$("#resourceSort-options .a-dropdown__field>span").removeClass("a-dropdown__placeholder").addClass("a-dropdown-selected");
		$("#resourceSort-options .a-dropdown__field .a-dropdown-selected").text(selectedVal);
		
		$("#resourceSort-options ul.a-dropdown__menu").attr("aria-activedescendant",selectedVal);
	
		$("#resourceSort-options ul.a-dropdown__menu li").removeClass("selected").removeAttr("area-selected");
		$("#resourceSort-options ul.a-dropdown__menu li#field_label_resourceSort_1").addClass("selected").attr("area-selected","true");
        getBookmarkData();
    }        

});

//delete items from resource list
$(document).on("click","#confirmDeleteResources-modal #deleteResources",function(){
    let deleteResource = new Array();
    const delallTab = getallTabname();       
    for(let j in delallTab){
        let tbleName = delallTab[j].replaceAll(" ",'').toLowerCase();
        $("#"+tbleName+" input:checkbox[name=deleteBookmark]:checked").each(function() {
            deleteResource.push($(this).val());
        });
    }          
    deleteBookmark([`${deleteResource}`],afterBulkDelete);		
    
});	
function afterBulkDelete(){
    fetchBookmarkList();
    getBookmarkData();
    let activeTab = $(".nav-tabs a.active").find(".a-tabs__nav-text").text().replaceAll(" ",'').toLowerCase().trim();
    if(activeTab!=""){
        if(($("#"+activeTab+" table tbody tr").length == 0) || ($("#"+activeTab+" table tbody tr td").hasClass("noDataText"))){            
            noDataResourceTable(activeTab);
            $(".noDataText").parents().find(".tabs").next().find("#confirmDeleteResources").hide();
            $(".noDataText").parents().find(".tabs").parent().next().find("#resourceSort-options").hide();
        } 
    }            
}

let bookmarkArticleLink;
$(document).on("click",".resourceLink",function(e){
    e.preventDefault();
    bookmarkArticleLink = $(this).attr("href");    
    if(isValidUrl(bookmarkArticleLink)){
        let passUrl = new URL(bookmarkArticleLink);        
        let hostName = passUrl.hostname;        
        let isExternal = hostName.indexOf("pediatricproconnect.com");
        
        if(isExternal == -1){
            showSiteLeavepopup(bookmarkArticleLink);
        }
        else{
            window.location.href = bookmarkArticleLink;
        }
    }
    else{
        window.location.href = bookmarkArticleLink;
    }   
    
});

const isValidUrl = urlString=> {
    try { 
        return Boolean(new URL(urlString)); 
    }
    catch(e){ 
        return false; 
    }
}

$(document).on("click",".siteLeaveclose",function(ev){
    ev.preventDefault();
    hideSiteLeavepopup();
});
$(document).on("click","#siteLeavingPopup-cancel",function(evn){
    evn.preventDefault();
    hideSiteLeavepopup();
});
$(document).on("click","#siteLeavingPopup-redirect",function(evnt){
    evnt.preventDefault();
    window.open($(this).attr("href"),"_blank");
    hideSiteLeavepopup();
});


function showSiteLeavepopup(articleLink){
    $("#section-siteLeavingPopup-container").show();
    $("#section-siteLeavingPopup-container").parents("body").find(".abbott-wrapper").addClass("setZindex");
    $("#section-siteLeavingPopup-container").parents("body").find(".columncontrol__column").addClass("setZindex");
    $("#section-siteLeavingPopup-container").parents("body").addClass("popUp-open");
    $("#siteLeavingPopup-section .a-container__column:nth-of-type(1) .button .btn").attr("href",articleLink)
    $("#siteLeavingPopup-modal").show();
}
function hideSiteLeavepopup(){
    $("#section-siteLeavingPopup-container").hide();
    $("#section-siteLeavingPopup-container").parents("body").find(".abbott-wrapper").removeClass("setZindex");
    $("#section-siteLeavingPopup-container").parents("body").find(".columncontrol__column").removeClass("setZindex");
    $("#section-siteLeavingPopup-container").parents("body").removeClass("popUp-open")
    $("#siteLeavingPopup-modal").hide();
}
$(document).ready(function() {
	//dynamic pages  script
	if ($('#chromosome-search-content').hasClass('tab-holder')) {
    $('#pageContent').addClass('dynamicChromosome');
	var newresult1 = $('#chromosom-accordian .m-accordion__content-items');
	var svgHeight = $("#chromosom-accordian").height();
	$("#chromosom .embed .default").height(svgHeight);
	$.each(newresult1, function(index, valueCard) {
        //arrow icon
		var headerindex = $(valueCard).find('.m-accordion__header').addClass('header' + index);
		var buttonIndex = $(valueCard).find('.m-accordion__header .m-accordion__icon-wrapper').addClass('btton' + index);
		var getHeaderClassName = $(headerindex).attr('class').split(' ').pop();
		var getbuttonClassName = $(buttonIndex).attr('class').split(' ').pop();
		$('.' + getbuttonClassName).prependTo('.' + getHeaderClassName);

        //detailsButton
        var wrapperIndex = $(valueCard).find('.m-accordion__header .m-accordion__title-wrapper').addClass('wrapper' + index);
		var detailButtonIndex = $(valueCard).find('.a-button--primary-v2').addClass('detailsHeading' + index).css('float','right');
        if(detailButtonIndex.length > 0){
            var getWrapperClassName = $(wrapperIndex).attr('class').split(' ').pop();
            var getDetailbuttonClassName = $(detailButtonIndex).attr('class').split(' ').pop();
            $('.' + getDetailbuttonClassName).prependTo('.' + getWrapperClassName);
        }
	});

	//on refresh it calls
	$('#chromosom-accordian .m-accordion__content-items').removeAttr('data-cmp-expanded');
	$('#chromosom-accordian .m-accordion__content-items .header0').siblings('.m-accordion__body').removeClass('show');
	$('#chromosom-accordian .m-accordion__content-items .header0').children('.m-accordion__icon-wrapper').attr('aria-expanded', false);
	$('#chromosom-accordian .m-accordion__content-items .header0').find('.m-accordion-toggle').attr('data-toggle', 'expand');
	$('#chromosom-accordian .m-accordion__content-items .header0 ').find('.m-accordion-icon[data-icon = "expand"]').addClass('icon-visible');
	$('#chromosom-accordian .m-accordion__content-items .header0').find('.m-accordion-icon[data-icon = "collapse"]').removeClass('icon-visible');

    $('#chromosom-accordian .m-accordion__body').find('.a-button:eq(0)').addClass('addToCart').siblings('.ghost').remove();
    $('.addToCart').prev('.text').addClass('orderingInfo').prev('.text').addClass('probeinfo');
    $('.orderingInfo table').addClass('orderinfo-table');
    $('.probeinfo table tbody tr:first-child').addClass('th-heading');
	$(".orderingInfo").parent(".cmp-container").attr("Id", "table-OrderInfo");

    $(document).on("click", "table input[type='radio']", function(e) {
        $(this).parents('.orderingInfo').nextAll('.button').removeClass('disabled');

    });

	$('#chromosom .m-accordion__content-items').each(function(index) {
        //add data attr on accordian
        $(this).attr('data-attr', 'svg' + index);
        //fluorophore image add color
		$(this).find('.probeinfo table tr:not(:first-child) td:nth-child(4)').each(function(i) {
            var parentDiv = $(this);
			var gettdfloro = $(this).text().trim();
            var ret = gettdfloro.split(" ");
            var arr = ret.filter(function(e) {
                return String(e).trim();
            });
            for (var j = 0; j < arr.length; j++) {
				// do something with `substr[i]`
				parentDiv.append("<span></span>");
				parentDiv.children('span').addClass('fluorophore-image');
				parentDiv.children('span').addClass('color' + arr[j]);
			}

            if($(this).find('span').length == 2) {
                var lastClass = $(this).find('span:first-child').attr('class').split(' ').pop();
				$(this).find('span:first-child').removeClass(lastClass);
            }
		});

        //icon add
		$(this).find('.probeinfo table tr:not(:first-child) td:nth-child(5) a').each(function(i) {
			$(this).text().trim();
			$(this).append("<img src='' />");
		});

        //radio button according to length
        if($(this).find('.orderingInfo table tr').length >= 3){
            $(this).find('.orderingInfo .orderinfo-table tr:not(:first-child) td:nth-child(1)').each(function(orderindex) {
                $(this).prepend(' <input type="radio" name="orderRadiobtn" id="order' + orderindex + '"/>');
                 $(this).parents('.orderingInfo').nextAll('.button').addClass('disabled');
            });
        }

        if($(this).find('.addToCart').prev('.text').children().children('h5').text() == 'PROBE INFO') {
			$(this).find('.addToCart').prev('.text').addClass('probeinfo').removeClass('orderingInfo');
        }
	});

    //add data attr on svg
	$('#chromosom .cmp-embed svg').each(function(indexx) {
		$(this).attr('data-svg', 'svg' + indexx);
	});

    //add svg on click
	$('#chromosom-accordian .m-accordion__content-items .m-accordion__header').click(function(e) {
		e.stopImmediatePropagation();
         var item = $(this).parents('.m-accordion__content-items');
		if ($(item).prevAll().hasClass('accordionTitlebackground')) {
			$(item).prevAll().removeClass("accordionTitlebackground");
			$(item).prevAll().find(".m-accordion__body").removeClass("show");
			$(item).addClass("accordionTitlebackground");
			$(item).prevAll().find(".m-accordion-toggle").attr("data-toggle","expand");
            $(item).prevAll().find("span[data-icon='expand']").addClass("icon-visible");
            $(item).prevAll().find("span[data-icon='collapse']").removeClass("icon-visible");
		}

		if ($(item).nextAll().hasClass('accordionTitlebackground')) {
			$(item).nextAll().removeClass("accordionTitlebackground");
			$(item).nextAll().find(".m-accordion__body").removeClass("show");
			$(item).addClass("accordionTitlebackground");
			$(item).nextAll().find(".m-accordion-toggle").attr("data-toggle","expand");
            $(item).nextAll().find("span[data-icon='expand']").addClass("icon-visible");
            $(item).nextAll().find("span[data-icon='collapse']").removeClass("icon-visible");
		}
		if ($(item).hasClass('accordionTitlebackground')) {
			var itemindex = $(this).parent().attr('data-attr');
			$("[data-svg = '" + itemindex + "']").show();
			if(itemindex.slice(3) > 4 && itemindex.slice(3) < 12) {	
                var svgIndex2 = $(item).parents('.col-lg-10').siblings('.col-lg-2').find('svg');	
                $(svgIndex2).each(function() {	
                    var mf1 = [];	
                    mf1.push($(this).attr('data-svg'));	
                    if (mf1.includes(itemindex)) {	
                        $(this).parent('.cmp-embed').find('svg').removeClass('svgLineGreater4');	
                        $(this).addClass('svgLineGreater4');	
                    }	
                });	
            }else if(itemindex.slice(3) > 13 && itemindex.slice(3) < 22) {	
                var svgIndex3 = $(item).parents('.col-lg-10').siblings('.col-lg-2').find('svg');	
                $(svgIndex3).each(function() {	
                    var mff1 = [];	
                    mff1.push($(this).attr('data-svg'));	
                    if (mff1.includes(itemindex)) {	
                        $(this).parent('.cmp-embed').find('svg').removeClass('svgLineGreater13');	
                        $(this).addClass('svgLineGreater13');	
                    }	
                });	
            } else if(itemindex.slice(3) > 22) {	
                var svgIndex4 = $(item).parents('.col-lg-10').siblings('.col-lg-2').find('svg');	
                $(svgIndex4).each(function() {	
                    var mff1 = [];	
                    mff1.push($(this).attr('data-svg'));	
                    if (mff1.includes(itemindex)) {	
                        $(this).parent('.cmp-embed').find('svg').removeClass('svgLineGreater13');	
                        $(this).addClass('svgLineGreater22');	
                    }	
                });	
			}
			var svgaccordionHeight = $("#chromosom-accordian").height();
            $("#chromosom .embed svg").height(svgaccordionHeight);
		} else {
			$(item).parents('.col-lg-10').siblings('.col-lg-2').find('svg').removeClass('svgLineGreater4');			
			$(".default").show();
			var svgelseAccordionHeight = $("#chromosom-accordian").height();
            $("#chromosom .embed .default").height(svgelseAccordionHeight);
		}

        $('.orderingInfo').find('h5:nth-child(2)').addClass('ordering-title');
		$('.modal #request-form-modal').parents('.modal').addClass('requestModal');
		var svgAttr = $(this).parents('.m-accordion__content-items').attr('data-attr');
		if($(this).siblings(".m-accordion__body").hasClass("show") == true){
			$(this).siblings(".m-accordion__body").removeClass("show");
            $(this).find("span[data-icon='collapse']").removeClass("icon-visible");
            $(this).find("span[data-icon='expand']").addClass("icon-visible");
		}else{
			$(this).siblings(".m-accordion__body").addClass("show");
            $(this).find("span[data-icon='expand']").removeClass("icon-visible");
            $(this).find("span[data-icon='collapse']").addClass("icon-visible");
		}		
        var svgIndex = svgAttr.slice(3);
        onProductClick(svgIndex);
		$('m-accordion__content-items').removeClass('removeBorder');
		$('.show').parents('.accordionTitlebackground').length?$('.accordionTitlebackground').addClass('removeBorder'):$('.accordionTitlebackground').removeClass('removeBorder');
	});

    //add sub text on accodian heading
	$('.m-accordion__header .m-accordion__title-wrapper h3').each(function(i) {
		var getAccordianText1 = $(this).text();
		var curentText1 = getAccordianText1.split(' ')[0];
		var last = curentText1.charAt(curentText1.length - 1);
        if((curentText1 == 'Vysis') || (curentText1 == 'TelVysion')){
			$(this).parent().prepend("<h6> </h6>");
            $(this).parents('h6').remove();
        }else {
			if(last == ','){
				var curentText2 = getAccordianText1.split(' ')[1];
				var joinArr1 = '';
				$(this).parent().prepend("<h6>" + curentText1 + curentText2 + "</h6>");
				var curentTexts = getAccordianText1.split(' ');
				curentTexts.splice(0, 2);
				joinArr1 = curentTexts.join(' ');
				$(this).text(joinArr1);
			}
			else {
				var joinArr = '';
				$(this).parent().prepend("<h6>" + curentText1 + "</h6>");
				var curentText = getAccordianText1.split(' ');
				curentText.shift();
				joinArr = curentText.join(' ');
				$(this).text(joinArr);
			}
        }
	});

    //on click popup image
	$('table tr td:nth-child(5)').magnificPopup({
		delegate: 'a',
		type: 'image'
	});
	
	//main chromorsome redirection url
	$('#chromosome-selector ul li, #chromosome-selector-bottom ul li').click(function(){
        var getattr = $(this).find('a').attr('href');
		if(getattr != undefined) {
			window.location.href = getattr;
		}
	});
	$('#chromosome-selector, #chromosome-selector-bottom').addClass('chromosome-selector');
	$('.chromosome-selector').parents('.container').addClass('parent-chromosomeSelector');
	$(".text.probeinfo table").find("tr:not(.th-heading) td:nth-child(4)").each(function() {		
		var fluorophoreData = $(this);
		fluorophoreData.html(fluorophoreData.html().replace(/&nbsp;/g, ''));
	});
	//hover functionality
	$(document).on("mouseleave", "#chromosom-accordian .m-accordion__content-items .m-accordion__header", function(f) {
		f.preventDefault();
		if ($("#chromosom-accordian .m-accordion__content-items").find(".show").length != 0) {
			return false;
		}
		else {
			 $(this).parent('.m-accordion__content-items').addClass('accordionTitlebackground').removeClass('removeBorder');
		  $(this).parent('.m-accordion__content-items').prevAll().removeClass("accordionTitlebackground").removeClass('removeBorder');
		  $(this).parent('.m-accordion__content-items').nextAll().removeClass("accordionTitlebackground").removeClass('removeBorder');	
          var svgindex1 = -1;
          onProductClick(svgindex1);
		}
	});
	$(document).on("mouseover", "#chromosom-accordian .m-accordion__content-items .m-accordion__header", function(f) {				
		if ($("#chromosom-accordian .m-accordion__content-items").find(".m-accordion__body.show").length != 0) {
			return false
		}
		else {
          $(this).parent('.m-accordion__content-items').addClass('accordionTitlebackground').removeClass('removeBorder');
		  $(this).parent('.m-accordion__content-items').prevAll().removeClass("accordionTitlebackground").removeClass('removeBorder');
		  $(this).parent('.m-accordion__content-items').nextAll().removeClass("accordionTitlebackground").removeClass('removeBorder');
		  var svgAttr = $(this).parents('.m-accordion__content-items').attr('data-attr');
          var svgIndex = svgAttr.slice(3);
          onProductClick(svgIndex);


		}
	});    

	//image icon fix

	$(".text.probeinfo table").find("tr:not(.th-heading) td:nth-child(5)").each(function () {
		var viewImageData = $(this);			
		var imageHtml = $(this).text();		
		var newViewImage = "<em class='abt-icon abt-icon-expand'></em><span class='a-link__inner-text'>" + imageHtml + "</span>";
		viewImageData.find("a:last-child").addClass("a-link__text a-link__text--has-icon").text('').append(newViewImage);		
	});
	
	}		
	//static pages script
	else {
	$('#pageContent').addClass('staticChromosome');

	var newresult2 = $('#chromosom-accordian .m-accordion__content-items');
	var svgHeight1 = $("#chromosom-accordian").height();
	$("#chromosom .embed .default").height(svgHeight1);
	$.each(newresult2, function(index, valueCard) {
        //arrow icon
		var headerindex = $(valueCard).find('.m-accordion__header').addClass('header' + index);
		var buttonIndex = $(valueCard).find('.m-accordion__header .m-accordion__icon-wrapper').addClass('btton' + index);
		var getHeaderClassName = $(headerindex).attr('class').split(' ').pop();
		var getbuttonClassName = $(buttonIndex).attr('class').split(' ').pop();
		$('.' + getbuttonClassName).prependTo('.' + getHeaderClassName);

        //detailsButton
        var wrapperIndex = $(valueCard).find('.m-accordion__header .m-accordion__title-wrapper').addClass('wrapper' + index);
		var detailButtonIndex = $(valueCard).find('.a-button--primary-v2').addClass('detailsHeading' + index).css('float','right');
        if(detailButtonIndex.length > 0){
            var getWrapperClassName = $(wrapperIndex).attr('class').split(' ').pop();
            var getDetailbuttonClassName = $(detailButtonIndex).attr('class').split(' ').pop();
            $('.' + getDetailbuttonClassName).prependTo('.' + getWrapperClassName);
        }
	});

	//on refresh it calls
	$('#chromosom-accordian .m-accordion__content-items').removeAttr('data-cmp-expanded');
	$('#chromosom-accordian .m-accordion__content-items .header0').siblings('.m-accordion__body').removeClass('show');
	$('#chromosom-accordian .m-accordion__content-items .header0').children('.m-accordion__icon-wrapper').attr('aria-expanded', false);
	$('#chromosom-accordian .m-accordion__content-items .header0').find('.m-accordion-toggle').attr('data-toggle', 'expand');
	$('#chromosom-accordian .m-accordion__content-items .header0 ').find('.m-accordion-icon[data-icon = "expand"]').addClass('icon-visible');
	$('#chromosom-accordian .m-accordion__content-items .header0').find('.m-accordion-icon[data-icon = "collapse"]').removeClass('icon-visible');

    $('#chromosom-accordian .m-accordion__body').find('.a-button:eq(0)').addClass('addToCart').siblings('.ghost').remove();
    $('.addToCart').prev('.text').addClass('orderingInfo').prev('.text').addClass('probeinfo');
    $('.orderingInfo table').addClass('orderinfo-table');
    $('.probeinfo table tbody tr:first-child').addClass('th-heading');
	$(".orderingInfo").parent(".cmp-container").attr("Id", "table-OrderInfo");

    $(document).on("click", "table input[type='radio']", function(e) {
        $(this).parents('.orderingInfo').nextAll('.button').removeClass('disabled');
    });

	$('#chromosom .m-accordion__content-items').each(function(index) {
        //add data attr on accordian
		$(this).attr('data-attr', 'svg' + index);

        //fluorophore image add color
		$(this).find('.probeinfo table tr:not(:first-child) td:nth-child(4)').each(function(i) {
            var parentDiv = $(this);
			var gettdfloro = $(this).text().trim();
            var ret = gettdfloro.split(" ");
            var arr = ret.filter(function(e) {
                return String(e).trim();
            });
			$(this).text('');
            for (var j = 0; j < arr.length; j++) {
				// do something with `substr[i]`
				parentDiv.append("<span></span>");
				parentDiv.children('span').addClass('fluorophore-image');
				parentDiv.children('span').addClass('color' + arr[j]);
			}

            if($(this).find('span').length == 2) {
                var lastClass = $(this).find('span:first-child').attr('class').split(' ').pop();
				$(this).find('span:first-child').removeClass(lastClass);
            }
		});
		
		//click on detail button
        $(this).find('.detailsHeading' + index).click(function(){
        	var getattrofdetails = $(this).find('a').attr('href');
            window.open(getattrofdetails);
        });

        //icon add
		$(this).find('.probeinfo table tr:not(:first-child) td:nth-child(5) a').each(function(i) {
			$(this).text().trim();
			$(this).append("<img src='' />");
		});

        //radio button according to length
        if($(this).find('.orderingInfo table tr').length >= 3){
            $(this).find('.orderingInfo .orderinfo-table tr:not(:first-child) td:nth-child(1)').each(function(orderindex) {
                $(this).prepend(' <input type="radio" name="orderRadiobtn" id="order' + orderindex + '"/>');
                $(this).parents('.orderingInfo').nextAll('.button').addClass('disabled');
            });
        }

        if($(this).find('.addToCart').prev('.text').children().children('h5').text() == 'PROBE INFO') {
			$(this).find('.addToCart').prev('.text').addClass('probeinfo').removeClass('orderingInfo');
        }
	});

	//add data attr on svg
	$('#chromosom .cmp-embed svg').each(function(indexx) {
		$(this).attr('data-svg', 'svg' + indexx);
		$('svg[data-svg="svg'+indexx+'"]').find('g rect, g path').each(function () {
			var fillval = $(this).attr('fill');
			if (fillval.indexOf('url') != -1) {
				$(this).addClass('strokeColor');
				var strokeval = $(this).attr('stroke');
				if((strokeval == 'rgb(0, 0, 0)') || (strokeval == 'none')){
					$(this).attr('fill', '#454545');
				} else {
					$(this).attr('fill', strokeval);
				}
			}
		});
	});

    //add svg on click
	$('#chromosom-accordian .m-accordion__content-items .m-accordion__header').click(function (e) {
		e.preventDefault();
		var item = $(this).parents('.m-accordion__content-items');
		if($(item).find(".m-accordion__body").hasClass("show") == true){
			$(item).find(".m-accordion__body").removeClass("show");
			$(item).removeClass("accordionTitlebackground");
			$(item).find('button').attr('aria-expanded', 'false');
			$(item).find('.m-accordion-toggle').attr('data-toggle', 'expand');
			$(item).find('.m-accordion-icon[data-icon = "collapse"]').removeClass('icon-visible');
			$(item).find('.m-accordion-icon[data-icon = "expand"]').addClass('icon-visible');
		}else{
			$(item).find(".m-accordion__body").addClass("show");
			$(item).addClass("accordionTitlebackground");
			$(item).find('button').attr('aria-expanded', 'true');
			$(item).find('.m-accordion-toggle').attr('data-toggle', 'collapse');
			$(item).find('.m-accordion-icon[data-icon = "expand"]').removeClass('icon-visible');
			$(item).find('.m-accordion-icon[data-icon = "collapse"]').addClass('icon-visible');
		}
		e.stopImmediatePropagation();

		if ($(item).nextAll().hasClass('accordionTitlebackground') || $(item).prevAll().hasClass('accordionTitlebackground')) {
			$(item).nextAll().removeClass("accordionTitlebackground");
			$(item).prevAll().removeClass("accordionTitlebackground");
			$(item).nextAll().find(".m-accordion__body").removeClass("show");
			$(item).prevAll().find(".m-accordion__body").removeClass("show");
			$(item).addClass("accordionTitlebackground");
			$(item).nextAll().find(".m-accordion-toggle").attr("data-toggle","expand");
			$(item).prevAll().find(".m-accordion-toggle").attr("data-toggle","expand");
            $(item).nextAll().find("span[data-icon='expand']").addClass("icon-visible");
            $(item).prevAll().find("span[data-icon='expand']").addClass("icon-visible");
            $(item).nextAll().find("span[data-icon='collapse']").removeClass("icon-visible");
            $(item).prevAll().find("span[data-icon='collapse']").removeClass("icon-visible");
		}

		if ($(item).hasClass('accordionTitlebackground') == true) {
			var itemindex = $(this).parent().attr('data-attr');
			$("[data-svg*='svg']").hide();
			$("[data-svg = '" + itemindex + "']").show();
			
			if(itemindex.slice(3) < 4){
				var svgIndex0 = $(item).parents('.col-lg-10').siblings('.col-lg-2').find('svg');	
                $(svgIndex0).each(function() {	
                    var mff0 = [];	
                    mff0.push($(this).attr('data-svg'));	
                    if (mff0.includes(itemindex)) {	
						if(window.location.href.indexOf("int/en/chromosome-main/y") > 1 || window.location.href.indexOf("us/en/chromosome-main/y") > 1) {	
							$(this).parent('.cmp-embed').find('svg').removeClass('svgLineGreater3');	
							$(this).addClass('svgLineGreater3');
						}
                    }	
                });	
			} else if(itemindex.slice(3) >= 4 && itemindex.slice(3) < 9) {	
                var svgIndex2 = $(item).parents('.col-lg-10').siblings('.col-lg-2').find('svg');	
                $(svgIndex2).each(function() {	
                    var mf2 = [];	
                    mf2.push($(this).attr('data-svg'));	
                    if (mf2.includes(itemindex)) {
						if(window.location.href.indexOf("us/en/chromosome-main/22") > 1 || window.location.href.indexOf("int/en/chromosome-main/x") > 1 || window.location.href.indexOf("int/en/chromosome-main/y") > 1 || window.location.href.indexOf("us/en/chromosome-main/y") > 1) {	
							$(this).parent('.cmp-embed').find('svg').removeClass('svgLineGreater6 svgLineGreater4');	
							$(this).addClass('svgLineGreater6');
						} else {	
							$(this).parent('.cmp-embed').find('svg').removeClass('svgLineGreater4');	
							$(this).addClass('svgLineGreater4');
						}	
                    }	
                });	
            }else if(itemindex.slice(3) >= 9 && itemindex.slice(3) < 14) {	
                var svgIndex3 = $(item).parents('.col-lg-10').siblings('.col-lg-2').find('svg');
				$(svgIndex3).each(function() {	
					var mff3 = [];	
					mff3.push($(this).attr('data-svg'));
					if (mff3.includes(itemindex)) {
						if(window.location.href.indexOf("int/en/chromosome-main/7") > 1 || window.location.href.indexOf("us/en/chromosome-main/7") > 1) {	
							$(this).parent('.cmp-embed').find('svg').removeClass('svgLineGreater10 svgLineGreater9');	
							$(this).addClass('svgLineGreater10');
						} else if(window.location.href.indexOf("int/en/chromosome-main/22") > 1 || window.location.href.indexOf("int/en/chromosome-main/5") > 1 || window.location.href.indexOf("us/en/chromosome-main/5") > 1) {	
							$(this).parent('.cmp-embed').find('svg').removeClass('svgLineGreater13 svgLineGreater9');	
							$(this).addClass('svgLineGreater13');
						} else if(window.location.href.indexOf("int/en/chromosome-main/x") > 1 
						|| window.location.href.indexOf("int/en/chromosome-main/y") > 1 || window.location.href.indexOf("int/en/chromosome-main/15") > 1 
						|| window.location.href.indexOf("us/en/chromosome-main/15") > 1) {	
							$(this).parent('.cmp-embed').find('svg').removeClass('svgLineGreater6 svgLineGreater9');	
							$(this).addClass('svgLineGreater6');
						} else{
							$(this).parent('.cmp-embed').find('svg').removeClass('svgLineGreater9');	
							$(this).addClass('svgLineGreater9');
						}
					}	
				});	
            }else if(itemindex.slice(3) >= 14 && itemindex.slice(3) < 19) {	
                var svgIndex6 = $(item).parents('.col-lg-10').siblings('.col-lg-2').find('svg');	
                $(svgIndex6).each(function() {	
                    var mff6 = [];	
                    mff6.push($(this).attr('data-svg'));	
                    if (mff6.includes(itemindex)) {	
						if(window.location.href.indexOf("int/en/chromosome-main/7") > 1 || window.location.href.indexOf("us/en/chromosome-main/7") > 1) {	
							$(this).parent('.cmp-embed').find('svg').removeClass('svgLineGreater7 svgLineGreater13');	
							$(this).addClass('svgLineGreater7');
						} else if(window.location.href.indexOf("int/en/chromosome-main/15") > 1 || window.location.href.indexOf("int/en/chromosome-main/x") > 1 || window.location.href.indexOf("int/en/chromosome-main/y") > 1) {	
							$(this).parent('.cmp-embed').find('svg').removeClass('svgLineGreater6 svgLineGreater13');	
							$(this).addClass('svgLineGreater6');
						} else {
							$(this).parent('.cmp-embed').find('svg').removeClass('svgLineGreater13');	
                        	$(this).addClass('svgLineGreater13');
						}	
                    }	
                });	
            } else if(itemindex.slice(3) >= 19 && itemindex.slice(3) < 23) {	
                var svgIndex4 = $(item).parents('.col-lg-10').siblings('.col-lg-2').find('svg');	
                $(svgIndex4).each(function() {	
                    var mff4 = [];	
                    mff4.push($(this).attr('data-svg'));	
                    if (mff4.includes(itemindex)) {	
						if(window.location.href.indexOf("int/en/chromosome-main/9") > 1 || window.location.href.indexOf("int/en/chromosome-main/11") > 1) {	
							$(this).parent('.cmp-embed').find('svg').removeClass('svgLineGreater7 svgLineGreater22');	
							$(this).addClass('svgLineGreater7');
						} else if(window.location.href.indexOf("int/en/chromosome-main/13") > 1 || window.location.href.indexOf("int/en/chromosome-main/17") > 1 || window.location.href.indexOf("us/en/chromosome-main/17") > 1 || window.location.href.indexOf("int/en/chromosome-main/18") > 1) {	
							$(this).parent('.cmp-embed').find('svg').removeClass('svgLineGreater13 svgLineGreater22');	
							$(this).addClass('svgLineGreater13');
						}else{
							$(this).parent('.cmp-embed').find('svg').removeClass('svgLineGreater22');	
                        	$(this).addClass('svgLineGreater22');
						}	
                    }	
                });	
			} else if(itemindex.slice(3) >= 23) {
				var svgIndex5 = $(item).parents('.col-lg-10').siblings('.col-lg-2').find('svg');	
                $(svgIndex5).each(function() {	
                    var mff5 = [];	
                    mff5.push($(this).attr('data-svg'));	
                    if (mff5.includes(itemindex)) {	
						if(window.location.href.indexOf("int/en/chromosome-main/7") > 1) {	
							$(this).parent('.cmp-embed').find('svg').removeClass('svgLineGreater22');	
							$(this).addClass('svgLineGreater22');
						} else if (window.location.href.indexOf("int/en/chromosome-main/17") > 1){
							$(this).parent('.cmp-embed').find('svg').removeClass('svgLineGreater13');	
							$(this).addClass('svgLineGreater13');
						} else if (window.location.href.indexOf("int/en/chromosome-main/9") > 1){
							$(this).parent('.cmp-embed').find('svg').removeClass('svgLineGreater7');	
							$(this).addClass('svgLineGreater7');
						}
                    }	
                });	
			}
			var svgaccordionHeight = $("#chromosom-accordian").height();
            $("#chromosom .embed svg").height(svgaccordionHeight);
		} 
		else {
			var itemElseindex = $(this).parent().attr('data-attr');
			$(item).parents('.col-lg-10').siblings('.col-lg-2').find('svg').removeClass('svgLineGreater4');			
			$("[data-svg = " + itemElseindex + "]").hide();
			$(".default").show();
			var svgelseAccordionHeight = $("#chromosom-accordian").height();
            $("#chromosom .embed .default").height(svgelseAccordionHeight);
		}

        $('.orderingInfo').find('h5:nth-child(2)').addClass('ordering-title');
		$('.modal #request-form-modal').parents('.modal').addClass('requestModal');
		$('.modal #hybrid-image-popup').parents('.modal').addClass('hybrid-image-popup');
		if($('.modal #hybrid-image-popup').parents('.modal').find('.hybrid-image-popup .generic-modal__content').height() > 450){
			$(this).css('overflow-y', 'scroll');
		}else{
			$(this).css('overflow-y', 'hidden');
		}
	});

    //add sub text on accodian heading
	$('#chromosom-accordian .m-accordion__header .m-accordion__title-wrapper h3').each(function(i) {
		var getAccordianText1 = $(this).text();
		var curentText1 = getAccordianText1.split(' ')[0];
		var last = curentText1.charAt(curentText1.length - 1);
        if((curentText1 == 'Vysis') || (curentText1 == 'TelVysion')){
			$(this).parent().prepend("<h6> </h6>");
            $(this).parents('h6').remove();
        }else {
			if(last == ','){
				var curentText2 = getAccordianText1.split(' ')[1];
				var joinArr1 = '';
				$(this).parent().prepend("<h6>" + curentText1 + curentText2 + "</h6>");
				var curentTexts = getAccordianText1.split(' ');
				curentTexts.splice(0, 2);
				joinArr1 = curentTexts.join(' ');
				$(this).text(joinArr1);
			}
			else {
				var joinArr = '';
				$(this).parent().prepend("<h6>" + curentText1 + "</h6>");
				var curentText = getAccordianText1.split(' ');
				curentText.shift();
				joinArr = curentText.join(' ');
				$(this).text(joinArr);
			}
        }
	});
	
	//regulartory status text
	$(this).find('#table-OrderInfo .orderingInfo h5:nth-child(2)').each(function(i) {
		var spanVal = $(this).parents('.m-accordion__body').siblings('.m-accordion__header').find('h6').text();
		var twospanVal = spanVal.split(',')[0];
		//remove bracket in last element of regulartory status
		var orderingbracsText = $(this).text();
        if(orderingbracsText.endsWith(")")){
            var reBrackets = /\((.*?)\)/g;
            var arrBracketIndex = orderingbracsText.match(reBrackets);
            if(arrBracketIndex != null){
                var lastElement = arrBracketIndex[arrBracketIndex.length - 1];
                $(this).text(orderingbracsText.replace(lastElement,''));
            }
        }
		//append the span value in regulartory status
		if(twospanVal.trim() === ""){
			$(this).append("<span class='lastBrackselement'></span>");
		}else{
			$(this).append("<span class='lastBrackselement'> ("+twospanVal+")</span>");
		}
	});

    //on click popup image
	$('#chromosom-accordian table tr td:nth-child(5)').magnificPopup({
		delegate: 'a',
		type: 'image',
		mainClass: 'chromosomePopup'
	});
	
	//main chromorsome redirection url
	$('#chromosome-selector ul li:not(:first-child)').click(function(){
        var getattr = $(this).find('a').attr('href');
		window.location.href = getattr;
	});
	$('#chromosome-selector, #chromosome-selector-last').addClass('chromosome-selector');
	$('.chromosome-selector').parents('.container').addClass('parent-chromosomeSelector');
	$(".text.probeinfo table").find("tr:not(.th-heading) td:nth-child(4)").each(function() {		
		var fluorophoreData = $(this);
		fluorophoreData.html(fluorophoreData.html().replace(/&nbsp;/g, ''));
	});
	//hover functionality
	$(document).on("mouseleave", "#chromosom-accordian .m-accordion__content-items .m-accordion__header", function(f) {
		f.preventDefault();
		if ($("#chromosom-accordian .m-accordion__content-items").find(".show").length != 0) {
			return false;
		}
		else {
			var itemsHover = $(this).parent('.m-accordion__content-items');
			var itemElseindexHover = $(this).parent().attr('data-attr');
			$(itemsHover).parents('.col-lg-10').siblings('.col-lg-2').find('svg').removeClass('svgLineGreater4')
			$("[data-svg = " + itemElseindexHover + "]").hide();
			$(".default").show();		
			var svgElseHoverAccordionHeight = $("#chromosom-accordian").height();
            $("#chromosom .embed .default").height(svgElseHoverAccordionHeight);
		}
	});
	$(document).on("mouseover", "#chromosom-accordian .m-accordion__content-items .m-accordion__header", function(f) {		
		var itemHover = $(this).parents('.m-accordion__content-items');
		if ($("#chromosom-accordian .m-accordion__content-items").find(".m-accordion__body.show").length != 0) {
			return false
		}
		else {
			var itemHoverindex = $(this).parent().attr('data-attr');
			$("[data-svg*='svg']").hide();
			$("[data-svg = '" + itemHoverindex + "']").show();

			if(itemHoverindex.slice(3) < 4){
				var svgIndexHover0 = $(itemHover).parents('.col-lg-10').siblings('.col-lg-2').find('svg');	
                $(svgIndexHover0).each(function() {	
                    var mfHover0 = [];	
                    mfHover0.push($(this).attr('data-svg'));	
                    if (mfHover0.includes(itemHoverindex)) {	
						if(window.location.href.indexOf("int/en/chromosome-main/y") > 1 || window.location.href.indexOf("us/en/chromosome-main/y") > 1) {	
							$(this).parent('.cmp-embed').find('svg').removeClass('svgLineGreater3');	
							$(this).addClass('svgLineGreater3');
						}
                    }	
                });	
			} else if(itemHoverindex.slice(3) >= 4 && itemHoverindex.slice(3) < 9) {	
                var svgIndexHover2 = $(itemHover).parents('.col-lg-10').siblings('.col-lg-2').find('svg');	
                $(svgIndexHover2).each(function() {	
                    var mfHover2 = [];	
                    mfHover2.push($(this).attr('data-svg'));	
                    if (mfHover2.includes(itemHoverindex)) {
						if(window.location.href.indexOf("us/en/chromosome-main/22") > 1 || window.location.href.indexOf("int/en/chromosome-main/x") > 1 || window.location.href.indexOf("int/en/chromosome-main/y") > 1 || window.location.href.indexOf("us/en/chromosome-main/y") > 1) {	
							$(this).parent('.cmp-embed').find('svg').removeClass('svgLineGreater6 svgLineGreater4');	
							$(this).addClass('svgLineGreater6');
						}else {	
							$(this).parent('.cmp-embed').find('svg').removeClass('svgLineGreater4');	
							$(this).addClass('svgLineGreater4');
						}	
                    }	
                });	
            }else if(itemHoverindex.slice(3) >= 9 && itemHoverindex.slice(3) < 14) {	
                var svgIndexHover6 = $(itemHover).parents('.col-lg-10').siblings('.col-lg-2').find('svg');	
                $(svgIndexHover6).each(function() {	
                    var mffHover6 = [];	
                    mffHover6.push($(this).attr('data-svg'));	
                    if (mffHover6.includes(itemHoverindex)) {
						if(window.location.href.indexOf("int/en/chromosome-main/7") > 1 || window.location.href.indexOf("us/en/chromosome-main/7") > 1) {	
							$(this).parent('.cmp-embed').find('svg').removeClass('svgLineGreater10 svgLineGreater9');	
							$(this).addClass('svgLineGreater10');
						} else if(window.location.href.indexOf("int/en/chromosome-main/22") > 1 || window.location.href.indexOf("int/en/chromosome-main/5") > 1 || window.location.href.indexOf("us/en/chromosome-main/5") > 1) {	
							$(this).parent('.cmp-embed').find('svg').removeClass('svgLineGreater13 svgLineGreater9');	
							$(this).addClass('svgLineGreater13');
						} else if(window.location.href.indexOf("int/en/chromosome-main/x") > 1 
						|| window.location.href.indexOf("int/en/chromosome-main/y") > 1 || window.location.href.indexOf("int/en/chromosome-main/15") > 1 || window.location.href.indexOf("us/en/chromosome-main/15") > 1) {	
							$(this).parent('.cmp-embed').find('svg').removeClass('svgLineGreater6 svgLineGreater9');	
							$(this).addClass('svgLineGreater6');
						} else{
							$(this).parent('.cmp-embed').find('svg').removeClass('svgLineGreater9');	
							$(this).addClass('svgLineGreater9');
						}
					}	
                });	
            } else if(itemHoverindex.slice(3) >= 14 && itemHoverindex.slice(3) < 19) {	
                var svgIndexHover3 = $(itemHover).parents('.col-lg-10').siblings('.col-lg-2').find('svg');	
                $(svgIndexHover3).each(function() {	
                    var mffHover3 = [];	
                    mffHover3.push($(this).attr('data-svg'));	
                    if (mffHover3.includes(itemHoverindex)) {	
                        if(window.location.href.indexOf("int/en/chromosome-main/7") > 1 || window.location.href.indexOf("us/en/chromosome-main/7") > 1) {	
							$(this).parent('.cmp-embed').find('svg').removeClass('svgLineGreater7 svgLineGreater13');	
							$(this).addClass('svgLineGreater7');
						} else if(window.location.href.indexOf("int/en/chromosome-main/15") > 1 || window.location.href.indexOf("int/en/chromosome-main/x") > 1 || window.location.href.indexOf("int/en/chromosome-main/y") > 1) {	
							$(this).parent('.cmp-embed').find('svg').removeClass('svgLineGreater6 svgLineGreater13');	
							$(this).addClass('svgLineGreater6');
						} else{
							$(this).parent('.cmp-embed').find('svg').removeClass('svgLineGreater13');	
                        	$(this).addClass('svgLineGreater13');
						}	
                    }	
                });	
			}else if(itemHoverindex.slice(3) >= 19 && itemHoverindex.slice(3) < 23) {	
                var svgIndexHover4 = $(itemHover).parents('.col-lg-10').siblings('.col-lg-2').find('svg');	
                $(svgIndexHover4).each(function() {	
                    var mffHover4 = [];	
                    mffHover4.push($(this).attr('data-svg'));	
                    if (mffHover4.includes(itemHoverindex)) {	
						if(window.location.href.indexOf("int/en/chromosome-main/9") > 1 || window.location.href.indexOf("int/en/chromosome-main/11") > 1) {	
							$(this).parent('.cmp-embed').find('svg').removeClass('svgLineGreater7 svgLineGreater22');	
							$(this).addClass('svgLineGreater7');
						} else if(window.location.href.indexOf("int/en/chromosome-main/13") > 1 || window.location.href.indexOf("int/en/chromosome-main/17") > 1 || window.location.href.indexOf("us/en/chromosome-main/17") > 1 || window.location.href.indexOf("int/en/chromosome-main/18") > 1) {	
							$(this).parent('.cmp-embed').find('svg').removeClass('svgLineGreater13 svgLineGreater22');	
							$(this).addClass('svgLineGreater13');
						} else {
							$(this).parent('.cmp-embed').find('svg').removeClass('svgLineGreater22');	
							$(this).addClass('svgLineGreater22');	
						}
                    }	
                });	
			} else if(itemHoverindex.slice(3) >= 23) {
				var svgIndexHover5 = $(itemHover).parents('.col-lg-10').siblings('.col-lg-2').find('svg');	
                $(svgIndexHover5).each(function() {	
                    var mffHover5 = [];	
                    mffHover5.push($(this).attr('data-svg'));	
                    if (mffHover5.includes(itemHoverindex)) {	
						if(window.location.href.indexOf("int/en/chromosome-main/7") > 1) {	
							$(this).parent('.cmp-embed').find('svg').removeClass('svgLineGreater22');	
							$(this).addClass('svgLineGreater22');
						} else if (window.location.href.indexOf("int/en/chromosome-main/17") > 1){
							$(this).parent('.cmp-embed').find('svg').removeClass('svgLineGreater13');	
							$(this).addClass('svgLineGreater13');
						} else if (window.location.href.indexOf("int/en/chromosome-main/9") > 1){
							$(this).parent('.cmp-embed').find('svg').removeClass('svgLineGreater7');	
							$(this).addClass('svgLineGreater7');
						}
                    }	
                });	
			}
			var svgHoverAccordionHeight = $("#chromosom-accordian").height();
            $("#chromosom .embed svg").height(svgHoverAccordionHeight);
		}
	});
	//image icon fix
	$(".text.probeinfo table").find("tr:not(.th-heading) td:nth-child(5)").each(function () {
		var viewImageData = $(this);			
		var imageHtml = $(this).text();		
		var newViewImage = "<em class='abt-icon abt-icon-expand'></em><span class='a-link__inner-text'>" + imageHtml + "</span>";
		viewImageData.find("a:last-child").addClass("a-link__text a-link__text--has-icon").text('').append(newViewImage);		
	});
  }
});

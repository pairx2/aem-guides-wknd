$('#product-comparison_download-pdf').click(function() {
    $('.header-compare').removeClass("d-none");
    $('.footer-compare').removeClass("d-none");
    let tableLogo = $(".tableImg img").attr("src");

    $('#products-compare-data').addClass('dynamic-product-compare pdf');
    $('.cmp-product-detail__buttons, .removeProduct').addClass('d-none');

    let headerTitle = 'Product Comparison';

    //JS for Mobile PDF Start
     if ($(window).width() < 768){
         $('.dynamicTitle .subtitle').each(function(index){
             let divheight =$(this).outerHeight();
             let divtext = $(this).text();
             $('.subtitle[data-title="'+divtext+'"]').css('height', divheight);
         });
         $(".leftTitleSection .productdata p").css("height",$(".topTitle").outerHeight());
         $(".topTitle").css("height",$(".topTitle").outerHeight());         
     }

    //JS for Mobile PDF End

    let pdf = new jspdf.jsPDF('p', 'pt', 'a4', true);
    let pWidth = pdf.internal.pageSize.width;
    let srcWidth = document.getElementById('products-compare-data').scrollWidth;
    let margin = 18;
    let scale = (pWidth - margin * 2) / srcWidth;
    pdf.html(document.getElementById('products-compare-data'), {
        x: margin,
        y: margin,
        margin: [50, 0, 68, 0],
        html2canvas: {
            scale: scale,
        },
        callback: function() {

            let pageCount = pdf.internal.getNumberOfPages();
            let totalPages = pdf.internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                pdf.setPage(i);
                let pageCurrent = pdf.internal.getCurrentPageInfo().pageNumber; //Current Page
                $(".currentPage").text(pageCurrent);
                $(".totalPage").text(totalPages);
                
                pdf.setDrawColor(127, 127, 127);
                pdf.setLineWidth(0.8);
                pdf.line(0, pdf.internal.pageSize.getHeight()-50, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight()-50);
                     pdf.line(pdf.internal.pageSize.getWidth() - 85, pdf.internal.pageSize.getHeight()-48, pdf.internal.pageSize.getWidth() - 85, pdf.internal.pageSize.getHeight() - 2);

                pdf.setFontSize(7);

                pdf.autoTable({
                    styles: {
                        fontSize: 7
                    },
                    columnStyles: {
                        0: {cellWidth: 65},
                        1: {cellWidth: 145},
                        2: {cellWidth: 145},
                        3: {cellWidth: 135},
                        4: {cellWidth: 90},
                    },
                    html: "#footer",
                    bodyStyles: {
                        minCellHeight: 15
                    },
                    theme: "plain",
                    startY: 795,
                    margin: {
                        bottom: -50
                    },
                });
                pdf.addImage(tableLogo, 25, pdf.internal.pageSize.getHeight() - 41, 64, 18);

                pdf.setFontSize(12);
                pdf.text(headerTitle, 20, 23);
                pdf.setDrawColor(0, 0, 0);
                pdf.setLineWidth(0.7);
                pdf.line(0, 37, pdf.internal.pageSize.getWidth(), 37);
            }

			//JS for Tablet PDF Start
            if ($(window).width() > 768 && $(window).width() < 991){
                $('.dynamicTitle .subtitle').each(function(index){
                    let divheight =$(this).outerHeight();
                    let divtext = $(this).text();
                    $('.subtitle[data-title="'+divtext+'"]').css('height', divheight);
                });
                $(".leftTitleSection .productdata p").css("height",$(".topTitle").outerHeight());
                $(".topTitle").css("height",$(".topTitle").outerHeight());
                
            }
			//JS for Mobile PDF End
	        pdf.save('productComparison.pdf');
            $('.cmp-product-detail__buttons').removeClass('d-none');
            $('.removeProduct').removeClass('d-none');
            $('#products-compare-data').removeClass('pdf');
           
            //JS for Tablet PDF Start
             if ($(window).width() > 768 && $(window).width() < 991){
                $('.dynamicTitle .subtitle').each(function(index){
                    let divheight =$(this).outerHeight();
                    let divtext = $(this).text();
                    $('.subtitle[data-title="'+divtext+'"]').css('height', divheight);
                });
                $(".leftTitleSection .productdata p").css("height",$(".topTitle").outerHeight());
                $(".topTitle").css("height",$(".topTitle").outerHeight());                
            }
            //JS for Tablet PDF End
        }
    });

    $('.cmp-product-detail__buttons a').removeClass('hide-section');
    $('.header-compare').addClass("d-none");
    $('.footer-compare').addClass("d-none");

});
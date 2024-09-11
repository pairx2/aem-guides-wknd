let ascending;
let myList;
let articleAnchors ;
let defaultSortedEle="";

	$('#sort-by-options .a-dropdown ul li').click(function() {

            let sortByOrder = $(this).attr('data-optionvalue');
        	let fragmentSize = $('.contentfragmentlist').children().length;
            let firstFragmentList = $('.contentfragmentlist').children()[0];

    		if(fragmentSize>1) {
                for(let i=0 ; i<fragmentSize ; i++)
                {
                    let nextFragList = $('.contentfragmentlist').children()[i];
                    let fragments = $(nextFragList).find('.article-anchor'); 
                    $(firstFragmentList).append(fragments);
                }

            }
			myList = firstFragmentList;
            articleAnchors = $(myList).children('a');
            let sortList = Array.prototype.sort.bind(articleAnchors);
            if(defaultSortedEle == "")
                    defaultSortedEle = articleAnchors.slice();

    		if(sortByOrder === "ascending")
            {
                ascending= true;
                     
            	doSort(ascending, sortList);
            }
    		else if(sortByOrder === "descending")
            {
                ascending= false;      
	            doSort(ascending, sortList);
            }
            else if(sortByOrder === "popularity")
            {               
				$(myList).append(defaultSortedEle);
                showPagination();
            }
        	if(sortByOrder === "best-matched")
            {               
				$(myList).append(defaultSortedEle);
                showPagination();
            }

});

let doSort = function (sortingOrder, sortList ) {

    sortList(function ( a, b ) {
		let ax, bx;
        ax = $("#product-resource").find(a);
        bx= $("#product-resource").find(b);

        let aText = $(ax).find('.cmp-contentfragment__element--heading .cmp-contentfragment__element-value').text().trim();
        let bText = $(bx).find('.cmp-contentfragment__element--heading .cmp-contentfragment__element-value').text().trim();
        if ( aText < bText ) {
            return sortingOrder ? -1 : 1;
        }
        if ( aText > bText ) {
            return sortingOrder ? 1 : -1;
        }
        return 0;
    });

    $(myList).append(articleAnchors);
	showPagination();
};
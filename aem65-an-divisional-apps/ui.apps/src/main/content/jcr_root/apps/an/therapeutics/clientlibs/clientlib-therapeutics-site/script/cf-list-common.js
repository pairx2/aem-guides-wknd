$(document).ready(function() {
  
     if($(".cmp-contentfragmentlist").length==0){
       console.clear();
}
    let anchorHref = [];
    $('article.cmp-contentfragment').each(function() {
        anchorHref.push($(this).find('.cmp-contentfragment__element--contentdetailsreference .cmp-contentfragment__element-value').text().trim());
    });
    if (anchorHref) {
        $('article.cmp-contentfragment').each(function(index, value) {
            $(this).wrap(`<a class="article-ahnchor" href="${anchorHref[index]}"></a>`);
        });
    }
    $(".a-contentfragmentlist--base-T").append(`<section class="paggination"><div class="pagination-holder"><span class="show-more-alig">Showing 1-<span class="article-maxlimit"></span> of <span class="article-totalcount"></span> </span>
    <span class="back-to-top">
    Back to Top
    </span>
    </div> <button class="load-more">Ver más</button></section>`);

});


//newsroom pagination
$(window).on('load', function() {



    let parent = document.querySelector('.cmp-contentfragmentlist'),
        items = parent.querySelectorAll('.article-ahnchor'),
        loadMoreBtn = document.querySelector('.load-more'),
        maxItems = 4,
        hiddenClass = "d-none",
        articleTotal = items.length,
        remainingItems = articleTotal;

    $('.article-totalcount').text(articleTotal);
    $('.article-maxlimit').text(maxItems);
    console.log("articleTotal",articleTotal);

    if (articleTotal == maxItems) {
            $('.article-maxlimit').text(articleTotal);

        }
 if (articleTotal < maxItems) {
            $('.article-maxlimit').text(articleTotal);

        }

    [].forEach.call(items, function(item, idx) {
        if (idx > maxItems - 1) {
            item.classList.add(hiddenClass);
        }
    });

    loadMoreBtn.addEventListener('click', function() {

        remainingItems = remainingItems - maxItems;

        if (remainingItems > maxItems) {
            $('.article-maxlimit').text(maxItems + maxItems);

        } else {

            $('.article-maxlimit').text(articleTotal);
            loadMoreBtn.style.display = 'none';
        }


        [].forEach.call(document.querySelectorAll('.' + "article-ahnchor" + '.' + hiddenClass), function(item, idx) {
            console.log(hiddenClass);
            console.log(idx);
            if (idx < maxItems) {
                item.classList.remove(hiddenClass);
            }

            if (document.querySelectorAll('.' + hiddenClass).length === 0) {
                loadMoreBtn.style.display = 'none';
            }

        });

    });

    $(".back-to-top").click(function() {
        $("html, body").animate({ scrollTop: 0 }, 1000);
    });




})

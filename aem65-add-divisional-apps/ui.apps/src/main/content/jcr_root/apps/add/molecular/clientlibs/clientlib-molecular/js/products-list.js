const ITEMS_PER_PAGE = 6;

class ProductsList {
    constructor(ele) {
        this._container = ele;

        this._productslist = ele.querySelector('ul.productlist-view');

        this.init();
    }

    init() {
        const productsData = JSON.parse(this._container.dataset.productsJson);
        const selectedProd = JSON.parse(document.querySelectorAll('.abstractlist-vertical [data-js-component="abstract-list"]')[0].dataset.manualData);
        $(".abstractlist-vertical .abstractlist-activeItem").html(selectedProd[0].title);
        $(".productlist-container").prepend("<h2 class='filterProdName'>" + selectedProd[0].title + "</h2>");
        if (!productsData || !productsData.products.length) {
            return;
        }

        this.attachEvents();

        const {
            products,
            ...messages
        } = productsData;
        this._messages = messages;
        this._products = products;
        this._filterList = products;
        this._filterTags = {};
        this._pagination = {
            total_items: 0,
            total_pages: 0,
            current_page: 0,
            start_index: 0,
            end_index: 0,
            current_index: 0,
        };

        this.injectFixedTranslations();

        this.resetPagination();
        this.setFilter('vertical', selectedProd[0].value);

        this.addPage(true);
    }

    attachEvents() {
        document.addEventListener('verticalFilter:clicked', ev => this.setFilter('vertical', ev.detail));
        document.addEventListener('horizontalFilter:clicked', ev => this.setFilter('horizontal', ev.detail));
        

        this._container.querySelector('.productlist-show-more button').addEventListener('click', () => {
            this.nextPage();
        });

        this._container.querySelectorAll('.productlist-layoutselect-item a').forEach(el =>
            el.addEventListener('click', ev => this.switchLayout(ev.target.dataset.layout))
        );
    }

    magicTransitionEffect(callback) {
        $(this._productslist).fadeOut('500', () => {
            $(this._productslist).fadeIn('500');
            callback();
        });
    }

    switchLayout(layout) {
        this.magicTransitionEffect(() => {
            this._container.classList.remove('productlist-view--grid', 'productlist-view--tile');
            this._container.classList.add(`productlist-view--${layout}`);
        });
    }

    resetPagination(overrides = {}) {
        const total_items = this._filterList.length;

        this._pagination = {
            total_items: total_items,
            total_pages: Math.ceil(total_items / ITEMS_PER_PAGE),
            current_page: 1,
            start_index: 0,
            end_index: ITEMS_PER_PAGE,
            current_index: Math.min(ITEMS_PER_PAGE, total_items),
            ...overrides,
        };
    }

    injectFixedTranslations() {
        this._container.querySelector('.productlist-no-products').innerHTML = this._messages['noProducts'];
        this._container.querySelector('.back-to-top').innerHTML = this._messages['backToTop'];
        this._container.querySelector('.productlist-show-more button').innerHTML = this._messages['showMore'];
    }

    injectPagination() {
        const hasProducts = (this._pagination.total_items > 0);
        const hasMorePages = (this._pagination.current_page < this._pagination.total_pages);

        this._container.classList.toggle('has-products', hasProducts);
        this._container.classList.toggle('has-more-pages', hasMorePages);

        if (hasProducts) {
            const paginationText = this._messages['numberOfResults']
                .replace('{current}', this._pagination.current_index)
                .replace('{total}', this._pagination.total_items);

            this._container.querySelectorAll('.productlist-pagination-text').forEach(el =>
                el.innerHTML = paginationText
            );
        }
    }

    addPage(resetContent = false) {
        let newListItems = ``;
        this._filterList
            .slice(this._pagination.start_index, this._pagination.end_index)
            .forEach(({
                detailLink,
                image,
                title,
                prodDescription
            }) => {
                newListItems += `
          <li class="productlist-item">	
	<div class="product-list-image-container">
                 <div class="productlist-item-picture">
		<a href="${detailLink}">
			<img src="${image}" width="100%" height="100%" alt="${title}"/>
		</a>
    </div> 
     </div>
	<div class="productlist-item-container">                
		<div class="productlist-item-content">
            <div class="productlist-item-title">
				<a href="${detailLink}">				  
					<h2>${title}</h2>
				</a>
				<p>${prodDescription}</p>
			</div>                 
		</div>
	</div>            
</li>`;
            });

        this.magicTransitionEffect(() => {
            if (resetContent) {
                this._productslist.innerHTML = newListItems;
            } else {
                this._productslist.innerHTML += newListItems;
            }
        });

        this.injectPagination();
    }

    nextPage() {
        if (this._pagination.current_page < this._pagination.total_pages) {
            this._pagination.current_page++;
            this._pagination.start_index += ITEMS_PER_PAGE;
            this._pagination.end_index += ITEMS_PER_PAGE;

            this._pagination.current_index = Math.min(this._pagination.end_index, this._pagination.total_items);

            this.addPage();
        }
    }

    showAll() {
        this._filterTags = {};

        this._filterList = this._products;

        this.resetPagination({
            total_pages: 1,
            end_index: this._filterList.length,
            current_index: this._filterList.length,
        });

        this.addPage(true);
    }

    filterList() {
        if (!$.isEmptyObject(this._filterTags)) {
            let products = this._products;
            for (const type in this._filterTags) {
                if (this._filterTags[type]) {
                    products = products.filter(p => p.categories.includes(this._filterTags[type]));
                }
            }
            this._filterList = products;
        } else {
            this._filterList = this._products;
        }

        this.resetPagination();
    }

    setFilter(type, rawFilter) {
        const filter = rawFilter.trim();

        if (filter && this._filterTags[type] === filter) {
            return;
        }

        // resets filters if empty string or in the array of exceptions ("all products" button)
        if (!filter || ['all', 'todos'].includes(filter.toLowerCase())) {
            this._filterTags = {};
        } else {
            this._filterTags[type] = filter;
        }

        this.filterList();

        this.addPage(true);
    }
}

$(function() {
    document.querySelectorAll('[data-js-component="product-list"]').forEach(ele => {
        new ProductsList(ele);
    });
});
$(window).on('load', function() {
    $(".product-list .productlist-wrapper").removeClass("productlist-view--tile").addClass("productlist-view--grid");
    $(".abstractlist").parent().addClass("abstractList-column");
    $(".abstractList-column").parent().addClass("abstractList-row")
    $(".abstractlist-vertical .abstractlist-item-list li:first-child a").addClass("active");
    $(".abstractlist-vertical .abstractlist-item-list li").click(function() {
        $(".abstractlist-vertical .abstractlist-item-list li a").removeClass("active");
        $(this).children().addClass("active");
        $(".productlist-container .filterProdName").remove();
        $(".productlist-container").prepend("<h2 class='filterProdName'>" + $(this).children().html() + "</h2>");
    });
});
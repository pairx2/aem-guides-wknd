class SearchBox {
    name: string;
    constructor() {
        this.name = 'SearchStories';
    }
    
    // Method
    searchBoxHTML() {
        let fragment = document.createDocumentFragment();

        let form = document.createElement('form');
        form.autocomplete = 'off';
        form.className = 'ab-storybook-search-wrapper ml-4 mt-4 mr-4 mb-1';

        let spanSearch = document.createElement('span');
        spanSearch.className = 'search-icon';

        let input = document.createElement('input');
        input.type = 'text';
        input.id = 'ab-storybook-search-text';
        input.placeholder = 'Search stories...';
        input.setAttribute('aria-label','Search stories');

        let button = document.createElement('button');
        button.type = 'reset';
        button.title = 'Clear Search';
        button.className = 'reset-search';

        form.appendChild(spanSearch);
        form.appendChild(input);
        form.appendChild(button);
        fragment.appendChild(form);

        return fragment;
    }

    // Event handler
    eventHandler() {
        $('#ab-storybook-search-text').on('keyup', (e) => {
            let searchQuery:any = $(e.target).val();
            $('.reset-search').show(100);

            if(searchQuery.length !== 0) {
                $('#stg-levelone-ul li').each(function () {
                    if ($(this).text().search(new RegExp(searchQuery, 'i')) < 0) {
                        $(this).hide(100);
                        $(this).find('.collapse').removeClass('show');
                    }
                    else {
                        $(this).show(100);
                        $(this).find('.collapse').addClass('show');
                    }
                });
            } else {
                $('#stg-levelone-ul li').find('.collapse').removeClass('show');
                $('#stg-levelone-ul li').show(100);
                $('.reset-search').hide(100);
           }
        })

        //Reset search event handler
        $('.reset-search').on('click', (e) => {
            $('#ab-storybook-search-text').val('');
            $('#stg-levelone-ul li').show(100).end()
            .find('.collapse').removeClass('show');
            $('.reset-search').hide(100);
        })

        return;
    }
}
  
const serachStoriesInstance = new SearchBox();
$('#ab-logo').after(serachStoriesInstance.searchBoxHTML());
serachStoriesInstance.eventHandler();
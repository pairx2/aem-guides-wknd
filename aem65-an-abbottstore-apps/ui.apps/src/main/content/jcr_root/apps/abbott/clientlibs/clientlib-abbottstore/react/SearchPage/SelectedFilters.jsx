import React from "react";

const SelectedFilters = props => {
    let selectedFiltersArr = props.selectedFilters;
    let filters = props.filters;
    let categoryFilterArr = selectedFiltersArr.filter(ele => ele.type === 'category_id');
    let flavorFilterArr = selectedFiltersArr.filter(ele => ele.type === 'flavors');
    let sizesFilterArr = selectedFiltersArr.filter(ele => ele.type === 'cases');
    let formsFilterArr = selectedFiltersArr.filter(ele => ele.type === 'forms');
    let priceFilterArr = selectedFiltersArr.filter(ele => ele.type === 'price');
	
    //  show category filter selected on category pages
   if(!props.isSearch) {
		for(let i = 0 ; i < selectedFiltersArr.length; i++) {			
		if(selectedFiltersArr[i].label == "" && selectedFiltersArr[i].type.toLowerCase() ===  'category_id'){
			categoryFilterArr = [];
		}
		if(selectedFiltersArr.length === 1 && selectedFiltersArr[0].label == ""){
			selectedFiltersArr =[];
		}
	}
  }  
  if(selectedFiltersArr.length === 1 && selectedFiltersArr[0] == "" ){
			selectedFiltersArr =[];
		
   }

    /**
     * @function
     * @desc displays the price range with '$' symbol
     * @param {String} priceLabel price label
     */
    function formatPriceLabel(priceLabel) {
        //convert '_' to '-'
        priceLabel = priceLabel.replace(/\_/g, '-');

        // Add $ before price range numbers
        priceLabel = priceLabel.replace(/\d+/g, function (c) { return '$' + c; });

        // convert first range from '*-100' to '0-100'
        priceLabel = priceLabel.replace('*-', '$0-');

        // convert last range from '100-*' to '100+'
        priceLabel = priceLabel.replace('-*', ' AND ABOVE');

        return priceLabel;
    }

    /**
     * @function
     * @desc renders filtered items based on type (category or others)
     * @param {String} itemName getting the name of the filter
     * @param {String} filterType getting the type of the filter
     */
    function renderSingleFilterArr(itemName, filterType) {
        let template;
        if (filterType.toLowerCase() === 'category_id') {
            template = (
                <>
                    {
                        categoryFilterArr.length > 0 &&
                        (
                            <>
                                {categoryFilterArr.map((selected, index) => (
                                    <React.Fragment key={index}>
                                        <div className="filtered-options__item">
                                            <span className="filtered-options__item--option-value">
                                                {selected.label}
                                                <em
                                                    className="filtered-options__item--close-btn ai-close"
                                                    onClick={() => props.onClearSingleFilterOption(filterType, selectedFiltersArr, filters)}>
                                                </em>
                                                {index > 0 ? ' ' : ''}
                                            </span>
                                        </div>
                                    </React.Fragment>
                                ))}

                            </>
                        )
                    }
                </>
            )
        }
        else if (itemName.toLowerCase() === 'flavor') {
            template =
                (
                    <>
                        {
                            flavorFilterArr.length > 0 &&
                            (
                                <>
                                    {flavorFilterArr.map((selected, index) => (
                                        <React.Fragment key={index}>
                                            <div className="filtered-options__item">
                                                <span className="filtered-options__item--option-value">
                                                    {selected.label}{console.log("flavor")}
                                                    <em
                                                    className="filtered-options__item--close-btn ai-close"
                                                    onClick={() => props.onClearSingleFilterOption(filterType, selectedFiltersArr, filters)}>
                                                    </em>
                                                    {index > 0 ? ' ' : ''}
                                                </span>
                                            </div>
                                        </React.Fragment>
                                    ))}

                                </>
                            )
                        }
                    </>
                )
        }
        else if (itemName.toLowerCase() === 'sizes') {
            template =
                (
                    <>
                        {
                            sizesFilterArr.length > 0 &&
                            (
                                <>
                                    {sizesFilterArr.map((selected, index) => (
                                        <React.Fragment key={index}>
                                            <div className="filtered-options__item">
                                                <span className="filtered-options__item--option-value">
                                                    {selected.label}{console.log("size")}
                                                    <em
                                                    className="filtered-options__item--close-btn ai-close"
                                                    onClick={() => props.onClearSingleFilterOption(filterType, selectedFiltersArr, filters)}>
                                                    </em>
                                                    {index > 0 ? ' ' : ''}
                                                </span>
                                            </div>
                                        </React.Fragment>
                                    ))}
                                </>
                            )
                        }
                    </>
                )
        }
        else if (itemName.toLowerCase() === 'form') {
            template =
                (
                    <>
                        {
                            formsFilterArr.length > 0 &&
                            (
                                <>
                                    {formsFilterArr.map((selected, index) => (
                                        <React.Fragment key={index}>
                                            <div className="filtered-options__item">
                                                <span className="filtered-options__item--option-value">
                                                    {selected.label}
                                                    <em
                                                    className="filtered-options__item--close-btn ai-close"
                                                    onClick={() => props.onClearSingleFilterOption(filterType, selectedFiltersArr, filters)}>
                                                    </em>
                                                    {index > 0 ? ' ' : ''}
                                                </span>
                                            </div>
                                        </React.Fragment>
                                    ))}
                                </>
                            )
                        }
                    </>
                )
        }
        else if (itemName.toLowerCase() === 'price') {
            template =
                (
                    <>
                        {
                            priceFilterArr.length > 0 &&
                            (
                                <>
                                    {priceFilterArr.map((selected, index) => (
                                        <React.Fragment key={index}>
                                            <div className="filtered-options__item">
                                                <span className="filtered-options__item--option-value">
                                                    {formatPriceLabel(selected.label)}{console.log("price")}
                                                    <em
                                                    className="filtered-options__item--close-btn ai-close"
                                                    onClick={() => props.onClearSingleFilterOption(filterType, selectedFiltersArr, filters)}>
                                                    </em>
                                                    {index > 0 ? ' ' : ''}
                                                </span>
                                            </div>
                                        </React.Fragment>
                                    ))}
                                </>
                            )
                        }
                    </>
                )
        }
        return template;
    }

    return (
        <>
            {
                selectedFiltersArr.length > 0 &&
                (
                    <>
                        <div className="filtered-options">
                            {
                                filters.map((item, index) => (
                                    <React.Fragment key={index}>
                                        {renderSingleFilterArr(item.label, item.attribute_code)}
                                    </React.Fragment>
                                ))
                            }
                        </div>
                        <div className="filtered-options__clear-all" onClick={() => props.onClearAllFilter(filters)}>clear all filters</div>
                    </>
                )
            }
        </>
    )
};


export default SelectedFilters;
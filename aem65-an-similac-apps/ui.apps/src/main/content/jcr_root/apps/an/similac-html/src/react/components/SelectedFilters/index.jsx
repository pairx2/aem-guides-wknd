import React from "react";

const SelectedFilters = props => {
    let selectedFiltersArr = props.selectedFilters;
    let filters = props.filters;
    selectedFiltersArr.map((data)=>{
        if(data.type == "formula_type") {
            var labelSplit = data.label.split('--')
            if(labelSplit.length>1){
                data['colorcode'] = labelSplit[0]
                data['label'] = labelSplit[1]
            }
        }
    });
    let labels = props.labels;
    let displayClass = {
        mobile: 'd-md-none',
        desktop: 'd-none d-md-block'
    };



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
        let filterArray = selectedFiltersArr.filter(ele => ele.type === filterType);
        let isPrice = filterType.toLowerCase() === 'price';
        template = (
            <>
                {
                    filterArray.length > 0 &&
                    (
                        <>
                            {filterArray.map((selected, index) => (
                                <React.Fragment key={index}>
                                    <div className="filtered-options__item">
                                        {props.showCategory && <span className="filtered-options__item--option-label">{itemName}: </span>}
                                        <span className="filtered-options__item--option-value">


                                            {isPrice ? formatPriceLabel(selected.value) : selected.label}

                                        </span>
                                        <span
                                            className="filtered-options__item--close-btn"
                                            onClick={() => props.onClearSingleFilterOption(filterType, selectedFiltersArr, selected.label, filters)}>
                                            &times;
                                            </span>
                                    </div>
                                </React.Fragment>
                            ))}
                        </>
                    )
                }
            </>
        )
        return template;

    }

    return (
        <>
            {
                selectedFiltersArr.length > 0 &&
                <div className="filters__options-wrapper">
                    <div className={`filtered-options ${displayClass[props.variation]}`}>
                        {
                            filters.map((item, index) => (
                                  <>  {renderSingleFilterArr(item.label, item.attribute_code)}</>
                            ))
                        }
                        <div className="filtered-options__clear-all" onClick={() => props.onClearAllFilter(filters)}>{labels.clearAllLabel}</div>
                    </div>
                </div>
            }
        </>
    )
};


export default SelectedFilters;
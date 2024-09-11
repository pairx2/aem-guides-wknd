import React from "react";

const Filter = props => {

  let filter = props.filter;
  let initialFilterCount = filter.initialFilters;
  let isExpanded = filter.isExpanded;
  let filterCount = filter.count;
  let arrowClass = filter.isVisible ? "ai-minus" : "ai-plus";
  let listClass = "p-0 mb-4 ";

  // toggle class for items
  listClass += filter.isVisible ? "" : "d-none";

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
   * @desc renders items based on type (category or others)
   * @param {String} type filter type
   * @param {*} item filter list item to be rendered
   */
  function renderItem(type, item) {
    let template;
    let isPrice = type.toLowerCase() === 'price';

    let checkedClass = item.isItemChecked ? "ai-check-alt" : "";
      template = (
        <span
          className="filters__item-link"
          key={item.value}
        >
          <input
            type="checkbox" className={`filters__checkbox ${checkedClass}`} />
          {!isPrice && item.label}
          {isPrice && <span>{formatPriceLabel(item.value)}</span>}
          <span className="filters__item-count"> ({item.count})</span>
        </span>
      );
    return template;
  }

  /**
   * @function
   * @desc renders show hide button on conditions
   * @param {Integer} initialFilterCount filters count initially
   * @param {Boolean} isExpanded whether clicked or not
   * @param {Integer} filterCount count of all the filter of specific type
   */
  function showMoreLessFilters() {
    let container;
    if (filterCount <= 10) {
      container = "";
    }
    else if (!isExpanded) {
      container = (
        <div className="filter-show-btn" onClick={(e) => props.onShowMoreFilters(filter, e)}>
          Show More +
        </div>
      )
    }
    else if (isExpanded) {
      container = (
        <div className="filter-show-btn" onClick={(e) => props.onShowLessFilters(filter, e)}>
          Show Less -
        </div>
      )
    }

    return container;
  }

  return (
    <>
      <h2
        className="filters__title2 filters__toggle clearfix"
        onClick={() => props.onToggle(filter)}
      >
        <span className="float-left">{filter.label === "Category" ? "Brands" : filter.label}</span>
        <span className="float-right filters__icon">
          <i className={arrowClass}></i>
        </span>
      </h2>
      <ul className={listClass}>
        {
          filter.options.slice(0, initialFilterCount).map((item, index) => 
            (!!item.count && <li
              key={index}
              className="filters__item"
              onClick={() => props.onSelectFilter(item, filter)}
            >
              {renderItem(filter.attribute_code, item)}
            </li>)
            
          )
        }
        {showMoreLessFilters()}
      </ul>
    </>
  );
};

export default Filter;

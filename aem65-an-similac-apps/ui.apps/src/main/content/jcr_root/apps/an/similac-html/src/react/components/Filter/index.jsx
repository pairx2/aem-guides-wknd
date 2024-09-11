import React from "react";

const Filter = props => {
  let filter = props.filter;
  if(filter.attribute_code =="formula_type"){
    filter.options.map((data)=>{
      var labelSplit = data.label.split('--')
      if(labelSplit.length>1){
        data['colorcode'] = labelSplit[0]
        data['label'] = labelSplit[1]
      }
    })
  }
  let initialFilterCount = filter.initialFilters;
  let isExpanded = filter.isExpanded;
  let filterCount = filter.count;
  let labels = props.labels;
  let iconClass = filter.isVisible ? "" : "filters__toggle";
  let listClass = "p-0 mb-4";
  // toggle class for items
  listClass += filter.isVisible ? "" : " d-none";

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
   * @param {String} filterType filter type
   * @param {*} filterItem filter list item to be rendered
   */
  function renderItem(filterType, filterItem) {
    let template;
    let isPrice = filterType.toLowerCase() === 'price';
    var sectionStyle ={
      backgroundColor:`${filterItem.colorcode}`
    }
    if (filterType.toLowerCase() === "category_id") {
      template = (
        <span className="filters__item-link" key={filterItem.value}>
         {filterItem.colorcode?<span className="filtercolorcode" style={sectionStyle}>&nbsp;</span>:null}{filterItem.label}
          <span className="filters__item-count"> ({filterItem.count})</span>
        </span>
      );
    } else {
      let checkedClass = filterItem.isItemChecked ? "checked" : "";
      template = (<>
      
        <input type="checkbox" className={`filters__checkbox ${checkedClass}`} />
        <label className="filters__item-link-label">&nbsp;</label>
        <div className="filters__item-link" key={filterItem.value}>
          {filterItem.colorcode?<span className="filtercolorcode" style={sectionStyle}>&nbsp;</span>:null}{!isPrice && filterItem.label}
          {isPrice && <span>{formatPriceLabel(filterItem.value)}</span>}
          {filterItem.count >=0 && <span className="filters__item-count"> ({filterItem.count})</span>}
        </div>
      </>);
    }
    return template;
  }

  /**
   * @function
   * @desc renders show hide button on conditions
   */
  function showMoreLessFilters() {
    let container;
    if (filterCount <= 10 || filterCount === undefined) {
      container = "";
    }
    else if (!isExpanded) {
      container = (
        <div className="filters-show-btn" onClick={(e) => props.onShowMoreFilters(filter, e)}>
          {labels.showMoreLabel} +
        </div>
      )
    }
    else if (isExpanded) {
      container = (
        <div className="filters-show-btn" onClick={(e) => props.onShowLessFilters(filter, e)}>
            {labels.showLessLabel} -
        </div>
      )
    }
    return container;
  } 
  return (
    
    <>
      <h6
        className={`filters__title2 clearfix ${iconClass}`}
        onClick={() => props.onToggle(filter)}
      >
        <span className="float-left">{filter.label}</span>
        <span className="float-right filters__icon">
          <span className="sim-icons minus" data-icon="minus"></span>
          <span className="sim-icons add" data-icon="add"></span>
        </span>
      </h6>
      <ul className={listClass}>
        {
          filter.options.slice(0, initialFilterCount).map((filterItem, index) => 
            ( 
              (!RegExp(/[,]/).test(filterItem.value)) && 
            <li
              key={index}
              className="filters__item"
              onClick={() => { (filterItem.isItemChecked ? ``:
                 ABBOTT.gtm.buildAndPush.formTracking('product-filters', 'select',
                  `${ABBOTT.utils.hyphenWords(filter.label)}_${ABBOTT.utils.hyphenWords(filterItem.label)}`) );
               props.onSelectFilter(filterItem, filter);}} >
              {renderItem(filter.attribute_code, filterItem)}
            </li>
            )
          )
        }
        {showMoreLessFilters()}
      </ul>
    </>
  );
};

export default Filter;

/**
 * @file Manages the filters rendering on page based on the props passed
 * @param {Boolean}   props.isSearch if the page is search page (it can also be category page)
 * @param {Number}    props.totalCount number of products on current page
 * @param {Object}    props.labels AEM authored labels object
 * @param {String}    props.searchPageUrl Search page URL in the application (to redirect when clicked on related search terms)
 * @param {Array}     props.filters Filters data list
 * @param {Array}     props.selectedFilters selected filters array list
 * @param {Function}  props.onClearAllFilter event handler for click on clear all filters link
 * @param {Function}  props.onClearSingleFilterOptionevent event handler for click on individual filter clear icon
 * @param {Function}  props.onMobileClose event handler for click on mobile-close icon
 * @param {Function}  props.onFilterToggle event handler for toggle icon with filter title
 * @param {Function}  props.onShowMoreFilters event handler for click on show-more link
 * @param {Function}  props.onShowLessFilters event handler for click on show-less link
 */

import React from "react";
import RelatedSearchTerms from "./RelatedSearchTerms.jsx";
import Filter from "./Filter.jsx";

const Filters = props => {

  const allowFilters = ["category_id","price","cases","flavors","forms"];

  return (
    <>
      {props.isSearch && <RelatedSearchTerms
        data={props.relatedSearch}
        totalCount={props.totalCount}
        labels={props.labels}
        searchPageUrl={props.searchPageUrl}
        variation="desktop" />}
      {!!props.filters.length &&
        <>
          <h2 className="filters__title fixed-filter-title">
            <span className="close-btn" onClick={props.onMobileClose}>
              <em className="ai-caret-left"></em> Back
            </span>
            <span className="title d-none d-md-block">{props.labels.labelShoppingoptions}</span>
            <span className="title d-block d-md-none" onClick={() => props.onClearAllFilter(props.filters,'mobile')}>Clear All filters</span>
          </h2>
          <h2 className="filters__title-mobile d-block d-md-none">Filter</h2>
        </>
      }
      {props.filters.map(filter => {
        if(allowFilters.includes(filter.attribute_code)) {
           return  (
                <Filter
                  key={filter.attribute_code}
                  onToggle={props.onFilterToggle}
                  onSelectFilter={props.onSelectFilter}
                  filter={filter}
                  onShowMoreFilters={props.onShowMoreFilters}
                  onShowLessFilters={props.onShowLessFilters}
                />
           )
        }
      })}
       <button onClick={props.onMobileClose} className="btn btn-filter d-block d-md-none" >Apply Filters</button>
    </>
  );
};

export default Filters;

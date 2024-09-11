/**
 * @file Manages the rendering of Related Search Terms componenent on page based on the props passed
 * @param {Number} props.totalCount number of products on current page
 * @param {Object} props.labels AEM authored labels object
 * @param {String} props.searchPageUrl Search page URL in the application (to redirect when clicked on related search terms)
 * @param {Array} props.data selected filters array list
 */

import React from "react";

const RelatedSearchTerms = props => {
  let baseUrl = props.searchPageUrl + '?q=';
  let displayClass = {
    mobile: 'd-md-none',
    desktop: 'd-none d-md-block'
  };


  return (
    <>
      {!!props.data.length && !!props.totalCount &&
        <>
          <h2 className={`filters__title ${displayClass[props.variation]}`}>{props.labels.labelRelatedsearchterms}</h2>
          <ul className={`p-0 mb-4 ${displayClass[props.variation]}`}>
            {props.data.map((item, index) => (
              <li key={index} className="filters__item">
                <a href={baseUrl + item.queryText} className="filters__item-link">
                  {item.queryText}
                </a>
              </li>
            ))}
          </ul>
        </>
      }
    </>
  );
};

export default RelatedSearchTerms;
